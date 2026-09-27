# Retention Lab · Day 12

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 7, Day 1 of 2.**
*Systematically building customer retention through memberships and referrals.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32.

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
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 a membership and referral system: the target vision, B2 central added values: the decision first, then the proof, B3 a KPI system for customer retention: four tests, B4 a scalable referral model: roll out, keep testing or stop, B5 a strategic decision under an unclear forecast, and the measures architecture). **Task 2, Retention System Memo**, assembling beside the questions: 3.1 three principles, 3.2 offer now / prove it first / not central for eight added values, 3.3 three KPIs rated on four tests and the greatest lever, 3.4 roll out / keep testing / stop and who acts for six tested referral and membership approaches, 3.5 the measures architecture (fund, sequence, own, trigger), 3.6 the strategic decision, three assumptions, the tripwire and the board's challenge. | `2-{name}-day12-l3-retention-system-memo.html` |

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
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (126 checks)
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
| 3.5 Measures architecture | B5 (membership first, budget, no black box; owner and trigger tests) | Show the owner test · budget bar · plan sentences · Check (three rules) |
| 3.6 Strategic decision | B5 (decision rules, tripwire, premortem) | Baselines printed · Check (wait, activity metric, threshold) |
