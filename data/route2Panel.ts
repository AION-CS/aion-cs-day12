import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so a Core block never reads an Optional one (#40): `data` is the share of pilot members who used the added value an item builds on,
 * the same figure the added-value list of the “Go deeper” part prints for the value it also names (a check in `npm run verify:calc` keeps them equal).
 * Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the referral programme, `personal` the member community, `routing` the referral page,
 * `training` the CRM KPIs and the monthly review, `tracking` the anti-misuse rules, `suite` the AI loyalty engine, `relaunch` the 10% discount.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After the uptake is proven", "Wenn die Nutzung belegt ist"), not: t("Not now", "Jetzt nicht") });

/** The "weaker uptake" scenario: every uptake figure is this many points lower (the plan's “uncertain customer reactions”: fewer members use the benefits). */
export const WEAK_POINTS = 15;
/** A programme part starts on an added value used by at least this share of pilot members (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the membership, the CRM KPIs and review, the anti-misuse rules). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of pilot members who used the added value the item builds on (percent), or null when it needs no proven uptake to start. */
  data: number | null;
  /** The monthly review proves the uptake this item builds on: it is ready when the review is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("Membership “ConnectIT Plus” with three added values", "Mitgliedschaft „ConnectIT Plus“ mit drei Mehrwerten"), moves: t("no KPI by itself: members get three added values, with rules for who joins and KPIs that measure it", "keinen KPI selbst: Mitglieder bekommen drei Mehrwerte, mit Regeln, wer beitritt, und KPIs, die sie messen"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "engine" as Layer, short: t("Referral programme with a two-sided thank-you", "Empfehlungsprogramm mit beidseitigem Dankeschön"), moves: t("the share of referred firms that sign", "den Anteil der empfohlenen Firmen, die abschließen"), named: true, enabler: false, measured: true, data: 88, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Member community: user groups and a customer day", "Mitglieder-Community: User Groups und ein Kundentag"), moves: t("the share of customers who used a service in the last 30 days", "den Anteil der Kunden, die in den letzten 30 Tagen einen Service genutzt haben"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  routing: { layer: "people" as Layer, short: t("Referral page with customer testimonials", "Empfehlungsseite mit Kundenstimmen"), moves: t("the share of referred firms that book a call", "den Anteil der empfohlenen Firmen, die ein Gespräch buchen"), named: true, enabler: false, measured: true, data: null, cleaned: false, blackBox: false },
  training: { layer: "people" as Layer, short: t("Member and referral KPIs in the CRM and a monthly review", "Mitglieder- und Empfehlungs-KPIs im CRM und ein monatliches Review"), moves: t("no KPI by itself: it shows which benefit each member used and which referral became a customer", "keinen KPI selbst: Es zeigt, welchen Vorteil jedes Mitglied nutzte und welche Empfehlung zum Kunden wurde"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("Anti-misuse rules for referrals", "Regeln gegen Missbrauch von Empfehlungen"), moves: t("no KPI by itself: a check that the referred firm is new, a cap per customer and a thank-you only after signing", "keinen KPI selbst: eine Prüfung, dass die empfohlene Firma neu ist, eine Obergrenze pro Kunde und ein Dankeschön erst nach Vertragsabschluss"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("AI loyalty engine that sets each customer's reward", "KI-Loyalty-Engine, die die Belohnung jedes Kunden festlegt"), moves: t("no KPI it reports: its rules and results are not shown", "keinen KPI, den sie berichtet: Ihre Regeln und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("10% loyalty discount for every renewal", "10 % Treuerabatt für jede Verlängerung"), moves: t("no KPI it names: every customer who renews gets 10% off, including those who would have renewed anyway", "keinen KPI, den er nennt: Jeder Kunde, der verlängert, erhält 10 % Rabatt, auch wer ohnehin verlängert hätte"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The programme parts that build on the membership: the referral programme and the member community. */
export const ENGINE_IDS: ArchId[] = ["chat", "personal"];
/** The item the "After the uptake is proven" tier waits for (the first monthly review shows which benefits members use), and the one that is the base of the programme. */
export const CLEAN_ID: ArchId = "training";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the community waits for the first review to prove the uptake; the AI loyalty engine
 * and the 10% discount stay out (the engine is in use only in month 7, after the 6 months; the discount gives no added value and costs margin on every renewal).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "later", routing: "now", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
