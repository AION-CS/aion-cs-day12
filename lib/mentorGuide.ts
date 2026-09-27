import { FORECAST, PILOT } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_ARCH, MODEL_GREATEST, MODEL_TRIGGER, OWNERS, OWNER_ACCEPT, PRINCIPLES, R2_BUDGET } from "@/data/route2";
import type { ArchId, PrincipleId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const n3 = (v: number) => (Math.round(v * 1000) / 1000).toLocaleString("en-US");
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

export function figureGuide(id: FigureId): MentorGuide {
  const v = PILOT.variant;
  const c = PILOT.control;
  if (id === "F1")
    return {
      title: "1.2 · F1 Close rate of referred leads",
      answer: n(FORECAST.f1),
      steps: [
        { label: "Deals ÷ leads", calc: `${v.orders} ÷ ${v.sent}`, result: n(v.orders / v.sent) },
        { label: "× 100", calc: `${n(v.orders / v.sent)} × 100`, result: `${n(FORECAST.f1)}%` },
      ],
      why: "Both numbers come from the referral rows: of 150 referred leads, 45 became deals.",
      pitfalls: [`Share left as a fraction (0.3 instead of 30): ${n(v.orders / v.sent)}.`, `Marketing rows used: ${n(FORECAST.controlRate)}.`, `All deals over all leads: ${n(((v.orders + c.orders) / (v.sent + c.sent)) * 100)}.`],
    };
  if (id === "F2")
    return {
      title: "1.2 · F2 Lift",
      answer: n(FORECAST.f2),
      steps: [
        { label: "Close rate of marketing leads", calc: `${c.orders} ÷ ${c.sent} × 100`, result: `${n(FORECAST.controlRate)}%` },
        { label: "Lift = F1 ÷ that rate", calc: `${n(FORECAST.f1)} ÷ ${n(FORECAST.controlRate)}`, result: n(FORECAST.f2) },
      ],
      why: "Referred leads closed 3 times as often as leads from marketing.",
      pitfalls: [`Subtracted instead of divided (30 − 10): ${n(FORECAST.f1 - FORECAST.controlRate)}.`, `Divided the deals (45 ÷ 60): ${n(45 / 60)} — the groups are not the same size, so the counts must become rates first.`, `Divided the leads (600 ÷ 150): 4.`],
    };
  const diff = (FORECAST.f1 - FORECAST.controlRate) / 100;
  return {
    title: "1.2 · F3 Extra revenue a year",
    answer: n(FORECAST.f3),
    steps: [
      { label: "Difference between the two rates, as a share of one", calc: `(${n(FORECAST.f1)} − ${n(FORECAST.controlRate)}) ÷ 100`, result: n3(diff) },
      { label: "Extra deals a year", calc: `${n(PILOT.yearly)} × ${n3(diff)}`, result: n(PILOT.yearly * diff) },
      { label: "× average deal value", calc: `${n(PILOT.yearly * diff)} × ${n(PILOT.order)}`, result: euro(FORECAST.f3) },
    ],
    why: "Only the deals a referral adds on top of what a marketing lead would bring are extra: 80 more deals a year at €8,000 each.",
    pitfalls: [`All deals at the referral rate counted as extra (400 × 0.30 × 8,000): ${n(PILOT.yearly * 0.3 * PILOT.order)}.`, `Difference not turned into a share (400 × 20 × 8,000): ${n(PILOT.yearly * 20 * PILOT.order)}.`, `Last year's 150 referred leads used instead of next year's 400: ${n(150 * diff * PILOT.order)}.`],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What referrals mean",
    answer: L1().meaning ?? "",
    lookFor: ["At least one of the learner's own figures (30%, 3 times, €640,000, or 10%).", "What to change first: ask the most satisfied customers for referrals and thank them with value.", "Said as an estimate: referred firms may have been warmer to begin with."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“Referrals make €640,000”: the figures are not a fair test yet."],
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
    title: "2.2 · Your three KPIs",
    answer: L1().misread ?? "",
    lookFor: ["At least one outcome KPI (renewals, revenue from existing customers, new customers from referrals).", "At least one driver KPI (members who used a benefit, referrals submitted, user group attendance).", "For each: where the number comes from and a target; a guardrail (cost of rewards, fake referrals) as the third is a strong answer."],
    pitfalls: ["Members signed up, newsletters or likes as a KPI: vanity metrics, they count sign-ups and reach.", "Only outcomes: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
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
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}.`,
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

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
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
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (customer retention not sustainable)."],
    pitfalls: ["Members signed up as greatest “because it is counted and complete”: it is not linked to value."],
  };
}

export function triggerGuide(id: ArchId): MentorGuide {
  const model = MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER];
  return {
    title: `3.5 · ${ARCH_BY_ID[id].name}`,
    answer: model ?? "A metric, a number, a date and an action for this item.",
    why: `Owner that defends: ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}.`,
    lookFor: ["A metric about the item's effect.", "A number and a month.", "An action the owner can take alone."],
  };
}

export function postponedGuide(): MentorGuide {
  const cost = MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  return {
    title: "3.5 · What is left out, and the pickup point",
    answer: `${R2().postponed} · ${R2().pickup}`,
    steps: [
      { label: "Model funded items", calc: MODEL_ARCH.map((id) => n(ARCH_BY_ID[id].cost)).join(" + "), result: euro(cost) },
      { label: "Left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: "With the AI loyalty engine added", calc: `${n(cost)} + ${n(ARCH_BY_ID.suite.cost)}`, result: euro(cost + ARCH_BY_ID.suite.cost) },
    ],
    lookFor: ["The item named, with its cost.", "Why this one (budget, a black box, a discount that buys renewals with margin).", "A pickup point with a number and a date."],
  };
}

export function assumptionGuide(i: number): MentorGuide {
  return {
    title: `3.6 · Assumption ${i + 1}`,
    answer: (R2().assumptions ?? [])[i] ?? "",
    lookFor: ["What is assumed about the data, the customers or the teams.", "The sign that would show it is wrong, with a number or a date."],
  };
}

export function challengeGuide(): MentorGuide {
  return {
    title: "3.6 · The board's challenge",
    answer: R2().challenge ?? "",
    why: "The programme works where it was built: 55% of members use a benefit. Three months and 78% to 79% are too little to judge renewals. Fix the referral check behind the six self-referrals; do not pay cash per referral or stop the community.",
    lookFor: ["What is checked first (the six self-referrals; is 78 to 79% based on enough renewals).", "What is kept (the added values, the community, the tripwire date).", "One change (for example: the thank-you only after the referred firm has signed and been checked)."],
    pitfalls: ["A €500 cash bonus: more of exactly the referrals that failed.", "Stopping the community to save cost: it removes what makes members hard to lure away."],
  };
}
