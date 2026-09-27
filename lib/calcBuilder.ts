import { FIGURE_IDS, FORECAST, PILOT, extraOf, liftOf, rateOf } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { tt } from "@/lib/lang";
import { parseAmount } from "@/lib/parseAmount";

/**
 * The "automatic calculator" under a calculation question: the formula split into small labelled parts. The learner types each part
 * (a value read from a printed row); the result is computed live and can be copied into the answer field. On "Check", every part is
 * compared with the value it should hold, and a wrong part names the exact row to read, never the value. Expected values come from the
 * same constants as the tables and the model answers (data/forecast.ts).
 */
export type CalcPart = { id: string; label: string; expected: number; tolerance?: number; clue: string };
export type CalcBuilder = { parts: CalcPart[]; compute: (v: Record<string, number>) => number; show: (v: Record<string, string>) => string };

const f1Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "orders", label: tt("Deals from referred leads", "Abschlüsse aus empfohlenen Leads"), expected: PILOT.variant.orders, clue: tt("“Last year”: the deals in the row “referred by a customer”, not the marketing row.", "„Letztes Jahr“: die Abschlüsse in der Zeile „von einem Kunden empfohlen“, nicht die Marketing-Zeile.") },
      { id: "sent", label: tt("Referred leads", "Empfohlene Leads"), expected: PILOT.variant.sent, clue: tt("“Last year”: the leads that came through a referral, not all leads and not the 400 of next year.", "„Letztes Jahr“: die Leads, die über eine Empfehlung kamen, nicht alle Leads und nicht die 400 des nächsten Jahres.") },
    ];
  },
  compute: (v) => rateOf(v.orders, v.sent),
  show: (v) => `${v.orders} ÷ ${v.sent} × 100`,
};

const f2Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "rate", label: tt("Close rate of referred leads (%)", "Abschlussquote empfohlener Leads (%)"), expected: FORECAST.f1, tolerance: 0.05, clue: tt("This is your F1: the close rate of referred leads.", "Das ist Ihr F1: die Abschlussquote empfohlener Leads.") },
      { id: "orders", label: tt("Deals from marketing leads", "Abschlüsse aus Marketing-Leads"), expected: PILOT.control.orders, clue: tt("“Last year”: the deals in the row “from marketing”.", "„Letztes Jahr“: die Abschlüsse in der Zeile „aus dem Marketing“.") },
      { id: "sent", label: tt("Marketing leads", "Marketing-Leads"), expected: PILOT.control.sent, clue: tt("“Last year”: the leads that came from marketing.", "„Letztes Jahr“: die Leads, die aus dem Marketing kamen.") },
    ];
  },
  compute: (v) => liftOf(v.rate, rateOf(v.orders, v.sent)),
  show: (v) => `${v.rate} ÷ (${v.orders} ÷ ${v.sent} × 100)`,
};

const f3Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "yearly", label: tt("Referred leads a year", "Empfohlene Leads pro Jahr"), expected: PILOT.yearly, clue: tt("“Next year”: the referred leads expected in a whole year, not the 150 or 600 leads of last year's two groups.", "„Nächstes Jahr“: die in einem ganzen Jahr erwarteten empfohlenen Leads, nicht die 150 oder 600 Leads der beiden Gruppen des letzten Jahres.") },
      { id: "rate", label: tt("Close rate of referred leads (%)", "Abschlussquote empfohlener Leads (%)"), expected: FORECAST.f1, tolerance: 0.05, clue: tt("Your F1, as a percentage; the calculator turns the difference into a share of one.", "Ihr F1, in Prozent; der Rechner macht aus dem Unterschied einen Anteil von eins.") },
      { id: "orders", label: tt("Deals from marketing leads", "Abschlüsse aus Marketing-Leads"), expected: PILOT.control.orders, clue: tt("“Last year”: the deals of the marketing row; only what the referral adds on top counts as extra.", "„Letztes Jahr“: die Abschlüsse der Marketing-Zeile; nur was die Empfehlung obendrauf bringt, zählt als zusätzlich.") },
      { id: "sent", label: tt("Marketing leads", "Marketing-Leads"), expected: PILOT.control.sent, clue: tt("“Last year”: the leads of the marketing row.", "„Letztes Jahr“: die Leads der Marketing-Zeile.") },
      { id: "order", label: tt("Average deal value (€)", "Durchschnittlicher Auftragswert (€)"), expected: PILOT.order, clue: tt("“All deals”: the average deal value.", "„Alle Aufträge“: der durchschnittliche Auftragswert.") },
    ];
  },
  compute: (v) => extraOf(v.yearly, v.rate, rateOf(v.orders, v.sent), v.order),
  show: (v) => `${v.yearly} × (${v.rate}% − ${v.orders} ÷ ${v.sent} × 100%) × ${v.order}`,
};

export const FIGURE_BUILDERS: Record<FigureId, CalcBuilder> = { F1: f1Builder, F2: f2Builder, F3: f3Builder };
export const figAnswer = (id: FigureId) => ({ F1: FORECAST.f1, F2: FORECAST.f2, F3: FORECAST.f3 })[id];
export { FIGURE_IDS };

export const partKey = (figure: string, part: string) => `${figure}.${part}`;
export function partValues(b: CalcBuilder, figure: string, parts: Record<string, string>): Record<string, number | null> {
  return Object.fromEntries(
    b.parts.map((p) => {
      const raw = (parts[partKey(figure, p.id)] ?? "").trim();
      return [p.id, raw ? parseAmount(raw) : null];
    }),
  );
}
export function builderResult(b: CalcBuilder, figure: string, parts: Record<string, string>): number | null {
  const v = partValues(b, figure, parts);
  if (Object.values(v).some((x) => x === null)) return null;
  const r = b.compute(v as Record<string, number>);
  return Number.isFinite(r) ? Math.round(r * 1e6) / 1e6 : null;
}
export function wrongParts(b: CalcBuilder, figure: string, parts: Record<string, string>): string[] {
  const v = partValues(b, figure, parts);
  return b.parts.filter((p) => v[p.id] !== null && Math.abs((v[p.id] as number) - p.expected) > (p.tolerance ?? 1e-9)).map((p) => partKey(figure, p.id));
}
export function allPartsRight(b: CalcBuilder, figure: string, parts: Record<string, string>): boolean {
  const v = partValues(b, figure, parts);
  return Object.values(v).every((x) => x !== null) && wrongParts(b, figure, parts).length === 0;
}
export function modelParts(builders: Partial<Record<string, CalcBuilder>>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [fid, b] of Object.entries(builders)) if (b) for (const p of b.parts) out[partKey(fid, p.id)] = String(p.expected);
  return out;
}
export function figurePartFlags(parts: Record<string, string>): string[] {
  return FIGURE_IDS.flatMap((f) => wrongParts(FIGURE_BUILDERS[f], f, parts));
}
