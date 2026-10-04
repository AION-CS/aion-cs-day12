import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2 (Optional, read-only: the rates are PRINTED, no figure is asked for, CLAUDE.md #44) and the worked example of Materi A4: what a referral is worth. ConnectIT's leads last year, split by where they
 * came from: marketing (ads, fairs, cold calls) or a referral by an existing customer (Case assumption). The method is
 *
 *   close rate                   = deals ÷ leads × 100
 *   lift (how many times)        = close rate of referred leads ÷ close rate of marketing leads
 *   extra revenue a year         = referred leads a year × (referral rate − marketing rate, as a share of one) × average deal value
 *
 * (Identifiers keep the names of the file this was built from: `control` = marketing leads, `variant` = referred leads, `sent` = leads,
 * `orders` = deals, `yearly` = the referred leads expected next year, `order` = average deal value.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 600, orders: 60 },
  variant: { sent: 150, orders: 45 },
  yearly: 400,
  order: 8000,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

/** The worked example of Materi A4: a different company (Werra Datentechnik), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 500, orders: 40 }, variant: { sent: 100, orders: 20 }, yearly: 300, order: 5000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight existing customers */

/**
 * Eight of ConnectIT's existing customers, from the last satisfaction survey and the account managers' notes (Case assumption). (The
 * type keeps the name "customer" of the file it was built from: `volume` = annual contract in €, `leave` = satisfaction in the last
 * survey in %, `decision` = in regular contact with other firms of their industry, `known` = what they talk about most: none = price and
 * discounts, campaign = support and training, customer = exchange with other customers.) The rules of Materi A3: ask first for a
 * referral = satisfaction 80% or more AND in contact with peers; joins only for a discount = talks most about price and discounts.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "campaign" | "customer";
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const KNOWN_LABEL = bi({ none: t("Price and discounts", "Preis und Rabatte"), campaign: t("Support and training", "Support und Schulung"), customer: t("Exchange with other customers", "Austausch mit anderen Kunden") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export const LEAVE_MIN = 80;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Tax consultancy network, head of IT", "Steuerberatungsverbund, IT-Leitung"), volume: 60000, leave: 92, decision: true, known: "campaign" as Known },
  { id: "c2" as CustId, name: t("Regional hospital group", "Regionaler Klinikverbund"), volume: 90000, leave: 88, decision: true, known: "customer" as Known },
  { id: "c3" as CustId, name: t("Engineering firm, owner", "Ingenieurbüro, Inhaber"), volume: 30000, leave: 90, decision: false, known: "campaign" as Known },
  { id: "c4" as CustId, name: t("Wholesaler, purchasing", "Großhändler, Einkauf"), volume: 45000, leave: 60, decision: true, known: "none" as Known },
  { id: "c5" as CustId, name: t("Retail chain, procurement", "Einzelhandelskette, Beschaffung"), volume: 70000, leave: 55, decision: false, known: "none" as Known },
  { id: "c6" as CustId, name: t("Logistics firm, IT lead", "Logistikunternehmen, IT-Leitung"), volume: 50000, leave: 75, decision: true, known: "customer" as Known },
  { id: "c7" as CustId, name: t("Law firm, managing partner", "Kanzlei, geschäftsführender Partner"), volume: 25000, leave: 85, decision: false, known: "customer" as Known },
  { id: "c8" as CustId, name: t("Software start-up, CTO", "Software-Start-up, CTO"), volume: 20000, leave: 70, decision: false, known: "campaign" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** Ask first for a referral: satisfaction 80% or more, and in regular contact with other firms of their industry (Materi A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** Would join only for a discount: talks most about price and discounts (Materi A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("92% satisfied and in regular contact with other tax firms: a promoter with a network. Ask first; one referral here reaches peers who trust them.", "92 % zufrieden und in regelmäßigem Kontakt mit anderen Steuerkanzleien: ein Promoter mit Netzwerk. Zuerst fragen; eine Empfehlung erreicht hier andere, die ihnen vertrauen."),
  c2: t("88% satisfied, in contact with other hospitals and keen on exchange: a promoter with a network, and a natural member of a community.", "88 % zufrieden, in Kontakt mit anderen Kliniken und an Austausch interessiert: ein Promoter mit Netzwerk und ein natürliches Mitglied einer Community."),
  c3: t("90% satisfied, but not in contact with other firms of the industry: happy, yet a referral would reach nobody. Ask for a testimonial instead.", "90 % zufrieden, aber ohne Kontakt zu anderen Firmen der Branche: zufrieden, doch eine Empfehlung erreichte niemanden. Fragen Sie stattdessen nach einem Testimonial."),
  c4: t("Talks most about price and discounts, and only 60% satisfied: a discount club would keep this customer only as long as the discount lasts.", "Spricht vor allem über Preis und Rabatte und ist nur zu 60 % zufrieden: Ein Rabattclub hielte diesen Kunden nur so lange, wie der Rabatt läuft."),
  c5: t("Talks about price and discounts: joins for the discount and leaves for a better one. Added value has to come first.", "Spricht über Preis und Rabatte: tritt wegen des Rabatts bei und geht für einen besseren. Der Mehrwert muss zuerst kommen."),
  c6: t("In contact with peers and keen on exchange, but only 75% satisfied: a referral now would carry a lukewarm message. Fix what is missing first.", "In Kontakt mit anderen und an Austausch interessiert, aber nur zu 75 % zufrieden: Eine Empfehlung trüge jetzt eine laue Botschaft. Zuerst beheben, was fehlt."),
  c7: t("85% satisfied and keen on exchange, but not in contact with other law firms: a good candidate for the community, not the first referrer.", "85 % zufrieden und an Austausch interessiert, aber ohne Kontakt zu anderen Kanzleien: ein guter Kandidat für die Community, nicht der erste Empfehler."),
  c8: t("70% satisfied, asks about support and training: a service added value will retain them; neither a referrer yet nor discount-driven.", "70 % zufrieden, fragt nach Support und Schulung: Ein Service-Mehrwert hält ihn; weder schon ein Empfehler noch rabattgetrieben."),
});

/* ------------------------------------------------------------------ Block 1.3b · three retention approaches */

/** Three kinds of value to build a retention approach on; each approach uses a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "respond" | "personal" | "learn";
export const BASES = bi([
  { id: "respond" as Basis, label: t("An incentive that rewards staying", "Ein Anreiz, der das Bleiben belohnt"), short: t("Incentive", "Anreiz") },
  { id: "personal" as Basis, label: t("A service added value", "Ein Service-Mehrwert"), short: t("Service", "Service") },
  { id: "learn" as Basis, label: t("A community (peers, events, a say in the product)", "Eine Community (andere Kunden, Veranstaltungen, Mitsprache beim Produkt)"), short: t("Community", "Community") },
]);
export const BASIS_LABEL = bi({ respond: t("An incentive", "Ein Anreiz"), personal: t("A service added value", "Ein Service-Mehrwert"), learn: t("A community", "Eine Community") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[What ConnectIT offers] to [which customers], so [why they stay or refer].", "[Was ConnectIT anbietet] für [welche Kunden], sodass [warum sie bleiben oder empfehlen].") });
/** True when the sentence says what the change gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
