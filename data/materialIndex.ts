import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

/**
 * `optional: true` marks a card that no Core task block draws on (lib/progress.ts OPTIONAL_BLOCKS): collapsed by default via OptionalSection,
 * never removed (CLAUDE.md #35). A card a Core block needs stays Core even if an Optional block also cites it. Route 1 Core cards: A2 (block 1.1) and A7 (block 2.4); Route 1 Optional cards: A1, A3, A4, A5, A6.
 *
 * Day 12: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes; Materi B (Route 2, Level 3) five cards, 60 minutes. */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Transactional versus relational retention: why discounts do not keep customers", "Transaktionale gegen relationale Kundenbindung: warum Rabatte keine Kunden halten"), minutes: 8, optional: true },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Membership models: incentive, service added value, community", "Mitgliedsmodelle: Anreiz, Service-Mehrwert, Community"), minutes: 9 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Customers as multipliers: who to ask for a referral, and who only wants a discount", "Kunden als Multiplikatoren: wen man um eine Empfehlung bittet, und wer nur einen Rabatt will"), minutes: 9, optional: true },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a referral is worth: close rate, lift and extra revenue", "Was eine Empfehlung wert ist: Abschlussquote, Lift und zusätzlicher Umsatz"), minutes: 9, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("KPIs for memberships and referrals: outcome, driver, guardrail and vanity metrics", "KPIs für Mitgliedschaften und Empfehlungen: Outcome, Treiber, Guardrail und Vanity Metrics"), minutes: 8, optional: true },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Testing fairly, and the risk of wrong incentives", "Fair testen, und das Risiko falscher Anreize"), minutes: 9, optional: true },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Prioritising measures: retention effect, scalability, economic viability", "Maßnahmen priorisieren: Bindungswirkung, Skalierbarkeit, Wirtschaftlichkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("A membership and referral system: the target vision", "Ein Mitglieder- und Empfehlungssystem: das Zielbild"), minutes: 12, optional: true },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Central added values: the decision first, then the proof", "Zentrale Mehrwerte: zuerst die Entscheidung, dann der Beleg"), minutes: 12, optional: true },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for customer retention: four tests", "Ein KPI-System für Kundenbindung: vier Tests"), minutes: 12, optional: true },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("A scalable referral model: roll out, keep testing or stop", "Ein skalierbares Empfehlungsmodell: ausrollen, weiter testen oder stoppen"), minutes: 12, optional: true },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("A strategic decision under an unclear forecast, and the measures architecture", "Eine strategische Entscheidung bei unklarer Prognose, und die Maßnahmenarchitektur"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · membership, referral, value", "Level 1 + 2 · Mitgliedschaft, Empfehlung, Wert"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Retention Analysis · one case", "Retention Analysis · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · a scalable retention system", "Level 3 · ein skalierbares Bindungssystem"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Retention System Memo · CCO", "Retention System Memo · CCO"), minutes: TASK2_MINUTES },
  ],
});
