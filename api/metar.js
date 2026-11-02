// Server-side METAR proxy for ouelletstudio.com.
// aviationweather.gov does not allow browser (CORS) requests, so the page
// calls this endpoint and the server fetches the report, then caches it.
//
// If the requested station issues no current METAR (e.g. CYPK, a small
// uncontrolled field), we fall back to the nearest reporting station and
// say so in the X-Metar-Station header, so the page can label it honestly.

const UA = 'OuelletStudioWeb/1.0 (+https://www.ouelletstudio.com; danick@ouelletstudio.com)';

// Preference order per requested station: itself first, then nearest neighbours.
const CHAINS = {
  CYUL: ['CYUL', 'CYHU'],
  CYHU: ['CYHU', 'CYUL'],
  CYYZ: ['CYYZ', 'CYTZ'],
  CYTZ: ['CYTZ', 'CYYZ'],
  CYVR: ['CYVR'],
  CYPK: ['CYPK', 'CYNJ', 'CYVR', 'CYXX'],
};

const MAX_AGE_MS = 3 * 60 * 60 * 1000; // ignore reports older than 3 hours

// Observation time is DDHHMMZ inside the report; return its age in ms, or null.
function ageMs(line, now) {
  const m = line.match(/\b(\d{2})(\d{2})(\d{2})Z\b/);
  if (!m) return null;
  const day = +m[1], hh = +m[2], mm = +m[3];
  // Try this month, then last month, and take the one not in the future.
  for (let back = 0; back < 2; back++) {
    const t = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - back, day, hh, mm);
    if (t <= now.getTime() + 5 * 60 * 1000) return now.getTime() - t;
  }
  return null;
}

function stationOf(line) {
  const m = line.match(/\b([A-Z]{4})\s+\d{6}Z\b/);
  return m ? m[1] : null;
}

module.exports = async function handler(req, res) {
  const id = String((req.query && req.query.ids) || '').toUpperCase();
  const chain = CHAINS[id];
  if (!chain) {
    res.status(400).setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('unsupported station');
    return;
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch(
      'https://aviationweather.gov/api/data/metar?ids=' + chain.join(',') + '&format=raw',
      { headers: { 'User-Agent': UA }, signal: ctrl.signal }
    );
    if (!r.ok) throw new Error('upstream ' + r.status);

    const now = new Date();
    const byStation = {};
    ((await r.text()) || '').split('\n').forEach((raw) => {
      const line = raw.trim();
      const st = line && stationOf(line);
      if (!st || byStation[st]) return;
      const age = ageMs(line, now);
      if (age !== null && age <= MAX_AGE_MS) byStation[st] = line;
    });

    const pick = chain.find((st) => byStation[st]);

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Access-Control-Expose-Headers', 'X-Metar-Station');
    if (!pick) { res.status(204).end(); return; } // nothing current anywhere in the chain
    res.setHeader('X-Metar-Station', pick);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(byStation[pick]);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('metar unavailable');
  } finally {
    clearTimeout(timer);
  }
};
