import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or German word that the
 * material or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone
 * who is NOT an expert: short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with the German
 * plural or genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An
 * all-capitals match ("CRM") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  {
    id: "ai",
    title: "AI (artificial intelligence)",
    match: ["AI", "AI-based"],
    plain: "Software that learns patterns from data and uses them to predict or choose: which offer fits, which reward to give. Useful when its results can be measured; risky when nobody can say what it does.",
    from: "Davenport et al. 2020",
    de: { title: "KI (künstliche Intelligenz)", match: ["KI", "KI-gestützt", "KI-gestützte", "KI-gestützten", "KI-gestütztes"], plain: "Software, die Muster aus Daten lernt und damit vorhersagt oder auswählt: welches Angebot passt, welche Belohnung vergeben wird. Nützlich, wenn man ihre Ergebnisse messen kann; riskant, wenn niemand sagen kann, was sie tut." },
  },
  // --- measuring success ---------------------------------------------------------------

  {
    id: "kpi",
    title: "KPI — key performance indicator",
    match: ["KPI", "KPIs"],
    plain: "One number that shows whether something is working. A good KPI measures what customers do (buy, use, stay), not your own activity.",
    from: "Kaplan & Norton 1992",
    de: { match: ["KPI", "KPIs", "KPI-System", "KPI-Kandidat", "KPI-Kandidaten"], plain: "Eine Zahl, die zeigt, ob etwas funktioniert. Ein guter KPI misst, was Kunden tun (kaufen, nutzen, bleiben), nicht Ihre eigene Aktivität." },
  },
  {
    id: "uplift",
    title: "Uplift",
    match: ["uplift", "uplifts"],
    plain: "How much better the new version did than the old one. As a multiple: new rate ÷ old rate; as a percentage: how much more that is.",
    example: "4.8% against 3%: 1.6 times the standard rate, an uplift of 60%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Uplift", match: ["Uplift", "Uplifts"], plain: "Wie viel besser die neue Version abschnitt als die alte. Als Vielfaches: neue Rate ÷ alte Rate; in Prozent: wie viel mehr das ist.", example: "4,8 % gegenüber 3 %: das 1,6-Fache der Standardrate, ein Uplift von 60 %." },
  },
  {
    id: "pilot",
    title: "Pilot",
    match: ["pilot", "pilots"],
    plain: "A small first run of a new measure on part of the customers, to see whether it works before it reaches everyone.",
    de: { title: "Pilot", match: ["Pilot", "Piloten", "pilotieren", "Pilotwerte", "Pilotwerten"], plain: "Ein kleiner erster Durchlauf einer neuen Maßnahme mit einem Teil der Kunden, um zu sehen, ob sie wirkt, bevor sie alle erreicht." },
  },
  {
    id: "ab-test",
    title: "A/B test",
    match: ["A/B test", "A/B tests", "A/B testing", "A/B-testing"],
    plain: "Two versions shown at the same time to two groups chosen by chance: A gets the old version, B the new one. The difference in a KPI shows what the change did.",
    from: "Kohavi et al. 2020",
    de: { title: "A/B-Test", match: ["A/B-Test", "A/B-Tests", "A/B-Testing", "A/B-Testergebnisse"], plain: "Zwei Versionen, gleichzeitig an zwei zufällig gewählte Gruppen gezeigt: A bekommt die alte Version, B die neue. Der Unterschied in einem KPI zeigt, was die Änderung bewirkt hat." },
  },
  {
    id: "control-group",
    title: "Control group",
    match: ["control group", "control groups", "control"],
    exactCase: true,
    plain: "The group in a test that keeps the old version. Without it you cannot tell whether a change caused a difference or something else did.",
    de: { title: "Kontrollgruppe", match: ["Kontrollgruppe", "Kontrollgruppen", "Kontrollrate"], plain: "Die Gruppe in einem Test, die die alte Version behält. Ohne sie lässt sich nicht sagen, ob eine Änderung einen Unterschied verursacht hat oder etwas anderes." },
  },
  {
    id: "hypothesis",
    title: "Hypothesis",
    match: ["hypothesis"],
    plain: "What you expect a test to show, written before it starts: if we change this, then that KPI rises, because of this reason.",
    de: { title: "Hypothese", match: ["Hypothese"], plain: "Was ein Test zeigen soll, vor dem Start aufgeschrieben: Wenn wir dies ändern, steigt jener KPI, aus diesem Grund." },
  },
  {
    id: "sample",
    title: "Sample, sample size",
    match: ["sample", "small sample", "sample size"],
    plain: "The customers or orders a result rests on. With few of them, chance can move the result a lot; about 100 decisions (won or lost) per group is a common minimum before reading a test.",
    de: { title: "Stichprobe", match: ["Stichprobe", "Stichprobengröße", "Mindeststichprobe"], plain: "Die Kunden oder Bestellungen, auf denen ein Ergebnis beruht. Bei wenigen kann der Zufall das Ergebnis stark verschieben; etwa 100 Entscheidungen (gewonnen oder verloren) pro Gruppe sind ein übliches Minimum, bevor man einen Test liest." },
  },
  {
    id: "outcome-kpi",
    title: "Outcome KPI",
    match: ["outcome KPI", "outcome KPIs", "outcome", "outcomes"],
    exactCase: true,
    plain: "A KPI that is the result itself: orders, revenue, customers kept. It moves last and is what management is judged by.",
    from: "Kaplan & Norton 1992",
    de: { title: "Outcome-KPI", match: ["Outcome-KPI", "Outcome-KPIs", "Outcome", "Outcomes"], plain: "Ein KPI, der das Ergebnis selbst ist: Bestellungen, Umsatz, gehaltene Kunden. Er bewegt sich zuletzt, und das Management wird an ihm gemessen." },
  },
  {
    id: "driver-kpi",
    title: "Driver KPI",
    match: ["driver KPI", "driver KPIs", "driver", "drivers"],
    exactCase: true,
    plain: "A customer behaviour that comes before the result and that a team can move this month: members who use a benefit, referrals submitted, customers at the user group.",
    from: "Kaplan & Norton 1992",
    de: { title: "Treiber-KPI", match: ["Treiber-KPI", "Treiber-KPIs", "Treiber"], plain: "Ein Kundenverhalten, das vor dem Ergebnis kommt und das ein Team in diesem Monat bewegen kann: Mitglieder, die einen Vorteil nutzen, eingereichte Empfehlungen, Kunden in der User Group." },
  },
  {
    id: "guardrail",
    title: "Guardrail",
    match: ["guardrail", "guardrails"],
    plain: "A metric that must not get worse while you push the result, such as the cost of rewards per customer kept or fake referrals. If it is crossed, a test or rollout stops.",
    from: "Kohavi et al. 2020",
    de: { title: "Guardrail (Leitplanke)", match: ["Guardrail", "Guardrails", "Guardrail-Kennzahlen"], plain: "Eine Kennzahl, die nicht schlechter werden darf, während Sie das Ergebnis vorantreiben, etwa die Kosten der Belohnungen pro gehaltenem Kunden oder gefälschte Empfehlungen. Wird sie überschritten, stoppt ein Test oder Rollout." },
  },
  {
    id: "vanity",
    title: "Vanity metric",
    match: ["vanity metric", "vanity metrics", "vanity"],
    plain: "A number that looks like progress but counts your own activity or reach (members signed up, newsletters sent, likes) and decides nothing.",
    from: "Ries 2011",
    de: { title: "Vanity Metric", match: ["Vanity Metric", "Vanity Metrics", "Vanity"], plain: "Eine Zahl, die nach Fortschritt aussieht, aber die eigene Aktivität oder Reichweite zählt (angemeldete Mitglieder, versandte Newsletter, Likes) und nichts entscheidet." },
  },
  {
    id: "rollout",
    title: "Rollout",
    match: ["rollout", "roll out", "rolled out"],
    plain: "Giving a tested version to all customers, not just the test group.",
    de: { title: "Rollout", match: ["Rollout", "ausrollen", "ausgerollt"], plain: "Eine getestete Version allen Kunden geben, nicht nur der Testgruppe." },
  },
  {
    id: "ems",
    title: "Retention effect, scalability, economic viability",
    match: ["retention effect", "Retention effect", "scalability", "Scalability", "economic viability", "Economic viability"],
    plain: "The plan's three tests for a retention measure, each Low (1) to High (3), multiplied. Retention effect: how much it keeps or wins customers. Scalability: whether it can grow without its cost growing with it (the same cost however many take part 3, a cost per member or referral 2, staff time per customer 1). Economic viability: whether it pays for itself.",
    example: "Retention effect 2 × scalability 3 × economic viability 2 = 12.",
    de: { title: "Bindungswirkung, Skalierbarkeit, Wirtschaftlichkeit", match: ["Bindungswirkung", "Skalierbarkeit", "Wirtschaftlichkeit", "skalierbar", "skalierbares", "skalierbaren"], plain: "Die drei Tests des Plans für eine Bindungsmaßnahme, jeweils Niedrig (1) bis Hoch (3), multipliziert. Bindungswirkung: wie stark sie Kunden hält oder gewinnt. Skalierbarkeit: ob sie wachsen kann, ohne dass ihre Kosten mitwachsen (dieselben Kosten, egal wie viele teilnehmen 3, Kosten pro Mitglied oder Empfehlung 2, Personalzeit pro Kunde 1). Wirtschaftlichkeit: ob sie sich selbst trägt.", example: "Bindungswirkung 2 × Skalierbarkeit 3 × Wirtschaftlichkeit 2 = 12." },
  },
  {
    id: "black-box",
    title: "Black box",
    match: ["black box", "black-box"],
    plain: "A system whose results you see but whose reasons you cannot. It may be right, but nobody can check it, explain it or measure what it did.",
    de: { title: "Black Box", match: ["Black Box", "Black-Box"], plain: "Ein System, dessen Ergebnisse man sieht, dessen Gründe aber nicht. Es kann stimmen, aber niemand kann es prüfen, erklären oder messen, was es bewirkt hat." },
  },
  // --- general terms kept from the course ------------------------------------------

  {
    id: "churn",
    title: "Churn, churn rate",
    match: ["churn", "churn rate", "churn rates", "churned"],
    plain: "Churn means customers leaving. The churn rate is the share who leave in a period.",
    example: "400 customers and 32 cancellations in a year: a churn rate of 8%.",
    de: { title: "Churn, Churn Rate (Abwanderungsquote)", match: ["Churn", "Churn Rate", "Churn Rates", "Abwanderung"], plain: "Churn heißt, dass Kunden gehen. Die Churn Rate ist der Anteil, der in einem Zeitraum geht.", example: "400 Kunden und 32 Kündigungen in einem Jahr: eine Churn Rate von 8 %." },
  },
  {
    id: "crm",
    title: "CRM — customer relationship management system",
    match: ["CRM"],
    plain: "The software in which a sales team records every customer and deal: contacts, notes, orders, next steps.",
    de: { title: "CRM — Customer Relationship Management", match: ["CRM", "CRM-Daten", "CRM-Notizen"], plain: "Die Software, in der ein Vertriebsteam jeden Kunden und jeden Deal festhält: Kontakte, Notizen, Bestellungen, nächste Schritte." },
  },
  {
    id: "mittelstand",
    title: "Mittelstand (mid-sized companies)",
    match: ["Mittelstand"],
    exactCase: true,
    plain: "The German word for mid-sized, often family-owned companies, the backbone of the German economy. Many have a small IT team or none.",
    de: { title: "Mittelstand", match: ["Mittelstand", "Mittelstandsunternehmen", "Mittelständler"], plain: "Mittelgroße, oft familiengeführte Unternehmen, das Rückgrat der deutschen Wirtschaft. Viele haben ein kleines oder gar kein IT-Team." },
  },
  {
    id: "tripwire",
    title: "Tripwire",
    match: ["tripwire"],
    plain: "A result agreed in advance that makes you change course: a metric, a threshold, a date and an action.",
    example: "If the closing rate is below 7% by month 3, one rule is adjusted.",
    de: { title: "Tripwire", match: ["Tripwire", "Tripwires"], plain: "Ein vorab vereinbartes Ergebnis, bei dem Sie den Kurs ändern: eine Kennzahl, ein Schwellenwert, ein Datum und eine Aktion.", example: "Liegt die Abschlussquote bis Monat 3 unter 7 %, wird eine Regel angepasst." },
  },
  {
    id: "staged",
    title: "Staged decision",
    match: ["staged", "stage it", "in stages"],
    plain: "Deciding the direction now, but committing money in steps, each released only when a checkpoint is met.",
    from: "Courtney et al. 1997",
    de: { title: "Gestufte Entscheidung", match: ["stufenweise", "gestufte", "in Stufen"], plain: "Die Richtung jetzt entscheiden, das Geld aber in Schritten binden, die jeweils erst freigegeben werden, wenn ein Kontrollpunkt erreicht ist." },
  },
  {
    id: "baseline",
    title: "Baseline",
    match: ["baseline", "baselines"],
    plain: "The value of a metric before you change anything. Without it you cannot tell whether a measure made a difference.",
    de: { title: "Baseline (Ausgangswert)", match: ["Baseline", "Ausgangswert", "Ausgangswerte"], plain: "Der Wert einer Kennzahl, bevor Sie etwas ändern. Ohne ihn können Sie nicht sagen, ob eine Maßnahme etwas bewirkt hat." },
  },
  {
    id: "owner",
    title: "Owner",
    match: ["owner", "owners"],
    plain: "The one person who can change a measure without asking anyone else, and who must act when its trigger fires.",
    de: { title: "Owner", match: ["Owner"], plain: "Die eine Person, die eine Maßnahme ändern kann, ohne jemanden zu fragen, und die handeln muss, wenn ihr Trigger auslöst." },
  },
  {
    id: "trigger",
    title: "Trigger",
    match: ["trigger", "triggers", "triggered"],
    plain: "For a funded item: a written rule that says when the owner must act, with a metric, a number, a date and an action.",
    de: { title: "Trigger", match: ["Trigger"], plain: "Bei einem finanzierten Punkt: eine schriftliche Regel, die sagt, wann der Owner handeln muss, mit Kennzahl, Zahl, Datum und Aktion." },
  },
  {
    id: "pickup",
    title: "Pickup point",
    match: ["pickup point"],
    plain: "The number and the date at which you look again at something you postponed. It turns “later” into a decision.",
    de: { title: "Pickup Point", match: ["Pickup Point"], plain: "Die Zahl und das Datum, zu dem Sie etwas Zurückgestelltes wieder ansehen. So wird aus „später“ eine Entscheidung." },
  },
  {
    id: "premortem",
    title: "Premortem",
    match: ["premortem"],
    plain: "Before a plan starts, imagine it has failed and write down why. It brings hidden assumptions into the open.",
    from: "Klein 2007",
    de: { title: "Premortem", match: ["Premortem"], plain: "Bevor ein Plan startet, stellt man sich vor, er sei gescheitert, und schreibt auf, warum. So kommen versteckte Annahmen ans Licht." },
  },
  {
    id: "no-regret",
    title: "No-regret move",
    match: ["no-regret", "no-regret move", "no-regret items"],
    plain: "A step that is right whatever the uncertain facts turn out to be. You can take it now, while you wait for the rest of the evidence.",
    example: "A membership with proven added values helps whichever referral model proves strongest later.",
    from: "Courtney et al. 1997",
    de: { title: "No-regret-Schritt", match: ["No-regret", "No-regret-Punkte", "No-regret-Schritt"], plain: "Ein Schritt, der richtig ist, egal wie die unsicheren Fakten ausfallen. Sie können ihn jetzt gehen, während Sie auf den Rest der Evidenz warten.", example: "Eine Mitgliedschaft mit belegten Mehrwerten hilft jedem Empfehlungsmodell, das sich später als stärkstes erweist." },
  },
  // --- sales figures -------------------------------------------------------------------
  {
    id: "closing",
    title: "Close rate",
    match: ["close rate", "close rates", "closing rate", "closing rates"],
    plain: "The share of leads or offers that became a signed deal: deals ÷ leads × 100.",
    example: "12 deals from 80 leads: 12 ÷ 80 × 100 = 15%.",
    de: { title: "Abschlussquote", match: ["Abschlussquote", "Abschlussquoten"], plain: "Der Anteil der Leads oder Angebote, die zu einem unterschriebenen Auftrag wurden: Abschlüsse ÷ Leads × 100.", example: "12 Abschlüsse aus 80 Leads: 12 ÷ 80 × 100 = 15 %." },
  },
  {
    id: "lift",
    title: "Lift",
    match: ["lift"],
    plain: "How many times better one group did than another: the rate of one group ÷ the rate of the other, for example the close rate of referred leads ÷ that of marketing leads. A lift of 2 means twice as often.",
    example: "18% against 12%: 18 ÷ 12 = a lift of 1.5.",
    de: { title: "Lift", match: ["Lift"], plain: "Wie viel Mal besser eine Gruppe abschnitt als eine andere: die Quote der einen Gruppe ÷ die der anderen, etwa die Abschlussquote empfohlener Leads ÷ die der Marketing-Leads. Ein Lift von 2 heißt doppelt so oft.", example: "18 % gegenüber 12 %: 18 ÷ 12 = ein Lift von 1,5." },
  },

  {
    id: "roadmap",
    title: "Roadmap",
    match: ["roadmap", "roadmaps"],
    plain: "A plan of what is done in which order over the coming months, with a start, an owner and a checkpoint for each item.",
    de: { title: "Roadmap", match: ["Roadmap", "Roadmap-Punkte"], plain: "Ein Plan, was in den kommenden Monaten in welcher Reihenfolge getan wird, mit Start, Owner und Prüfpunkt für jeden Punkt." },
  },

  {
    id: "b2b",
    title: "B2B — business to business",
    match: ["B2B"],
    exactCase: true,
    plain: "Selling to companies rather than to private people. The buyer is often a group (the user, the IT lead, the managing director), and each person may care about something different.",
    de: { title: "B2B — Business to Business", match: ["B2B", "B2B-Vertrieb", "B2B-Kaufs", "B2B-Käufer"], plain: "Verkaufen an Unternehmen statt an Privatpersonen. Der Käufer ist oft eine Gruppe (der Nutzer, die IT-Leitung, die Geschäftsführung), und jede Person kann auf etwas anderes achten." },
  },
  {
    id: "reference",
    title: "Reference customer",
    match: ["reference customer", "reference customers", "reference", "references"],
    plain: "An existing customer who agrees that a firm considering you may call them and ask how it really went. Strong proof, and a way to use a satisfied customer who has nobody to refer.",
    de: { title: "Referenzkunde", match: ["Referenzkunde", "Referenzkunden", "Referenz", "Referenzen", "Referenzgespräch"], plain: "Ein Bestandskunde, der zustimmt, dass eine interessierte Firma ihn anrufen und fragen darf, wie es wirklich lief. Ein starker Beleg und ein Weg, einen zufriedenen Kunden zu nutzen, der niemanden zum Empfehlen hat." },
  },
  {
    id: "coaching",
    title: "Coaching reflection",
    match: ["coaching reflection", "coaching"],
    plain: "A short guided look back at your own work: what surprised you, what you would do differently, what you take into your next conversation.",
    de: { title: "Coaching-Reflexion", match: ["Coaching-Reflexion", "Coaching"], plain: "Ein kurzer angeleiteter Rückblick auf die eigene Arbeit: was Sie überrascht hat, was Sie anders machen würden, was Sie ins nächste Gespräch mitnehmen." },
  },

  // --- memberships, referrals and retention ------------------------------------------
  {
    id: "retention",
    title: "Customer retention",
    match: ["customer retention", "retention"],
    plain: "Keeping customers: whether they renew, stay and buy again. Different from satisfaction (how they feel) and loyalty (their willingness to stay and recommend): a satisfied customer can still leave.",
    from: "Reichheld & Sasser 1990",
    de: { title: "Kundenbindung", match: ["Kundenbindung", "Bindung", "Retention"], plain: "Kunden halten: ob sie verlängern, bleiben und wieder kaufen. Anders als Zufriedenheit (wie sie sich fühlen) und Loyalität (ihre Bereitschaft zu bleiben und zu empfehlen): Ein zufriedener Kunde kann trotzdem gehen." },
  },
  {
    id: "transactional",
    title: "Transactional retention",
    match: ["transactional retention", "transactional"],
    plain: "Keeping customers by paying them to stay: a discount, points, a gift or a lock-in. It starts quickly, costs margin on every renewal and holds only until someone pays more.",
    from: "Dowling & Uncles 1997",
    de: { title: "Transaktionale Kundenbindung", match: ["transaktionale", "transaktionaler", "transaktional"], plain: "Kunden halten, indem man sie fürs Bleiben bezahlt: ein Rabatt, Punkte, ein Geschenk oder eine Bindungsfrist. Sie startet schnell, kostet bei jeder Verlängerung Marge und hält nur, bis jemand mehr zahlt." },
  },
  {
    id: "relational",
    title: "Relational retention",
    match: ["relational retention", "relational"],
    plain: "Keeping customers through value they would lose by leaving: a service that works for them, people they trust, a community of peers. It takes longer to build and lasts, because a competitor cannot copy it with a lower price.",
    de: { title: "Relationale Kundenbindung", match: ["relationale", "relationaler", "relational"], plain: "Kunden halten über Wert, den sie beim Gehen verlören: ein Service, der für sie funktioniert, Menschen, denen sie vertrauen, eine Community von anderen Kunden. Sie braucht länger zum Aufbau und hält, weil ein Wettbewerber sie mit einem niedrigeren Preis nicht kopieren kann." },
  },
  {
    id: "loyalty",
    title: "Loyalty, satisfaction",
    match: ["loyalty", "loyal", "satisfaction", "satisfied"],
    plain: "Satisfaction is how customers feel about you; loyalty is their willingness to stay and recommend you; retention is whether they actually renew. Satisfaction is necessary for the other two, but not enough.",
    de: { title: "Loyalität, Zufriedenheit", match: ["Loyalität", "loyal", "Zufriedenheit", "zufrieden", "zufriedene", "zufriedenen", "zufriedensten"], plain: "Zufriedenheit ist, wie Kunden über Sie denken; Loyalität ihre Bereitschaft zu bleiben und Sie zu empfehlen; Bindung, ob sie tatsächlich verlängern. Zufriedenheit ist für die beiden anderen nötig, aber nicht genug." },
  },
  {
    id: "membership",
    title: "Membership model",
    match: ["membership model", "membership models", "membership", "memberships", "member", "members"],
    plain: "A programme that gives customers something for belonging: an incentive, a service added value or a community. It retains when what it gives would be lost by leaving.",
    from: "Bolton et al. 2000",
    de: { title: "Mitgliedsmodell", match: ["Mitgliedsmodell", "Mitgliedsmodelle", "Mitgliedschaft", "Mitgliedschaften", "Mitglied", "Mitglieder", "Mitgliedern"], plain: "Ein Programm, das Kunden etwas dafür gibt, dass sie dazugehören: einen Anreiz, einen Service-Mehrwert oder eine Community. Es bindet, wenn das, was es gibt, beim Gehen verloren ginge." },
  },
  {
    id: "incentive",
    title: "Incentive",
    match: ["incentive", "incentives"],
    plain: "Money or its equivalent (a discount, points, a voucher, a gift) given for a behaviour. It changes behaviour quickly and is easy to copy; a wrong incentive rewards the wrong behaviour.",
    de: { title: "Anreiz", match: ["Anreiz", "Anreize", "Anreizen"], plain: "Geld oder etwas Gleichwertiges (ein Rabatt, Punkte, ein Gutschein, ein Geschenk), gegeben für ein Verhalten. Er ändert Verhalten schnell und ist leicht zu kopieren; ein falscher Anreiz belohnt das falsche Verhalten." },
  },
  {
    id: "added-value",
    title: "Added value",
    match: ["added value", "added values", "service added value"],
    plain: "Something that makes the product or the relationship worth more to the customer: faster help, advice, training, contact with peers. The customer receives know-how or help, not money.",
    de: { title: "Mehrwert", match: ["Mehrwert", "Mehrwerte", "Mehrwerten", "Service-Mehrwert", "Service-Mehrwerte"], plain: "Etwas, das das Produkt oder die Beziehung für den Kunden mehr wert macht: schnellere Hilfe, Beratung, Schulung, Kontakt zu anderen. Der Kunde erhält Know-how oder Hilfe, kein Geld." },
  },
  {
    id: "community",
    title: "Community, user group",
    match: ["community", "user group", "user groups"],
    plain: "Customers who meet each other and the company's people, in a user group, a forum or at a customer day. The relationships belong to the customers, which is why a community retains.",
    from: "McAlexander et al. 2002",
    de: { title: "Community, User Group", match: ["Community", "User Group", "User Groups", "User-Group-Treffen"], plain: "Kunden, die einander und die Menschen des Unternehmens treffen, in einer User Group, einem Forum oder bei einem Kundentag. Die Beziehungen gehören den Kunden, und darum bindet eine Community." },
  },
  {
    id: "referral",
    title: "Referral, referral marketing",
    match: ["referral marketing", "referral programme", "referral", "referrals", "refer", "refers", "referred"],
    plain: "An existing customer introduces a firm that might buy. Referral marketing makes this systematic: asking the right customers at the right moment and thanking them. It works because people trust a peer more than an advert.",
    from: "Schmitt et al. 2011",
    de: { title: "Empfehlung, Empfehlungsmarketing", match: ["Empfehlungsmarketing", "Empfehlungsprogramm", "Empfehlungsmodell", "Empfehlung", "Empfehlungen", "empfehlen", "empfiehlt", "empfohlene", "empfohlenen", "empfohlener"], plain: "Ein Bestandskunde stellt eine Firma vor, die kaufen könnte. Empfehlungsmarketing macht das systematisch: die richtigen Kunden im richtigen Moment fragen und ihnen danken. Es wirkt, weil Menschen einem Kollegen mehr vertrauen als einer Anzeige." },
  },
  {
    id: "multiplier",
    title: "Multiplier",
    match: ["multiplier", "multipliers"],
    plain: "A customer who spreads the word to others who could buy. A multiplier needs two things: satisfied enough to vouch for you, and in contact with peers.",
    from: "Kumar et al. 2010",
    de: { title: "Multiplikator", match: ["Multiplikator", "Multiplikatoren"], plain: "Ein Kunde, der anderen, die kaufen könnten, von Ihnen erzählt. Ein Multiplikator braucht zweierlei: zufrieden genug, um für Sie einzustehen, und in Kontakt mit anderen." },
  },
  {
    id: "lead",
    title: "Lead",
    match: ["lead", "leads"],
    plain: "A firm that has shown interest and might become a customer, from marketing (ads, fairs, calls) or from a referral.",
    de: { title: "Lead", match: ["Lead", "Leads", "Marketing-Leads"], plain: "Eine Firma, die Interesse gezeigt hat und Kunde werden könnte, aus dem Marketing (Anzeigen, Messen, Anrufe) oder aus einer Empfehlung." },
  },
  {
    id: "wrong-incentive",
    title: "Wrong incentive",
    match: ["wrong incentive", "wrong incentives", "self-referral", "self-referrals"],
    plain: "A reward that pays for the wrong behaviour: cash per referral pays for names, not customers, invites fake and self-referrals, and can make people less willing to help than no reward at all.",
    from: "Gneezy & Rustichini 2000",
    de: { title: "Falscher Anreiz", match: ["falsche Anreize", "falscher Anreiz", "falschen Anreize", "falschen Anreizen", "Selbstempfehlung", "Selbstempfehlungen"], plain: "Eine Belohnung, die für das falsche Verhalten zahlt: Geld pro Empfehlung zahlt für Namen, nicht für Kunden, lädt zu gefälschten und Selbstempfehlungen ein und kann Menschen weniger hilfsbereit machen als gar keine Belohnung." },
  },
  {
    id: "margin",
    title: "Margin",
    match: ["margin"],
    plain: "What is left of the price after the costs of delivering it. A discount comes straight out of the margin.",
    example: "A €10,000 contract with €7,000 of costs has €3,000 of margin; 10% off leaves €2,000.",
    de: { title: "Marge", match: ["Marge"], plain: "Was vom Preis nach den Kosten der Leistung übrig bleibt. Ein Rabatt geht direkt von der Marge ab.", example: "Ein Vertrag über 10.000 € mit 7.000 € Kosten hat 3.000 € Marge; 10 % Rabatt lassen 2.000 €." },
  },
  {
    id: "cco",
    title: "CCO — Chief Customer Officer",
    match: ["CCO", "Chief Customer Officer"],
    plain: "The manager who answers for customers across the whole company: how many stay, how they are served and how they grow, and who reports to the board.",
    de: { match: ["CCO", "Chief Customer Officer"], plain: "Die Führungskraft, die für die Kunden im ganzen Unternehmen verantwortlich ist: wie viele bleiben, wie sie betreut werden und wie sie wachsen, und die an den Vorstand berichtet." },
  },
  {
    id: "customer-success",
    title: "Customer Success",
    match: ["Customer Success"],
    exactCase: true,
    plain: "The team that makes sure existing customers get value from what they bought: reviews, advice, training, and the relationship that leads to renewals.",
    de: { title: "Customer Success", match: ["Customer Success", "Customer-Success-Team"], plain: "Das Team, das dafür sorgt, dass Bestandskunden Wert aus dem ziehen, was sie gekauft haben: Reviews, Beratung, Schulung und die Beziehung, die zu Verlängerungen führt." },
  },
  {
    id: "customer-ops",
    title: "Customer operations",
    match: ["customer operations", "Customer Operations"],
    plain: "The team behind Customer Success and sales: it runs the CRM, defines and reports the KPIs, checks referrals against misuse and prepares the monthly review.",
    de: { title: "Customer Operations", match: ["Customer Operations"], plain: "Das Team hinter Customer Success und Vertrieb: Es betreibt das CRM, definiert und berichtet die KPIs, prüft Empfehlungen auf Missbrauch und bereitet das monatliche Review vor." },
  },
  {
    id: "qbr",
    title: "Quarterly business review",
    match: ["quarterly business review", "quarterly review"],
    plain: "A meeting every three months in which a named expert goes through the customer's setup with them and shows what to use next. A natural moment to ask a satisfied customer for a referral.",
    de: { title: "Quartalsreview", match: ["Quartalsreview"], plain: "Ein Treffen alle drei Monate, in dem ein benannter Experte mit dem Kunden sein Setup durchgeht und zeigt, was er als Nächstes nutzen kann. Ein natürlicher Moment, einen zufriedenen Kunden um eine Empfehlung zu bitten." },
  },
  {
    id: "testimonial",
    title: "Testimonial",
    match: ["testimonial", "testimonials"],
    plain: "A short statement by a customer, with their name, about what the company did for them. Useful from a satisfied customer who has nobody to refer.",
    de: { title: "Testimonial", match: ["Testimonial", "Testimonials", "Kundenstimmen"], plain: "Eine kurze Aussage eines Kunden, mit Namen, darüber, was das Unternehmen für ihn getan hat. Nützlich von einem zufriedenen Kunden, der niemanden zum Empfehlen hat." },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
