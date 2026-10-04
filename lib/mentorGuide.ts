import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · An advantage of a membership model",
    answer: L1().extraInsight ?? "",
    why: "An advantage names what a membership gives ConnectIT that a single sale does not: a reason to stay that a competitor cannot simply undercut.",
    lookFor: ["A concrete advantage for ConnectIT (customers stay longer, use more, refer others).", "Why it works: value the customer would lose by leaving.", "Said with “so …”: what follows for retention."],
    pitfalls: ["“Customers get a discount”: that is an incentive; ask what holds them once a competitor offers more.", "“More members”: ask what members do that others do not."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What referrals mean",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (10%, 30%, three times, or the 60 and 45 deals).", "What to do next: test a referral ask fairly before building a programme around it.", "Said as an estimate: satisfied customers refer firms that already fit."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“A programme will triple our close rate”: customers chose whom to refer, so it is a hint, not proof."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Retention approach ${i + 1}`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three retention approaches for ConnectIT, each built on a different kind of value (incentive, service, community), each saying why the customer stays or refers. The app checks only that each names a kind, is long enough and says what follows.",
    lookFor: ["What ConnectIT offers and to which customers.", "The kind of value it uses (incentive, service, community).", "Why the customer stays or refers (“so …”)."],
    pitfalls: ["A goal instead of an offer (“more loyalty”): ask what exactly ConnectIT offers, and to whom.", "Two approaches with the same kind of value."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · Why memberships retain, and incentive versus added value" : k === "causation" ? "1.4 · Why customers refer, and wrong incentives" : "1.4 · How a strategic decision-maker prioritises",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["Value the customer would lose by leaving (expert, faster help, peers).", "An incentive pays for staying and ends when a competitor pays more; added value makes the product itself worth more."]
        : k === "causation"
          ? ["Trust and wanting to help a peer, not money.", "The risk: cash per referral buys names, invites fake referrals and turns advice into a paid recommendation."]
          : ["Scalable, viable added value first (the referral programme), then community and membership.", "Measured from the first month; discounts and cash bonuses left out."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three KPIs",
    answer: L1().misread ?? "",
    example: tt("Company A (an IT service firm) steers its membership programme by three KPIs. Renewal rate of members, from the contract system, aim: up. It is the result the programme is paid for, so it is the outcome. Share of members who used a member benefit in the last 30 days, from the portal log, aim: up. Members do it before they renew and the team can move it this month, so it is the driver. Referrals that turn out fake or self-referrals, from the CRM, aim: stay under a limit. If it rises we stop, so it is the guardrail. Choose yours from ConnectIT's twelve metrics.", "Unternehmen A (ein IT-Dienstleister) steuert sein Mitgliedsprogramm mit drei KPIs. Verlängerungsrate der Mitglieder, aus dem Vertragssystem, Ziel: hoch. Es ist das Ergebnis, für das das Programm bezahlt wird, also der Outcome. Anteil der Mitglieder, die in den letzten 30 Tagen einen Mitgliedervorteil genutzt haben, aus dem Portal-Protokoll, Ziel: hoch. Mitglieder tun es, bevor sie verlängern, und das Team kann es in diesem Monat bewegen, also der Treiber. Empfehlungen, die sich als gefälscht oder als Selbstempfehlung erweisen, aus dem CRM, Ziel: unter einer Grenze bleiben. Steigt es, stoppen wir, also die Guardrail. Wählen Sie Ihre aus den zwölf Kennzahlen von ConnectIT."),
    lookFor: ["At least one outcome KPI (renewals, revenue from existing customers, new customers from referrals).", "At least one driver KPI (members who used a benefit, referrals submitted, user group attendance).", "For each: where the number comes from and a target; a guardrail (cost of rewards, fake referrals) as the third is a strong answer."],
    pitfalls: ["Members signed up, newsletters or likes as a KPI: vanity metrics, they count sign-ups and reach.", "Only outcomes: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a referral ask. Hypothesis: if account managers ask each customer for one introduction at the quarterly review instead of never asking, then the number of referred leads rises, because satisfied customers rarely volunteer a name. Rule, written before the start: roll out if referred leads per 100 customers are at least 8% above the control group with 30 introductions per group and complaints about being asked stay under 2%; keep testing between 3% and 8%; stop below 3%. Write yours for ConnectIT's test card.", "Unternehmen A testet eine Empfehlungsbitte. Hypothese: Wenn Account Manager jeden Kunden im Quartalsreview um eine Empfehlung bitten statt nie zu fragen, dann steigt die Zahl empfohlener Leads, weil zufriedene Kunden selten von sich aus einen Namen nennen. Regel, vor dem Start geschrieben: ausrollen, wenn empfohlene Leads pro 100 Kunden bei 30 Empfehlungen pro Gruppe mindestens 8 % über der Kontrollgruppe liegen und die Beschwerden über das Gefragtwerden unter 2 % bleiben; weiter testen zwischen 3 % und 8 %; stoppen unter 3 %. Schreiben Sie Ihre für die Testkarte von ConnectIT."),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (complaints about being asked too often, fake referrals)."],
    pitfalls: ["“Customers will refer”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${m.model.effect} × ${e} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Scalability from how the cost grows (A7)", calc: `cost: ${JOINS_LABEL[m.joins]} → same cost: 3 · per member or referral: 2 · staff time per customer: 1`, result: String(e) },
      { label: "Score = Retention effect × Scalability × Economic viability", calc: `${m.model.effect} × ${e} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or scalability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "aipitch"
        ? ["Economic viability 3 “because AI optimises rewards”: nobody can check what it pays or whether it pays off: 1."]
        : id === "discount"
          ? ["Economic viability 2 or 3 “because customers stay”: it costs margin on every renewal and holds customers only until a competitor pays more: 1."]
          : id === "video"
            ? ["Answering “expensive new customer acquisition” with a high viability: cash for every name brings weak and fake referrals and pays for none of them becoming customers: 1."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its retention effect and economic viability scores`,
    answer: `Retention effect ${m.model.effect}, economic viability ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “a cash bonus for every introduction”: retention effect 1, because customers take the money whether or not the firm ever signs and nothing ties them to Company A; economic viability 1, because it pays for every name and the cost grows with every one. Give your own reason for each score, with a fact printed on the card.", "Die „Geldprämie für jede Vorstellung“ von Unternehmen A: Wirkung auf die Bindung 1, weil Kunden das Geld nehmen, egal ob die Firma je unterschreibt, und nichts sie an Unternehmen A bindet; Wirtschaftlichkeit 1, weil sie jeden Namen bezahlt und die Kosten mit jedem wachsen. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Retention effect and economic viability are judgements; a different score with a clear reason is as good as the model. The reason should name what makes the customer stay or refer (retention effect) and whether it is worth its cost (economic viability).",
    lookFor: ["Retention effect: what makes the customer stay or refer because of the measure.", "Economic viability: what it costs (the cost and weeks on the card) and whether what it brings is worth that.", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    example: tt("Company A puts its member forum first: it scores 18 and it answers the problem that customers leave because nothing ties them to the firm. The referral thank-you comes second and starts alongside it. Together they cost €45,000 of the €70,000. The cash bonus stays out: it scores 4 and pays for names that may never sign. Make the same three statements about your own measures.", "Unternehmen A setzt sein Mitgliederforum an die erste Stelle: Es erzielt 18 und beantwortet das Problem, dass Kunden gehen, weil sie nichts an die Firma bindet. Das Empfehlungs-Dankeschön kommt zweites und startet gleichzeitig. Zusammen kosten sie 45.000 € von 70.000 €. Die Geldprämie bleibt draußen: Sie erzielt 4 und bezahlt Namen, die vielleicht nie unterschreiben. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the lift from 1.2).", "The cost against €130,000.", "What was left out, said as a decision (a discount or cash that buys behaviour, a black box, or people that do not scale)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name}`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for ConnectIT's customers or teams.", "Which problem of the brief it answers (retention not sustainable, acquisition expensive, intense competition)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask what cash per referral invites, or what a discount for everyone costs at every renewal."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “share of members who used a benefit in the last 30 days” as its greatest-leverage KPI: it is linked to renewals and counted every week for every member by the systems, so every part of the programme can be judged within weeks, and it answers the problem that retention is not sustainable. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „Anteil der Mitglieder, die in den letzten 30 Tagen einen Vorteil genutzt haben“ als KPI mit der größten Hebelwirkung: Er ist mit den Verlängerungen verbunden und wird jede Woche für jedes Mitglied von den Systemen gezählt, sodass sich jeder Teil des Programms innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass die Bindung nicht nachhaltig ist. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (customer retention not sustainable)."],
    pitfalls: ["Members signed up as greatest “because it is counted and complete”: it is not linked to value."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, personal: "now" as const } }, 0);
  return {
    title: "Step A · The architecture and what the panel shows for it",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After the uptake is proven: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After the uptake item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After the uptake is proven starts when the monthly review is in use, month ${1 + monthsOf("training")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's figures: money on measured items with an added value that is used and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, uptake 15 points weaker (the referral programme drops to ${(PANEL.chat.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on uptake below 80% or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's figures (${plan.holding} of ${plan.applicable}) and opens the uptake test when the uptake is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for an architecture).", "The membership is in place no later than any programme part.", "Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the six months without one."],
    pitfalls: [
      `Adding the AI loyalty engine: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the 10% discount: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it gives no added value and names no KPI, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the community to Now beside the model set: it starts in month 1 on an added value used by ${PANEL.personal.data}% of pilot members, below ${READY_BAR}%, so the uptake test opens (${pn.holding} of ${pn.applicable} hold); After the uptake is proven with the review Now starts it in month ${1 + monthsOf("training")}.`,
      "Leaving the membership out: every programme part loses what it builds on, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision",
    answer: R2().vision ?? "",
    example: tt(
      "Company A keeps customers through value, not price: members get benefits they use, and every new part has a KPI before it grows. Write your own target vision for ConnectIT.",
      "Unternehmen A hält Kunden durch Wert, nicht durch Preis: Mitglieder bekommen Vorteile, die sie nutzen, und jeder neue Baustein hat einen KPI, bevor er wächst. Schreiben Sie Ihr eigenes Zielbild für ConnectIT.",
    ),
    why: "The plan asks for a target vision of a membership and referral system. It is the one place the learner says, in two sentences, what the whole architecture is for, before the items.",
    lookFor: ["What the system does for the company and its customers (added value instead of discounts, referrals thanked on both sides).", "Steering by a few KPIs, not by single parts.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it a membership with three benefits, a KPI report and a referral thank-you that members already use. It gives up a discount for every renewal, which gives no added value, and €20,000 stay unspent. If fewer members use the benefits than expected, the referral thank-you rests on a value used by less than 80%, so it is watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm eine Mitgliedschaft mit drei Vorteilen, einen KPI-Bericht und ein Empfehlungs-Dankeschön, das Mitglieder schon nutzen. Es verzichtet auf einen Rabatt für jede Verlängerung, der keinen Mehrwert gibt, und 20.000 € bleiben ungenutzt. Nutzen weniger Mitglieder die Vorteile als erwartet, beruht das Empfehlungs-Dankeschön auf einem Wert, den weniger als 80 % nutzen, also wird es zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, used, in budget, in time).", "One thing it costs or leaves open (an item not now, uptake below 80%, an item after the six months, budget unspent).", "A link to the two scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A decides now but pilots with its most active customers: the benefits that members already use start first, so something real changes within weeks and is measured from the first month, and the discount waits because it costs margin on every renewal. Write your reason for your own decision.",
      "Unternehmen A entscheidet jetzt, pilotiert aber mit seinen aktivsten Kunden: Die Vorteile, die Mitglieder schon nutzen, starten zuerst, sodass sich innerhalb von Wochen etwas Reales ändert und ab dem ersten Monat gemessen wird, und der Rabatt wartet, weil er bei jeder Verlängerung Marge kostet. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear forecast is handled (start with what is proven, measure from month one)."],
  };
}

export function watchGuide(): MentorGuide {
  const revMonth = inUseOf({ tier: MODEL_TIER }, "training") ?? 0;
  return {
    title: "Step B · What the learner watches, and when they would stop",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches its renewal rate: today it is 80%, and if it is not clearly above that by month 3 on enough renewals, it stops adding parts and fixes the benefits members do not use. It also watches the uptake behind its referral thank-you: if it stays below 80%, it pauses the thank-you. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet seine Verlängerungsquote: Heute liegt sie bei 80 %, und liegt sie bis Monat 3 bei genug Verlängerungen nicht deutlich darüber, hört es auf, Bausteine hinzuzufügen, und behebt die Vorteile, die Mitglieder nicht nutzen. Es beobachtet auch die Nutzung hinter seinem Empfehlungs-Dankeschön: Bleibt sie unter 80 %, pausiert es das Dankeschön. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the renewal rate or the share who used a service in the last 30 days), not the company's own output (e-mails sent, members signed up, newsletter opens), a month in which it can first be read (the monthly review is in use from month ${revMonth} in the model, so month ${revMonth + 1}), and an action. The numbers are the ones printed in “the numbers today”: renewal rate 78% today with an aim of 86%; the uptake bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["E-mails sent, members signed up or newsletter opens as the figure: that counts the company's own output.", "No month: a sign nobody can act on."],
  };
}
