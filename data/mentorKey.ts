import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["stories", "types", "training"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, scalability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  stories: () =>
    tt(
      "Retention effect 3: satisfied customers bring warmer leads, and the thank-you is value, not cash, so it does not buy weak referrals. Economic viability 3: €30,000 for a programme whose reward only costs something when a referred firm signs.",
      "Wirkung auf die Bindung 3: Zufriedene Kunden bringen wärmere Leads, und das Dankeschön ist Wert, kein Geld, also kauft es keine schwachen Empfehlungen. Wirtschaftlichkeit 3: 30.000 € für ein Programm, dessen Belohnung nur etwas kostet, wenn eine empfohlene Firma unterschreibt.",
    ),
  types: () =>
    tt(
      "Retention effect 3: customers who know other customers and ConnectIT's people are much harder to lure away, and they learn to use more of the product. Economic viability 3: €40,000 for meetings and a forum that serve all members, although each event grows with the members.",
      "Wirkung auf die Bindung 3: Kunden, die andere Kunden und die Menschen von ConnectIT kennen, lassen sich viel schwerer abwerben, und sie lernen, mehr vom Produkt zu nutzen. Wirtschaftlichkeit 3: 40.000 € für Treffen und ein Forum, die allen Mitgliedern dienen, auch wenn jede Veranstaltung mit den Mitgliedern wächst.",
    ),
  training: () =>
    tt(
      "Retention effect 3: the product works better for every member, which is the reason to renew. Economic viability 3: the card says €45,000 and the services are part of the contract, although each member costs expert and support time.",
      "Wirkung auf die Bindung 3: Das Produkt funktioniert für jedes Mitglied besser, und das ist der Grund zu verlängern. Wirtschaftlichkeit 3: Die Karte nennt 45.000 € und die Services sind Teil des Vertrags, auch wenn jedes Mitglied Experten- und Supportzeit kostet.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt("A membership keeps customers through value they would lose by leaving: a customer who has a named expert, priority support and peers in the user group would give all of that up by switching, so a cheaper competitor has to offer far more than a lower price.", "Eine Mitgliedschaft hält Kunden über Wert, den sie beim Gehen verlieren würden: Ein Kunde mit benanntem Experten, Prioritätssupport und anderen Kunden in der User Group gäbe das alles beim Wechsel auf, sodass ein günstigerer Wettbewerber weit mehr als einen niedrigeren Preis bieten muss."),
    meaning: tt(
      `Referred leads closed at ${FORECAST.f1}% against ${FORECAST.controlRate}% for marketing leads, ${FORECAST.f2} times as often, so ConnectIT should test a referral ask fairly before it builds a programme around it, because satisfied customers refer firms that already fit.`,
      `Empfohlene Leads schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % bei Marketing-Leads ab, ${num(FORECAST.f2)}-mal so oft, also sollte ConnectIT eine Empfehlungsbitte fair testen, bevor es ein Programm darum baut, weil zufriedene Kunden Firmen empfehlen, die ohnehin passen.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "respond" as Basis, text: tt("A 5% discount for customers who sign for three years, offered to all customers at renewal, so they stay at least until the contract ends, even though a competitor can match it.", "Ein Rabatt von 5 % für Kunden, die für drei Jahre unterschreiben, allen Kunden bei der Verlängerung angeboten, sodass sie mindestens bis Vertragsende bleiben, auch wenn ein Wettbewerber ihn überbieten kann.") },
      { basis: "personal" as Basis, text: tt("A quarterly review with a named expert for customers who ask about support and training, so the product works better for them every quarter and leaving would mean losing that expert.", "Ein Quartalsreview mit einem benannten Experten für Kunden, die nach Support und Schulung fragen, sodass das Produkt jedes Quartal besser für sie funktioniert und Gehen hieße, diesen Experten zu verlieren.") },
      { basis: "learn" as Basis, text: tt("A regional user group for customers keen on exchange, where members show each other how they work, so they build relationships with peers and ConnectIT's people that a competitor cannot copy.", "Eine regionale User Group für Kunden, die an Austausch interessiert sind, in der Mitglieder einander zeigen, wie sie arbeiten, sodass sie Beziehungen zu anderen Kunden und den Menschen von ConnectIT aufbauen, die ein Wettbewerber nicht kopieren kann.") },
    ],
    reflect: {
      interpret: tt("Memberships retain because they build value the customer would lose by leaving: expert time, faster help, peers. An incentive such as a discount pays the customer to stay and ends when a competitor pays more; real added value makes the product itself worth more.", "Mitgliedschaften binden, weil sie Wert aufbauen, den der Kunde beim Gehen verlöre: Expertenzeit, schnellere Hilfe, andere Kunden. Ein Anreiz wie ein Rabatt bezahlt den Kunden fürs Bleiben und endet, wenn ein Wettbewerber mehr zahlt; echter Mehrwert macht das Produkt selbst mehr wert."),
      causation: tt("Customers refer because they trust ConnectIT and want to help a peer, not for money. The risk of wrong incentives lies in cash per referral: it buys names instead of trust, invites fake and self-referrals, and turns a trusted advice into a paid one.", "Kunden empfehlen, weil sie ConnectIT vertrauen und einem Kollegen helfen wollen, nicht für Geld. Das Risiko falscher Anreize liegt in Geld pro Empfehlung: Es kauft Namen statt Vertrauen, lädt zu gefälschten und Selbstempfehlungen ein und macht aus einem vertrauten Rat einen bezahlten."),
      decider: tt("A strategic decision-maker starts with added value that scales and pays for itself (the referral programme with a value thank-you), then the community and the membership tier, measures renewals and referred customers from the first month, and leaves out discounts and cash bonuses.", "Eine strategische Entscheiderin beginnt mit Mehrwert, der skaliert und sich selbst trägt (das Empfehlungsprogramm mit Dankeschön in Wert), dann Community und Mitgliedsstufe, misst Verlängerungen und empfohlene Kunden ab dem ersten Monat und lässt Rabatte und Geldprämien weg."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Share of customers who renew their contract (outcome), from the contract system, aim: up, above today's rate. 2) Share of members who used at least one member benefit in the last 30 days (driver), from the portal log, aim: up. 3) Referrals rewarded that turn out fake or self-referrals (guardrail), from the CRM, aim: stay under a limit.",
      "1) Anteil der Kunden, die ihren Vertrag verlängern (Outcome), aus dem Vertragssystem, Ziel: hoch, über der heutigen Quote. 2) Anteil der Mitglieder, die in den letzten 30 Tagen mindestens einen Mitgliedervorteil genutzt haben (Treiber), aus dem Portal-Protokoll, Ziel: hoch. 3) Belohnte Empfehlungen, die sich als gefälscht oder als Selbstempfehlung erweisen (Guardrail), aus dem CRM, Ziel: unter einer Grenze bleiben.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If account managers ask for a referral at the quarterly review with a ready intro e-mail, then more referred firms become customers, because satisfied customers refer when it is easy and they are asked at the right moment.", "Wenn Account Manager im Quartalsreview mit einer fertigen Vorstellungs-E-Mail um eine Empfehlung bitten, dann werden mehr empfohlene Firmen Kunden, weil zufriedene Kunden empfehlen, wenn es einfach ist und sie im richtigen Moment gefragt werden."),
      rule: tt("Roll out if at least 10% more referred firms become customers than in the control group, with 100 referred leads decided per group, and no more than 2 customers per 1,000 contacts complain about being asked; keep testing if 3 to 10% more; stop if less than 3% more.", "Ausrollen, wenn mindestens 10 % mehr empfohlene Firmen Kunden werden als in der Kontrollgruppe, bei 100 entschiedenen empfohlenen Leads pro Gruppe, und höchstens 2 Kunden pro 1.000 Kontakte sich über die Nachfrage beschweren; weiter testen bei 3 bis 10 % mehr; stoppen bei weniger als 3 % mehr."),
    },
    chosen: [...MODEL_MEASURES],
    aims: Object.fromEntries(MODEL_MEASURES.map((id) => [id, [...MEASURE_BY_ID[id].targets]])) as Record<string, ProblemId[]>,
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
    order: [...MODEL_ORDER],
    why: tt("The referral programme goes first: it scores 27, it costs the same however many customers take part, and referred leads closed 3 times as often as marketing leads. The community comes second, from week 8, because it builds relationships a competitor cannot copy and gives referrers a place to meet peers. The membership tier comes third, with the reviews and priority support that give members a reason to renew. The three cost €115,000 of the €130,000; the discount and the cash bonus are left out because they buy behaviour instead of building value, and the account managers because they do not scale.", "Das Empfehlungsprogramm kommt zuerst: Es erzielt 27, kostet dasselbe, egal wie viele Kunden teilnehmen, und empfohlene Leads schlossen 3-mal so oft ab wie Marketing-Leads. Die Community kommt als Zweites, ab Woche 8, weil sie Beziehungen aufbaut, die ein Wettbewerber nicht kopieren kann, und Empfehlern einen Ort gibt, andere zu treffen. Die Mitgliedsstufe kommt als Drittes, mit Reviews und Prioritätssupport, die Mitgliedern einen Grund zum Verlängern geben. Die drei kosten 115.000 € von 130.000 €; Rabatt und Geldprämie bleiben draußen, weil sie Verhalten kaufen, statt Wert aufzubauen, und die Account Manager, weil sie nicht skalieren."),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Every membership benefit makes the product work better or connects customers with peers, so members stay for what they would lose by leaving; this answers “customer retention not sustainable”.", "Jeder Mitgliedervorteil lässt das Produkt besser funktionieren oder verbindet Kunden mit anderen, sodass Mitglieder wegen dessen bleiben, was sie beim Gehen verlören; das beantwortet „Kundenbindung nicht nachhaltig“."),
      rules: tt("When a referred firm signs, both firms get a free training day, so customers refer out of trust and ConnectIT pays only for new customers, not for names; this answers the expensive new customer acquisition.", "Wenn eine empfohlene Firma unterschreibt, erhalten beide Firmen einen kostenlosen Schulungstag, sodass Kunden aus Vertrauen empfehlen und ConnectIT nur für Neukunden zahlt, nicht für Namen; das beantwortet die teure Neukundengewinnung."),
      review: tt("Every month the same KPIs decide which benefit to keep, which to test further and which to stop, and what the rewards cost, so the system learns what keeps customers instead of relying on opinions.", "Jeden Monat entscheiden dieselben KPIs, welcher Vorteil bleibt, welcher weiter getestet und welcher gestoppt wird, und was die Belohnungen kosten, sodass das System lernt, was Kunden hält, statt sich auf Meinungen zu verlassen."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt("The share of members who used a benefit in the last 30 days is the driver the brief names (retention not sustainable): members who use their added value renew. It is linked to renewals, moves the week the programme changes, covers every member and is counted by the systems, so every part of the programme can be steered by it within weeks.", "Der Anteil der Mitglieder, die in den letzten 30 Tagen einen Vorteil genutzt haben, ist der Treiber, den der Auftrag nennt (Bindung nicht nachhaltig): Mitglieder, die ihren Mehrwert nutzen, verlängern. Er ist mit Verlängerungen verbunden, bewegt sich in der Woche, in der sich das Programm ändert, deckt jedes Mitglied ab und wird von den Systemen gezählt, sodass sich jeder Teil des Programms innerhalb von Wochen daran steuern lässt."),
    logic,
    tier: { ...MODEL_TIER },
    vision: tt(
      "ConnectIT keeps customers through added value, not discounts: members get a quarterly review, priority support and training seats, and every referral is thanked on both sides once the new firm signs. Every part has a KPI before it grows, so retention and referrals feed each other.",
      "ConnectIT hält Kunden durch Mehrwert, nicht durch Rabatte: Mitglieder bekommen ein Quartalsreview, Prioritätssupport und Schulungsplätze, und jede Empfehlung wird auf beiden Seiten belohnt, sobald die neue Firma abschließt. Jeder Baustein hat einen KPI, bevor er wächst, sodass sich Kundenbindung und Empfehlungen gegenseitig stärken.",
    ),
    giveUp: tt(
      `The plan gives me the ConnectIT Plus membership with its three added values, the CRM KPIs with a monthly review, the anti-misuse rules, the referral page with testimonials and the referral programme on a thank-you members already use. The community starts once the first review shows what members use. It costs me the AI loyalty engine and the 10% discount, which give no added value and take margin or cannot be checked. ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} stay unspent. If the uptake turns out weaker, the referral programme rests on a benefit used by less than 80% of pilot members, so I watch it first.`,
      `Der Plan gibt mir die Mitgliedschaft ConnectIT Plus mit ihren drei Mehrwerten, die KPIs im CRM mit einem monatlichen Review, die Regeln gegen Missbrauch, die Empfehlungsseite mit Kundenstimmen und das Empfehlungsprogramm auf einem Dankeschön, das Mitglieder schon nutzen. Die Community startet, sobald das erste Review zeigt, was Mitglieder nutzen. Er kostet mich die KI-Loyalty-Engine und den 10-%-Rabatt, die keinen Mehrwert geben und Marge kosten oder sich nicht prüfen lassen. ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} bleiben ungenutzt. Fällt die Nutzung schwächer aus, beruht das Empfehlungsprogramm auf einem Vorteil, den weniger als 80 % der Pilotmitglieder nutzen, also beobachte ich es zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the decision the brief asks for despite an unclear forecast: start now with the added values that are proven, for the 150 most active customers, and measure from the first month through the KPIs. The community waits until the review shows what members use, and the discount and the AI loyalty engine stay out because they give no added value and cost margin or cannot be checked.",
      "Es ist die Entscheidung, die der Auftrag trotz unklarer Prognose verlangt: jetzt mit den belegten Mehrwerten für die 150 aktivsten Kunden starten und ab dem ersten Monat über die KPIs messen. Die Community wartet, bis das Review zeigt, was Mitglieder nutzen, und Rabatt und KI-Loyalty-Engine bleiben draußen, weil sie keinen Mehrwert geben und Marge kosten oder sich nicht prüfen lassen.",
    ),
    watch: tt(
      "I watch the renewal rate: today it is 78%, and if it is not clearly above that by month 3 on enough renewals, I stop adding parts and fix the benefits members do not use. I also watch the uptake behind the referral programme: if fewer than 80% of members use the training seats, I pause the referral thank-you until they do.",
      "Ich beobachte die Verlängerungsquote: Heute liegt sie bei 78 %, und liegt sie bis Monat 3 bei genug Verlängerungen nicht deutlich darüber, höre ich auf, Bausteine hinzuzufügen, und behebe die Vorteile, die Mitglieder nicht nutzen. Ich beobachte auch die Nutzung hinter dem Empfehlungsprogramm: Nutzen weniger als 80 % der Mitglieder die Schulungsplätze, pausiere ich das Empfehlungs-Dankeschön, bis sie es tun.",
    ),
  };
}
