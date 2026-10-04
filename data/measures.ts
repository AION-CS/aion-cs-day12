import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Nine measures ConnectIT could fund inside €130,000 and five months (the plan's framework). Costs and weeks are
 * Case assumptions. What each measure does is written without naming the problem it answers, so the learner has to match them
 * (Materi A7). The score is the plan's own evaluation: Retention effect × Scalability × Economic viability. Scalability follows from how
 * the cost grows (printed on each measure), so it is checkable; retention effect and economic viability are the learner's judgement.
 * (Field names keep the earlier ones: `exp` = Scalability, `fea` = Economic viability, `eff` = Retention effect; `joins` is how the
 * cost grows (all = the same cost however many customers take part, one = a cost for every member or referral, none = staff time for
 * every single customer); `evidence` is its band; `targets` are the problems a measure answers. The problem ids
 * bounce/interaction/coordination now mean low customer retention / expensive new customer acquisition / potential of existing
 * customers unused. The measure ids keep the earlier names too; each measure's `name` says what it is.)
 */
export type MeasureId = "stories" | "types" | "training" | "references" | "aipitch" | "brochure" | "discount" | "video" | "fair";
export const BUDGET = 130000;
export const MONTHS = 5;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): what kind of thing a measure is, taken from Materi A1 to A3 (a referral, a community, a service added value, an incentive that is only a reward), or whether it is a tool whose rules nobody can see. A fact about the measure taken from those cards' own tests, never a
 * score and never the problem it answers (that stays the learner's job).
 */
export type MeasureArea = "referral" | "community" | "service" | "incentive" | "tool";
export const MEASURE_AREA_LABEL = bi({
  referral: t("Referral", "Empfehlung"),
  community: t("Community", "Community"),
  service: t("Service added value", "Service-Mehrwert"),
  incentive: t("Incentive (a reward)", "Anreiz (eine Belohnung)"),
  tool: t("A tool with hidden rules", "Ein Werkzeug mit versteckten Regeln"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems: low customer retention, expensive new customer acquisition and unused potential of existing customers. They call for real added value (a service or a community) and for referrals that rest on trust. An incentive alone, such as a discount, a gift or a cash bonus, pays for behaviour without building it, and a tool whose rules nobody can see cannot be explained to customers.",
    "Der Auftrag nennt drei Probleme: niedrige Kundenbindung, teure Neukundengewinnung und ungenutztes Potenzial der Bestandskunden. Sie verlangen echten Mehrwert (einen Service oder eine Community) und Empfehlungen, die auf Vertrauen beruhen. Ein Anreiz allein, etwa ein Rabatt, ein Geschenk oder eine Geldprämie, bezahlt ein Verhalten, ohne es aufzubauen, und ein Werkzeug, dessen Regeln niemand sieht, lässt sich Kunden nicht erklären.",
  ),
});

export type ProblemId = "bounce" | "interaction" | "coordination";
export const PROBLEM_IDS: ProblemId[] = ["bounce", "interaction", "coordination"];
export const PROBLEM_LABEL = bi({
  bounce: t("Low customer retention", "Geringe Kundenbindung"),
  interaction: t("Expensive new customer acquisition", "Teure Neukundengewinnung"),
  coordination: t("Potential of existing customers unused", "Potenzial der Bestandskunden ungenutzt"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("the same cost, however many customers take part", "dieselben Kosten, egal wie viele Kunden teilnehmen"),
  one: t("a cost for every member or referral", "Kosten für jedes Mitglied oder jede Empfehlung"),
  none: t("staff time for every single customer", "Personalzeit für jeden einzelnen Kunden"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("the cost stays the same however many customers take part", "die Kosten bleiben gleich, egal wie viele Kunden teilnehmen"),
  mid: t("the cost grows with every member or referral", "die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung"),
  slow: t("it needs staff time for every single customer", "es braucht Personalzeit für jeden einzelnen Kunden"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Scalability follows from how the cost grows, printed on each measure: the same cost however many customers take part scores 3, a cost for every member or referral scores 2, staff time for every single customer scores 1. A measure that needs a person per customer stops growing when the people run out.",
    "Die Skalierbarkeit folgt daraus, wie die Kosten wachsen, gedruckt bei jeder Maßnahme: dieselben Kosten, egal wie viele Kunden teilnehmen, ergeben 3, Kosten für jedes Mitglied oder jede Empfehlung ergeben 2, Personalzeit für jeden einzelnen Kunden ergibt 1. Eine Maßnahme, die eine Person pro Kunde braucht, wächst nicht mehr, wenn die Leute ausgehen.",
  ),
});

export type Measure = {
  id: MeasureId;
  name: string;
  what: string;
  /** One concrete scene from ConnectIT's day, and who does what (CLAUDE.md #46). */
  scene: string;
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "stories" as MeasureId,
    name: t("A referral programme with a two-sided thank-you", "Ein Empfehlungsprogramm mit beidseitigem Dankeschön"),
    what: t("When an existing customer introduces a firm that signs, both firms get a free training day; referrals are made through a short form in the customer portal.", "Wenn ein Bestandskunde eine Firma vorstellt, die unterschreibt, erhalten beide Firmen einen kostenlosen Schulungstag; Empfehlungen laufen über ein kurzes Formular im Kundenportal."),
    scene: t("A satisfied customer fills in a short form in the portal to introduce a firm; when that firm signs, both get a free training day.", "Ein zufriedener Kunde füllt im Portal ein kurzes Formular aus, um eine Firma vorzustellen; unterschreibt diese Firma, bekommen beide einen kostenlosen Schulungstag."),
    who: t("Marketing runs the programme; the account manager asks at the quarterly review; the customer decides whom to introduce.", "Das Marketing führt das Programm; der Account Manager fragt im Quartalsreview; der Kunde entscheidet, wen er vorstellt."),
    area: "referral" as MeasureArea,
    basis: t("The cost stays the same however many customers take part; in use after 4 weeks.", "Die Kosten bleiben gleich, egal wie viele Kunden teilnehmen; im Einsatz nach 4 Wochen."),
    joins: "all" as Joins,
    cost: 30000,
    weeks: 4,
    targets: ["interaction", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("Satisfied customers bring warmer leads at a fraction of the cost of marketing, and the thank-you is value, not cash, so it does not buy weak referrals.", "Zufriedene Kunden bringen wärmere Leads zu einem Bruchteil der Marketingkosten, und das Dankeschön ist Wert, kein Geld, also kauft es keine schwachen Empfehlungen.") },
    verdict: t("A model measure: it turns existing customers into the cheapest way to win new ones.", "Eine Modellmaßnahme: Sie macht Bestandskunden zum günstigsten Weg, neue zu gewinnen."),
  },
  {
    id: "types" as MeasureId,
    name: t("A member community: user group, annual customer day and forum", "Eine Mitglieder-Community: User Group, jährlicher Kundentag und Forum"),
    what: t("Twice-yearly user group meetings by region, one customer day a year and an online forum where members help each other.", "Zweimal jährlich regionale User-Group-Treffen, ein Kundentag pro Jahr und ein Onlineforum, in dem Mitglieder einander helfen."),
    scene: t("Twice a year IT leads from member firms meet in their region, swap tips and meet the ConnectIT team; between meetings they help each other in the forum.", "Zweimal im Jahr treffen sich IT-Leitungen von Mitgliedsfirmen in ihrer Region, tauschen Tipps aus und lernen das Team von ConnectIT kennen; zwischen den Treffen helfen sie einander im Forum."),
    who: t("Customer success organises the meetings and the forum; the members do most of the talking.", "Das Customer Success organisiert die Treffen und das Forum; die Mitglieder reden die meiste Zeit."),
    area: "community" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 8 weeks.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 8 Wochen."),
    joins: "one" as Joins,
    cost: 40000,
    weeks: 8,
    targets: ["bounce", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("Customers who know other customers and ConnectIT's people are much harder to lure away, and they learn to use more of the product; each event grows with the members, so scalability 2.", "Kunden, die andere Kunden und die Menschen von ConnectIT kennen, lassen sich viel schwerer abwerben, und sie lernen, mehr vom Produkt zu nutzen; jede Veranstaltung wächst mit den Mitgliedern, daher Skalierbarkeit 2.") },
    verdict: t("A model measure: it builds relational retention that a competitor's price cannot copy.", "Eine Modellmaßnahme: Sie baut Beziehungsbindung auf, die der Preis eines Wettbewerbers nicht kopieren kann."),
  },
  {
    id: "training" as MeasureId,
    name: t("A membership tier with added-value services", "Eine Mitgliedsstufe mit Service-Mehrwerten"),
    what: t("“ConnectIT Plus”: a quarterly review with a named expert, two-hour priority support and two free training seats a year, included in the contract.", "„ConnectIT Plus“: ein Quartalsreview mit einem benannten Experten, Prioritätssupport innerhalb von zwei Stunden und zwei kostenlose Schulungsplätze pro Jahr, im Vertrag enthalten."),
    scene: t("A “ConnectIT Plus” customer gets a quarterly review with a named expert, a priority ticket answered within two hours and two free training seats a year.", "Ein „ConnectIT Plus“-Kunde bekommt ein Quartalsreview mit einem benannten Experten, ein Prioritäts-Ticket, das innerhalb von zwei Stunden beantwortet wird, und zwei kostenlose Schulungsplätze pro Jahr."),
    who: t("Service staffs the reviews and the priority support; the contract includes it.", "Der Service besetzt die Reviews und den Prioritäts-Support; der Vertrag enthält es."),
    area: "service" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 8 weeks.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 8 Wochen."),
    joins: "one" as Joins,
    cost: 45000,
    weeks: 8,
    targets: ["bounce", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("The product works better for every member, which is the reason to renew; each member costs expert and support time, so scalability 2.", "Das Produkt funktioniert für jedes Mitglied besser, und das ist der Grund zu verlängern; jedes Mitglied kostet Experten- und Supportzeit, daher Skalierbarkeit 2.") },
    verdict: t("A model measure: it gives members added value instead of a discount.", "Eine Modellmaßnahme: Sie gibt Mitgliedern Mehrwert statt Rabatt."),
  },
  {
    id: "references" as MeasureId,
    name: t("A referral page with customer testimonials", "Eine Empfehlungsseite mit Kundenstimmen"),
    what: t("A page where referred firms read short statements of existing customers and can book a call.", "Eine Seite, auf der empfohlene Firmen kurze Aussagen von Bestandskunden lesen und ein Gespräch buchen können."),
    scene: t("A referred firm reads three short statements from customers like itself and books a call.", "Eine empfohlene Firma liest drei kurze Aussagen von Kunden wie ihr selbst und bucht ein Gespräch."),
    who: t("Marketing collects and publishes the statements; sales takes the call.", "Das Marketing sammelt und veröffentlicht die Aussagen; der Vertrieb übernimmt das Gespräch."),
    area: "referral" as MeasureArea,
    basis: t("The cost stays the same however many customers take part; in use after 2 weeks.", "Die Kosten bleiben gleich, egal wie viele Kunden teilnehmen; im Einsatz nach 2 Wochen."),
    joins: "all" as Joins,
    cost: 10000,
    weeks: 2,
    targets: ["interaction"] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("Cheap and it scales, but a page does not make anyone refer; it only helps the referrals that come anyway.", "Günstig und skalierbar, aber eine Seite bringt niemanden zum Empfehlen; sie hilft nur den Empfehlungen, die ohnehin kommen.") },
    verdict: t("Not in the model three: 12 points. A useful add-on once the referral programme runs.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Eine nützliche Ergänzung, sobald das Empfehlungsprogramm läuft."),
  },
  {
    id: "aipitch" as MeasureId,
    name: t("An AI loyalty engine that sets each customer's reward itself", "Eine KI-Loyalty-Engine, die die Belohnung jedes Kunden selbst festlegt"),
    what: t("A vendor tool decides for every customer which reward or discount they get; its rules are not shown.", "Ein Anbieter-Werkzeug entscheidet für jeden Kunden, welche Belohnung oder welchen Rabatt er erhält; seine Regeln werden nicht gezeigt."),
    scene: t("A customer gets a different reward from the firm next door, and nobody at ConnectIT can say why.", "Ein Kunde bekommt eine andere Belohnung als die Firma nebenan, und niemand bei ConnectIT kann sagen, warum."),
    who: t("A vendor's tool decides; ConnectIT staff cannot see its rules.", "Das Werkzeug eines Anbieters entscheidet; die Mitarbeiter von ConnectIT können seine Regeln nicht sehen."),
    area: "tool" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 8 weeks.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 8 Wochen."),
    joins: "one" as Joins,
    cost: 40000,
    weeks: 8,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It keeps paying rewards nobody at ConnectIT can check or explain, so nobody can say whether they pay off.", "Es zahlt weiter Belohnungen, die niemand bei ConnectIT prüfen oder erklären kann, also kann niemand sagen, ob sie sich lohnen.") },
    verdict: t("Rejected: 4 points. A black box that buys behaviour with rewards.", "Verworfen: 4 Punkte. Eine Black Box, die Verhalten mit Belohnungen kauft."),
  },
  {
    id: "brochure" as MeasureId,
    name: t("A branded merchandise box for every customer", "Eine Merchandise-Box mit Logo für jeden Kunden"),
    what: t("Mugs, notebooks and a hoodie with the ConnectIT logo, sent to every customer once a year.", "Tassen, Notizbücher und ein Hoodie mit dem Logo von ConnectIT, einmal im Jahr an jeden Kunden geschickt."),
    scene: t("Every customer receives a box with mugs, notebooks and a hoodie once a year, whether or not they use the product.", "Jeder Kunde erhält einmal im Jahr eine Box mit Tassen, Notizbüchern und einem Hoodie, egal ob er das Produkt nutzt."),
    who: t("Marketing orders and ships it; nothing in the box connects to the product.", "Das Marketing bestellt und versendet sie; nichts in der Box hat mit dem Produkt zu tun."),
    area: "incentive" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 4 weeks.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 4 Wochen."),
    joins: "one" as Joins,
    cost: 25000,
    weeks: 4,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 1, note: t("A nice gesture, but nobody renews an IT contract because of a mug.", "Eine nette Geste, aber niemand verlängert einen IT-Vertrag wegen einer Tasse.") },
    verdict: t("Rejected: 2 points.", "Verworfen: 2 Punkte."),
  },
  {
    id: "discount" as MeasureId,
    name: t("10% loyalty discount on every renewal", "10 % Treuerabatt auf jede Verlängerung"),
    what: t("Every customer who renews gets 10% off the next contract year.", "Jeder Kunde, der verlängert, erhält 10 % Rabatt auf das nächste Vertragsjahr."),
    scene: t("Every customer who renews gets 10% off the next year, including those who would have renewed anyway.", "Jeder Kunde, der verlängert, erhält 10 % Rabatt auf das nächste Jahr, auch die, die ohnehin verlängert hätten."),
    who: t("Sales adds the discount; finance carries the cost of every renewal.", "Der Vertrieb fügt den Rabatt hinzu; die Finanzabteilung trägt die Kosten jeder Verlängerung."),
    area: "incentive" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 1 week.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 1 Woche."),
    joins: "one" as Joins,
    cost: 60000,
    weeks: 1,
    targets: ["bounce"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It may keep some customers for a year, but it costs margin on every renewal and holds them only until a competitor offers more.", "Es hält vielleicht einige Kunden für ein Jahr, kostet aber bei jeder Verlängerung Marge und hält sie nur, bis ein Wettbewerber mehr bietet.") },
    verdict: t("Rejected: 4 points. It answers low retention with price, not with value.", "Verworfen: 4 Punkte. Es beantwortet geringe Bindung mit dem Preis, nicht mit Wert."),
  },
  {
    id: "video" as MeasureId,
    name: t("A cash bonus of €500 for every referral", "Eine Geldprämie von 500 € für jede Empfehlung"),
    what: t("Any customer who submits a referral receives €500, whether or not the firm signs.", "Jeder Kunde, der eine Empfehlung einreicht, erhält 500 €, egal ob die Firma unterschreibt."),
    scene: t("A customer submits a name and receives €500 whether or not that firm ever signs.", "Ein Kunde reicht einen Namen ein und erhält 500 €, egal ob diese Firma je unterschreibt."),
    who: t("Customers submit names; finance pays every submission.", "Kunden reichen Namen ein; die Finanzabteilung zahlt jede Einreichung."),
    area: "incentive" as MeasureArea,
    basis: t("The cost grows with every member or referral; in use after 2 weeks.", "Die Kosten wachsen mit jedem Mitglied oder jeder Empfehlung; im Einsatz nach 2 Wochen."),
    joins: "one" as Joins,
    cost: 50000,
    weeks: 2,
    targets: ["interaction"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It brings many referrals, but many are weak or fake, it pays for names rather than customers, and it turns a trusted advice into a paid one.", "Es bringt viele Empfehlungen, aber viele sind schwach oder gefälscht, es bezahlt Namen statt Kunden, und es macht aus einem vertrauten Rat einen bezahlten.") },
    verdict: t("Rejected: 4 points. The wrong incentive: volume instead of trust.", "Verworfen: 4 Punkte. Der falsche Anreiz: Menge statt Vertrauen."),
  },
  {
    id: "fair" as MeasureId,
    name: t("A personal account manager for every customer", "Ein persönlicher Account Manager für jeden Kunden"),
    what: t("Three new account managers, each looking after a share of all customers in person.", "Drei neue Account Manager, die jeweils einen Teil aller Kunden persönlich betreuen."),
    scene: t("Each of three new account managers phones their share of all customers every quarter.", "Jeder von drei neuen Account Managern ruft jedes Quartal seinen Anteil aller Kunden an."),
    who: t("HR hires three people; each can only look after as many customers as time allows.", "Die Personalabteilung stellt drei Personen ein; jeder kann nur so viele Kunden betreuen, wie die Zeit erlaubt."),
    area: "service" as MeasureArea,
    basis: t("It needs staff time for every single customer; in use after 12 weeks.", "Es braucht Personalzeit für jeden einzelnen Kunden; im Einsatz nach 12 Wochen."),
    joins: "none" as Joins,
    cost: 110000,
    weeks: 12,
    targets: ["bounce", "coordination"] as ProblemId[],
    model: { feasibility: 1, effect: 3, note: t("Strong for the customers it reaches, but it grows only with people, takes most of the budget and is in place only after twelve weeks.", "Stark für die Kunden, die es erreicht, aber es wächst nur mit Personal, nimmt den Großteil des Budgets und steht erst nach zwölf Wochen.") },
    verdict: t("Rejected: 3 points. Effective, but neither scalable nor viable in this budget.", "Verworfen: 3 Punkte. Wirksam, aber in diesem Budget weder skalierbar noch wirtschaftlich."),
  },
]);
for (const m of RAW) MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins) }) as Measure);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["stories", "types", "training"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
