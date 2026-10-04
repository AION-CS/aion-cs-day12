import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four kinds of metric (Materi A5) and twelve metrics ConnectIT reports today about retention, memberships and
 * referrals, each with whether it moved together with customer value last year; the A/B test card of Block 2.3 (Materi A6).
 * (Identifiers keep the names of the file this was built from: a "pattern" is a kind of metric, a "record" is one metric, and the
 * outcome "left" means "moved with customer value".) Every figure is a Case assumption. `truth` is never printed outside the mentor
 * answer key. Counts are 3/3/3/3.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: customers kept, revenue from existing customers, new customers won. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: gehaltene Kunden, Umsatz mit Bestandskunden, gewonnene Neukunden. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, or customers won or kept?", "Ist es Geld, oder gewonnene oder gehaltene Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("Something customers do before the result that a team can move this month: members who use a benefit, referrals submitted, customers who come to the user group.", "Etwas, das Kunden vor dem Ergebnis tun und das ein Team diesen Monat bewegen kann: Mitglieder, die einen Vorteil nutzen, eingereichte Empfehlungen, Kunden, die zur User Group kommen."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Does it come before the renewal or the new deal, and can a team change it this month?", "Kommt es vor der Verlängerung oder dem neuen Abschluss, und kann ein Team es diesen Monat ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you build memberships and referrals: the cost of rewards, fake referrals, customers annoyed by being asked.", "Etwas, das nicht schlechter werden darf, während Sie Mitgliedschaften und Empfehlungen aufbauen: die Kosten der Belohnungen, gefälschte Empfehlungen, Kunden, die sich durch Nachfragen gestört fühlen."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop an approach if this got worse, even while renewals rise?", "Würden Sie einen Ansatz stoppen, wenn das schlechter wird, auch wenn die Verlängerungen steigen?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts our own activity or reach: members signed up, newsletters sent, likes. Looks like progress, decides nothing.", "Zählt unsere eigene Aktivität oder Reichweite: angemeldete Mitglieder, versandte Newsletter, Likes. Sieht nach Fortschritt aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what we did or how many signed up or passed by, rather than what customers did?", "Zählt es, was wir taten oder wie viele sich anmeldeten oder vorbeikamen, statt was Kunden taten?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, customers kept, customers won) or something customers do that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, gehaltene Kunden, gewonnene Kunden) oder etwas, das Kunden tun und das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("Signing up costs a customer one click; using a benefit takes a decision. A driver counts use and action (a benefit used, a referral submitted), not membership or reach.", "Anmelden kostet einen Kunden einen Klick; einen Vorteil nutzen erfordert eine Entscheidung. Ein Treiber zählt Nutzung und Handlung (ein genutzter Vorteil, eine eingereichte Empfehlung), nicht Mitgliedschaft oder Reichweite.") },
  { pair: t("Guardrail or driver?", "Guardrail oder Treiber?"), test: t("A driver is pushed; a guardrail is only watched so that it does not get worse. You would never set a target to raise the cost of rewards.", "Ein Treiber wird vorangetrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, die Kosten der Belohnungen zu erhöhen.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Share of customers who renew their contract.", "Anteil der Kunden, die ihren Vertrag verlängern."), truth: "outcome" as PatternId, clue: t("Customers kept: the result, or a step on the way?", "Gehaltene Kunden: das Ergebnis oder ein Schritt auf dem Weg?"), why: t("Customers kept are the result the retention programme is for: an outcome KPI.", "Gehaltene Kunden sind das Ergebnis, für das das Bindungsprogramm da ist: ein Outcome-KPI."), rejected: { driver: t("A renewal is the result itself, not something that leads to it.", "Eine Verlängerung ist das Ergebnis selbst, nicht etwas, das dazu führt.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Revenue from existing customers per quarter.", "Umsatz mit Bestandskunden pro Quartal."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue is money: an outcome KPI, and it moves last.", "Umsatz ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue this month directly; it follows the drivers.", "Niemand kann den Umsatz diesen Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("New customers won through referrals per quarter.", "Über Empfehlungen gewonnene Neukunden pro Quartal."), truth: "outcome" as PatternId, clue: t("A signed customer, or a step before signing?", "Ein unterschriebener Kunde oder ein Schritt vor der Unterschrift?"), why: t("Customers won are a result: an outcome KPI. The referral submitted comes before it (M-05).", "Gewonnene Kunden sind ein Ergebnis: ein Outcome-KPI. Die eingereichte Empfehlung kommt davor (M-05)."), rejected: { driver: t("A referral is a driver; a referral that became a customer is the result.", "Eine Empfehlung ist ein Treiber; eine Empfehlung, die zum Kunden wurde, ist das Ergebnis.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Share of members who used at least one member benefit in the last 30 days.", "Anteil der Mitglieder, die in den letzten 30 Tagen mindestens einen Mitgliedervorteil genutzt haben."), truth: "driver" as PatternId, clue: t("Does it come before the renewal, and can a team move it this month?", "Kommt es vor der Verlängerung, und kann ein Team es diesen Monat bewegen?"), why: t("A member who uses a benefit comes before a renewal, and Customer Success can raise it at once: a driver KPI.", "Ein Mitglied, das einen Vorteil nutzt, kommt vor der Verlängerung, und Customer Success kann es sofort steigern: ein Treiber-KPI."), rejected: { vanity: t("It counts use, not sign-ups: customers had to act.", "Es zählt Nutzung, nicht Anmeldungen: Kunden mussten handeln.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Referrals submitted per 100 customers.", "Eingereichte Empfehlungen pro 100 Kunden."), truth: "driver" as PatternId, clue: t("A customer's action on the way to a new customer. Is it the new customer?", "Eine Handlung des Kunden auf dem Weg zu einem Neukunden. Ist es der Neukunde?"), why: t("A customer acts before any new deal, and the programme can change it: a driver KPI.", "Ein Kunde handelt vor jedem neuen Abschluss, und das Programm kann das ändern: ein Treiber-KPI."), rejected: { outcome: t("A submitted referral is not yet a customer; M-03 counts those.", "Eine eingereichte Empfehlung ist noch kein Kunde; M-03 zählt diese.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of customers who came to a user group meeting this year.", "Anteil der Kunden, die dieses Jahr zu einem User-Group-Treffen kamen."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose action is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Handlung ist es?"), why: t("Coming to a meeting is a customer's action before a renewal, and the community team can change it: a driver KPI. It did not move with value last year, which is a finding, not another kind.", "Zu einem Treffen zu kommen ist eine Handlung des Kunden vor der Verlängerung, und das Community-Team kann sie ändern: ein Treiber-KPI. Sie bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art."), rejected: { vanity: t("Customers had to come in person; it is not our activity or reach.", "Kunden mussten persönlich kommen; es ist nicht unsere Aktivität oder Reichweite.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Cost of rewards and discounts per customer kept.", "Kosten der Belohnungen und Rabatte pro gehaltenem Kunden."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("Retention bought with ever bigger rewards is not viable: a guardrail on economic viability.", "Mit immer größeren Belohnungen gekaufte Bindung ist nicht wirtschaftlich: eine Guardrail für die Wirtschaftlichkeit."), rejected: { outcome: t("It is a cost, not the result ConnectIT is paid for.", "Es sind Kosten, nicht das Ergebnis, für das ConnectIT bezahlt wird.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Referrals rewarded that turned out to be fake or self-referrals, per month.", "Belohnte Empfehlungen, die sich als gefälscht oder als Selbstempfehlung erwiesen, pro Monat."), truth: "guardrail" as PatternId, clue: t("If this rose while referrals rose, would you stop?", "Würden Sie stoppen, wenn das stiege, während die Empfehlungen steigen?"), why: t("A limit on misuse: a reward that invites fake referrals costs money and trust. A guardrail.", "Eine Grenze für Missbrauch: Eine Belohnung, die zu gefälschten Empfehlungen einlädt, kostet Geld und Vertrauen. Eine Guardrail."), rejected: { driver: t("Nobody would push it up; it is watched so that it stays low.", "Niemand würde es steigern; es wird beobachtet, damit es niedrig bleibt.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Customers who complain about being asked for referrals too often, per 1,000 contacts.", "Kunden, die sich beschweren, zu oft nach Empfehlungen gefragt zu werden, pro 1.000 Kontakte."), truth: "guardrail" as PatternId, clue: t("Is this a result, something you push, or a limit you watch?", "Ist das ein Ergebnis, etwas, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("Asking too often turns a promoter into a critic: a guardrail on the relationship.", "Zu oft zu fragen macht aus einem Promoter einen Kritiker: eine Guardrail für die Beziehung."), rejected: { vanity: t("It is what customers feel, not what ConnectIT produced.", "Es ist, was Kunden empfinden, nicht was ConnectIT produziert hat.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("Members signed up for the programme.", "Für das Programm angemeldete Mitglieder."), truth: "vanity" as PatternId, clue: t("Signing up takes one click. Did anyone stay longer because of it?", "Anmelden dauert einen Klick. Ist deswegen jemand länger geblieben?"), why: t("It counts sign-ups, not use or renewals: a vanity metric. What members do (M-04) is what counts.", "Es zählt Anmeldungen, nicht Nutzung oder Verlängerungen: eine Vanity Metric. Was Mitglieder tun (M-04), zählt."), rejected: { driver: t("A driver needs the customer to act; being on a list is not acting.", "Ein Treiber verlangt, dass der Kunde handelt; auf einer Liste zu stehen ist kein Handeln.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Member newsletters sent per month.", "Versandte Mitglieder-Newsletter pro Monat."), truth: "vanity" as PatternId, clue: t("Who acted: customers, or ConnectIT?", "Wer hat gehandelt: Kunden oder ConnectIT?"), why: t("It counts ConnectIT's own activity: a vanity metric.", "Es zählt die eigene Aktivität von ConnectIT: eine Vanity Metric."), rejected: { driver: t("Sending is what ConnectIT does; a driver is something customers do.", "Versenden ist, was ConnectIT tut; ein Treiber ist etwas, das Kunden tun.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Likes on community posts on social media.", "Likes auf Community-Posts in Social Media."), truth: "vanity" as PatternId, clue: t("Does a like count what customers did with ConnectIT?", "Zählt ein Like, was Kunden mit ConnectIT taten?"), why: t("Reach among whoever follows: a vanity metric.", "Reichweite bei denen, die folgen: eine Vanity Metric."), rejected: { guardrail: t("Nobody would stop a measure because likes rose or fell; it is only reach.", "Niemand würde eine Maßnahme stoppen, weil Likes stiegen oder fielen; es ist nur Reichweite.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ outcome: 0, driver: 0, guardrail: 0, vanity: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to value, what each kind tells management, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to customer value from last year: half or more of the kind's metrics moved with customer value = Strong; some did = Partial; none did = None.", "Verbindung zum Kundenwert aus dem letzten Jahr: Die Hälfte oder mehr der Kennzahlen dieser Art bewegte sich mit dem Kundenwert = Stark; einige = Teilweise; keine = Keine.") });

export type MeaningId = "result" | "early" | "limit" | "activity";
export const MEANINGS = bi([
  { id: "result" as MeaningId, label: t("The result we are paid for; it moves last", "Das Ergebnis, für das wir bezahlt werden; es bewegt sich zuletzt") },
  { id: "early" as MeaningId, label: t("An early signal a team can move this month", "Ein frühes Signal, das ein Team diesen Monat bewegen kann") },
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we build memberships and referrals", "Eine Grenze: Sie darf nicht schlechter werden, während wir Mitgliedschaften und Empfehlungen aufbauen") },
  { id: "activity" as MeaningId, label: t("Our own activity or reach; it says nothing about customers", "Unsere eigene Aktivität oder Reichweite; sie sagt nichts über Kunden") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the Customer Success team and review it every week", "Es dem Customer-Success-Team geben und jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a test or a rollout when it is crossed", "Eine Grenze setzen, die einen Test oder Rollout stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("45 deals from referrals is a small base; another year would confirm the lift", "45 Abschlüsse aus Empfehlungen sind eine kleine Basis; ein weiteres Jahr würde den Lift bestätigen"), real: true, why: t("With fewer than about 100 deals per group, a few deals more or less move the lift a lot (Materi A6).", "Bei weniger als etwa 100 Abschlüssen pro Gruppe verschieben ein paar Abschlüsse mehr oder weniger den Lift stark (Materi A6).") },
  { id: "cause" as UncId, label: t("Referred firms may have been warmer to begin with, so the referral may not be the whole cause", "Empfohlene Firmen waren vielleicht von Anfang an wärmer, also ist die Empfehlung vielleicht nicht die ganze Ursache"), real: true, why: t("Happy customers tend to refer firms like themselves, which were likely to buy anyway. Only a fair test shows how much the referral adds.", "Zufriedene Kunden empfehlen eher Firmen wie sich selbst, die wahrscheinlich ohnehin gekauft hätten. Nur ein fairer Test zeigt, wie viel die Empfehlung beiträgt.") },
  { id: "missing" as UncId, label: t("Referrals made by phone without the form are not counted at all", "Empfehlungen, die telefonisch ohne das Formular kamen, werden gar nicht gezählt"), real: true, why: t("What is not recorded cannot be counted; the real figures may differ in either direction.", "Was nicht erfasst wird, kann nicht gezählt werden; die echten Zahlen können in beide Richtungen abweichen.") },
  { id: "shift" as UncId, label: t("A new competitor or a price war can change how many customers stay and refer next year", "Ein neuer Wettbewerber oder ein Preiskampf kann ändern, wie viele Kunden im nächsten Jahr bleiben und empfehlen"), real: true, why: t("A forecast assumes the past repeats; a changed market changes who stays and who refers.", "Eine Prognose nimmt an, dass sich die Vergangenheit wiederholt; ein veränderter Markt ändert, wer bleibt und wer empfiehlt.") },
  { id: "objective" as UncId, label: t("The bigger the reward, the more good referrals", "Je größer die Belohnung, desto mehr gute Empfehlungen"), real: false, why: t("A big cash reward brings more referrals, but more of them are weak or fake, and it turns a trusted advice into a paid one (Materi A6).", "Eine große Geldprämie bringt mehr Empfehlungen, aber mehr davon sind schwach oder gefälscht, und sie macht aus einem vertrauten Rat einen bezahlten (Materi A6).") },
  { id: "highsafe" as UncId, label: t("Every satisfied customer will refer if asked", "Jeder zufriedene Kunde empfiehlt, wenn man ihn fragt"), real: false, why: t("A customer without contact to peers has nobody to refer to; satisfaction is necessary, not enough (Materi A3).", "Ein Kunde ohne Kontakt zu anderen hat niemanden, dem er empfehlen kann; Zufriedenheit ist nötig, aber nicht genug (Materi A3).") },
  { id: "moredata" as UncId, label: t("A membership keeps customers whatever the product does", "Eine Mitgliedschaft hält Kunden, egal was das Produkt leistet"), real: false, why: t("Members stay for added value; if the product fails, a membership card does not hold them (Materi A1).", "Mitglieder bleiben wegen des Mehrwerts; wenn das Produkt versagt, hält sie keine Mitgliedskarte (Materi A1).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only the ask: a referral request at the quarterly review, with a ready-made intro e-mail", "Nur die Bitte: eine Empfehlungsbitte im Quartalsreview, mit einer fertigen Vorstellungs-E-Mail"), right: true, clue: t("", "") },
      { id: "three", label: t("The ask, a €500 reward and a new membership tier, all at once", "Die Bitte, eine Prämie von 500 € und eine neue Mitgliedsstufe, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("The ask for large customers, nothing for small ones", "Die Bitte für große Kunden, nichts für kleine"), right: false, clue: t("Are large and small customers the same kind of customer in the same situation?", "Sind große und kleine Kunden dieselbe Art Kunde in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Whose reviews go ahead without the ask, to compare against.", "Wessen Reviews ohne die Bitte stattfinden, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the customers with a review, in the same weeks", "Eine zufällige Hälfte der Kunden mit Review, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last year's reviews, before the ask existed", "Die Reviews des letzten Jahres, bevor es die Bitte gab"), right: false, clue: t("Are these the same customers, at the same time, under the same conditions?", "Sind das dieselben Kunden, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Customers the account manager chose not to ask", "Kunden, die der Account Manager nicht fragen wollte"), right: false, clue: t("Who chose to be in this group: chance, or the account managers themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Account Manager selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Referred leads that became customers, within 90 days", "Empfohlene Leads, die innerhalb von 90 Tagen Kunden wurden"), right: true, clue: t("", "") },
      { id: "opens", label: t("Customers who said they would be happy to refer", "Kunden, die sagten, sie würden gern empfehlen"), right: false, clue: t("The problem in the brief is expensive new customer acquisition. Does a promise to refer tell you whether a new customer came?", "Das Problem im Auftrag ist teure Neukundengewinnung. Sagt ein Versprechen zu empfehlen, ob ein Neukunde kam?") },
      { id: "sent", label: t("Intro e-mails sent by account managers", "Von Account Managern versandte Vorstellungs-E-Mails"), right: false, clue: t("Which kind of metric counts what ConnectIT sent rather than what customers did?", "Welche Art von Kennzahl zählt, was ConnectIT versandt hat, statt was Kunden taten?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 referred leads decided (won or lost), and at least one full sales cycle", "Vorab festgelegt: bis in jeder Gruppe etwa 100 empfohlene Leads entschieden sind (gewonnen oder verloren), und mindestens ein voller Verkaufszyklus"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the ask group is ahead", "Stoppen, sobald die Gruppe mit der Bitte vorn liegt"), right: false, clue: t("A count of new customers swings with every deal. What happens if you stop at a lucky moment?", "Eine Zahl von Neukunden schwankt mit jedem Abschluss. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("Two weeks of reviews, for a fast answer", "Zwei Wochen Reviews, für eine schnelle Antwort"), right: false, clue: t("How many referred firms become customers within two weeks?", "Wie viele empfohlene Firmen werden innerhalb von zwei Wochen Kunden?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);

/** The decisive phrase inside each metric's own text, for "Highlight the key words" (never which kind it points to). */
export const REC_KEY: Record<string, string> = bi({
  p01: t("customers who renew their contract", "Kunden, die ihren Vertrag verlängern"),
  p02: t("Revenue from existing customers per quarter", "Umsatz mit Bestandskunden pro Quartal"),
  p03: t("New customers won through referrals", "Über Empfehlungen gewonnene Neukunden"),
  p04: t("used at least one member benefit in the last 30 days", "in den letzten 30 Tagen mindestens einen Mitgliedervorteil genutzt haben"),
  p05: t("Referrals submitted per 100 customers", "Eingereichte Empfehlungen pro 100 Kunden"),
  p06: t("came to a user group meeting this year", "dieses Jahr zu einem User-Group-Treffen kamen"),
  p07: t("Cost of rewards and discounts per customer kept", "Kosten der Belohnungen und Rabatte pro gehaltenem Kunden"),
  p08: t("turned out to be fake or self-referrals", "als gefälscht oder als Selbstempfehlung erwiesen"),
  p09: t("complain about being asked for referrals too often", "sich beschweren, zu oft nach Empfehlungen gefragt zu werden"),
  p10: t("Members signed up for the programme", "Für das Programm angemeldete Mitglieder"),
  p11: t("Member newsletters sent per month", "Versandte Mitglieder-Newsletter pro Monat"),
  p12: t("Likes on community posts", "Likes auf Community-Posts"),
});
