import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Nine benefits from ConnectIT's first draft of a membership programme, collected from three teams. The learner
 * tags each with the kind of value it gives (Materi A1–A2): an incentive, a service added value or a community. (The identifiers keep
 * the names of the sort board this file was built from: a "line" is one benefit, a "level tag" is its kind; the ids
 * respond/personal/learn now mean incentive/service/community.) `truth` is never shown outside the mentor answer key.
 */
export type LevelTag = "respond" | "personal" | "learn";
export const LEVEL_TAGS = bi([
  { id: "respond" as LevelTag, label: t("Incentive", "Anreiz"), hint: t("Money, points or a discount: it pays the customer to stay, and a competitor can match it tomorrow.", "Geld, Punkte oder ein Rabatt: Es bezahlt den Kunden fürs Bleiben, und ein Wettbewerber kann es morgen überbieten.") },
  { id: "personal" as LevelTag, label: t("Service added value", "Service-Mehrwert"), hint: t("It makes the product work better for this customer: faster help, advice, training, a review.", "Es lässt das Produkt für diesen Kunden besser funktionieren: schnellere Hilfe, Beratung, Schulung, ein Review.") },
  { id: "learn" as LevelTag, label: t("Community", "Community"), hint: t("It connects the customer with other customers or with the company's people: exchange, events, a say in the product.", "Es verbindet den Kunden mit anderen Kunden oder mit den Menschen des Unternehmens: Austausch, Veranstaltungen, Mitsprache beim Produkt.") },
]);
export const LEVEL_LABEL = bi({ respond: t("Incentive", "Anreiz"), personal: t("Service added value", "Service-Mehrwert"), learn: t("Community", "Community") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“Members get 10% off every renewal.”", "„Mitglieder erhalten 10 % Rabatt auf jede Verlängerung.“"),
    truth: "respond" as LevelTag,
    clue: t("Could a competitor offer the same thing tomorrow, and would the customer then leave?", "Könnte ein Wettbewerber morgen dasselbe anbieten, und würde der Kunde dann gehen?"),
    why: t("A price reduction: it pays the customer to stay and changes nothing about how the product works for them.", "Ein Preisnachlass: Er bezahlt den Kunden fürs Bleiben und ändert nichts daran, wie das Produkt für ihn funktioniert."),
    rejected: { personal: t("It saves money, but no service improves: the product works exactly as before.", "Er spart Geld, aber kein Service wird besser: Das Produkt funktioniert genau wie vorher.") },
  },
  {
    id: "l2" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“A named expert reviews your setup with you every quarter and shows what to use next.”", "„Ein benannter Experte prüft jedes Quartal Ihr Setup mit Ihnen und zeigt, was Sie als Nächstes nutzen können.“"),
    truth: "personal" as LevelTag,
    clue: t("Does it change how well the product works for this customer?", "Ändert es, wie gut das Produkt für diesen Kunden funktioniert?"),
    why: t("Advice that makes the product more useful to this customer: a service added value.", "Beratung, die das Produkt für diesen Kunden nützlicher macht: ein Service-Mehrwert."),
    rejected: { learn: t("It is one expert and one customer; no other customers are involved.", "Es sind ein Experte und ein Kunde; keine anderen Kunden sind beteiligt.") },
  },
  {
    id: "l3" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“Twice a year, members meet other IT leads at a user group and show each other how they work.”", "„Zweimal im Jahr treffen Mitglieder andere IT-Leitungen in einer User Group und zeigen einander, wie sie arbeiten.“"),
    truth: "learn" as LevelTag,
    clue: t("Who does the customer meet here: ConnectIT's staff, or other customers?", "Wen trifft der Kunde hier: Mitarbeitende von ConnectIT oder andere Kunden?"),
    why: t("It connects customers with each other: a community.", "Es verbindet Kunden miteinander: eine Community."),
    rejected: { personal: t("The customer learns something, but from peers, not from a service ConnectIT delivers.", "Der Kunde lernt etwas, aber von anderen Kunden, nicht durch einen Service, den ConnectIT erbringt.") },
  },
  {
    id: "l4" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("“Members collect points on every invoice and exchange them for vouchers.”", "„Mitglieder sammeln Punkte auf jede Rechnung und tauschen sie gegen Gutscheine.“"),
    truth: "respond" as LevelTag,
    clue: t("What does the customer get: something that helps their IT, or something worth money?", "Was bekommt der Kunde: etwas, das seiner IT hilft, oder etwas, das Geld wert ist?"),
    why: t("Points and vouchers reward spending: an incentive.", "Punkte und Gutscheine belohnen Ausgaben: ein Anreiz."),
    rejected: { learn: t("A points scheme has members, but they are not connected to each other.", "Ein Punkteprogramm hat Mitglieder, aber sie sind nicht miteinander verbunden.") },
  },
  {
    id: "l5" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“Members' tickets are answered within two hours, day and night.”", "„Tickets von Mitgliedern werden innerhalb von zwei Stunden beantwortet, Tag und Nacht.“"),
    truth: "personal" as LevelTag,
    clue: t("Is this about money, about people meeting, or about the product working when it matters?", "Geht es um Geld, um Menschen, die sich treffen, oder darum, dass das Produkt funktioniert, wenn es darauf ankommt?"),
    why: t("Faster help when something breaks: a service added value.", "Schnellere Hilfe, wenn etwas ausfällt: ein Service-Mehrwert."),
    rejected: { respond: t("It costs ConnectIT money, but the customer receives help, not a payment.", "Es kostet ConnectIT Geld, aber der Kunde erhält Hilfe, keine Zahlung.") },
  },
  {
    id: "l6" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“Every new member receives a welcome gift worth €150.”", "„Jedes neue Mitglied erhält ein Willkommensgeschenk im Wert von 150 €.“"),
    truth: "respond" as LevelTag,
    clue: t("Does it still help the customer a month after they received it?", "Hilft es dem Kunden noch einen Monat, nachdem er es erhalten hat?"),
    why: t("A one-off gift worth money: an incentive to join, not a reason to stay.", "Ein einmaliges Geschenk mit Geldwert: ein Anreiz beizutreten, kein Grund zu bleiben."),
    rejected: { personal: t("Nothing about the product or the service changes.", "Nichts am Produkt oder am Service ändert sich.") },
  },
  {
    id: "l7" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("“A customer advisory board of twelve members votes each year on which modules we build next.”", "„Ein Kundenbeirat aus zwölf Mitgliedern stimmt jedes Jahr ab, welche Module wir als Nächstes bauen.“"),
    truth: "learn" as LevelTag,
    clue: t("Is the customer served here, or given a voice among other customers?", "Wird der Kunde hier bedient, oder bekommt er eine Stimme unter anderen Kunden?"),
    why: t("Customers shape the product together with ConnectIT's people: a community.", "Kunden gestalten das Produkt gemeinsam mit den Menschen von ConnectIT: eine Community."),
    rejected: { personal: t("The customer gets no service; they get a say, together with other members.", "Der Kunde bekommt keinen Service; er bekommt Mitsprache, zusammen mit anderen Mitgliedern.") },
  },
  {
    id: "l8" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“Two free training seats a year, so new staff learn the system in their first week.”", "„Zwei kostenlose Schulungsplätze pro Jahr, damit neue Mitarbeitende das System in ihrer ersten Woche lernen.“"),
    truth: "personal" as LevelTag,
    clue: t("It is free, but what does the customer actually receive?", "Es ist kostenlos, aber was erhält der Kunde tatsächlich?"),
    why: t("Training that makes the customer's own people better at using the product: a service added value.", "Eine Schulung, durch die die eigenen Leute des Kunden das Produkt besser nutzen: ein Service-Mehrwert."),
    rejected: { respond: t("“Free” is not the point: the customer receives know-how, not money.", "„Kostenlos“ ist nicht der Punkt: Der Kunde erhält Know-how, kein Geld.") },
  },
  {
    id: "l9" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“An online forum where members' admins answer each other's questions, also at night.”", "„Ein Onlineforum, in dem die Admins der Mitglieder einander Fragen beantworten, auch nachts.“"),
    truth: "learn" as LevelTag,
    clue: t("Who answers the question here?", "Wer beantwortet hier die Frage?"),
    why: t("Other customers help: a community, even though it also solves problems.", "Andere Kunden helfen: eine Community, auch wenn sie ebenfalls Probleme löst."),
    rejected: { personal: t("It solves problems like support does, but the help comes from peers, not from ConnectIT's service.", "Es löst Probleme wie der Support, aber die Hilfe kommt von anderen Kunden, nicht vom Service von ConnectIT.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1–A2 for each kind, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Incentive", "Anreiz"), test: t("Is it money, points, a discount or a gift: something a competitor could match tomorrow?", "Ist es Geld, sind es Punkte, ein Rabatt oder ein Geschenk: etwas, das ein Wettbewerber morgen überbieten könnte?") },
  { name: t("Service added value", "Service-Mehrwert"), test: t("Does ConnectIT deliver something that makes the product work better for this customer: help, advice, training, a review?", "Erbringt ConnectIT etwas, das das Produkt für diesen Kunden besser funktionieren lässt: Hilfe, Beratung, Schulung, ein Review?") },
  { name: t("Community", "Community"), test: t("Does it connect the customer with other customers, or give them a voice together with them?", "Verbindet es den Kunden mit anderen Kunden, oder gibt es ihm gemeinsam mit ihnen eine Stimme?") },
  { name: t("Incentive or service?", "Anreiz oder Service?"), test: t("Ask what the customer receives. Money or its equivalent is an incentive, even when it is called a benefit; help, advice or know-how is a service, even when it is free.", "Fragen Sie, was der Kunde erhält. Geld oder etwas Gleichwertiges ist ein Anreiz, auch wenn es Vorteil heißt; Hilfe, Beratung oder Know-how ist ein Service, auch wenn es kostenlos ist.") },
  { name: t("Service or community?", "Service oder Community?"), test: t("Ask who gives the value. ConnectIT's own staff: a service. Other customers, or customers together with ConnectIT: a community.", "Fragen Sie, wer den Wert gibt. Die eigenen Mitarbeitenden von ConnectIT: ein Service. Andere Kunden, oder Kunden gemeinsam mit ConnectIT: eine Community.") },
]);

/** The decisive phrase inside each benefit's own text, for "Highlight the key words" (never which kind it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("10% off every renewal", "10 % Rabatt auf jede Verlängerung"),
  l2: t("A named expert reviews your setup with you every quarter", "Ein benannter Experte prüft jedes Quartal Ihr Setup mit Ihnen"),
  l3: t("members meet other IT leads at a user group", "Mitglieder andere IT-Leitungen in einer User Group"),
  l4: t("collect points on every invoice and exchange them for vouchers", "sammeln Punkte auf jede Rechnung und tauschen sie gegen Gutscheine"),
  l5: t("answered within two hours, day and night", "innerhalb von zwei Stunden beantwortet, Tag und Nacht"),
  l6: t("welcome gift worth €150", "Willkommensgeschenk im Wert von 150 €"),
  l7: t("votes each year on which modules we build next", "stimmt jedes Jahr ab, welche Module wir als Nächstes bauen"),
  l8: t("Two free training seats a year", "Zwei kostenlose Schulungsplätze pro Jahr"),
  l9: t("members' admins answer each other's questions", "die Admins der Mitglieder einander Fragen beantworten"),
});
