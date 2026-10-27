# Ouellet Studio — www.ouelletstudio.com

Official website for **Ouellet Studio**, a cinematic visual studio founded and directed by **Danick Ouellet**.

**Light · Material · Motion.**
Light reveals the subject, material gives it character, motion gives it life.

## About

Ouellet Studio produces cinematic visual monographs — photography and video — across five practice sectors, in priority order:

1. **Yachting & Marine** (primary) — superyachts, day-cruisers, teak joinery, helm detail, running hull motion.
2. **Executive Aviation** — heavy jets, turboprops, glass cockpits, hangar event light, 4K gimbal passes.
3. **Architecture & Spatial Design** — modern compounds, hangar headquarters, private terminals.
4. **Boutique Hospitality & Destinations** — boutique private terminals, estate garages, alpine lodges.
5. **Automotive & Coachbuilding** — exotic collections, studio curves, carbon weave detail.

A sixth, clearly labeled category — **Speculative Concepts & Neural Pre-Vis** — covers AI-assisted pre-construction and pre-visualization work, always disclosed as concept imagery and never presented as a captured shoot.

## Base hubs

Vancouver (YVR/YPK) · Montreal (CYUL/CYHU) · Toronto (CYYZ/CYTZ) · Calgary (CYYC/CYBW) · London (EGLF/EGKB) · Dubai (OMDW/OMAD) · Monaco (Port Hercule)

## Pricing

Services span **$1,250 – $18,000 CAD**, from single-session showcase passes through heavy asset/facility monographs to enterprise fleet retainers and custom interactive 3D digital twins. Exact bands are listed in the commission form on the site.

## Contact & SLA

Commission inquiries submitted through the site's intake form are reviewed by the Creative Director and answered **within 2 business hours**.

## Technical / production standards

- Every deliverable is color-calibrated to a **5500K CAT16 daylight target** in darktable before any creative grade is applied.
- Aircraft registration marks, vessel names, and other identifying marks are **private by default** and are only published with the owner's or operator's written approval on file.
- Copyright in all imagery remains with Ouellet Studio; partner or client use is licensed, with terms set out in a delivery note rather than in file metadata.

## Repository contents

| File | Purpose |
|---|---|
| `index.html` | The complete single-file website — practice-sector dossier, interactive CYPK/YPK airfield schematic, 4-tier remote services grid, 5-step pre-qualifying commission wizard, and invisible AEO/SEO infrastructure (JSON-LD `@graph`, GeoJSON airfield coordinates, OpenGraph/Twitter card tags, semantic microdata). Plain HTML/CSS/JS — no build step, no framework dependency. |
| `image_4.jpg` | The OpenGraph / Twitter Card social preview image (1200×630 JPEG — re-encoded from the original PNG to keep the file small), referenced by absolute URL in `index.html`'s `<head>`. Must stay side-by-side with `index.html` at the site root so `https://www.ouelletstudio.com/image_4.jpg` resolves. |
| `llms.txt` | Plain-text ingestion index for AI assistants and answer engines (SearchGPT, Perplexity, Claude, Gemini), per the emerging `llms.txt` convention. |
| `README.md` | This file. |

## Deployment

Static site, zero build step. Deploy by serving these files from the domain root — any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages) works. Point `www.ouelletstudio.com` (and a redirect from the bare `ouelletstudio.com`) at the deployment.

This repo is connected to Vercel's GitHub integration: every push to `main` builds and deploys to production automatically.
