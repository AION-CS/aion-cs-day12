import { ARCH_BY_ID, ARCH_IDS, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { CLEAN_ID, ENGINE_IDS, KPI_SYSTEM_ID, PANEL, READY_BAR, WEAK_POINTS, TIER_LABEL } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Route 2 control panel (CLAUDE.md #47): one place that turns the learner's choices (when each item happens) into what the
 * diagram, the three bars, the tests, the reading of the plan, the export and the mentor's worked answer all say. Nothing here is a verdict:
 * every line is a fact about the plan and, where something is open, the rule and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived, not asked for: *Now* items start in month 1; *After the uptake is proven* items start in the month the CRM KPIs and monthly review are in use
 * (so the review must itself be Now: its first meeting shows which benefits members really use); an item is in use in month = start + weeks ÷ 4, rounded up
 * (the rule Materi B5 teaches). With six months the time test catches the AI loyalty engine: at 24 weeks it is in use only in month 7.
 */
export type Scn = 0 | 1;
type HasTier = { tier: Record<string, Tier> };

const NEVER = R2_MONTHS + 1;

export const tierOf = (r2: HasTier, id: ArchId): Tier => r2.tier[id] ?? "not";
export const isFunded = (r2: HasTier, id: ArchId) => tierOf(r2, id) !== "not";
export const fundedIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => isFunded(r2, id));
export const nowIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => tierOf(r2, id) === "now");
export const monthsOf = (id: ArchId) => Math.ceil(ARCH_BY_ID[id].weeks / 4);
const readyOf = (id: ArchId, scn: Scn) => (PANEL[id].data === null ? null : PANEL[id].data! - scn * WEAK_POINTS);

/** The month an item starts: 1 for Now, the month the monthly review is in use for After the uptake is proven (the review must be Now), null when not funded. */
export function startOf(r2: HasTier, id: ArchId): number | null {
  const tier = tierOf(r2, id);
  if (tier === "not") return null;
  if (tier === "now") return 1;
  return tierOf(r2, CLEAN_ID) === "now" ? 1 + monthsOf(CLEAN_ID) : NEVER;
}
export function inUseOf(r2: HasTier, id: ArchId): number | null {
  const s = startOf(r2, id);
  return s === null ? null : s + monthsOf(id);
}

/** The membership comes first: the membership starts no later than the item. */
export function measOk(r2: HasTier, id: ArchId): boolean {
  if (id === KPI_SYSTEM_ID) return true;
  const s = startOf(r2, id);
  if (s === null) return false;
  const f = startOf(r2, KPI_SYSTEM_ID);
  return f !== null && f <= s;
}

/** The added value an item builds on was used by at least READY_BAR percent of the pilot members when it starts (the review proves the uptake of the items it prepares). */
export function dataOk(r2: HasTier, id: ArchId, scn: Scn): boolean {
  const v = readyOf(id, scn);
  if (v === null || v >= READY_BAR) return true;
  if (PANEL[id].cleaned && tierOf(r2, CLEAN_ID) === "now") {
    const s = startOf(r2, id);
    const q = inUseOf(r2, CLEAN_ID);
    if (s !== null && q !== null && q <= s) return true;
  }
  return false;
}

export type ItemView = { id: ArchId; tier: Tier; start: number | null; inUse: number | null; measOk: boolean; dataOk: boolean; late: boolean; never: boolean; notes: string[] };
export type Bars = { spent: number; over: number; left: number; meas: number | null; risk: number | null };
export type TestId = "measure" | "purpose" | "data" | "budget";
/** One way to act on an open test; `go` names the Step A cards it is done on (each becomes a jump chip in the panel). */
export type Way = { text: string; go: ArchId[] };
/** One open finding: the fact, what it means in plain words, the rule, the items involved and the ways to act. */
export type OpenDetail = { fact: string; plain: string; rule: string; where: ArchId[]; ways: Way[] };
export type TestView = { id: TestId; name: string; rule: string; applies: boolean; holds: boolean; open: OpenDetail[] };
export type PlanView = { items: Record<ArchId, ItemView>; funded: ArchId[]; nowCount: number; bars: Bars; tests: TestView[]; holding: number; applicable: number };

const nm = (id: ArchId) => PANEL[id].short;
/** The title printed on the item card in Step A, so a step names the card the learner will see. */
const card = (id: ArchId) => tt(`“${ARCH_BY_ID[id].name}”`, `„${ARCH_BY_ID[id].name}“`);

function itemView(r2: HasTier, id: ArchId, scn: Scn): ItemView {
  const tier = tierOf(r2, id);
  const start = startOf(r2, id);
  const inUse = inUseOf(r2, id);
  const funded = tier !== "not";
  const never = funded && start === NEVER;
  const m = measOk(r2, id);
  const d = dataOk(r2, id, scn);
  const late = funded && !never && inUse !== null && inUse > R2_MONTHS;
  const notes: string[] = [];
  if (funded) {
    if (never) notes.push(tt("never starts: the monthly review it waits for is not planned", "startet nie: Das monatliche Review, auf das es wartet, ist nicht eingeplant"));
    if (!m && !never) notes.push(tt("starts before the membership is in place", "startet, bevor die Mitgliedschaft steht"));
    if (!d && !never) notes.push(tt(`the added value it builds on was used by ${readyOf(id, scn)}% of pilot members, below ${READY_BAR}%, when it starts`, `der Mehrwert, auf dem es aufbaut, wurde von ${readyOf(id, scn)} % der Pilotmitglieder genutzt, unter ${READY_BAR} %, wenn es startet`));
    if (PANEL[id].blackBox) notes.push(tt("black box: nobody can see its rules", "Black Box: Niemand kann ihre Regeln sehen"));
    if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  }
  return { id, tier, start, inUse, measOk: m, dataOk: d, late, never, notes };
}

/**
 * Measurable: the share of the funded money on items that are measured, whose added value is used, that are in use inside the plan and are not a black box.
 * Risk: the share on a black box, on uptake below the bar or on an item that is in use only after the plan's months.
 */
function barsOf(r2: HasTier, scn: Scn): Bars {
  const f = fundedIds(r2);
  const spent = f.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  let meas = 0;
  let risk = 0;
  for (const id of f) {
    const c = ARCH_BY_ID[id].cost;
    const v = itemView(r2, id, scn);
    if (PANEL[id].measured && v.measOk && v.dataOk && !v.late && !v.never && !PANEL[id].blackBox) meas += c;
    if (PANEL[id].blackBox || !v.dataOk || v.late) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, meas: spent ? Math.round((meas / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The Measurable and Risk bars are ranges across the two uptake scenarios: [as the brief says, weaker uptake]. */
export function rangeOf(r2: HasTier): { meas: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = barsOf(r2, 0);
  const w = barsOf(r2, 1);
  return { meas: [a.meas, w.meas], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<TestId, () => string> = {
  measure: () => tt("The membership comes first", "Die Mitgliedschaft kommt zuerst"),
  purpose: () => tt("Every funded item has a purpose", "Jeder finanzierte Punkt hat einen Zweck"),
  data: () => tt("Uptake is proven when a programme part starts", "Die Nutzung ist belegt, wenn ein Programmbaustein startet"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<TestId, () => string> = {
  measure: () => tt("The membership with its added values starts no later than the first programme part, so the referral thank-you, the community and the KPIs all build on something members already have.", "Die Mitgliedschaft mit ihren Mehrwerten startet nicht später als der erste Programmbaustein, damit das Empfehlungs-Dankeschön, die Community und die KPIs alle auf etwas aufbauen, das Mitglieder schon haben."),
  purpose: () => tt("A funded item gives members added value or makes a KPI measurable. A tool that sets rewards by itself without showing its rules, and a discount for every renewal, which buys loyalty only until someone offers more, do neither.", "Ein finanzierter Punkt gibt Mitgliedern einen Mehrwert oder macht einen KPI messbar. Ein Werkzeug, das Belohnungen selbst festlegt, ohne seine Regeln zu zeigen, und ein Rabatt für jede Verlängerung, der Treue nur erkauft, bis jemand mehr bietet, tun keines von beidem."),
  data: () => tt(`A programme part starts once at least ${READY_BAR}% of pilot members used the added value it builds on. A part built on a value nobody uses scales an offer that does not hold.`, `Ein Programmbaustein startet, sobald mindestens ${READY_BAR} % der Pilotmitglieder den Mehrwert genutzt haben, auf dem er aufbaut. Ein Baustein auf einem Mehrwert, den niemand nutzt, skaliert ein Angebot, das nicht trägt.`),
  budget: () => tt(`The funded items stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}.`, `Die finanzierten Punkte bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz.`),
};
export const TEST_IDS: TestId[] = ["measure", "purpose", "data", "budget"];

function testsOf(r2: HasTier, scn: Scn, items: Record<ArchId, ItemView>, bars: Bars): TestView[] {
  const f = fundedIds(r2);
  const engines = ENGINE_IDS.filter((id) => isFunded(r2, id));
  const view = (id: TestId, applies: boolean, open: OpenDetail[]): TestView => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });

  // 1 · the membership comes first
  const mOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never || v.measOk) continue;
    const f0 = startOf(r2, KPI_SYSTEM_ID);
    const part = f0 === null ? tt("the membership is not funded", "die Mitgliedschaft ist nicht finanziert") : tt(`the membership starts in month ${f0}`, `die Mitgliedschaft startet in Monat ${f0}`);
    mOpen.push({
      fact: tt(`${nm(id)}: starts in month ${v.start}, but ${part}.`, `${nm(id)}: startet in Monat ${v.start}, aber ${part}.`),
      plain: tt(`${nm(id)} would start before members have the membership it builds on. It would thank or gather people for something they do not have yet.`, `${nm(id)} würde starten, bevor Mitglieder die Mitgliedschaft haben, auf der es aufbaut. Es würde Menschen für etwas danken oder zusammenbringen, das sie noch nicht haben.`),
      where: [id, KPI_SYSTEM_ID],
      rule: TEST_RULE.measure(),
      ways: [
        { text: tt("Set the membership to Now: it starts in month 1, before any programme part.", "Setzen Sie die Mitgliedschaft auf „Jetzt“: Sie startet in Monat 1, vor jedem Programmbaustein."), go: [KPI_SYSTEM_ID] },
        { text: tt(`Or, on the card ${card(id)}, press “Not now” until it is in place.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis sie steht.`), go: [id] },
      ],
    });
  }

  // 2 · every funded item has a purpose
  const pOpen: OpenDetail[] = f
    .filter((id) => !PANEL[id].named && !PANEL[id].enabler)
    .map((id) => ({
      fact: PANEL[id].blackBox
        ? tt(`${nm(id)} names no KPI it moves, and its rules and results are not shown.`, `${nm(id)} nennt keinen KPI, den es bewegt, und seine Regeln und Ergebnisse werden nicht gezeigt.`)
        : tt(`${nm(id)} gives members no added value: it costs margin on every renewal, including those who would have renewed anyway, and keeps customers only until someone offers more.`, `${nm(id)} gibt Mitgliedern keinen Mehrwert: Er kostet Marge bei jeder Verlängerung, auch bei denen, die ohnehin verlängert hätten, und hält Kunden nur, bis jemand mehr bietet.`),
      plain: PANEL[id].blackBox ? tt(`You would pay ${euro(ARCH_BY_ID[id].cost)} for a tool that does not show how it works or what it changes for customers. After ${R2_MONTHS} months nobody at ConnectIT could say whether that money worked.`, `Sie würden ${euro(ARCH_BY_ID[id].cost)} für ein Werkzeug zahlen, das nicht zeigt, wie es arbeitet oder was es für Kunden verändert. Nach ${R2_MONTHS} Monaten könnte bei ConnectIT niemand sagen, ob dieses Geld gewirkt hat.`) : tt(`A discount on every renewal costs ${euro(ARCH_BY_ID[id].cost)} of margin, also on customers who would have stayed anyway, and it holds customers only until a rival offers more. It adds nothing members can use.`, `Ein Rabatt auf jede Verlängerung kostet ${euro(ARCH_BY_ID[id].cost)} Marge, auch bei Kunden, die ohnehin geblieben wären, und hält Kunden nur, bis ein Wettbewerber mehr bietet. Er gibt Mitgliedern nichts, was sie nutzen können.`),
      where: [id],
      rule: TEST_RULE.purpose(),
      ways: [
        { text: tt(`Set it to Not now and use the ${euro(ARCH_BY_ID[id].cost)} on an item that gives members added value.`, `Setzen Sie es auf „Jetzt nicht“ und nutzen Sie die ${euro(ARCH_BY_ID[id].cost)} für einen Punkt, der Mitgliedern einen Mehrwert gibt.`), go: [id] },
        { text: tt("Or keep it, and say in your reasons how ConnectIT will limit the margin it costs and measure its effect.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, wie ConnectIT die Marge, die es kostet, begrenzen und seine Wirkung messen wird."), go: [] },
      ],
    }));

  // 3 · uptake proven when a programme part starts
  const dOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never) {
      dOpen.push({
        fact: tt(`${nm(id)}: waits for the proof of uptake, but the monthly review it waits for is not set to Now, so it never starts.`, `${nm(id)}: wartet auf den Beleg der Nutzung, aber das monatliche Review, auf das es wartet, steht nicht auf „Jetzt“, also startet es nie.`),
        plain: tt(`“${TIER_LABEL.later}” means: wait until ${card(CLEAN_ID)} is in use. But that item is not set to Now, so ${nm(id)} waits for ever and its money is booked for nothing.`, `„${TIER_LABEL.later}“ heißt: warten, bis ${card(CLEAN_ID)} im Einsatz ist. Dieser Punkt steht aber nicht auf „Jetzt“, also wartet ${nm(id)} für immer, und sein Geld ist für nichts verbucht.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt("Set the CRM KPIs and monthly review to Now.", "Setzen Sie die KPIs im CRM und das monatliche Review auf „Jetzt“."), go: [CLEAN_ID] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
      continue;
    }
    if (v.dataOk) continue;
    const val = readyOf(id, scn);
    if (PANEL[id].cleaned) {
      dOpen.push({
        fact: tt(`${nm(id)}: starts in month ${v.start} on an added value used by ${val}% of pilot members, below ${READY_BAR}%. The monthly review is ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `in use only in month ${inUseOf(r2, CLEAN_ID)}` : "not set to Now"}.`, `${nm(id)}: startet in Monat ${v.start} auf einem Mehrwert, den ${val} % der Pilotmitglieder genutzt haben, unter ${READY_BAR} %. Das monatliche Review ist ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `erst in Monat ${inUseOf(r2, CLEAN_ID)} im Einsatz` : "nicht auf „Jetzt“ gesetzt"}.`),
        plain: tt(`${nm(id)} would start when only ${val}% of pilot members used the added value it builds on, so it would scale an offer that is not proven. The monthly review shows exactly this uptake, but ${nm(id)} starts before the review is in use.`, `${nm(id)} würde starten, wenn erst ${val} % der Pilotmitglieder den Mehrwert genutzt haben, auf dem es aufbaut, und also ein Angebot skalieren, das nicht belegt ist. Das monatliche Review zeigt genau diese Nutzung, aber ${nm(id)} startet, bevor das Review im Einsatz ist.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`Set the CRM KPIs and monthly review to Now and ${nm(id)} to After the uptake is proven: it then starts in month ${1 + monthsOf(CLEAN_ID)}, when the review is in use.`, `Setzen Sie die KPIs im CRM und das monatliche Review auf „Jetzt“ und ${nm(id)} auf „Wenn die Nutzung belegt ist“: Es startet dann in Monat ${1 + monthsOf(CLEAN_ID)}, wenn das Review im Einsatz ist.`), go: [CLEAN_ID, id] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
    } else {
      dOpen.push({
        fact: tt(`${nm(id)}: starts on an added value used by ${val}% of pilot members, below ${READY_BAR}%. The monthly review does not prove this uptake.`, `${nm(id)}: startet auf einem Mehrwert, den ${val} % der Pilotmitglieder genutzt haben, unter ${READY_BAR} %. Das monatliche Review belegt diese Nutzung nicht.`),
        plain: tt(`${nm(id)} would start when only ${val}% of pilot members used the added value it builds on, so it would scale an offer that is not proven. Nothing in this plan proves this uptake.`, `${nm(id)} würde starten, wenn erst ${val} % der Pilotmitglieder den Mehrwert genutzt haben, auf dem es aufbaut, und also ein Angebot skalieren, das nicht belegt ist. Nichts in diesem Plan belegt diese Nutzung.`),
        where: [id],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`On the card ${card(id)}, press “Not now” until more members use the value.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis mehr Mitglieder den Mehrwert nutzen.`), go: [id] },
          { text: tt(`Or keep it, and say in your reasons what you will do if the uptake stays below ${READY_BAR}%.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was Sie tun, wenn die Nutzung unter ${READY_BAR} % bleibt.`), go: [] },
        ],
      });
    }
  }

  // 4 · budget and the six months
  const bOpen: OpenDetail[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`The funded items cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Die finanzierten Punkte kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      plain: tt(`Your plan spends more than the ${euro(R2_BUDGET)} you have. To fit, take items worth at least ${euro(bars.over)} out of the plan. Your funded items are listed below with their costs, most expensive first; choose the one whose case you find weakest.`, `Ihr Plan gibt mehr aus als die ${euro(R2_BUDGET)}, die Sie haben. Damit er passt, nehmen Sie Punkte im Wert von mindestens ${euro(bars.over)} aus dem Plan. Ihre finanzierten Punkte stehen unten mit ihren Kosten, die teuersten zuerst; wählen Sie den, dessen Begründung Sie am schwächsten finden.`),
      where: [],
      rule: TEST_RULE.budget(),
      ways: [
        { text: tt(`On one or more of these cards, press “Not now” (together at least ${euro(bars.over)}):`, `Drücken Sie auf einer oder mehreren dieser Karten „Jetzt nicht“ (zusammen mindestens ${euro(bars.over)}):`), go: [...f].sort((a, c) => ARCH_BY_ID[c].cost - ARCH_BY_ID[a].cost) },
        { text: tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe, und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."), go: [] },
      ],
    });
  for (const id of f) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (${monthsOf(id)} months to build, starting in month ${v.start}).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (${monthsOf(id)} Monate Aufbau, Start in Monat ${v.start}).`),
      plain: tt(`${nm(id)} would be ready only after the plan ends, so it cannot show any result inside the ${R2_MONTHS} months.`, `${nm(id)} wäre erst nach dem Ende des Plans fertig und kann also innerhalb der ${R2_MONTHS} Monate kein Ergebnis zeigen.`),
      where: [id],
      rule: TEST_RULE.budget(),
      ways: [
        { text: v.tier === "later" ? tt(`On the card ${card(id)}, press “Now”: it then starts in month 1.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt“: Es startet dann in Monat 1.`) : tt(`On the card ${card(id)}, press “Not now”.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        { text: tt(`Or keep it, and say in your reasons what the plan does without it before month ${R2_MONTHS + 1}.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat ${R2_MONTHS + 1} tut.`), go: [] },
      ],
    });
  }

  const any = f.length > 0;
  return [view("measure", engines.length > 0, mOpen), view("purpose", any, pOpen), view("data", engines.length > 0, dOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one uptake scenario. */
export function planOf(r2: HasTier, scn: Scn): PlanView {
  const items = Object.fromEntries(ARCH_IDS.map((id) => [id, itemView(r2, id, scn)])) as Record<ArchId, ItemView>;
  const bars = barsOf(r2, scn);
  const tests = testsOf(r2, scn, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, funded: fundedIds(r2), nowCount: nowIds(r2).length, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}

/* ------------------------------------------------------------------ the reading of the plan */

export type Reading = { gives: string[]; costs: string[] };

/** What the plan gives, and what it costs or leaves open: two lists of facts, never a grade (CLAUDE.md #47). */
export function readingOf(r2: HasTier, scn: Scn): Reading {
  const plan = planOf(r2, scn);
  const gives: string[] = [];
  const costs: string[] = [];
  for (const id of ARCH_IDS) {
    const v = plan.items[id];
    const p = PANEL[id];
    const cost = ARCH_BY_ID[id].cost;
    if (v.tier === "not") {
      if (p.blackBox) gives.push(tt(`${nm(id)} not bought: ${euro(cost)} is not spent on a tool whose rules nobody can see.`, `${nm(id)} nicht gekauft: ${euro(cost)} werden nicht für ein Werkzeug ausgegeben, dessen Regeln niemand sehen kann.`));
      else if (id === "relaunch") gives.push(tt(`${nm(id)} not now: ${euro(cost)} of margin is not given away on every renewal, including those who would have renewed anyway.`, `${nm(id)} jetzt nicht: ${euro(cost)} Marge werden nicht bei jeder Verlängerung verschenkt, auch bei denen, die ohnehin verlängert hätten.`));
      else if (p.named) costs.push(tt(`${nm(id)} not now: does not move ${p.moves}.`, `${nm(id)} jetzt nicht: bewegt ${p.moves} nicht.`));
      else if (id === KPI_SYSTEM_ID) costs.push(tt("Membership not funded: there is no added value for members to stay for, and nothing for the referral thank-you and the community to build on.", "Mitgliedschaft nicht finanziert: Es gibt keinen Mehrwert, wegen dem Mitglieder bleiben, und nichts, worauf Empfehlungs-Dankeschön und Community aufbauen."));
      else if (id === "training") costs.push(tt("CRM KPIs and review not now: nobody sees which benefit each member used or which referral became a customer.", "KPIs im CRM und Review jetzt nicht: Niemand sieht, welchen Vorteil jedes Mitglied nutzte oder welche Empfehlung zum Kunden wurde."));
      else if (id === "tracking") costs.push(tt("Anti-misuse rules not now: referrals can be gamed, and a thank-you can be paid for names that are not new customers.", "Regeln gegen Missbrauch jetzt nicht: Empfehlungen lassen sich manipulieren, und ein Dankeschön kann für Namen gezahlt werden, die keine Neukunden sind."));
      continue;
    }
    if (v.never) {
      costs.push(tt(`${nm(id)}: waits for a monthly review that is not planned, so it never starts.`, `${nm(id)}: wartet auf ein monatliches Review, das nicht eingeplant ist, und startet daher nie.`));
      continue;
    }
    if (p.blackBox) {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on rewards whose rules nobody can see or stop.`, `${nm(id)}: ${euro(cost)} für Belohnungen, deren Regeln niemand sehen oder stoppen kann.`));
    } else if (id === "relaunch") {
      costs.push(tt(`${nm(id)}: ${euro(cost)} of margin on every renewal, which keeps customers only until someone offers more.`, `${nm(id)}: ${euro(cost)} Marge bei jeder Verlängerung, was Kunden nur hält, bis jemand mehr bietet.`));
    } else if (id === KPI_SYSTEM_ID) {
      gives.push(tt("Membership: three added values (the quarterly review, priority support and training seats) with rules for who joins and KPIs that measure it.", "Mitgliedschaft: drei Mehrwerte (das Quartalsreview, Prioritätssupport und Schulungsplätze) mit Regeln, wer beitritt, und KPIs, die sie messen."));
    } else if (id === "tracking") {
      gives.push(tt("Anti-misuse rules: a check that the referred firm is new and independent, a cap per customer, and a thank-you only after signing.", "Regeln gegen Missbrauch: eine Prüfung, dass die empfohlene Firma neu und unabhängig ist, eine Obergrenze pro Kunde und ein Dankeschön erst nach Vertragsabschluss."));
    } else if (id === CLEAN_ID) {
      gives.push(cleanGives(r2));
    } else {
      const ready = readyOf(id, scn);
      if (v.measOk && v.dataOk && !ENGINE_IDS.includes(id)) gives.push(tt(`${nm(id)}: moves ${p.moves} and is measured.`, `${nm(id)}: bewegt ${p.moves} und wird gemessen.`));
      else if (v.measOk && v.dataOk)
        gives.push(tt(`${nm(id)}: moves ${p.moves}, is measured, and the added value it builds on is used${ready !== null ? ` (${ready}% of pilot members)` : ""}${v.tier === "later" ? `; it starts in month ${v.start}, when the monthly review is in use` : ""}.`, `${nm(id)}: bewegt ${p.moves}, wird gemessen, und der Mehrwert, auf dem es aufbaut, wird genutzt${ready !== null ? ` (${ready} % der Pilotmitglieder)` : ""}${v.tier === "later" ? `; startet in Monat ${v.start}, wenn das monatliche Review im Einsatz ist` : ""}.`));
      if (!v.measOk) costs.push(tt(`${nm(id)}: nothing measures it when it starts, so its effect on ${p.moves} cannot be shown.`, `${nm(id)}: Nichts misst es, wenn es startet, seine Wirkung auf ${p.moves} lässt sich also nicht zeigen.`));
      if (!v.dataOk) costs.push(tt(`${nm(id)}: the added value it builds on was used by ${ready}% of pilot members, below ${READY_BAR}%, when it starts.`, `${nm(id)}: Der Mehrwert, auf dem es aufbaut, wurde von ${ready} % der Pilotmitglieder genutzt, unter ${READY_BAR} %, wenn es startet.`));
      if (id === "chat" && tierOf(r2, "tracking") !== "now") costs.push(tt("Referral programme: no anti-misuse rules in place, so a thank-you can be paid for names that are not new customers.", "Empfehlungsprogramm: Keine Regeln gegen Missbrauch vorhanden, ein Dankeschön kann also für Namen gezahlt werden, die keine Neukunden sind."));
    }
    if (v.late) costs.push(tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months.`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten.`));
  }
  const b = plan.bars;
  if (plan.funded.length === 0) costs.unshift(tt("Nothing is built: the three problems in the brief stay as they are.", "Nichts wird gebaut: Die drei Probleme des Auftrags bleiben, wie sie sind."));
  else if (b.over > 0) costs.push(tt(`${euro(b.over)} over the budget. Keep it only with a reason.`, `${euro(b.over)} über dem Budget. Behalten Sie es nur mit einer Begründung.`));
  else if (b.left > 0) costs.push(tt(`${euro(b.left)} of the budget stays unspent. Say what it is for, or why you hold it back.`, `${euro(b.left)} des Budgets bleiben ungenutzt. Sagen Sie, wofür es gedacht ist oder warum Sie es zurückhalten.`));
  if (plan.funded.length > 0) {
    const top = plan.funded.filter((id) => !PANEL[id].blackBox).reduce((a, id) => (ARCH_BY_ID[id].cost > ARCH_BY_ID[a].cost ? id : a), plan.funded[0]);
    if (b.spent > 0 && ARCH_BY_ID[top].cost / b.spent >= 0.35 && !PANEL[top].blackBox) costs.push(tt(`${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)}% of the money rides on one item: ${nm(top)}.`, `${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)} % des Geldes hängen an einem Punkt: ${nm(top)}.`));
  }
  if (gives.length === 0) gives.push(tt("Nothing yet. Set at least one item to Now.", "Noch nichts. Setzen Sie mindestens einen Punkt auf „Jetzt“."));
  return { gives, costs };
}

/** What the CRM KPIs and the monthly review give, depending on whether the community is part of the plan. */
function cleanGives(r2: HasTier): string {
  return isFunded(r2, "personal")
    ? tt("CRM KPIs and review: the first monthly meeting shows which benefits members really use, so the community starts on proven uptake.", "KPIs im CRM und Review: Das erste monatliche Treffen zeigt, welche Vorteile Mitglieder wirklich nutzen, sodass die Community auf belegter Nutzung startet.")
    : tt("CRM KPIs and review: which benefit each member used and which referral became a customer, and a monthly meeting that decides by the KPIs.", "KPIs im CRM und Review: welchen Vorteil jedes Mitglied nutzte und welche Empfehlung zum Kunden wurde, und ein monatliches Treffen, das nach den KPIs entscheidet.");
}

/* ------------------------------------------------------------------ Step B: the decision against Step A */

/** One plain hint when the Step B decision and the Step A plan point in different directions; null when they agree. */
export function decisionHint(r2: HasTier & { decision: string | null }): string | null {
  const n = nowIds(r2).length;
  if (r2.decision === "wait" && n > 0) return tt("Step B says wait for a market study, while Step A builds " + n + (n === 1 ? " item" : " items") + " now. Say in your reason how the two fit together.", "Schritt B sagt, auf eine Marktstudie zu warten, während Schritt A jetzt " + n + (n === 1 ? " Punkt" : " Punkte") + " baut. Sagen Sie in Ihrer Begründung, wie beides zusammenpasst.");
  if (r2.decision === "commit" && !isFunded(r2, "relaunch")) return tt("Step B says launch the full programme with a discount to join, while Step A leaves the discount out. Say in your reason which of the two you stand behind.", "Schritt B sagt, das ganze Programm mit einem Rabatt fürs Beitreten zu starten, während Schritt A den Rabatt weglässt. Sagen Sie in Ihrer Begründung, zu welchem von beiden Sie stehen.");
  if (r2.decision === "stage" && tierOf(r2, "relaunch") === "now") return tt("Step B says pilot in stages, while Step A gives every renewal 10% off now, for every customer at once. Say in your reason how that is staged.", "Schritt B sagt, in Stufen zu pilotieren, während Schritt A jetzt jeder Verlängerung 10 % Rabatt gibt, für jeden Kunden auf einmal. Sagen Sie in Ihrer Begründung, wie das gestuft ist.");
  return null;
}

/* ------------------------------------------------------------------ three internal categories (CLAUDE.md #47) */

/**
 * 1 · safe: the membership comes before the programme parts and every applicable test holds (there can be several such plans).
 * 2 · fair: a base exists but a fundamental is missing or a better approach is available.
 * 3 · clearly wrong: programme parts or the AI loyalty engine are bought without the membership, or nothing is built.
 * Used only to choose what the reading says and for the mentor's understanding; the learner never sees it and it is never exported.
 */
export type Category = 1 | 2 | 3;
const TOOL_IDS: ArchId[] = ["chat", "personal", "suite"];

export function categoryOf(r2: HasTier, scn: Scn = 0): { cat: Category; why: string } {
  const f = fundedIds(r2);
  if (f.length === 0) return { cat: 3, why: "Nothing is built: the task asks for an architecture." };
  const tools = f.filter((id) => TOOL_IDS.includes(id));
  const base = isFunded(r2, KPI_SYSTEM_ID);
  if (tools.length > 0 && !base) return { cat: 3, why: `${tools.map((id) => PANEL[id].short).join(", ")} funded with no membership: the parts are bought before the added values exist.` };
  const plan = planOf(r2, scn);
  const open = plan.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  if (!base) return { cat: 2, why: "No membership yet, so there is no added value and nothing to measure; no programme part is bought without it." };
  if (open.length === 0) return { cat: 1, why: "The membership is funded and every applicable test holds." };
  return { cat: 2, why: `The membership is funded, but these tests are open: ${open.join("; ")}.` };
}

export type Change = { id: ArchId; to: Tier; text: string };

const CUT_ORDER: ArchId[] = ["suite", "relaunch", "routing", "tracking", "personal", "chat", "training"];

/** The changes that put the plan on the safe side, as information: which item to which tier and why, and what the plan looks like after them. */
export function changesFor(r2: HasTier, scn: Scn): { changes: Change[]; after: PlanView } {
  const t: Record<string, Tier> = { ...r2.tier };
  const cur = (id: ArchId): Tier => t[id] ?? "not";
  const changes: Change[] = [];
  const set = (id: ArchId, to: Tier, text: string) => {
    if (cur(id) === to) return;
    t[id] = to;
    changes.push({ id, to, text });
  };
  const any = () => ARCH_IDS.some((id) => cur(id) !== "not");
  const baseText = tt("Set the membership to Now: the membership comes first, and it starts in month 1, no later than any programme part.", "Setzen Sie die Mitgliedschaft auf „Jetzt“: Die Mitgliedschaft kommt zuerst, und sie startet in Monat 1, nicht später als jeder Programmbaustein.");

  if (!any()) {
    set(KPI_SYSTEM_ID, "now", baseText);
    set("chat", "now", tt(`Add the referral programme, set to Now: the training seats it thanks with are used by ${PANEL.chat.data}% of pilot members, and it moves the share of referred firms that sign, a named KPI.`, `Fügen Sie das Empfehlungsprogramm hinzu, auf „Jetzt“: Die Schulungsplätze, mit denen es sich bedankt, werden von ${PANEL.chat.data} % der Pilotmitglieder genutzt, und es bewegt den Anteil der empfohlenen Firmen, die abschließen, einen benannten KPI.`));
  }
  if (any() && cur(KPI_SYSTEM_ID) !== "now") set(KPI_SYSTEM_ID, "now", baseText);
  if (cur("suite") !== "not") set("suite", "not", tt("Set the AI loyalty engine to Not now: it names no KPI it moves and nobody can see its rules, and at 24 weeks it is in use only in month 7.", "Setzen Sie die KI-Loyalty-Engine auf „Jetzt nicht“: Sie nennt keinen KPI, den sie bewegt, niemand kann ihre Regeln sehen, und mit 24 Wochen ist sie erst in Monat 7 im Einsatz."));
  if (cur("relaunch") !== "not") set("relaunch", "not", tt("Set the 10% discount to Not now: it gives members no added value, costs margin on every renewal and keeps customers only until someone offers more.", "Setzen Sie den 10-%-Rabatt auf „Jetzt nicht“: Er gibt Mitgliedern keinen Mehrwert, kostet Marge bei jeder Verlängerung und hält Kunden nur, bis jemand mehr bietet."));
  const spent = () => ARCH_IDS.filter((id) => cur(id) !== "not").reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const cut = () => {
    for (const id of CUT_ORDER) {
      if (spent() <= R2_BUDGET) return;
      if (cur(id) === "not") continue;
      set(id, "not", tt(`Set ${PANEL[id].short} to Not now: the plan is ${euro(spent() - R2_BUDGET)} over the budget and this is the item with the weakest case.`, `Setzen Sie ${PANEL[id].short} auf „Jetzt nicht“: Der Plan liegt ${euro(spent() - R2_BUDGET)} über dem Budget, und dies ist der Punkt mit der schwächsten Begründung.`));
    }
  };
  cut();
  for (const id of ENGINE_IDS.filter((x) => PANEL[x].cleaned)) {
    if (cur(id) === "not") continue;
    if (cur(CLEAN_ID) !== "now") set(CLEAN_ID, "now", tt("Set the CRM KPIs and monthly review to Now: the first meeting then shows which benefits members really use.", "Setzen Sie die KPIs im CRM und das monatliche Review auf „Jetzt“: Das erste Treffen zeigt dann, welche Vorteile Mitglieder wirklich nutzen."));
    if (!dataOk({ tier: t }, id, scn)) set(id, "later", tt(`Set ${PANEL[id].short} to After the uptake is proven: its added value is used by ${PANEL[id].data}% of pilot members, so it starts in month ${1 + monthsOf(CLEAN_ID)}, when the review is in use.`, `Setzen Sie ${PANEL[id].short} auf „Wenn die Nutzung belegt ist“: Sein Mehrwert wird von ${PANEL[id].data} % der Pilotmitglieder genutzt, also startet es in Monat ${1 + monthsOf(CLEAN_ID)}, wenn das Review im Einsatz ist.`));
    cut();
  }
  return { changes, after: planOf({ tier: t }, scn) };
}

/* ------------------------------------------------------------------ how the system reads the plan (wording by category) */

/** One paragraph on how the plan stands, worded by category; it never names the category. */
export function standingOf(r2: HasTier, scn: Scn): string {
  const { cat } = categoryOf(r2, scn);
  const f = fundedIds(r2);
  const tools = f.filter((id) => TOOL_IDS.includes(id));
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  if (cat === 3) {
    return f.length === 0
      ? tt("Nothing is built, so the three problems in the brief stay as they are. The task asks for an architecture. Below are the changes that put the base first.", "Nichts wird gebaut, also bleiben die drei Probleme des Auftrags, wie sie sind. Die Aufgabe verlangt eine Architektur. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.")
      : tt(`${tools.map((id) => PANEL[id].short).join(", ")} ${tools.length === 1 ? "is" : "are"} funded, but there is no membership. Without it there is no added value for members to use, the part has nothing to build on, and nothing can say whether it works. Below are the changes that put the base first.`, `${tools.map((id) => PANEL[id].short).join(", ")} ${tools.length === 1 ? "ist" : "sind"} finanziert, aber es gibt keine Mitgliedschaft. Ohne sie gibt es keinen Mehrwert, den Mitglieder nutzen können, der Baustein hat nichts, worauf er aufbaut, und nichts kann sagen, ob er wirkt. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.`);
  }
  if (cat === 2) {
    const open = brief.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
    return open.length
      ? tt(`The base is there, but ${open.length} of ${brief.applicable} tests are open with the brief's figures: ${open.join("; ")}. Each is explained in the panel; below are the changes that make the plan hold.`, `Die Basis ist da, aber ${open.length} von ${brief.applicable} Tests sind bei den Zahlen des Auftrags offen: ${open.join("; ")}. Jeder ist im Panel erklärt; unten stehen die Änderungen, mit denen der Plan hält.`)
      : tt("There is no membership yet, so there is no added value and nothing to measure. Below are the changes that put the base first.", "Es gibt noch keine Mitgliedschaft, also keinen Mehrwert und nichts zu messen. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.");
  }
  const watch = weak.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  return tt(
    `The membership comes before the programme parts and every test holds with the brief's figures: the membership starts no later than the first programme part, every funded item has a purpose, the parts start on added values members use, and the plan fits the budget and the ${R2_MONTHS} months. Other plans can hold too.${watch.length ? ` With the uptake ${WEAK_POINTS} points weaker, ${watch.length === 1 ? "this test opens" : "these tests open"}: ${watch.join("; ")}. That is what the sentence “what you will watch” in Step B is for.` : ""}`,
    `Die Mitgliedschaft kommt vor den Programmbausteinen, und jeder Test stimmt bei den Zahlen des Auftrags: Die Mitgliedschaft startet nicht später als der erste Programmbaustein, jeder finanzierte Punkt hat einen Zweck, die Bausteine starten auf Mehrwerten, die Mitglieder nutzen, und der Plan passt ins Budget und in die ${R2_MONTHS} Monate. Auch andere Pläne können halten.${watch.length ? ` Bei um ${WEAK_POINTS} Punkte schwächerer Nutzung ${watch.length === 1 ? "öffnet sich dieser Test" : "öffnen sich diese Tests"}: ${watch.join("; ")}. Dafür ist der Satz „Was Sie beobachten“ in Schritt B da.` : ""}`,
  );
}

export type DecisionReading = { cat: Category; why: string; text: string; change: string };

/** How the system reads the Step B decision against the Step A plan; null until a decision is chosen. The category is for the mentor only. */
export function decisionReading(r2: HasTier & { decision: string | null }, scn: Scn): DecisionReading | null {
  if (!r2.decision) return null;
  const plan = categoryOf(r2, scn);
  const base = isFunded(r2, KPI_SYSTEM_ID);
  const firstMoves = euro(ARCH_BY_ID[KPI_SYSTEM_ID].cost + ARCH_BY_ID.chat.cost + ARCH_BY_ID[CLEAN_ID].cost);
  if (r2.decision === "stage") {
    const clause =
      plan.cat === 1
        ? tt(" Your Step A is that staged plan.", " Ihr Schritt A ist dieser gestufte Plan.")
        : plan.cat === 2
          ? tt(" Step A still has open tests, so the staging is not complete yet: see what to change under Step A.", " Schritt A hat noch offene Tests, die Stufung ist also noch nicht vollständig: Siehe, was Sie unter Schritt A ändern können.")
          : tt(" Step A buys programme parts before the membership exists, so the staging is not real yet: put the base first (see Step A).", " Schritt A kauft Programmbausteine, bevor die Mitgliedschaft steht, die Stufung ist also noch nicht echt: Setzen Sie die Basis an die erste Stelle (siehe Schritt A).");
    return {
      cat: 1,
      why: "Staging is the decision the brief asks for: decide now, start with what is proven, measure before scaling.",
      text: tt("Deciding now and piloting with the 150 most active customers is what the brief asks for: it changes something real for customers within weeks where the uptake is proven, and it learns what keeps them before it scales.", "Jetzt zu entscheiden und mit den 150 aktivsten Kunden zu pilotieren ist, was der Auftrag verlangt: Es ändert innerhalb von Wochen etwas Reales für Kunden, dort wo die Nutzung belegt ist, und es lernt, was sie hält, bevor es skaliert.") + clause,
      change: plan.cat === 1 ? tt("Nothing to change in the decision. What is left is the sentence on what you will watch.", "An der Entscheidung ist nichts zu ändern. Es bleibt der Satz dazu, was Sie beobachten.") : tt("Keep the decision and apply the changes from the reading under Step A.", "Behalten Sie die Entscheidung und setzen Sie die Änderungen aus dem Lesen unter Schritt A um."),
    };
  }
  if (r2.decision === "commit")
    return {
      cat: base ? 2 : 3,
      why: base ? "The full programme is launched at once with a discount although a membership is funded." : "The full programme is launched with a discount and no membership of added values.",
      text: tt("Launching the full programme for every customer at once, with a discount to join, gives up margin on every renewal and pays cash for referrals before anything is measured; customers who would have stayed anyway get the discount, and cash invites misuse.", "Das ganze Programm sofort für jeden Kunden zu starten, mit einem Rabatt fürs Beitreten, gibt Marge bei jeder Verlängerung auf und zahlt Geld für Empfehlungen, bevor etwas gemessen wird; Kunden, die ohnehin geblieben wären, bekommen den Rabatt, und Bargeld lädt zu Missbrauch ein."),
      change: tt(`Choose “Decide now, pilot with the 150 most active customers, and watch one figure”: set the membership, the referral programme and the CRM KPIs and review to Now (together ${firstMoves}), then add the community once the uptake is proven.`, `Wählen Sie „Jetzt entscheiden, mit den 150 aktivsten Kunden pilotieren, und eine Zahl beobachten“: Setzen Sie die Mitgliedschaft, das Empfehlungsprogramm und die KPIs im CRM mit dem Review auf „Jetzt“ (zusammen ${firstMoves}), und fügen Sie dann die Community hinzu, sobald die Nutzung belegt ist.`),
    };
  return {
    cat: 2,
    why: "Waiting keeps every customer exposed and tests nothing; the brief asks for a decision despite an unclear forecast.",
    text: tt(`Waiting for a market study keeps retention as it is for the ${R2_MONTHS} months, while customers show what keeps them by what they use and whether they renew.`, `Auf eine Marktstudie zu warten lässt die Kundenbindung für die ${R2_MONTHS} Monate, wie sie ist, obwohl Kunden daran zeigen, was sie hält, was sie nutzen und ob sie verlängern.`),
    change: tt(`Choose “Decide now, pilot with the 150 most active customers, and watch one figure”: the first moves are the membership, the referral programme and the CRM KPIs and review in month 1 (together ${firstMoves}). They change something real instead of waiting for a study.`, `Wählen Sie „Jetzt entscheiden, mit den 150 aktivsten Kunden pilotieren, und eine Zahl beobachten“: Die ersten Schritte sind die Mitgliedschaft, das Empfehlungsprogramm und die KPIs im CRM mit dem Review in Monat 1 (zusammen ${firstMoves}). Sie ändern etwas Reales, statt auf eine Studie zu warten.`),
  };
}
