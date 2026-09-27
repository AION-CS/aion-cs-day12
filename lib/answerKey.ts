import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  KPIS,
  LOGIC_OWNER_LABEL,
  MODEL_ARCH,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  MODEL_TRIPWIRE,
  OWNERS,
  OWNER_ACCEPT,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Incentive, service or community",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Benefit ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Benefit ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are benefit 8 (free training seats: “free” sounds like an incentive, but the customer receives know-how, a service) and benefit 9 (the forum solves problems like support does, but other customers answer: a community). Ask “what does the customer receive?” and then “who gives the value?”.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Ask first for a referral, and joins only for a discount",
    expected: `Ask first: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Only for a discount: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · €${c.volume} a year · ${c.leave}% satisfied · in contact with peers: ${c.decision ? "yes" : "no"} · talks about: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Ask first for a referral. " : CHURN_TRUTH.includes(c.id) ? "Joins only for a discount. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the engineering firm (90% satisfied, but no contact with peers: happy, yet a referral would reach nobody) and the logistics firm (in contact with peers, but only 75% satisfied). The check reports only how many of the four picks hold. Ask both questions: is the customer satisfied enough to vouch for us, and is there anyone they would tell?",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Kind of metric",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with value)`).join(", ")}. M-06 (customers at a user group) is the trap: it did not move with value last year, but it is still a driver; tag what a metric measures, not how it behaved. M-03 (new customers from referrals) is an outcome, not a driver: the referral submitted (M-05) is the driver. M-10 (members signed up) is vanity: signing up is not staying.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, meaning and use per kind",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no kind."
              : "This use fits a different kind; read what this kind tells management.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one metric is not punished twice. With the reference tags, outcome and driver are Strong (3 and 2 of 3 moved), guardrail Partial (1 of 3), vanity None.",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the referral figures",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “referred firms may have been warmer to begin with”: the referral figures are not a fair test, which is why Block 2.3 asks for one. The three false ones are common beliefs about loyalty programmes; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The problem is expensive new customer acquisition; the test is judged by referred firms that became customers, not by promises to refer or e-mails sent."
                : "The size is fixed before the start, so nobody stops at a lucky moment; a full sales cycle includes referred firms that need longer to decide."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  return {
    title: "Block 2.4 · The three measures",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((m) => ({
      label: `${m.name} · ${m.model.effect} × ${explainBucket(m.evidence)} × ${m.model.feasibility} = ${modelScore(m.id)} · ${euro(m.cost)} · ${m.weeks} weeks · cost grows: ${JOINS_LABEL[m.joins]} · answers ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(m.id),
      why: `${m.verdict} ${m.model.note}`,
    })),
    teachingNote: `Score = Retention effect × Scalability × Economic viability. The checks look only at the problems named (a subset of the real ones, or “none” for the AI loyalty engine and the merchandise box) and at scalability, which follows from how the cost grows. Retention effect and economic viability are judged; the model values are here. The model three cost ${euro(MODEL_COST)}. The referral page scores 12: cheap and scalable, but it makes nobody refer. The cash bonus scores 4: many referrals, but weak or fake ones, and trust turned into payment.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order",
    expected: MODEL_ORDER.map((id) => MEASURES.find((m) => m.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((m) => m.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Highest score (27): it scales at the same cost and brings the warmest leads; ready in four weeks." : i === 1 ? "Builds relationships a competitor cannot copy, and gives referrers a place to meet peers." : "Gives members the added value that makes them renew.",
    })),
    teachingNote: "The community and the membership tier both score 18, so either order between them defends; the model puts the community second because it also feeds the referral programme.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the membership and referral system",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “pay for every referral” or “a discount to join”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: added value instead of discounts is the answer to “customer retention not sustainable”."
          : c === "rules"
            ? "Required: a value thank-you for both sides is what keeps referrals honest and new customers cheap."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: a monthly review by the same KPIs is how the system learns what keeps customers."
                : c === "hoard"
                  ? "Rejected: cash for volume buys names, not trust, and invites fake referrals (Materi A6)."
                  : "Rejected: a discount for everyone is transactional retention; it costs margin on every renewal and holds customers only until a competitor pays more (Materi A1).",
    })),
    teachingNote: "The check only asks for added value instead of discounts and the value thank-you. The third is judged; owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Central added values",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `It supports no customer decision, so not central, however often used (${s.complete}%).` : s.complete >= 80 ? `It supports a customer decision (“${s.decision}”) and ${s.complete}% of pilot members used it: offer now.` : `It supports a customer decision (“${s.decision}”), but only ${s.complete}% of pilot members used it: prove it first.`,
    })),
    teachingNote: "The member badge is the trap: every pilot member has it, but it helps no customer decide anything. The benchmark report is the other: it would help justify the renewal, but only 40% of pilot members used it, so it needs proof first.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. Members who used a benefit is the model's greatest lever: High on all four and the problem the brief names. A learner who picks the renewal rate defends it as the result; ask which number the team can move this month.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Referral and membership approaches: roll out, keep testing or stop",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (uplift ${s.lift}%, ${s.cases} decisions)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Uplift ${s.lift}% on ${s.cases} decisions: clear and proven, guardrail intact. ${s.id === "winback" ? "The user group is run by Customer Success, so Customer Success rolls it out." : "The request after go-live is made by salespeople, so sales rolls it out."}`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Uplift ${s.lift}% looks strong, but ${s.cases} decisions are too few: keep testing; customer operations runs it on.`
              : `Uplift ${s.lift}%: a small difference. Keep testing a stronger variant; customer operations runs it.`
            : `Uplift ${s.lift}%: no real gain${s.lift < 0 ? ", and self-referrals" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "Early access is the trap: +26% tempts learners to roll out, but forty-five renewals can be chance. The points are the second: five hundred customers prove there is almost no difference. The cash bonus is stopped: more referrals, worse ones, and self-referrals.",
  };
}

export function ownerKey(funded: ArchId[]): AnswerKeyBlock {
  const ids = funded.length ? funded : MODEL_ARCH;
  return {
    title: "Block 3.5 · Owners, sequence and funding",
    expected: `Model: ${MODEL_ARCH.map((id) => `${ARCH_BY_ID[id].name} (${OWNERS[OWNER_ACCEPT[id][0]].name})`).join(", ")} · ${euro(MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0))}`,
    options: ids.map((id) => ({
      label: `${ARCH_BY_ID[id].name} → ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}`,
      expected: true,
      why:
        id === "foundation"
          ? "Head of Customer Success (or the CCO). It starts first: the community, the referral thank-you and the KPIs all build on the membership."
          : id === "suite"
            ? "A black box: nobody at ConnectIT can check the rewards it pays. Funding it breaks the third rule; the check flags it."
            : id === "relaunch"
              ? "It buys renewals with margin instead of value, and €80,000 would push the plan over."
              : `The owner who can change it without asking anyone: ${OWNERS[OWNER_ACCEPT[id][0]].profile}`,
    })),
    teachingNote: `The check tests three rules: the membership programme starts no later than the first other item, total within ${euro(R2_BUDGET)}, nothing funded is a black box. Owners are not checked by the app; use this key. Leaving out the referral page instead of the anti-misuse rules does not defend: without the check, the thank-you invites self-referrals.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.6 · The strategic decision",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: "“Launch everything” and “Pilot with the 150 most active” are both decisions, with different reasoning; the check outlines only “Wait”, because the brief asks for a decision despite an unclear forecast. Push a learner who launches everything on what the discount costs and what cash per referral invites.",
  };
}

export function tripKey(): AnswerKeyBlock {
  const k = KPIS.find((x) => x.id === MODEL_TRIPWIRE.kpi)!;
  return {
    title: "Block 3.6 · The tripwire",
    expected: `${k.label} ≥ ${MODEL_TRIPWIRE.threshold}% by month ${MODEL_TRIPWIRE.month}, else adjust one rule`,
    options: KPIS.map((x) => ({ label: `${x.label} (baseline ${x.baseline}${x.unit === "%" ? "%" : ` ${x.unit}`})`, expected: x.behaviour, why: x.behaviour ? "How customers behave: the result the system is meant to move." : "Counts ConnectIT's own output or sign-ups, not how customers behaved." })),
    teachingNote: "Any customer metric with a threshold better than its baseline defends. Members signed up is the tempting one: it rises fast, but signing up is not staying. Referral e-mails and newsletter opens count our own output.",
  };
}
