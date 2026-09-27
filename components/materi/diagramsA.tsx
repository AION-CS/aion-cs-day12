"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { LEVEL_LABEL } from "@/data/ladder";
import type { LevelTag } from "@/data/ladder";
import { MOSEL, MOSEL_RESULT, extraOf } from "@/data/forecast";
import { PATTERNS } from "@/data/patterns";
import type { PatternId } from "@/data/patterns";
import { JOINS_LABEL, bandOf, explainBucket } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * The interactive diagrams of Materi A (Route 1). Every one uses the worked-example company Werra Datentechnik (an IT service provider in
 * Eschwege, Case assumption), never ConnectIT, so the answer to a task block is never printed. Every control is followed by an always-visible
 * "What this shows" (CLAUDE.md #20). (Export names are kept from the file this was built from.)
 */
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", rustSoft: "#F6E3DB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };

/* ------------------------------------------------------------------ A1 · why customers stay: relational reasons versus the discount */

type Band = "trust" | "security" | "status" | "belonging" | "features";
const BANDS: Band[] = ["trust", "security", "status", "belonging", "features"];
const BAND = bi({
  trust: { label: t("The service works for us", "Der Service funktioniert für uns"), rate: 38 as number, reading: t("Added value: the strongest reason Werra's customers gave. They stay because the service makes their own work easier, which a competitor cannot copy with a lower price. Relational retention.", "Mehrwert: der stärkste Grund, den die Kunden von Werra nannten. Sie bleiben, weil der Service ihre eigene Arbeit leichter macht, und das kann ein Wettbewerber mit einem niedrigeren Preis nicht kopieren. Relationale Kundenbindung.") },
  security: { label: t("We trust the people", "Wir vertrauen den Menschen"), rate: 24 as number, reading: t("Trust in named people: built over years, lost if the people change or disappoint. Relational retention, and the root of every referral.", "Vertrauen in benannte Menschen: über Jahre aufgebaut, verloren, wenn die Menschen wechseln oder enttäuschen. Relationale Kundenbindung und die Wurzel jeder Empfehlung.") },
  status: { label: t("Switching would be too much effort", "Ein Wechsel wäre zu aufwendig"), rate: 16 as number, reading: t("Switching costs keep customers, but unwillingly: they stay because leaving is hard, not because staying is good. The day a competitor offers to do the move for them, they go.", "Wechselkosten halten Kunden, aber widerwillig: Sie bleiben, weil Gehen schwer ist, nicht weil Bleiben gut ist. An dem Tag, an dem ein Wettbewerber anbietet, den Umzug für sie zu machen, gehen sie.") },
  belonging: { label: t("We meet other customers", "Wir treffen andere Kunden"), rate: 10 as number, reading: t("Community: customers who know other customers exchange tips and feel part of a group. Relational retention, and small today because Werra offers little of it.", "Community: Kunden, die andere Kunden kennen, tauschen Tipps aus und fühlen sich als Teil einer Gruppe. Relationale Kundenbindung, heute klein, weil Werra wenig davon anbietet.") },
  features: { label: t("The discount", "Der Rabatt"), rate: 12 as number, reading: t("Only 12% stayed for the discount: transactional retention. It holds exactly as long as nobody offers more, and it costs margin on every renewal.", "Nur 12 % blieben wegen des Rabatts: transaktionale Kundenbindung. Sie hält genau so lange, wie niemand mehr bietet, und kostet bei jeder Verlängerung Marge.") },
});

export function DelayCost() {
  const uid = useId().replace(/:/g, "");
  const [band, setBand] = useState<Band>("trust");
  const b = BAND[band];
  const W = (r: number) => (r / 38) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 230" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Werra Datentechnik: why its customers say they renewed", "Werra Datentechnik: warum Kunden nach eigener Aussage verlängert haben")}</title>
        <desc id={`${uid}-d`}>{BANDS.map((k) => `${BAND[k].label}: ${BAND[k].rate}%`).join(", ")}</desc>
        {BANDS.map((k, i) => {
          const y = 12 + i * 42;
          const on = k === band;
          const r = BAND[k].rate;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={BAND[k].label} onClick={() => setBand(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setBand(k)}>
              <text x="0" y={y + 19} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{BAND[k].label}</text>
              <rect className="hit-shape" x="215" y={y} width={W(r)} height="28" fill={on ? C.gold : k === "features" ? C.grey : C.data} stroke={C.ink} />
              <text x={221 + W(r)} y={y + 19} fontSize="12.5" fontWeight="700" fill={C.ink}>{pct(r)}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<Band> label={tt("Why they renewed", "Warum sie verlängert haben")} value={band} onChange={setBand} options={BANDS.map((k) => ({ id: k, label: BAND[k].label }))} />
      <Insight>{b.reading}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Werra Datentechnik's renewal interviews (Case assumption): 150 customers who renewed were asked for their main reason. Dark bars are relational reasons, the grey bar the discount.", "Illustration mit den Verlängerungsinterviews von Werra Datentechnik (Fallannahme): 150 Kunden, die verlängert haben, wurden nach ihrem Hauptgrund gefragt. Dunkle Balken sind relationale Gründe, der graue Balken der Rabatt.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · one area, three kinds of membership benefit */

type Depth = "none" | "fit" | "much";
const PRINCIPLE_IDS: LevelTag[] = ["respond", "personal", "learn"];
const DEPTHS: Depth[] = ["none", "fit", "much"];
const D_LABEL = bi({ none: t("Support", "Support"), fit: t("Training", "Schulung"), much: t("New modules", "Neue Module") });
const SHOWN = bi({
  respond: {
    none: t("“Members get 15% off every extra support hour.”", "„Mitglieder erhalten 15 % Rabatt auf jede zusätzliche Supportstunde.“"),
    fit: t("“Members pay €100 less for each training day.”", "„Mitglieder zahlen für jeden Schulungstag 100 € weniger.“"),
    much: t("“Members collect points when they install an update early.”", "„Mitglieder sammeln Punkte, wenn sie ein Update früh installieren.“"),
  },
  personal: {
    none: t("“A named expert answers members' tickets within two hours.”", "„Ein benannter Experte beantwortet Tickets von Mitgliedern innerhalb von zwei Stunden.“"),
    fit: t("“Two free training seats a year, so new staff learn the system in their first week.”", "„Zwei kostenlose Schulungsplätze pro Jahr, damit neue Mitarbeitende das System in ihrer ersten Woche lernen.“"),
    much: t("“Members get early access to new modules, with a setup call.”", "„Mitglieder erhalten frühen Zugang zu neuen Modulen, mit einem Einrichtungsgespräch.“"),
  },
  learn: {
    none: t("“A members' forum where admins answer each other's questions, also at night.”", "„Ein Mitgliederforum, in dem Admins einander Fragen beantworten, auch nachts.“"),
    fit: t("“A regional user group where members show each other how they use the system.”", "„Eine regionale User Group, in der Mitglieder einander zeigen, wie sie das System nutzen.“"),
    much: t("“A customer advisory board that votes each year on which modules come next.”", "„Ein Kundenbeirat, der jedes Jahr abstimmt, welche Module als Nächstes kommen.“"),
  },
});
const READ = bi({
  respond: t("An incentive pays the customer to stay. It is easy to understand and easy to copy: a competitor can offer 20% tomorrow, and the customer leaves for the better deal. Transactional retention.", "Ein Anreiz bezahlt den Kunden fürs Bleiben. Er ist leicht zu verstehen und leicht zu kopieren: Ein Wettbewerber kann morgen 20 % bieten, und der Kunde geht zum besseren Angebot. Transaktionale Kundenbindung."),
  personal: t("A service added value makes the product work better for this customer: faster help, know-how, a head start. Leaving means losing it. Relational retention.", "Ein Service-Mehrwert lässt das Produkt für diesen Kunden besser funktionieren: schnellere Hilfe, Know-how, ein Vorsprung. Gehen hieße, ihn zu verlieren. Relationale Kundenbindung."),
  learn: t("A community connects the customer with other customers and with the company's people. The relationships belong to the customer, and no competitor can offer them. Relational retention, and where referrals start.", "Eine Community verbindet den Kunden mit anderen Kunden und mit den Menschen des Unternehmens. Die Beziehungen gehören dem Kunden, und kein Wettbewerber kann sie anbieten. Relationale Kundenbindung, und dort beginnen Empfehlungen."),
});

const M_IDEAS = bi([
  { id: "a", text: t("“Members get a €200 voucher every year they renew.”", "„Mitglieder erhalten jedes Jahr, in dem sie verlängern, einen Gutschein über 200 €.“"), tag: "respond" as LevelTag, why: t("Money's worth for staying: an incentive.", "Ein Geldwert fürs Bleiben: ein Anreiz.") },
  { id: "b", text: t("“Each member gets a yearly security check of their setup by a Werra engineer.”", "„Jedes Mitglied erhält jährlich einen Sicherheitscheck seines Setups durch einen Techniker von Werra.“"), tag: "personal" as LevelTag, why: t("Werra's own staff make the product safer for this customer: a service added value.", "Die eigenen Mitarbeitenden von Werra machen das Produkt für diesen Kunden sicherer: ein Service-Mehrwert.") },
  { id: "c", text: t("“Members meet once a quarter for breakfast and swap what worked for them.”", "„Mitglieder treffen sich einmal im Quartal zum Frühstück und tauschen aus, was bei ihnen funktioniert hat.“"), tag: "learn" as LevelTag, why: t("Customers give each other the value: a community.", "Kunden geben einander den Wert: eine Community.") },
]);

export function MomentProfile() {
  const [v, setV] = useState<LevelTag>("personal");
  const [d, setD] = useState<Depth>("none");
  const [open, setOpen] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-3" role="img" aria-label={tt("One area, three kinds of benefit", "Ein Bereich, drei Arten von Vorteil")}>
        {PRINCIPLE_IDS.map((x) => (
          <div key={x} className={`rounded-md border px-3 py-2 text-caption ${x === v ? "border-accent bg-accentSoft" : "border-line bg-paper"} ${x === "respond" && x === v ? "border-dashed" : ""}`}>
            <p className="smallcaps">{LEVEL_LABEL[x]}</p>
            <p className="mt-1 text-ink">{SHOWN[x][d]}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<Depth> label={tt("Werra area", "Bereich bei Werra")} value={d} onChange={setD} options={DEPTHS.map((x) => ({ id: x, label: D_LABEL[x] }))} />
        <Toggles<LevelTag> label={tt("Kind of benefit", "Art von Vorteil")} value={v} onChange={setV} options={PRINCIPLE_IDS.map((x) => ({ id: x, label: LEVEL_LABEL[x] }))} />
      </div>
      <Insight>{`${D_LABEL[d]} · ${LEVEL_LABEL[v]}: ${READ[v]}`}</Insight>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("A worked sort: three benefits at Werra Datentechnik", "Eine Beispielsortierung: drei Vorteile bei Werra Datentechnik")}</p>
        <ul className="space-y-1.5">
          {M_IDEAS.map((x) => {
            const on = open.includes(x.id);
            return (
              <li key={x.id} className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
                <p className="text-ink">{x.text}</p>
                <button type="button" aria-expanded={on} onClick={() => setOpen((o) => (on ? o.filter((y) => y !== x.id) : [...o, x.id]))} className="btn-ghost btn-sm mt-1">
                  {on ? tt("Hide", "Verbergen") : tt("Show the kind and why", "Art und Grund zeigen")}
                </button>
                {on && (
                  <p className="mt-1 text-ink">
                    <strong>{LEVEL_LABEL[x.tag]}.</strong> {x.why}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Werra Datentechnik (Case assumption). A dashed frame marks the incentive: easy to understand, easy to copy.", "Illustration mit Werra Datentechnik (Fallannahme). Ein gestrichelter Rahmen markiert den Anreiz: leicht zu verstehen, leicht zu kopieren.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A3 · customers as multipliers: who to ask, who only wants a discount */

type Verdict = "respond" | "personal" | "neither";
type NPage = { id: string; name: string; leave: number; decision: boolean; known: 0 | 1 | 2; verdict: Verdict; why: string };
const N_PAGES: NPage[] = bi([
  { id: "n1", name: t("IT service partner network", "IT-Dienstleister-Netzwerk"), leave: 86, decision: true, known: 1 as const, verdict: "respond" as Verdict, why: t("86% satisfied and in regular contact with other firms of its industry: ask first. A referral here reaches peers who trust them.", "86 % zufrieden und in regelmäßigem Kontakt mit anderen Firmen der Branche: zuerst fragen. Eine Empfehlung erreicht hier andere, die ihnen vertrauen.") },
  { id: "n2", name: t("Medical practice group", "Praxisverbund"), leave: 85, decision: true, known: 2 as const, verdict: "respond" as Verdict, why: t("85% satisfied, in contact with other practices and keen on exchange: ask first, and invite to the community.", "85 % zufrieden, in Kontakt mit anderen Praxen und an Austausch interessiert: zuerst fragen und in die Community einladen.") },
  { id: "n3", name: t("Retailer, purchasing", "Einzelhändler, Einkauf"), leave: 50, decision: false, known: 0 as const, verdict: "personal" as Verdict, why: t("Talks about price and discounts: a discount club would hold this customer only until someone offers more. Added value has to come first.", "Spricht über Preis und Rabatte: Ein Rabattclub hielte diesen Kunden nur, bis jemand mehr bietet. Der Mehrwert muss zuerst kommen.") },
  { id: "n4", name: t("Wholesaler", "Großhändler"), leave: 65, decision: true, known: 0 as const, verdict: "personal" as Verdict, why: t("In contact with peers, but talks about price: joins for the discount. A referral from a price-focused customer carries a price message.", "In Kontakt mit anderen, spricht aber über den Preis: tritt wegen des Rabatts bei. Eine Empfehlung von einem preisfokussierten Kunden trägt eine Preisbotschaft.") },
  { id: "n5", name: t("Architecture office", "Architekturbüro"), leave: 96, decision: false, known: 1 as const, verdict: "neither" as Verdict, why: t("96% satisfied, but no contact with other firms of the industry: happy, yet a referral would reach nobody. Ask for a testimonial instead.", "96 % zufrieden, aber ohne Kontakt zu anderen Firmen der Branche: zufrieden, doch eine Empfehlung erreichte niemanden. Fragen Sie stattdessen nach einem Testimonial.") },
  { id: "n6", name: t("Consulting firm", "Beratungsfirma"), leave: 70, decision: true, known: 2 as const, verdict: "neither" as Verdict, why: t("In contact with peers and keen on exchange, but only 70% satisfied: a referral now would carry a lukewarm message. Fix what is missing first.", "In Kontakt mit anderen und an Austausch interessiert, aber nur zu 70 % zufrieden: Eine Empfehlung trüge jetzt eine laue Botschaft. Zuerst beheben, was fehlt.") },
]);
const VERDICT_LABEL = bi({ respond: t("Ask first for a referral", "Zuerst um eine Empfehlung bitten"), personal: t("Would join only for a discount", "Würde nur wegen eines Rabatts beitreten"), neither: t("Neither (yet)", "Keines (noch nicht)") });
const VERDICT_GLYPH: Record<Verdict, string> = { respond: "●", personal: "◐", neither: "○" };

export function AutomationGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<string>("n1");
  const s = N_PAGES.find((x) => x.id === sel)!;
  const X = (l: number) => 60 + (l / 100) * 440;
  const Y = (k: number) => 250 - k * 85;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Werra Datentechnik's customers by satisfaction and what they talk about", "Kunden von Werra Datentechnik nach Zufriedenheit und dem, worüber sie sprechen")}</title>
        <desc id={`${uid}-d`}>{`${s.name}: ${VERDICT_LABEL[s.verdict]}.`}</desc>
        <defs>
          <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        <rect x={X(0)} y="205" width={X(100) - X(0)} height="80" fill={C.tealSoft} opacity="0.7" />
        <rect x={X(80)} y="30" width={X(100) - X(80)} height="255" fill={`url(#${uid}-hatch)`} stroke={C.amber} />
        <text x={X(40)} y="222" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.teal}>{tt("talks about price: joins for the discount", "spricht über den Preis: tritt wegen des Rabatts bei")}</text>
        <text x={X(90)} y="44" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.amber}>{tt("80%+ satisfied:", "80 %+ zufrieden:")}</text>
        <text x={X(90)} y="58" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.amber}>{tt("ask if a square", "fragen, wenn Quadrat")}</text>
        <line x1={X(80)} y1="30" x2={X(80)} y2="285" stroke={C.ash} strokeDasharray="4 3" />
        {[0, 20, 40, 60, 80, 100].map((l) => (
          <text key={l} x={X(l)} y="298" textAnchor="middle" fontSize="11" fill={C.ash}>{pct(l)}</text>
        ))}
        {[tt("price", "Preis"), tt("support", "Support"), tt("peers", "Austausch")].map((l, k) => (
          <text key={k} x="54" y={Y(k) + 4} textAnchor="end" fontSize="11" fill={C.ash}>{l}</text>
        ))}
        <text x="4" y="20" fontSize="11" fill={C.ash}>{tt("talks most about", "spricht vor allem über")}</text>
        {N_PAGES.map((x, i) => {
          const on = x.id === sel;
          const cx = X(x.leave);
          const cy = Y(x.known) + (x.known === 0 ? 10 : 0);
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {x.decision ? <rect className="hit-shape" x={cx - (on ? 14 : 11)} y={cy - (on ? 14 : 11)} width={on ? 28 : 22} height={on ? 28 : 22} rx="3" fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" /> : <circle className="hit-shape" cx={cx} cy={cy} r={on ? 14 : 11} fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" />}
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? C.ink : C.paper}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={tt("Customers", "Kunden")} className="flex flex-wrap gap-2">
        {N_PAGES.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={x.id === sel} onClick={() => setSel(x.id)} className={`btn btn-sm min-h-[40px] border ${x.id === sel ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash"}`}>
            {`${i + 1} · ${x.name}`}
          </button>
        ))}
      </div>
      <Insight>{`${s.name} · ${tt(`${s.leave}% satisfied`, `${s.leave} % zufrieden`)} · ${s.decision ? tt("in contact with peers", "in Kontakt mit anderen Firmen") : tt("no contact with peers", "kein Kontakt mit anderen Firmen")} · ${VERDICT_GLYPH[s.verdict]} ${VERDICT_LABEL[s.verdict]}. ${s.why}`}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Werra Datentechnik (Case assumption). Squares are in regular contact with other firms of their industry, circles are not. Hatched = 80% or more satisfied (ask first if a square); teal = talks about price (joins only for a discount); the rest are neither yet.", "Illustration mit Werra Datentechnik (Fallannahme). Quadrate stehen in regelmäßigem Kontakt mit anderen Firmen ihrer Branche, Kreise nicht. Schraffiert = zu 80 % oder mehr zufrieden (zuerst fragen, wenn Quadrat); teal = spricht über den Preis (tritt nur wegen eines Rabatts bei); der Rest ist noch keines von beiden.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · what a referral is worth (Werra Datentechnik) */

export function PilotExample() {
  const uid = useId().replace(/:/g, "");
  const [yearly, setYearly] = useState(MOSEL.yearly);
  const r = MOSEL_RESULT;
  const extra = extraOf(yearly, r.rate, r.other, MOSEL.order);
  const W = (p: number) => (p / 25) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Werra Datentechnik: referred leads against leads from marketing", "Werra Datentechnik: empfohlene Leads gegen Leads aus dem Marketing")}</title>
        <desc id={`${uid}-d`}>{tt(`Referred ${r.rate}%, marketing ${r.other}%, lift ${r.lift}.`, `Empfohlen ${num(r.rate)} %, Marketing ${num(r.other)} %, Lift ${num(r.lift)}.`)}</desc>
        <text x="0" y="36" fontSize="12" fill={C.ink}>{tt("Referred by a customer", "Von einem Kunden empfohlen")}</text>
        <rect x="170" y="20" width={W(r.rate)} height="26" fill={C.data} stroke={C.ink} />
        <text x={176 + W(r.rate)} y="38" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.rate)} (${MOSEL.variant.orders} ${tt("of", "von")} ${num(MOSEL.variant.sent)})`}</text>
        <text x="0" y="86" fontSize="12" fill={C.ink}>{tt("From marketing", "Aus dem Marketing")}</text>
        <rect x="170" y="70" width={W(r.other)} height="26" fill={C.grey} stroke={C.ink} />
        <text x={176 + W(r.other)} y="88" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.other)} (${MOSEL.control.orders} ${tt("of", "von")} ${num(MOSEL.control.sent)})`}</text>
        <text x="170" y="128" fontSize="13" fontWeight="700" fill={C.amber}>{tt(`Lift = ${r.rate} ÷ ${r.other} = ${num(r.lift)} times as often`, `Lift = ${num(r.rate)} ÷ ${num(r.other)} = ${num(r.lift)}-mal so oft`)}</text>
      </svg>
      <div className="space-y-1.5">
        <label htmlFor={`${uid}-y`} className="smallcaps block">
          {tt(`Werra's referred leads a year: ${num(yearly)}`, `Empfohlene Leads von Werra pro Jahr: ${num(yearly)}`)}
        </label>
        <input id={`${uid}-y`} type="range" min={100} max={1200} step={50} value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
      </div>
      <Insight>
        {tt(
          `${num(yearly)} referred leads × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} extra a year, compared with the same number of leads from marketing. Only the difference counts: marketing leads would have closed ${pct(r.other)} anyway. ${yearly === MOSEL.yearly ? "At 300 referred leads the example gives €180,000." : `More referred leads use the same lift more often: ${yearly > MOSEL.yearly ? "more" : "less"} extra revenue.`}`,
          `${num(yearly)} empfohlene Leads × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} zusätzlich pro Jahr, verglichen mit derselben Zahl an Leads aus dem Marketing. Nur der Unterschied zählt: Marketing-Leads hätten ohnehin ${pct(r.other)} abgeschlossen. ${yearly === MOSEL.yearly ? "Bei 300 empfohlenen Leads ergibt das Beispiel 180.000 €." : `Mehr empfohlene Leads nutzen denselben Lift öfter: ${yearly > MOSEL.yearly ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · a KPI tree for memberships and referrals (Werra Datentechnik) */

type MMetric = { id: string; name: string; kind: PatternId; moved: boolean; why: string };
const M_METRICS: MMetric[] = bi([
  { id: "rev", name: t("Revenue from existing customers", "Umsatz mit Bestandskunden"), kind: "outcome" as PatternId, moved: true, why: t("Money: the result Werra is paid for. It moves last.", "Geld: das Ergebnis, für das Werra bezahlt wird. Es bewegt sich zuletzt.") },
  { id: "renew", name: t("Renewal rate", "Verlängerungsquote"), kind: "outcome" as PatternId, moved: true, why: t("Customers kept: a result.", "Gehaltene Kunden: ein Ergebnis.") },
  { id: "hist", name: t("Members who used a benefit this month", "Mitglieder, die diesen Monat einen Vorteil nutzten"), kind: "driver" as PatternId, moved: true, why: t("It comes before the renewal and Customer Success can raise it this month.", "Es kommt vor der Verlängerung, und Customer Success kann es diesen Monat steigern.") },
  { id: "multi", name: t("Referrals submitted", "Eingereichte Empfehlungen"), kind: "driver" as PatternId, moved: false, why: t("A customer's action before a new deal; it did not move with value last year, which is a finding, not another kind.", "Eine Handlung des Kunden vor einem neuen Abschluss; sie bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art.") },
  { id: "repeat", name: t("Reward cost per customer kept", "Belohnungskosten pro gehaltenem Kunden"), kind: "guardrail" as PatternId, moved: true, why: t("It must not rise while Werra builds its programme: retention bought with ever bigger rewards is not viable.", "Sie dürfen nicht steigen, während Werra sein Programm aufbaut: mit immer größeren Belohnungen gekaufte Bindung ist nicht wirtschaftlich.") },
  { id: "channels", name: t("Members signed up", "Angemeldete Mitglieder"), kind: "vanity" as PatternId, moved: false, why: t("It counts sign-ups, not what members did.", "Es zählt Anmeldungen, nicht was Mitglieder taten.") },
]);
const KIND_POS: Record<PatternId, { x: number; y: number }> = { outcome: { x: 150, y: 30 }, driver: { x: 150, y: 150 }, guardrail: { x: 420, y: 90 }, vanity: { x: 420, y: 230 } };
const KIND_DE: Record<PatternId, string> = { outcome: "ein Outcome-KPI", driver: "ein Treiber-KPI", guardrail: "eine Guardrail", vanity: "eine Vanity Metric" };

export function KpiTree() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("hist");
  const [past, setPast] = useState(false);
  const m = M_METRICS.find((x) => x.id === sel)!;
  const boxes = M_METRICS.map((x) => {
    const same = M_METRICS.filter((y) => y.kind === x.kind);
    const k = same.indexOf(x);
    const base = KIND_POS[x.kind];
    const w = same.length > 1 ? 130 : 140;
    return { x, bx: base.x - (same.length > 1 ? 140 : 70) + k * 150, by: base.y, w };
  });
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Werra Datentechnik's membership and referral metrics as a KPI tree", "Die Mitgliedschafts- und Empfehlungskennzahlen von Werra Datentechnik als KPI-Baum")}</title>
        <desc id={`${uid}-d`}>{`${m.name}: ${PATTERNS[m.kind].label}.`}</desc>
        <line x1="75" y1="78" x2="75" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="225" y1="78" x2="225" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="75" y1="114" x2="225" y2="114" stroke={C.ink} strokeWidth="1.6" />
        <rect x="340" y="80" width="190" height="72" rx="6" fill="none" stroke={C.amber} strokeDasharray="6 4" />
        <rect x="340" y="222" width="190" height="66" rx="6" fill="none" stroke={C.grey} strokeDasharray="3 4" />
        <text x="435" y="76" textAnchor="middle" fontSize="10.5" fill={C.amber}>{tt("guardrail: must not get worse", "Guardrail: darf nicht schlechter werden")}</text>
        <text x="435" y="218" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("outside the tree: decides nothing", "außerhalb des Baums: entscheidet nichts")}</text>
        {boxes.map(({ x, bx, by, w }) => {
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <rect className="hit-shape" x={bx} y={by} width={w} height="48" rx="6" fill={on ? C.soft : x.kind === "vanity" ? C.mist : C.paper} stroke={on ? C.amber : C.ink} strokeWidth={on ? 2.4 : 1.2} />
              <foreignObject x={bx + 4} y={by + 4} width={w - 8} height="40">
                <div style={{ fontSize: 11.5, lineHeight: 1.2, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              {past && (
                <text x={bx + w - 6} y={by + 60} textAnchor="end" fontSize="10.5" fontWeight="700" fill={x.moved ? C.teal : C.ash}>{x.moved ? tt("● moved with value", "● mit dem Wert bewegt") : tt("○ did not move", "○ nicht bewegt")}</text>
              )}
            </g>
          );
        })}
        <text x="8" y="22" fontSize="10.5" fill={C.ash}>{tt("outcome", "Outcome")}</text>
        <text x="8" y="142" fontSize="10.5" fill={C.ash}>{tt("drivers", "Treiber")}</text>
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={tt("Metric", "Kennzahl")} value={sel} onChange={setSel} options={M_METRICS.map((x) => ({ id: x.id, label: x.name }))} />
        <Toggles<string> label={tt("Last year", "Letztes Jahr")} value={past ? "on" : null} onChange={() => setPast((v) => !v)} options={[{ id: "on", label: past ? tt("Hide last year", "Letztes Jahr verbergen") : tt("Show whether it moved with value last year", "Zeigen, ob es sich letztes Jahr mit dem Wert bewegte") }]} />
      </div>
      <Insight>
        {past
          ? tt(
              `${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Last year it ${m.moved ? "moved" : "did not move"} with customer value. Both outcomes moved, one of two drivers, the guardrail moved, the vanity metric did not: the closer to the top of the tree, the stronger the link.`,
              `${m.name} ist ${KIND_DE[m.kind]}: ${m.why} Letztes Jahr ${m.moved ? "bewegte es sich" : "bewegte es sich nicht"} mit dem Kundenwert. Beide Outcomes bewegten sich, einer von zwei Treibern, die Guardrail bewegte sich, die Vanity Metric nicht: Je näher an der Spitze des Baums, desto stärker die Verbindung.`,
            )
          : tt(`${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Switch on “last year” to see which kinds move with customer value.`, `${m.name} ist ${KIND_DE[m.kind]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Arten sich mit dem Kundenwert bewegen.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A6 · a fair test, and the risk of wrong incentives */

type Flaw = "none" | "two" | "time" | "peek";
const FLAWS = bi({
  none: { label: t("Fair test", "Fairer Test"), a: t("No referral ask · random half of the customers with a review · weeks 1–12", "Keine Empfehlungsbitte · zufällige Hälfte der Kunden mit Review · Wochen 1–12"), b: t("Referral ask at the review · other half · weeks 1–12", "Empfehlungsbitte im Review · andere Hälfte · Wochen 1–12"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the ask.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich der Bitte zuschreiben.") },
  two: { label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("No ask · random half", "Keine Bitte · zufällige Hälfte"), b: t("Ask, a cash reward and a new membership tier · other half", "Bitte, eine Geldprämie und eine neue Mitgliedsstufe · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the ask, the reward or the tier did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob die Bitte, die Prämie oder die Stufe es war.") },
  time: { label: t("Compared with last year", "Mit dem Vorjahr verglichen"), a: t("No ask · all customers · last year", "Keine Bitte · alle Kunden · letztes Jahr"), b: t("Ask · all customers · this year", "Bitte · alle Kunden · dieses Jahr"), reading: t("The groups are different years. A new product, a competitor's price cut or simply a good year can explain the difference.", "Die Gruppen sind verschiedene Jahre. Ein neues Produkt, eine Preissenkung eines Wettbewerbers oder einfach ein gutes Jahr können den Unterschied erklären.") },
  peek: { label: t("Account managers choose whom to ask", "Account Manager wählen, wen sie fragen"), a: t("No ask · customers the account manager finds lukewarm", "Keine Bitte · Kunden, die der Account Manager lau findet"), b: t("Ask · customers the account manager likes best", "Bitte · Kunden, die der Account Manager am meisten mag"), reading: t("The favourite customers would have referred more often anyway. The ask gets the credit for the account manager's good relationships.", "Die Lieblingskunden hätten ohnehin öfter empfohlen. Die Bitte bekommt das Verdienst für die guten Beziehungen des Account Managers.") },
});
const FLAW_IDS: Flaw[] = ["none", "two", "time", "peek"];
const rangeOf = (ctl: number, ratio: number) => {
  const se = Math.sqrt(1 / (ctl * ratio) + 1 / ctl);
  const r2 = (x: number) => Math.round(x * 100) / 100;
  return { lo: r2(Math.exp(Math.log(ratio) - 1.96 * se)), hi: r2(Math.exp(Math.log(ratio) + 1.96 * se)) };
};

export function FairTest() {
  const uid = useId().replace(/:/g, "");
  const [flaw, setFlaw] = useState<Flaw>("none");
  const [conv, setConv] = useState(30);
  const f = FLAWS[flaw];
  const ratio = 1.5;
  const { lo, hi } = rangeOf(conv, ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{tt("Group A", "Gruppe A")}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={`rounded-md border px-3 py-2 text-caption ${flaw === "none" ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft"}`}>
            <p className="smallcaps">{tt("Group B", "Gruppe B")}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<Flaw> label={tt("How Werra runs the test", "Wie Werra den Test durchführt")} value={flaw} onChange={setFlaw} options={FLAW_IDS.map((k) => ({ id: k, label: FLAWS[k].label }))} />
        <Insight>{f.reading}</Insight>
      </div>
      <div className="space-y-2">
        <svg viewBox="0 0 560 120" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>{tt("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist")}</title>
          <desc id={`${uid}-d`}>{tt(`With ${conv} new customers in the group without the ask, the uplift lies between ${num(lo)} and ${num(hi)} times.`, `Mit ${conv} Neukunden in der Gruppe ohne Bitte liegt der Uplift zwischen dem ${num(lo)}- und dem ${num(hi)}-Fachen.`)}</desc>
          <line x1="40" y1="60" x2="520" y2="60" stroke={C.ash} />
          {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
            <g key={v}>
              <line x1={X(v)} y1="55" x2={X(v)} y2="65" stroke={C.ash} />
              <text x={X(v)} y="84" textAnchor="middle" fontSize="11" fill={C.ash}>{`${num(v)}×`}</text>
            </g>
          ))}
          <line x1={zero} y1="20" x2={zero} y2="70" stroke={C.rust} strokeDasharray="4 3" />
          <text x={zero + 4} y="22" fontSize="10.5" fill={C.rust}>{tt("1× = no difference", "1× = kein Unterschied")}</text>
          <defs>
            <pattern id={`${uid}-h`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" />
            </pattern>
          </defs>
          <rect x={X(Math.max(lo, 0.5))} y="48" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5)))} height="24" fill={proven ? C.tealSoft : `url(#${uid}-h)`} stroke={proven ? C.teal : C.amber} />
          <circle cx={X(ratio)} cy="60" r="6" fill={C.data} stroke={C.ink} />
          <text x="40" y="110" fontSize="11.5" fill={C.ink}>{tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`)}</text>
        </svg>
        <label htmlFor={`${uid}-c`} className="smallcaps block">
          {tt(`New customers from referrals in the group without the ask: ${conv} (the group with the ask has 1.5 times as many)`, `Neukunden aus Empfehlungen in der Gruppe ohne Bitte: ${conv} (die Gruppe mit Bitte hat 1,5-mal so viele)`)}
        </label>
        <input id={`${uid}-c`} type="range" min={10} max={300} step={10} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
        <Insight>
          {proven
            ? tt(`With ${conv} new customers per group, even the low end of the range (${num(lo)}×) is above “no difference”: the uplift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} Neukunden pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Uplift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`)
            : tt(`With ${conv} new customers per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} Neukunden pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`)}
        </Insight>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Werra Datentechnik (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Werra Datentechnik (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A7 · scoring: Werra's three measures */

type WM = { id: string; name: string; cost: number; joins: Joins; fea: 1 | 2 | 3; eff: 1 | 2 | 3; note: string };
const M_MEASURES: WM[] = bi([
  { id: "profile", name: t("Referral thank-you: a service day", "Empfehlungs-Dank: ein Servicetag"), cost: 20000, joins: "all" as Joins, fea: 3 as const, eff: 3 as const, note: t("Satisfied customers bring warm leads, the thank-you is value rather than cash, and the cost stays the same however many take part.", "Zufriedene Kunden bringen warme Leads, das Dankeschön ist Wert statt Geld, und die Kosten bleiben gleich, egal wie viele teilnehmen.") },
  { id: "bot", name: t("€300 cash per referral", "300 € Geld pro Empfehlung"), cost: 25000, joins: "one" as Joins, fea: 1 as const, eff: 2 as const, note: t("It brings names, but many are weak or fake, and it pays for every name, not for customers.", "Es bringt Namen, aber viele sind schwach oder gefälscht, und es zahlt für jeden Namen, nicht für Kunden.") },
  { id: "am", name: t("A director's visit to every customer", "Chefbesuch bei jedem Kunden"), cost: 30000, joins: "none" as Joins, fea: 1 as const, eff: 2 as const, note: t("Warm and personal, but it needs staff time for every single customer and ends when the calendar is full.", "Warm und persönlich, aber es braucht Personalzeit für jeden einzelnen Kunden und endet, wenn der Kalender voll ist.") },
]);

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("profile");
  const m = M_MEASURES.find((x) => x.id === sel)!;
  const e = explainBucket(bandOf(m.joins));
  const score = e * m.eff * m.fea;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Werra's three measures scored: retention effect × scalability × economic viability", "Werras drei Maßnahmen bewertet: Bindungswirkung × Skalierbarkeit × Wirtschaftlichkeit")}</title>
        <desc id={`${uid}-d`}>{M_MEASURES.map((x) => `${x.name}: ${explainBucket(bandOf(x.joins)) * x.eff * x.fea}`).join("; ")}</desc>
        {M_MEASURES.map((x, i) => {
          const s = explainBucket(bandOf(x.joins)) * x.eff * x.fea;
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && setSel(x.id)}>
              <text x="0" y={y + 17} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{x.name}</text>
              <rect className="hit-shape" x="300" y={y} width={(s / 27) * 220} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={306 + (s / 27) * 220} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Measure", "Maßnahme")} value={sel} onChange={setSel} options={M_MEASURES.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {tt(`${m.name} (${euro(m.cost)}, cost: ${JOINS_LABEL[m.joins]}): retention effect ${m.eff} × scalability ${e} × economic viability ${m.fea} = ${score}. ${m.note}`, `${m.name} (${euro(m.cost)}, Kosten: ${JOINS_LABEL[m.joins]}): Bindungswirkung ${m.eff} × Skalierbarkeit ${e} × Wirtschaftlichkeit ${m.fea} = ${score}. ${m.note}`)}
      </Insight>
    </div>
  );
}
