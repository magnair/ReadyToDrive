name: company-new-search
description: Searces the web for new for about my customers.

## Purpose
Create a concise Norwegian briefing of new, relevant public news and web mentions for the configured companies whenever invoked.

IMPORTANT:
- Do not perform parallel browsing operations.
- Do not open more than one search result at a time.
- Process companies sequentially.

## Uses
- Agent capabilities: web browsing
- Agent context: prior summaries, when available

## Instructions
1. Use the requested search period, or the previous 24 hours by default.
2. Search separately for Jotun, Mobitech, Kongsberg Gruppen, Kongsberg Maritime, Kongsberg Norcontrol, Equinor, and Amiblu, including clear name variants.
3. Prioritize editorial media, official company websites, stock-exchange announcements, and credible industry sources.
4. Keep only items from the period where a configured company is the main topic or is materially mentioned.
5. Verify title, publication date when available, source, and a working direct article link.
6. Group duplicate coverage and use the most authoritative source as the main link.
7. Compare with prior summaries when available and exclude previously reported items; otherwise state that duplicate checking was limited.
8. Write in Norwegian, grouped by company and ordered by publication time.
9. For each item, provide title, a neutral one-to-three-sentence summary, source, publication date and time when available, and a clickable direct link.
10. End with the number of new items, search period, and search date and time.
11. If no new relevant items are found, return exactly: "Ingen nye relevante nyhetssaker eller omtaler ble funnet i den valgte perioden."
12. Mark uncertain matches and distinguish facts from claims or commentary.

## Parameters
- Search period, optional; defaults to the previous 24 hours.
- Company subset, optional; defaults to all configured companies.
- Prior summaries, optional; used for duplicate checking.

## Output
A Norwegian briefing with grouped items, direct links, source metadata, search-period details, and a clear no-news message.
