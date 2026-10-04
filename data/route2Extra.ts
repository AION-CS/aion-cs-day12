import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at ConnectIT with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "A member opens the portal and sees the next quarterly review with a named expert, the priority ticket line and two free training seats. A customer who is not a member sees none of them.",
      "Ein Mitglied öffnet das Portal und sieht das nächste Quartalsreview mit einem benannten Experten, die Prioritäts-Ticketlinie und zwei kostenlose Schulungsplätze. Ein Kunde, der kein Mitglied ist, sieht nichts davon.",
    ),
  },
  chat: {
    scene: t(
      "After a good quarterly review a customer fills in a short form in the portal to introduce a firm. When that firm signs, both get a free training day.",
      "Nach einem guten Quartalsreview füllt ein Kunde im Portal ein kurzes Formular aus, um eine Firma vorzustellen. Unterschreibt diese Firma, bekommen beide einen kostenlosen Schulungstag.",
    ),
  },
  personal: {
    scene: t(
      "Twice a year IT leads from member firms meet in their region, swap tips and meet the ConnectIT team. Between meetings they help each other in the forum, and a member who leaves would lose those people.",
      "Zweimal im Jahr treffen sich IT-Leitungen von Mitgliedsfirmen in ihrer Region, tauschen Tipps aus und lernen das Team von ConnectIT kennen. Zwischen den Treffen helfen sie einander im Forum, und ein Mitglied, das geht, verlöre diese Menschen.",
    ),
  },
  routing: {
    scene: t(
      "A referred firm reads three short statements from customers like itself and books a call. It trusts a peer more than a brochure.",
      "Eine empfohlene Firma liest drei kurze Aussagen von Kunden wie ihr selbst und bucht ein Gespräch. Sie traut einem Gleichgesinnten mehr als einer Broschüre.",
    ),
  },
  training: {
    scene: t(
      "In the CRM each member shows which benefit they used, and each referral shows whether it became a customer. Once a month a short meeting reads the KPIs and keeps, tests or stops each part.",
      "Im CRM zeigt jedes Mitglied, welchen Vorteil es genutzt hat, und jede Empfehlung, ob sie Kunde wurde. Einmal im Monat liest ein kurzes Meeting die KPIs und behält, testet oder stoppt jeden Teil.",
    ),
  },
  tracking: {
    scene: t(
      "Before a thank-you is paid, a check confirms that the referred firm is new and independent. Each customer has a cap, and the thank-you comes only after the firm has signed.",
      "Bevor ein Dankeschön gezahlt wird, bestätigt eine Prüfung, dass die empfohlene Firma neu und unabhängig ist. Jeder Kunde hat eine Obergrenze, und das Dankeschön kommt erst, nachdem die Firma unterschrieben hat.",
    ),
  },
  suite: {
    scene: t(
      "A vendor tool sets every customer's reward or discount by itself, with no rules shown. Two similar customers get different rewards and nobody at ConnectIT can say why.",
      "Ein Anbieter-Werkzeug legt die Belohnung oder den Rabatt jedes Kunden selbst fest, ohne dass Regeln gezeigt werden. Zwei ähnliche Kunden bekommen verschiedene Belohnungen, und niemand bei ConnectIT kann sagen, warum.",
    ),
  },
  relaunch: {
    scene: t(
      "Every customer who renews gets 10% off the next contract year, including those who would have renewed anyway. Finance carries the cost of every renewal, and customers learn to wait for the discount.",
      "Jeder Kunde, der verlängert, erhält 10 % Rabatt auf das nächste Vertragsjahr, auch die, die ohnehin verlängert hätten. Die Finanzabteilung trägt die Kosten jeder Verlängerung, und Kunden lernen, auf den Rabatt zu warten.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 86, engage: 70 };
