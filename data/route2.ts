import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. ConnectIT's Chief Customer Officer builds a scalable customer retention system of
 * memberships and referrals, against intense competition and expensive new customer acquisition, with a limited budget, uncertain
 * customer reactions and time pressure, and makes a strategic decision despite an unclear success forecast. Every figure is a Case
 * assumption (the plan gives the role, the situation and the constraints, not numbers). (Identifiers keep the names of the file this
 * was built from: a "source" is an added value for members, a "component" is a KPI candidate, a "situation" is a tested approach,
 * `complete` is the share of pilot members who used the added value; the owner ids cdo/datalead/cslead/saleslead/it now mean
 * CCO/Customer Operations/Customer Success/Sales/Marketing.)
 */
export const R2_BUDGET = 180000;
export const R2_MONTHS = 6;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of a membership and referral system */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("Members stay for added value, not for discounts", "Mitglieder bleiben wegen des Mehrwerts, nicht wegen Rabatten"), means: t("Every membership benefit makes the product work better or connects the customer with peers; price reductions are not the reason to join.", "Jeder Mitgliedervorteil lässt das Produkt besser funktionieren oder verbindet den Kunden mit anderen; Preisnachlässe sind nicht der Grund beizutreten.") },
  rules: { id: "rules" as PrincipleId, name: t("Every referral thanks both sides with value, never cash for volume", "Jede Empfehlung bedankt sich bei beiden Seiten mit Wert, nie mit Geld für Menge"), means: t("The referrer and the new customer both get something useful when a referred firm signs, so customers refer out of trust, not for money.", "Empfehler und Neukunde erhalten beide etwas Nützliches, wenn eine empfohlene Firma unterschreibt, sodass Kunden aus Vertrauen empfehlen, nicht für Geld.") },
  owners: { id: "owners" as PrincipleId, name: t("Every part of the programme has an owner and a KPI", "Jeder Teil des Programms hat einen Owner und einen KPI"), means: t("Someone answers for the membership, the community and the referral programme, and sees whether each keeps customers.", "Jemand steht für die Mitgliedschaft, die Community und das Empfehlungsprogramm ein und sieht, ob jedes Kunden hält.") },
  review: { id: "review" as PrincipleId, name: t("A monthly review decides on every part by the same KPIs", "Ein monatliches Review entscheidet über jeden Teil nach denselben KPIs"), means: t("Every month: which benefit to keep, which to test further, which to stop, and what the rewards cost.", "Jeden Monat: welcher Vorteil bleibt, welcher weiter getestet wird, welcher gestoppt wird, und was die Belohnungen kosten.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Pay for every referral: the more, the better", "Jede Empfehlung bezahlen: je mehr, desto besser"), means: t("A cash bonus for every name submitted, whatever becomes of it.", "Eine Geldprämie für jeden eingereichten Namen, egal was daraus wird.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Give every customer a discount to join", "Jedem Kunden einen Rabatt fürs Beitreten geben"), means: t("Membership is a price reduction for everyone; the more members, the better.", "Mitgliedschaft ist ein Preisnachlass für alle; je mehr Mitglieder, desto besser.") },
});
/** A retention system needs both: added value instead of discounts (so members stay) and value-based referrals (so trust is not bought). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · central added values for customers */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: offer now", "Zentral: jetzt anbieten"), later: t("Central: prove it first", "Zentral: zuerst belegen"), leave: t("Not central", "Nicht zentral") });
/** `decision` is the customer decision the added value supports (null when none); `complete` is the share of pilot members who used it. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("Quarterly business review with a named expert", "Quartalsreview mit einem benannten Experten"), decision: t("Renew, or look elsewhere", "Verlängern, oder sich anderweitig umsehen"), complete: 90, cost: 12000 },
  { id: "quote" as SourceId, name: t("Priority support within two hours", "Prioritätssupport innerhalb von zwei Stunden"), decision: t("Stay when something breaks", "Bleiben, wenn etwas ausfällt"), complete: 85, cost: 15000 },
  { id: "chat" as SourceId, name: t("Two free training seats a year", "Zwei kostenlose Schulungsplätze pro Jahr"), decision: t("Use more of the product", "Mehr vom Produkt nutzen"), complete: 88, cost: 8000 },
  { id: "onboarding" as SourceId, name: t("Early access to new modules", "Früher Zugang zu neuen Modulen"), decision: t("Expand to new modules", "Auf neue Module erweitern"), complete: 50, cost: 10000 },
  { id: "social" as SourceId, name: t("Annual customer day and regional user group", "Jährlicher Kundentag und regionale User Group"), decision: t("Trust us for the long term", "Uns langfristig vertrauen"), complete: 60, cost: 14000 },
  { id: "renewal" as SourceId, name: t("Benchmark report against similar firms", "Benchmark-Bericht im Vergleich zu ähnlichen Firmen"), decision: t("Justify the renewal internally", "Die Verlängerung intern rechtfertigen"), complete: 40, cost: 9000 },
  { id: "blog" as SourceId, name: t("A member badge for the e-mail signature", "Ein Mitgliedsabzeichen für die E-Mail-Signatur"), decision: null, complete: 100, cost: 2000 },
  { id: "careers" as SourceId, name: t("Birthday gifts for key contacts", "Geburtstagsgeschenke für Hauptansprechpartner"), decision: null, complete: 95, cost: 6000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: no customer decision behind the added value → not central; a decision and ≥ 80% of pilot members used it → offer now; a decision but used less → prove it first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for retention */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with customers kept, revenue or customers won?", "Bewegt er sich mit gehaltenen Kunden, Umsatz oder gewonnenen Kunden?"), low: t("It counts our activity or reach.", "Er zählt unsere Aktivität oder Reichweite."), high: t("It is, or leads directly to, customers kept or won.", "Er ist gehaltene oder gewonnene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the customer is lost?", "Wie früh zeigt er eine Veränderung, bevor der Kunde verloren ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Every week or faster.", "Jede Woche oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer, members and non-members?", "Deckt er jeden Kunden ab, Mitglieder und Nichtmitglieder?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("every week", "jede Woche"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Renewal rate", "Verlängerungsquote"), what: t("Share of customers whose contract comes up and who renew, members and non-members, from the CRM.", "Anteil der Kunden mit auslaufendem Vertrag, die verlängern, Mitglieder und Nichtmitglieder, aus dem CRM."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result the brief is about, counted every week by the CRM as contracts come up.", "Das Ergebnis, um das es im Auftrag geht, jede Woche vom CRM gezählt, wenn Verträge auslaufen.") },
  { id: "cv" as CompId, name: t("Members who used a benefit in the last 30 days", "Mitglieder, die in den letzten 30 Tagen einen Vorteil genutzt haben"), what: t("Share of members who used at least one added value (review, priority ticket, training seat, user group) in the last 30 days, from the systems.", "Anteil der Mitglieder, die in den letzten 30 Tagen mindestens einen Mehrwert genutzt haben (Review, Prioritätsticket, Schulungsplatz, User Group), aus den Systemen."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The driver the brief names (retention not sustainable): members who use their added value renew; it moves the week the programme changes.", "Der Treiber, den der Auftrag nennt (Bindung nicht nachhaltig): Mitglieder, die ihren Mehrwert nutzen, verlängern; er bewegt sich in der Woche, in der sich das Programm ändert.") },
  { id: "engage" as CompId, name: t("Referred leads that became customers", "Empfohlene Leads, die Kunden wurden"), what: t("New customers from referrals within 90 days of the referral, from the CRM.", "Neukunden aus Empfehlungen innerhalb von 90 Tagen nach der Empfehlung, aus dem CRM."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The earliest sign that referrals lower the cost of new customers.", "Das früheste Zeichen, dass Empfehlungen die Kosten für Neukunden senken.") },
  { id: "nps" as CompId, name: t("Satisfaction score from a survey", "Zufriedenheitswert aus einer Befragung"), what: t("How satisfied customers say they are; about 20% answer.", "Wie zufrieden Kunden nach eigener Aussage sind; etwa 20 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but twice a year is too slow to steer six months by.", "Mit dem Wert verbunden, aber zweimal im Jahr ist zu langsam, um sechs Monate danach zu steuern.") },
  { id: "churn" as CompId, name: t("Cancellations per quarter", "Kündigungen pro Quartal"), what: t("Customers who cancelled in the quarter.", "Kunden, die im Quartal gekündigt haben."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after the customer has decided.", "Zählt den Verlust genau, nachdem der Kunde entschieden hat.") },
  { id: "emails" as CompId, name: t("Members signed up", "Angemeldete Mitglieder"), what: t("Customers who signed up for the membership programme.", "Kunden, die sich für das Mitgliedsprogramm angemeldet haben."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It rose from 200 to 450 in the pilot while renewals stayed flat: signing up is not staying.", "Sie stieg im Pilot von 200 auf 450, während die Verlängerungen gleich blieben: Anmelden ist nicht Bleiben.") },
  { id: "followers" as CompId, name: t("Likes on community posts in social media", "Likes auf Community-Posts in Social Media"), what: t("Likes on the community posts on ConnectIT's company pages.", "Likes auf die Community-Posts auf den Unternehmensseiten von ConnectIT."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever follows, not the decisions of customers.", "Reichweite bei denen, die folgen, nicht die Entscheidungen von Kunden.") },
  { id: "stories" as CompId, name: t("Account managers' monthly success stories", "Monatliche Erfolgsgeschichten der Account Manager"), what: t("Each month, account managers report the customers they kept thanks to the programme.", "Jeden Monat berichten Account Manager die Kunden, die sie dank des Programms gehalten haben."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but it counts the saves someone chose to tell, without the losses and without a comparison.", "Anschaulich, aber sie zählt die Rettungen, die jemand erzählen wollte, ohne die Verluste und ohne Vergleich.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "cv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · a scalable referral model, tested: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Customer Success", "Customer Success"), sales: t("Sales", "Vertrieb"), data: t("Customer operations", "Customer Operations"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("A referral request by the salesperson after go-live, with a ready intro e-mail", "Eine Empfehlungsbitte der Vertriebsperson nach dem Go-live, mit fertiger Vorstellungs-E-Mail"), lift: 42, cases: 160, revenue: 190000, note: t("No complaints; referred firms closed faster.", "Keine Beschwerden; empfohlene Firmen schlossen schneller ab.") },
  { id: "renewal" as SitId, signal: t("Early access to new modules for members", "Früher Zugang zu neuen Modulen für Mitglieder"), lift: 26, cases: 45, revenue: 80000, note: t("Only 45 renewals fell in the test months.", "In den Testmonaten standen nur 45 Verlängerungen an.") },
  { id: "botname" as SitId, signal: t("Points for every invoice paid on time", "Punkte für jede pünktlich bezahlte Rechnung"), lift: 2, cases: 500, revenue: 8000, note: t("Many customers, almost no difference.", "Viele Kunden, fast kein Unterschied.") },
  { id: "subject" as SitId, signal: t("A monthly member newsletter with tips", "Ein monatlicher Mitglieder-Newsletter mit Tipps"), lift: 5, cases: 280, revenue: 25000, note: t("A small, steady difference.", "Ein kleiner, stabiler Unterschied.") },
  { id: "price" as SitId, signal: t("A €500 cash bonus for every referral submitted", "Eine Geldprämie von 500 € für jede eingereichte Empfehlung"), lift: -7, cases: 150, revenue: -30000, note: t("Referrals tripled, but more were weak; six turned out to be self-referrals.", "Die Empfehlungen verdreifachten sich, aber mehr waren schwach; sechs erwiesen sich als Selbstempfehlungen.") },
  { id: "winback" as SitId, signal: t("An invitation to the regional user group in the first 90 days", "Eine Einladung zur regionalen User Group in den ersten 90 Tagen"), lift: 31, cases: 130, revenue: 140000, note: t("Guardrail: event cost per retained customer stayed within the limit.", "Guardrail: Die Veranstaltungskosten pro gehaltenem Kunden blieben im Rahmen.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["sales"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["csm"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · measures architecture for implementation */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("Membership programme “ConnectIT Plus” with three added values", "Mitgliedsprogramm „ConnectIT Plus“ mit drei Mehrwerten"), what: t("The quarterly review, priority support and training seats, with the rules for who becomes a member and the KPIs to measure it.", "Das Quartalsreview, Prioritätssupport und Schulungsplätze, mit den Regeln, wer Mitglied wird, und den KPIs, um es zu messen."), cost: 50000, weeks: 8, blackBox: false },
  { id: "chat" as ArchId, name: t("Referral programme with a two-sided thank-you", "Empfehlungsprogramm mit beidseitigem Dankeschön"), what: t("A short referral form in the customer portal; when a referred firm signs, both firms get a free training day.", "Ein kurzes Empfehlungsformular im Kundenportal; wenn eine empfohlene Firma unterschreibt, erhalten beide Firmen einen kostenlosen Schulungstag."), cost: 30000, weeks: 4, blackBox: false },
  { id: "personal" as ArchId, name: t("Member community: regional user groups and a customer day", "Mitglieder-Community: regionale User Groups und ein Kundentag"), what: t("Two user group meetings per region a year and one customer day, run with the members.", "Zwei User-Group-Treffen pro Region und Jahr und ein Kundentag, gemeinsam mit den Mitgliedern gestaltet."), cost: 40000, weeks: 8, blackBox: false },
  { id: "routing" as ArchId, name: t("Referral page with customer testimonials", "Empfehlungsseite mit Kundenstimmen"), what: t("A page where referred firms read short statements of existing customers and book a call.", "Eine Seite, auf der empfohlene Firmen kurze Aussagen von Bestandskunden lesen und ein Gespräch buchen."), cost: 15000, weeks: 4, blackBox: false },
  { id: "training" as ArchId, name: t("Member and referral KPIs in the CRM and a monthly review", "Mitglieder- und Empfehlungs-KPIs im CRM und ein monatliches Review"), what: t("Which benefit each member used, which referral became a customer, and a monthly meeting that decides on each part by the KPIs.", "Welchen Vorteil jedes Mitglied nutzte, welche Empfehlung Kunde wurde, und ein monatliches Treffen, das nach den KPIs über jeden Teil entscheidet."), cost: 10000, weeks: 2, blackBox: false },
  { id: "tracking" as ArchId, name: t("Anti-misuse rules for referrals", "Regeln gegen Missbrauch von Empfehlungen"), what: t("A check that the referred firm is new and independent, a cap per customer, and a thank-you only after signing.", "Eine Prüfung, dass die empfohlene Firma neu und unabhängig ist, eine Obergrenze pro Kunde und ein Dankeschön erst nach der Unterschrift."), cost: 15000, weeks: 3, blackBox: false },
  { id: "suite" as ArchId, name: t("AI loyalty engine that sets each customer's reward itself", "KI-Loyalty-Engine, die die Belohnung jedes Kunden selbst festlegt"), what: t("A vendor tool decides every customer's reward or discount by itself; its rules and results are not shown.", "Ein Anbieter-Werkzeug entscheidet die Belohnung oder den Rabatt jedes Kunden selbst; seine Regeln und Ergebnisse werden nicht gezeigt."), cost: 60000, weeks: 10, blackBox: true },
  { id: "relaunch" as ArchId, name: t("10% loyalty discount for every renewal", "10 % Treuerabatt für jede Verlängerung"), what: t("Every customer who renews gets 10% off the next contract year.", "Jeder Kunde, der verlängert, erhält 10 % Rabatt auf das nächste Vertragsjahr."), cost: 80000, weeks: 1, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
export const BASELINE_ITEM: ArchId = "foundation";

export type OwnerId = "cdo" | "datalead" | "cslead" | "saleslead" | "it";
export const OWNER_IDS: OwnerId[] = ["cdo", "datalead", "cslead", "saleslead", "it"];
export const OWNERS = bi({
  cdo: { name: t("Chief Customer Officer (you)", "Chief Customer Officer (Sie)"), profile: t("Decides across teams and answers to the board. Should hold few items.", "Entscheidet über Teams hinweg und berichtet an den Vorstand. Sollte wenige Punkte halten.") },
  datalead: { name: t("Head of Customer Operations", "Leitung Customer Operations"), profile: t("Owns the CRM, the KPIs and their definitions, the checks against misuse and the monthly review.", "Verantwortet das CRM, die KPIs und ihre Definitionen, die Prüfungen gegen Missbrauch und das monatliche Review.") },
  cslead: { name: t("Head of Customer Success", "Leitung Customer Success"), profile: t("Owns the members: the added values, the reviews, the community and the relationship with existing customers.", "Verantwortet die Mitglieder: die Mehrwerte, die Reviews, die Community und die Beziehung zu Bestandskunden.") },
  saleslead: { name: t("Head of Sales", "Vertriebsleitung"), profile: t("Leads the salespeople, follows up referred firms and owns the offers.", "Führt die Vertriebsleute, verfolgt empfohlene Firmen nach und verantwortet die Angebote.") },
  it: { name: t("Head of Marketing", "Marketingleitung"), profile: t("Owns the programme's pages, messages and events communication.", "Verantwortet die Seiten, Botschaften und die Veranstaltungskommunikation des Programms.") },
});
export const OWNER_ACCEPT: Record<ArchId, OwnerId[]> = {
  foundation: ["cslead", "cdo"],
  chat: ["saleslead", "cslead"],
  personal: ["cslead"],
  routing: ["it"],
  training: ["datalead"],
  tracking: ["datalead"],
  suite: ["datalead", "cdo"],
  relaunch: ["cslead", "saleslead"],
};
export const MODEL_ARCH: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking"];
export const MODEL_START: Partial<Record<ArchId, number>> = { foundation: 1, training: 1, tracking: 1, chat: 2, personal: 2, routing: 2 };
export const MODEL_TRIGGER = bi({
  foundation: t("If fewer than 60% of members use at least one added value by month 3, the review drops the least-used benefit and asks members what they miss.", "Nutzen bis Monat 3 weniger als 60 % der Mitglieder mindestens einen Mehrwert, streicht das Review den am wenigsten genutzten Vorteil und fragt Mitglieder, was ihnen fehlt."),
  chat: t("If fewer than 10 referred firms have become customers by month 4, the Head of Sales reviews every open referral with the account managers.", "Sind bis Monat 4 weniger als 10 empfohlene Firmen Kunden geworden, prüft die Vertriebsleitung jede offene Empfehlung mit den Account Managern."),
  personal: t("If fewer than 30% of invited members come to a user group by month 4, the format is changed with the members before the customer day.", "Kommen bis Monat 4 weniger als 30 % der eingeladenen Mitglieder zu einer User Group, wird das Format vor dem Kundentag mit den Mitgliedern geändert."),
  routing: t("If fewer than 20% of referred firms book a call from the page by month 4, the testimonials are rewritten with the customers.", "Buchen bis Monat 4 weniger als 20 % der empfohlenen Firmen über die Seite ein Gespräch, werden die Kundenstimmen mit den Kunden neu geschrieben."),
  training: t("If the benefit or referral fields are empty for more than 20% of customers in any month, the review names the missing records and their owners.", "Sind die Vorteils- oder Empfehlungsfelder in einem Monat bei mehr als 20 % der Kunden leer, nennt das Review die fehlenden Einträge und ihre Owner."),
  tracking: t("If more than 2 referrals a month turn out to be fake or self-referrals, the thank-you is paused until the check is tightened.", "Erweisen sich mehr als 2 Empfehlungen pro Monat als gefälscht oder als Selbstempfehlung, wird das Dankeschön ausgesetzt, bis die Prüfung verschärft ist."),
});

/* ------------------------------------------------------------------ 3.6 · a strategic decision despite an unclear success forecast */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Launch the full programme for every customer at once, with a discount to join", "Das ganze Programm sofort für jeden Kunden starten, mit einem Rabatt fürs Beitreten"), detail: t("From month 1 every customer becomes a member with 10% off, and the cash bonus for referrals starts for everyone.", "Ab Monat 1 wird jeder Kunde Mitglied mit 10 % Rabatt, und die Geldprämie für Empfehlungen startet für alle."), why: t("Fast and visible, and it defends only if customers stay for the discount and refer for the cash without misuse.", "Schnell und sichtbar, und nur vertretbar, wenn Kunden wegen des Rabatts bleiben und für das Geld ohne Missbrauch empfehlen."), rejected: t("Nobody knows yet how customers react; a discount for everyone costs margin on every renewal before anything is measured, and cash for volume invites weak and fake referrals.", "Niemand weiß schon, wie Kunden reagieren; ein Rabatt für alle kostet bei jeder Verlängerung Marge, bevor etwas gemessen ist, und Geld für Menge lädt zu schwachen und gefälschten Empfehlungen ein.") },
  { id: "stage" as DecisionId, label: t("Decide now, pilot with the 150 most active customers, with a tripwire", "Jetzt entscheiden, mit den 150 aktivsten Kunden pilotieren, mit Tripwire"), detail: t("Start in month 1 with the membership's added values, the KPIs and the misuse rules for the 150 most active customers; add the referral programme and the community in month 2; scale to all customers only if the tripwire is met.", "In Monat 1 mit den Mehrwerten der Mitgliedschaft, den KPIs und den Missbrauchsregeln für die 150 aktivsten Kunden starten; in Monat 2 das Empfehlungsprogramm und die Community ergänzen; nur auf alle Kunden ausweiten, wenn der Tripwire erreicht ist."), why: t("It changes something real for customers within weeks, learns what keeps them and what they refer for, and keeps the cost of rewards under control before the programme reaches everyone.", "Es ändert innerhalb von Wochen etwas Echtes für Kunden, lernt, was sie hält und wofür sie empfehlen, und hält die Kosten der Belohnungen unter Kontrolle, bevor das Programm jeden erreicht."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait for a market study on what members want", "Auf eine Marktstudie warten, was Mitglieder wollen"), detail: t("Spend the six months on a study before anything changes for customers.", "Die sechs Monate mit einer Studie verbringen, bevor sich für Kunden etwas ändert."), why: t("", ""), rejected: t("The brief asks for a decision despite an unclear forecast. Customers rarely know in advance what will keep them; they show it by what they use and whether they renew, which only a real programme reveals.", "Der Auftrag verlangt eine Entscheidung trotz unklarer Prognose. Kunden wissen selten im Voraus, was sie halten wird; sie zeigen es daran, was sie nutzen und ob sie verlängern, und das zeigt nur ein echtes Programm.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Renewal rate", "Verlängerungsquote"), unit: "%", baseline: 78, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Customers who used a service in the last 30 days", "Kunden, die in den letzten 30 Tagen einen Service genutzt haben"), unit: "%", baseline: 30, better: "up" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Referral e-mails sent by account managers", "Von Account Managern versandte Empfehlungs-E-Mails"), unit: t("e-mails", "E-Mails"), baseline: 20, better: "up" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Members signed up", "Angemeldete Mitglieder"), unit: t("members", "Mitglieder"), baseline: 0, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("Newsletter opens per month", "Newsletter-Öffnungen pro Monat"), unit: t("opens", "Öffnungen"), baseline: 1200, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
export const MODEL_TRIPWIRE = { kpi: "conv" as KpiId, threshold: 82, month: 6 };
export const R2_BASELINE_NOTE = bi({ v: t("Baselines are Case assumptions from ConnectIT's CRM, support and portal data of the last twelve months.", "Die Ausgangswerte sind Fallannahmen aus CRM-, Support- und Portaldaten von ConnectIT der letzten zwölf Monate.") });
export const BOARD_CHALLENGE = bi({
  v: t(
    "It is month 3. The pilot runs with the 150 most active customers. 55% of members used an added value, but the renewal rate only rose from 78% to 79%, and 6 of the first 40 referrals turned out to be self-referrals. The Head of Sales wants a €500 cash bonus per referral to push volume; finance wants to stop the community because of its cost. The board asks what you do.",
    "Es ist Monat 3. Der Pilot läuft mit den 150 aktivsten Kunden. 55 % der Mitglieder nutzten einen Mehrwert, aber die Verlängerungsquote stieg nur von 78 % auf 79 %, und 6 der ersten 40 Empfehlungen erwiesen sich als Selbstempfehlungen. Die Vertriebsleitung will eine Geldprämie von 500 € pro Empfehlung, um die Menge zu steigern; die Finanzabteilung will die Community wegen ihrer Kosten stoppen. Der Vorstand fragt, was Sie tun.",
  ),
});
