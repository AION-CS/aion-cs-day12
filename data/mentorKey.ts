import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { COMP_BY_ID, MODEL_ARCH, MODEL_COMPS, MODEL_GREATEST, MODEL_START, MODEL_TRIGGER, MODEL_TRIPWIRE, OWNER_ACCEPT, OWNER_ACCEPT_LOGIC, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import type { Criterion, LogicRow, OwnerId, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["stories", "types", "training"];

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt("A membership keeps customers through value they would lose by leaving: a customer who has a named expert, priority support and peers in the user group would give all of that up by switching, so a cheaper competitor has to offer far more than a lower price.", "Eine Mitgliedschaft hält Kunden über Wert, den sie beim Gehen verlieren würden: Ein Kunde mit benanntem Experten, Prioritätssupport und anderen Kunden in der User Group gäbe das alles beim Wechsel auf, sodass ein günstigerer Wettbewerber weit mehr als einen niedrigeren Preis bieten muss."),
    fig: { F1: String(FORECAST.f1), F2: String(FORECAST.f2), F3: String(FORECAST.f3) },
    meaning: tt(`Referred leads closed at ${FORECAST.f1}% against ${FORECAST.controlRate}% for marketing leads, ${FORECAST.f2} times as often. With ${num(PILOT.yearly)} referred leads a year that is about ${euro(FORECAST.f3)} extra, so ConnectIT should ask its most satisfied customers first and thank them with value, and test it fairly, because referred firms may have been warmer to begin with.`, `Empfohlene Leads schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % bei Marketing-Leads ab, ${num(FORECAST.f2)}-mal so oft. Bei ${num(PILOT.yearly)} empfohlenen Leads pro Jahr sind das etwa ${euro(FORECAST.f3)} zusätzlich, also sollte ConnectIT zuerst seine zufriedensten Kunden fragen, sich mit Wert bedanken und das fair testen, weil empfohlene Firmen von Anfang an wärmer gewesen sein könnten.`),
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
    misread: tt("1) Share of customers who renew (outcome), from the CRM, target 82% by month 5 against 78% today. 2) Share of members who used a benefit in the last 30 days (driver), from the systems, target 60% by month 3. 3) Cost of rewards and discounts per customer kept (guardrail), from finance, must stay below €300.", "1) Anteil der Kunden, die verlängern (Outcome), aus dem CRM, Ziel 82 % bis Monat 5 gegenüber 78 % heute. 2) Anteil der Mitglieder, die in den letzten 30 Tagen einen Vorteil genutzt haben (Treiber), aus den Systemen, Ziel 60 % bis Monat 3. 3) Kosten der Belohnungen und Rabatte pro gehaltenem Kunden (Guardrail), aus der Finanzabteilung, muss unter 300 € bleiben."),
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
    alloc: Object.fromEntries(MODEL_ARCH.map((id) => [id, true])),
    start: { ...MODEL_START } as Record<string, number>,
    owner: Object.fromEntries(MODEL_ARCH.map((id) => [id, OWNER_ACCEPT[id][0]])) as Record<string, OwnerId>,
    trigger: Object.fromEntries(MODEL_ARCH.map((id) => [id, MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER]])) as Record<string, string>,
    postponed: tt("The AI loyalty engine (€60,000) is left out: the six funded items cost €160,000 of the €180,000, the engine would push the plan €40,000 over, and nobody at ConnectIT could check the rewards it pays, which risks exactly the wrong incentives and costs we must avoid. The loyalty discount (€80,000) buys renewals with margin instead of value.", "Die KI-Loyalty-Engine (60.000 €) bleibt draußen: Die sechs finanzierten Punkte kosten 160.000 € von 180.000 €, die Engine brächte den Plan 40.000 € über das Budget, und niemand bei ConnectIT könnte die Belohnungen prüfen, die sie zahlt; das riskiert genau die falschen Anreize und Kosten, die wir vermeiden müssen. Der Treuerabatt (80.000 €) kauft Verlängerungen mit Marge statt mit Wert."),
    pickup: tt("If the renewal rate reaches 82% by month 6, we look again at a points programme for the most active members, for the next year.", "Erreicht die Verlängerungsquote bis Monat 6 82 %, prüfen wir für das nächste Jahr erneut ein Punkteprogramm für die aktivsten Mitglieder."),
    decision: "stage",
    assumptions: [
      tt("Members stay because of the added value, not because of the attention of the pilot. This is wrong if members who used no benefit renew as often as members who did, by month 5.", "Mitglieder bleiben wegen des Mehrwerts, nicht wegen der Aufmerksamkeit im Pilot. Das ist falsch, wenn Mitglieder, die keinen Vorteil nutzten, bis Monat 5 genauso oft verlängern wie Mitglieder, die einen nutzten."),
      tt("Customers refer for a value thank-you, not only for cash. This is wrong if fewer than 10 referred firms have become customers by month 4.", "Kunden empfehlen für ein Dankeschön in Wert, nicht nur für Geld. Das ist falsch, wenn bis Monat 4 weniger als 10 empfohlene Firmen Kunden geworden sind."),
      tt("The misuse rules keep referrals honest. This is wrong if more than 2 referrals a month turn out to be fake or self-referrals.", "Die Missbrauchsregeln halten Empfehlungen ehrlich. Das ist falsch, wenn sich mehr als 2 Empfehlungen pro Monat als gefälscht oder als Selbstempfehlung erweisen."),
    ],
    tripKpi: MODEL_TRIPWIRE.kpi,
    tripThreshold: String(MODEL_TRIPWIRE.threshold),
    tripMonth: MODEL_TRIPWIRE.month,
    tripAction: "adjust",
    challenge: tt("I keep the added values and the community, and I do not pay cash per referral. The programme works where it was built: 55% of members use a benefit, the earliest sign. 78% to 79% after three months rests on too few renewals to judge; the tripwire of 82% in month 6 decides. First I check the six self-referrals and whether the check before the thank-you worked. The one change: the thank-you is paid only after the referred firm has signed and been checked. A €500 cash bonus would buy more of exactly the referrals that failed; stopping the community would remove what makes members harder to lure away.", "Ich behalte die Mehrwerte und die Community, und ich zahle kein Geld pro Empfehlung. Das Programm wirkt, wo es aufgebaut wurde: 55 % der Mitglieder nutzen einen Vorteil, das früheste Zeichen. 78 % zu 79 % nach drei Monaten beruhen auf zu wenigen Verlängerungen für ein Urteil; der Tripwire von 82 % in Monat 6 entscheidet. Zuerst prüfe ich die sechs Selbstempfehlungen und ob die Prüfung vor dem Dankeschön funktioniert hat. Die eine Änderung: Das Dankeschön gibt es erst, wenn die empfohlene Firma unterschrieben hat und geprüft ist. Eine Geldprämie von 500 € kaufte mehr genau der Empfehlungen, die versagt haben; die Community zu stoppen, nähme das weg, was Mitglieder schwerer abwerbbar macht."),
  };
}
