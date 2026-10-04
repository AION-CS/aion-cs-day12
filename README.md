# Retention Lab · Day 12

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 7, Day 1 of 2.**
*Systematically building customer retention through memberships and referrals.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32 and, since the retrofit of 2026-10-03, #33 to #46 (see “Retrofit” below). Route 2 follows #47 since 2026-10-04 (see “Route 2 redesign” below).

The case company is **ConnectIT Services GmbH** (the plan's case study): *low customer retention, expensive new customer acquisition,
potential of existing customers unused*, €130,000 and five months. The plan's Level 1 scenarios (a company that wants to retain
customers long-term under high competitive pressure, with customers who switch providers often; a company that wants more new
customers through referrals, with a limited marketing budget and high customer satisfaction) are ConnectIT's situation. Route 2 puts
the learner in the Chief Customer Officer's chair: retention not sustainable, new customer acquisition expensive, intense competition,
a limited budget (€180,000 over six months, Case assumption), uncertain customer reactions, time pressure, and a strategic decision
despite an unclear success forecast.

This repo was bootstrapped from `day11` (chrome, primitives, store pattern, tokens, the language machinery) and its content was
replaced. Nothing of SalesTech remains in the visible content; several data identifiers keep earlier names (e.g. `CUSTOMERS` holds the
eight existing customers, `PILOT` the leads from marketing and from referrals, the tag ids `respond/personal/learn` mean
incentive/service added value/community, the measure ids `stories/types/training` are the referral programme, the community and the
membership tier, a "source" in `route2.ts` is an added value), and each file's header comment says what they hold now.

> **Before you push:** this folder has a fresh local `git init` and no remote. Create the `aion-cs-day12` repository and set the
> remote first (`../CLAUDE.md` #17). Nothing was committed or pushed.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 transactional versus relational retention, A2 membership models: incentive, service added value, community, A3 customers as multipliers: who to ask for a referral, and who only wants a discount, A4 what a referral is worth: close rate, lift and extra revenue, A5 KPIs for memberships and referrals: outcome, driver, guardrail, vanity, A6 testing fairly, and the risk of wrong incentives, A7 prioritising measures: retention effect × scalability × economic viability). **Task 1, Retention Analysis**: *Part 1 · Understand retention models:* 1.1 sort nine membership benefits into incentive, service or community and name an advantage of a membership model, 1.2 what a referral is worth (F1–F3 and a sentence), 1.3 two customers to ask first for a referral, two who would join only for a discount, three retention approaches, 1.4 coaching reflection. *Part 2 · Make it measurable and choose:* 2.1 tag twelve metrics by kind, 2.2 link to value, meaning and use per kind, uncertainties, your three KPIs, 2.3 design a fair A/B test of a referral ask, 2.4 choose, score and order three of nine measures. | `1-{name}-day12-l1l2-retention-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 a membership and referral system: the target vision, B2 central added values: the decision first, then the proof, B3 a KPI system for customer retention: four tests, B4 a scalable referral model: roll out, keep testing or stop, B5 a strategic decision under an unclear forecast, and the measures architecture). **Task 2, Retention System Memo**, one decision frame (#47): a live control panel, **Step A** (Block 3.5, the architecture: each of eight items Now / After the uptake is proven / Not now, a two-sentence vision, what the plan gives and what it costs) and **Step B** (Block 3.6, the strategic decision despite an unclear forecast, why, what you will watch and when you would stop), then four folded Optional blocks, “Go deeper”: 3.1 principles, 3.2 central added values, 3.3 KPIs rated on four tests, 3.4 referral and membership approaches, tested. The memo assembles below the answers. | `2-{name}-day12-l3-retention-system-memo.html` |

Minutes: Materi A 60 + Task 1 65, Materi B 60 + Task 2 50. All in `lib/routes.ts`.

## German version (CLAUDE.md #32)

Same machinery as Days 5–11: `lib/lang.ts`, `lib/i18n.tsx`, `ui.lang` in the persisted store. Common terms stay English in German
sentences (Community, User Group, Lead, Customer Success, Customer Operations, KPI, Guardrail, Uplift, Lift, Owner, Tripwire, Chief
Customer Officer…); explanations are German, formal "Sie". Where German practitioners use the German word, the German word is used and
the glossary entry says so (Kundenbindung, Mitgliedschaft, Anreiz, Mehrwert, Empfehlung, Multiplikator, Marge, Quartalsreview,
Abschlussquote). Mentor tools stay English; file names and the deliverable names stay English.

## Stack

Next.js 14 App Router · TypeScript strict · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d12-v1`, version 1, `skipHydration` +
`StoreHydrator`, deep `mergeDefaults`) · static export. No animation, drag-and-drop, PDF or chart library.

```bash
npm install
npm run dev          # http://localhost:3000 (the parent launch config uses port 3012)
npm run typecheck
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (296 checks)
npm run build        # writes the static site to out/  (stop `npm run dev` first)
```

## What is in the data

- `ladder.ts`: nine membership benefits from a first draft (3 incentive, 3 service added value, 3 community) with tests, pair tests,
  clue, reason and rejected kinds.
- `forecast.ts`: last year's leads (Case assumption). Close rate = deals ÷ leads × 100; lift = referral rate ÷ marketing rate; extra
  revenue = referred leads a year × (referral rate − marketing rate, as a share) × average deal value. 45 ÷ 150 = **F1 30%**;
  marketing 60 ÷ 600 = 10%; 30 ÷ 10 = **F2 3**; 400 × 0.20 × €8,000 = **F3 €640,000**. Worked example of A4 (Werra Datentechnik): 20%,
  8%, 2.5, €180,000. Also the eight existing customers of 1.3 (ask first = 80% or more satisfied **and** in contact with peers: the tax
  consultancy network and the hospital group; joins only for a discount = talks mostly about price: the wholesaler and the retail chain;
  traps: the engineering firm, 90% satisfied but no peers; the logistics firm, peers but 75%).
- `patterns.ts`: four kinds of metric with tests and pair tests; twelve metrics (3 each; moved with value: outcome 3, driver 2,
  guardrail 1, vanity 0); the link rule; meaning and use per kind; seven uncertainties (four real); the A/B test card (four parts, one
  fair option each, plus hypothesis and decision rule).
- `measures.ts`: nine measures with cost, weeks and how the cost grows. Scalability follows from it (the same cost however many take
  part 3, a cost per member or referral 2, staff time per customer 1). Referral programme with a two-sided thank-you (27), member
  community (18), membership tier with added-value services (18): €115,000. The merchandise box answers no problem of the brief; the cash
  bonus and the loyalty discount score 4.
- `route2.ts`: six principles, eight added values (rule: does it support a customer decision? did ≥ 80% of pilot members use it?), eight
  KPI candidates with printed facts and limits, six tested approaches (rule: uplift ≥ 10% and ≥ 100 decisions → roll out; uplift ≥ 3% →
  keep testing; else stop; the cash bonus is stopped by its self-referrals), eight measures (model €160,000 of €180,000; the AI loyalty
  engine is a black box and breaks the budget; the loyalty discount buys renewals with margin), owners, triggers, three decisions, KPIs
  and the board's month-3 challenge.

## Mentor bar

The first element on every page. Enter `muchson123` once and every model answer of Routes 1 and 2 fills in (plus a participant name if
empty and every calculator part), so each export downloads straight away. The same unlock shows the answer keys (1.1, 1.3 picks, 2.1,
2.2 rows and uncertainties, 2.3 test card, 2.4 measures and order, 3.1–3.6) and a worked answer for every other question (F1–F3 as
step tables with pitfalls, every free text with what to look for). Client-side convenience gate, not security; a reload locks it.

## Notes on deviations from the brief and the shared rules

1. **Two routes (CLAUDE.md #30).** The plan's Level 1 Task 1 (membership models: advantages, attractive benefits, risks, two simple
   membership approaches), Level 1 Task 2 (referral marketing: why customers refer, three approaches for a referral system, their effect,
   risks such as misuse) and the Level 2 case study (ConnectIT: analyse existing retention, develop a membership model, design a
   referral system, evaluate economic viability and effect, prioritise) run on one company. Mapping: advantages 1.1 (own field);
   attractive benefits and kinds of benefit 1.1; risks of memberships taught in A2 and asked in 1.4; two membership approaches and one
   community approach 1.3c; why customers refer and who to ask 1.3a/b and 1.4; referral approaches, their effect and economic viability
   2.4 (the referral programme with a two-sided thank-you, the cash bonus and the referral page are the referral approaches on offer);
   misuse risks 2.2 (uncertainties), 2.3 (guardrail in the decision rule) and 1.4; analysing existing retention 1.2 and 2.1–2.2;
   prioritisation 2.4. The coaching focus and reflection are Block 1.4.
2. **The Level 3 transfer project** has five items plus the decision. 1 → 3.1; 2 → 3.2; 3 (a scalable referral model) → 3.4, where each
   referral and membership approach is tested and scalability is part of B4's rules; 4 (risk analysis: wrong incentives, costs) → 3.4
   guardrails, 3.2's cost rule and the misuse trigger in 3.5; 5 → 3.5; the additional requirement → 3.6. Block 3.3 (a KPI system for
   retention) is added so the system can be steered; the task's "What you build" list names the blocks as they are.
3. **The evaluation "Retention effect × Scalability × Economic viability"** from the plan is the score of Block 2.4. Scalability is derived
   from how each measure's cost grows (printed per measure), so it can be checked; retention effect and economic viability are judged.
4. **Task 1 is 65 minutes** (the A/B test card is its own block, as on Days 8 to 11).
5. **The rule for whom to ask first** (80% or more satisfied and in contact with peers) is a teaching rule built on Kumar et al. (2010)
   and labelled as the case's rule; the 80% line is a Case assumption.
6. **Every figure beyond the brief is a Case assumption**: the benefits, the lead figures, the customers, the metrics, the costs and
   weeks, the Route 2 budget (€180,000 over six months), the pilot usage shares, the uplifts, the KPI baselines and the board's
   challenge. The brief gives €130,000 and five months.
7. **German by the user's standing request (#32)**; English stays the default.
8. **Not built as a Friday capstone (#29)**: the request did not name Day 12 as a Friday.
9. **The plausible-range band in A6** is a standard normal approximation, shown only to make the effect of sample size visible; no task
   asks for it.
10. **Sources to re-check before teaching:** citations are given by their usual details; page ranges and editions differ between
    printings. The lead, close-rate and uplift figures are illustrations, not research findings.

## Coverage: where each task block is taught

| Block | Taught in | Help while answering |
|---|---|---|
| 1.1 Incentive, service or community | A1, A2 (tests, pair tests, worked sort) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 1.2 What a referral is worth | A4 (the four steps on Werra) | Show where the numbers are · Show the formula + calculator · per-part clues |
| 1.3 Referrers, discount seekers, three approaches | A3 (satisfaction × peers × what they talk about), A1, A2 | Check (picks as a count, approaches floor) + clue |
| 1.4 Coaching reflection | A1, A2, A3, A6 | Worked answers for the mentor |
| 2.1 Tag the metrics | A5 (four kinds, pair tests, KPI tree) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 2.2 Link, meaning, use; KPIs | A5, A6 (link rule, uses, uncertainties) | Your tally · Check per row with clues · Check my choices |
| 2.3 A fair A/B test | A6 (test card, sample size, wrong incentives) | Check per part with clue · hypothesis and rule floors |
| 2.4 Measures, scores, order | A7, A3 (matching problems, scalability rule, budget) | Show the test questions · budget bar · problem coverage · Check · order check |
| 3.1 Principles | B1 | Check (added value instead of discounts, value-based referrals) + clue |
| 3.2 Added values | B2 (decision first, 80% used rule) | Show the test questions · Check (count) + clue |
| 3.3 KPI system | B3 (four tests, limits from printed facts) | Show the test questions · Check (limits, early count) |
| 3.4 Referral model: roll out, keep testing, stop | B4 (uplift and decisions rule, guardrails, scalability, owners) | Show the test questions · Check (count) + clue |
| 3.5 Step A · Architecture | B5 (the order: membership and KPIs, rules and proof, programme parts; four tests; the time test) | The live panel (diagram, three bars, four tests on request, “what to change” reading) · numbers today printed in the brief |
| 3.6 Step B · Strategic decision | B5 (decide now, pilot in stages, watch one figure, say when you stop) | The decision's reading and plain hint · the watch sentence's clue kit |

## Retrofit of 2026-10-03 (the user's request: bring Days 8 to 12 up to the current rules, Route 1 first, decide without asking)

Applied from `../CLAUDE.md`: #33 to #46. Route 1 was done first, Route 2 second. Nothing was committed or pushed.

**Core and Optional (#35, #40, #44).** Route 1 has **four Core blocks** (1.1, 1.3, 2.1, 2.4; 40 min of the 64) and four Optional blocks, folded and never removed
(1.2, 1.4, 2.2, 2.3). Route 2 has **two Core blocks** (3.5, 3.6; 19 min of the 50) and
four Optional blocks (3.1, 3.2, 3.3, 3.4). Optional cards: A4, A6, B1, B2, B3, B4; every other card is Core because a Core block cites it. The ring, the page map
and both missing lists count Core only; an unanswered Optional block is marked as such in the exported file.

**What changed in Route 1.** Block 1.2 is read-only (the two close rates are printed, nothing is calculated, #44) and Optional; the three KPIs moved into Block 2.1;
Block 2.4 names a category for every measure, asks for a reason for each judged score, and shows the budget as a hint (#45, #38). Every measure and every
contact situation prints a scene and who does what (#46). Every interactive picture opens with “The point” and a three-step story (#36); long text sits behind
“＋ Show …” (#37); every free-text field has a clue kit and an example answer (#42, #23); two live rust notices (#34); the page map shows Core / Optional (#28).

**What changed in Route 2 (superseded on 2026-10-04 by the redesign below).** The live memo moved to the bottom with “Hide the memo” (#39); Blocks 3.1 to 3.4 became folded Optional blocks; the trigger, pickup, assumption and tripwire kits of this first pass were replaced by the panel.

**Shared mechanics.** `cs-d12-v1` persists at version 3 with a pure `migratePersisted` and a deep merge (#9); `npm run verify:calc` runs 311 checks (figures and rules, the panel's bars, tests and categories, the mentor fill and a
Core-only fill in both languages, #40 scans of the Core blocks, old version-2 blob).

### Notes on deviations (retrofit)

R1. **No video was embedded (#33).** None was searched and verified in this pass; a card without a video is not a defect (#33). The video slot stays empty (`data/videos.ts`).
R2. **No calculators (#44).** The plan names no calculation beyond the printed rates, the budget and the score formula, so the former F1–F3 calculators and “Show the formula” helps
    of Block 1.2 were removed; wherever older text above mentions them, it is superseded.
R3. **Route 1 has at most four Core blocks and Route 2 two** (user decision, #35); everything else is folded, not removed.
R4. **Model answers use only printed numbers.** The mentor's KPI answer uses aims such as “up” or “stay under a limit”; the panel's bars and the memo's figures are computed from the printed costs, weeks, backing figures and the budget, so each number can be found on the screen.
R5. **The Word documents (#31) were not rebuilt** in this pass and are out of date for Day 12: Core / Optional marks, “The point”, the shown numbers and the new case-brief table are missing. Rebuild them from the reviewed Markdown in `../materi-task-docx/_source/` when wanted.
R6. **German and English** are written by hand next to each other for every new text (#32); the glossary got “cost of waiting” and “halfway between today and the aim”.
R7. **Plan mapping (#44).** The plan's numbered task items and the Level 3 requirements are mapped in note 1 above; Core is drawn from them: Route 1's Core blocks answer the Task 1 items (the first tagging and the situations or opportunities) and the case study's KPI and measures items; Route 2's Core blocks are the implementation requirement (3.5) and the additional decision requirement (3.6).

### Dependency checklist (#40)

✓ = reads only Core blocks, Core cards and the case brief. An Optional item may read a Core answer; nothing reads an Optional item back.

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| **Route 1** | | | |
| 1.1 Incentive, service or community? | **Core** | the brief, the block's own printed items, cards A1, A2, A3 | ✓ |
| 1.2 Read the referral figures: two close rates side by side | Optional | the brief, the block's own printed items, cards A4 | self-contained |
| 1.3 Referrers, discount seekers, and three retention approaches | **Core** | the brief, the block's own printed items, cards A3 | ✓ |
| 1.4 Coaching reflection: from Level 1 to Level 2 | Optional | the brief, the block's own printed items, cards A1, A2, A3 | self-contained |
| 2.1 Tag ConnectIT's twelve metrics by kind, and name your three KPIs | **Core** | the brief, the block's own printed items, cards A5 | ✓ |
| 2.2 What each kind of metric is worth, and the uncertainties in measuring | Optional | the brief, the block's own printed items, cards A5, A6 | self-contained |
| 2.3 Design a fair A/B test | Optional | the brief, the block's own printed items, cards A6 | self-contained |
| 2.4 Choose three measures, score them, put them in order | **Core** | the brief, the block's own printed items, cards A7 | ✓ |
| **Route 2** | | | |
| Case brief and “Where Route 1 left off” | — | Route 1 Core Block 2.4 (measures chosen), “the numbers today” | ✓ |
| Control panel (diagram, bars, tests) | Core | printed item facts, “the numbers today”, card B5 | ✓ |
| 3.1 The target vision of a membership and referral system | Optional | its own printed items, cards B1 | self-contained |
| 3.2 Definition of central added values for customers | Optional | its own printed items, cards B2 | self-contained |
| 3.3 A KPI system for customer retention | Optional | its own printed items, cards B3 | self-contained |
| 3.4 A scalable referral model, tested: roll out, keep testing or stop | Optional | its own printed items, cards B4 | self-contained |
| 3.5 Step A: the prioritised implementation architecture | **Core** | the panel, printed item cards, “the numbers today”, card B5 | ✓ |
| 3.6 Step B: a strategic decision despite an unclear forecast | **Core** | own plan from Step A (quoted in the block), the panel's readings, “the numbers today”, card B5 | ✓ |
| **Cards** | | | |
| A1, A2, A3, A5, A7, B5 | Core | each other and the case | ✓ |
| A4, A6, B1, B2, B3, B4 | Optional | — | no Core block cites them |

## Route 2 redesign (CLAUDE.md #47, applied 2026-10-04; reference: `../day8/ROUTE2-REDESIGN.md`)

The user asked for Day 12 to get the same treatment as Days 9, 10 and 11. Route 2 is one decision frame with a live control panel; only the form is reused, the items and rules are Day 12's.

```
Materi B (five cards, 60 min; B5 rewritten: how an architecture is built)
Case brief + “the numbers today” (cost, weeks, uptake, the KPI each item moves)
Control panel · eight item cards · diagram with links that can break · three bars · four tests on request · a reading in plain words
Step A  (Core, 3.5)   each item Now / After the uptake is proven / Not now · vision (two sentences) · what my plan gives and what I give up
Step B  (Core, 3.6)   decide now, pilot with the 150 most active customers / wait for a market study / launch everything with a discount · why · what I will watch and when I would stop
Go deeper (Optional, folded): 3.1 · 3.2 · 3.3 · 3.4   (self-contained, never read by the frame)
Memo (bottom, full width, Hide) → Export
```

**Plan mapping (#44).** Day 12's Level 3 transfer project asks for: the target vision (Step A's vision box), the central added values for customers (the item cards and the diagram's layers; the full exercise is
Optional 3.2), a scalable referral model (the referral programme and the community, with the uptake test), a KPI system (the membership with its KPIs as the base, the **Measurable** bar, and Step B's watch
sentence) and a measures architecture (Step A), and the additional requirement, a strategic decision despite an unclear success forecast (Step B and the uptake switch “15 points weaker”). The plan asks for
no calculation beyond the printed budget, so the learner derives no number: the bars are computed and shown.

**The panel.** Eight items: the ConnectIT Plus membership with three added values (the base), the referral programme with a two-sided thank-you and the member community (the programme parts), the referral page with
testimonials, the member and referral KPIs in the CRM with a monthly review, the anti-misuse rules, the AI loyalty engine (a black box) and a 10% discount for every renewal (it gives no added value). A solid teal link
works; a dashed amber link says in words why it does not (a part with no membership to build on, uptake not shown by any review, an engine with no link to the membership, a discount with no added value behind it).
Three bars: **Budget** (€180,000, six months), **Measurable** (money on items that are measured, whose added values are used and that are in use within six months) and **Risk** (money on a black box, on uptake below 80%
when the item starts, or on an item in use only after the six months), the last two as ranges across the two uptake scenarios. **Time** is derived: month in use = start month + weeks ÷ 4, rounded up; After the uptake is
proven starts in the month the monthly review is in use. Four tests, hidden until asked: the membership comes first; every funded item has a purpose; uptake is proven when a programme part starts; it fits the budget and the
six months. Each open test gives the fact, the rule and two ways to act, never a question. The reading also names the misuse risk when the referral programme runs without the anti-misuse rules.

**Categories (mentor only).** The reading's wording follows three internal categories (1 safe, 2 fair, 3 clearly wrong). Only the unlocked mentor sees them (`MentorCategory`); they are never exported, never printed and
never block (#38). The model set (membership, referral programme, referral page, CRM KPIs and review, anti-misuse rules Now; community After the uptake is proven; engine and discount Not now) reads as holding all four tests;
anything else reads what to change to get there.

**What was removed from the first pass.** Start months, owners, triggers, the pickup point, three assumptions, the tripwire and the board's challenge (the plan names none of them), the three-method numbers kit
(`lib/r2Numbers.ts`) and `SentenceKit`. B5's worked example is now a small panel on another company (Ems Systems).

**Missing (#34, #38).** Only an empty field, a too-short reason, or no item Now. Labels start “Step A:” / “Step B:”. Going over the budget, a part on thin uptake or a decision that disagrees with Step A is a reading and a
plain hint, never a missing item; the memo prints the choice, the amount over the budget and the reasons as plain facts.

### Notes on deviations (redesign)

P1. **The “data” of the panel is the uptake of the added values** (the share of pilot members who used the value an item builds on). “After the uptake is proven” waits for the CRM KPIs and monthly review (2 weeks, in use
    month 2), whose first meeting shows which benefits members really use. The referral programme (88%, the training seats) can start in month 1; the community (60%) starts in month 2 and is in use in month 4.
P2. **One week was changed in the Case assumptions**: the AI loyalty engine now takes 24 weeks (was 10), so that it is in use only in month 7, after the six months, as the time test needs. The 10% discount stays at one
    week: it fails the purpose test (no added value, margin on every renewal), not the time test. Every figure is a Case assumption.
P3. **Item identifiers keep earlier names** (`chat` is the referral programme, `personal` the community, `routing` the referral page, `training` the CRM KPIs and review, `tracking` the anti-misuse rules, `suite` the AI loyalty
    engine, `relaunch` the discount); `data/route2Panel.ts` says so. The tier label and the scenario switch are worded for the day (“After the uptake is proven”, “Uptake of the added values”).
P4. **Persist version 3.** The funded items of a version-2 blob become “now”; the removed fields are dropped; a deep merge fills the new ones. Tested in `verify:calc` and in the browser from an old-shape blob.
P5. **Word documents** (#31) for Route 2 are stale (they describe the old 3.5 and 3.6) and were not rebuilt.
P6. **Verified:** `tsc`, `verify:calc`, a production build in a scratch copy served as a static export: clean `localStorage`, the panel with the model set (€160,000; 84% / 66% Measurable; 0% / 19% Risk; 4 of 4 tests,
    3 of 4 with weaker uptake), mentor fill, memo, DE, 390 px (no horizontal scroll), old blob, no console errors.
