import { bi, t } from "@/lib/lang";

/**
 * Day 12 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 7 (day 1 of 2): systematically building
 * customer retention through memberships and referrals. From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and
 * Level 2 on one case, Route 2 is Level 3.
 */
export const COURSE = bi({
  title: t("Customer Retention through Memberships and Referrals", "Kundenbindung durch Mitgliedschaften und Empfehlungen"),
  site: t("Retention Lab · Day 12", "Retention Lab · Tag 12"),
  module: t("Module 7, day 1 of 2", "Modul 7, Tag 1 von 2"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 12,
  company: "ConnectIT Services GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Retention", "Kundenbindung"),
    title: t("Route 1 · Membership, referral, value", "Route 1 · Mitgliedschaft, Empfehlung, Wert"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t("One case, two levels: ConnectIT Services keeps too few customers, pays a lot to win new ones and leaves the potential of its existing customers unused. You learn the difference between transactional and relational retention, what makes a membership model hold (incentive, service, community), why customers refer and who to ask first, and how to measure and test it without wrong incentives. Then four core blocks: you sort nine membership benefits, recognise which customers to ask and which only want a discount and write three approaches, tag twelve metrics and name your three KPIs, and choose three measures inside €130,000 and five months. Four optional blocks add a read of the referral figures, a coaching reflection, what each kind of metric is worth and a fair test. Material first, then one task that ends in a Retention Analysis File.", "Ein Fall, zwei Level: ConnectIT Services hält zu wenige Kunden, zahlt viel für neue und lässt das Potenzial seiner Bestandskunden ungenutzt. Sie lernen den Unterschied zwischen transaktionaler und relationaler Kundenbindung, was ein Mitgliedsmodell trägt (Anreiz, Service, Community), warum Kunden empfehlen und wen man zuerst fragt, und wie man das misst und ohne falsche Anreize testet. Dann vier Kernblöcke: Sie sortieren neun Mitgliedervorteile, erkennen, welche Kunden Sie fragen und welche nur einen Rabatt wollen, und schreiben drei Ansätze, ordnen zwölf Kennzahlen zu und nennen Ihre drei KPIs, und wählen drei Maßnahmen innerhalb von 130.000 € und fünf Monaten. Vier optionale Blöcke ergänzen eine Lektüre der Empfehlungswerte, eine Coaching-Reflexion, was jede Art von Kennzahl wert ist, und einen fairen Test. Erst das Material, dann eine Aufgabe, die mit einer Retention Analysis File endet."),
    plan: [
      { label: t("Materi A · seven cards, Levels 1 and 2", "Materi A · sieben Karten, Level 1 und 2"), minutes: 60 },
      { label: t("Task 1 · Retention Analysis, one task", "Task 1 · Retention Analysis, eine Aufgabe"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t("You are now ConnectIT's Chief Customer Officer. Retention is not sustainable, new customers are expensive and the competition is intense. You set the target vision of a membership and referral system and build its architecture on a live panel that shows what your choices do: each of eight items is set to Now, After the uptake is proven or Not now, and the diagram, three bars and four tests redraw at once. Then you make a strategic decision although nobody can forecast its success and say what you will watch and when you would stop. Four optional blocks go deeper. Material first, then one task that ends in a Retention System Memo that assembles below your answers.", "Sie sind jetzt Chief Customer Officer von ConnectIT. Die Kundenbindung ist nicht nachhaltig, Neukunden sind teuer, und der Wettbewerb ist intensiv. Sie legen das Zielbild eines Mitglieder- und Empfehlungssystems fest und bauen seine Architektur an einem Live-Panel, das zeigt, was Ihre Entscheidungen bewirken: Jeder von acht Punkten steht auf Jetzt, Wenn die Nutzung belegt ist oder Jetzt nicht, und Diagramm, drei Balken und vier Tests zeichnen sich sofort neu. Dann treffen Sie eine strategische Entscheidung, obwohl niemand ihren Erfolg vorhersagen kann, und sagen, was Sie beobachten und wann Sie aufhören würden. Vier optionale Blöcke vertiefen. Erst das Material, dann eine Aufgabe, die in einem Retention System Memo endet, das sich unter Ihren Antworten zusammensetzt."),
    plan: [
      { label: t("Materi B · five cards, Level 3", "Materi B · fünf Karten, Level 3"), minutes: 60 },
      { label: t("Task 2 · Retention System Memo", "Task 2 · Retention System Memo"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
