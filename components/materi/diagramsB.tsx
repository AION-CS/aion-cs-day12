"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Ems Systems (an IT service provider in Lingen,
 * Case assumption), never ConnectIT. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20), every picture opens with "The point" and carries a three-step "Walk me through it" story that
 * drives the real controls (CLAUDE.md #36); a manual button leaves the story.
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6", rust: "#A4472A" };

/* ------------------------------------------------------------------ B1 · four stages towards a membership and referral system */

type Stage = "report" | "dash" | "rules" | "forecast";
const STAGES: Stage[] = ["report", "dash", "rules", "forecast"];
const STAGE_TEXT = bi({
  report: { name: t("Discounts for everyone", "Rabatte für alle"), spree: t("Every customer who renews gets 10% off; referrals happen by chance.", "Jeder Kunde, der verlängert, erhält 10 % Rabatt; Empfehlungen passieren zufällig."), reading: t("Customers stay as long as the discount is the best on offer; margin shrinks every year and nobody is asked to refer.", "Kunden bleiben, solange der Rabatt das beste Angebot ist; die Marge schrumpft jedes Jahr, und niemand wird um eine Empfehlung gebeten.") },
  dash: { name: t("Added value first", "Mehrwert zuerst"), spree: t("Members get a named expert, two-hour priority support and training seats instead of a discount.", "Mitglieder erhalten einen benannten Experten, Prioritätssupport in zwei Stunden und Schulungsplätze statt eines Rabatts."), reading: t("Members now stay for what they would lose by leaving; the satisfied ones are still not asked to refer.", "Mitglieder bleiben jetzt wegen dessen, was sie beim Gehen verlören; die Zufriedenen werden noch nicht um Empfehlungen gebeten.") },
  rules: { name: t("Members as multipliers", "Mitglieder als Multiplikatoren"), spree: t("“Satisfied members in contact with peers are asked at the quarterly review; when a referred firm signs, both firms get a training day.”", "„Zufriedene Mitglieder mit Kontakt zu anderen werden im Quartalsreview gefragt; wenn eine empfohlene Firma unterschreibt, erhalten beide Firmen einen Schulungstag.“"), reading: t("Retention and acquisition feed each other. This is where single measures become a retention system.", "Bindung und Gewinnung speisen einander. Hier werden einzelne Maßnahmen zu einem Bindungssystem.") },
  forecast: { name: t("Tested and reviewed monthly", "Getestet und monatlich geprüft"), spree: t("Benefits used and referrals are recorded in the CRM; every month the same KPIs decide what is kept, tested further or stopped, and what rewards cost.", "Genutzte Vorteile und Empfehlungen werden im CRM erfasst; jeden Monat entscheiden dieselben KPIs, was bleibt, weiter getestet oder gestoppt wird, und was Belohnungen kosten."), reading: t("The system learns what keeps customers, and drops benefits nobody uses before they cost more.", "Das System lernt, was Kunden hält, und streicht Vorteile, die niemand nutzt, bevor sie mehr kosten.") },
});

export function DataStages() {
  const uid = useId().replace(/:/g, "");
  const [st, setStRaw] = useState<Stage>("dash");
  const story = useStory([
    {
      title: tt("Tested and reviewed monthly", "Getestet und monatlich geprüft"),
      say: tt(`Ems Systems is an example company, not your case. Benefits used and referrals are recorded in the CRM, and every month the same KPIs decide what is kept, tested further or stopped, and what the rewards cost.`, `Ems Systems ist ein Beispielunternehmen, nicht Ihr Fall. Genutzte Vorteile und Empfehlungen werden im CRM erfasst, und jeden Monat entscheiden dieselben KPIs, was bleibt, weiter getestet oder gestoppt wird und was die Belohnungen kosten.`),
      look: tt("the last, tallest bar", "der letzte, höchste Balken"),
      apply: () => {
        setStRaw("forecast");
      },
    },
    {
      title: tt("Discounts for everyone", "Rabatte für alle"),
      say: tt(`Before that, every customer who renewed got 10% off and referrals happened by chance. Customers stayed as long as the discount was the best offer around.`, `Davor erhielt jeder Kunde, der verlängerte, 10 % Rabatt, und Empfehlungen passierten zufällig. Kunden blieben, solange der Rabatt das beste Angebot war.`),
      look: tt("the first, shortest bar", "der erste, niedrigste Balken"),
      apply: () => {
        setStRaw("report");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The jump from discounts to a system is added value first: something members use and would lose by leaving. Try the four stages.`, `Der Sprung von Rabatten zu einem System ist Mehrwert zuerst: etwas, das Mitglieder nutzen und beim Gehen verlören. Probieren Sie die vier Stufen.`),
      look: tt("the second bar", "der zweite Balken"),
      apply: () => {
        setStRaw("dash");
      },
    },
  ]);
  const setSt = (v: Stage) => {
    story.leave();
    setStRaw(v);
  };
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A retention system is not a discount for everyone. It is added value members use, satisfied members who introduce others, and a monthly look at what keeps customers and what it costs.", "Ein Bindungssystem ist kein Rabatt für alle. Es ist Mehrwert, den Mitglieder nutzen, zufriedene Mitglieder, die andere vorstellen, und ein monatlicher Blick darauf, was Kunden hält und was es kostet.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards a membership and referral system", "Vier Stufen zu einem Mitglieder- und Empfehlungssystem")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              {k === st && story.step !== null && <rect x={x - 4} y={150 - h - 4} width="136" height={h + 8} rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <rect className="hit-shape" x={x} y={150 - h} width="128" height={h} fill={k === st ? C.gold : on ? C.data : C.paper} stroke={C.ink} strokeWidth="1.4" />
              <text x={x + 64} y={166} textAnchor="middle" fontSize="11" fill={C.ash}>{`${i + 1}`}</text>
            </g>
          );
        })}
        <text x="10" y="18" fontSize="11.5" fill={C.ash}>{tt("from discounts for everyone → added value first → members as multipliers → tested monthly", "von Rabatten für alle → Mehrwert zuerst → Mitglieder als Multiplikatoren → monatlich getestet")}</text>
      </svg>
      <Toggles<Stage> label={tt("Stage", "Stufe")} value={st} onChange={setSt} options={STAGES.map((k, i) => ({ id: k, label: `${i + 1} · ${STAGE_TEXT[k].name}` }))} />
      <p className="rounded-md border border-line bg-paper px-3 py-2 text-caption text-ink">
        <span className="smallcaps mr-1.5">Ems Systems</span>
        {s.spree}
      </p>
      <Insight>{plain()}{s.reading}</Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · central added values */

type ISrc = { id: string; name: string; decision: boolean; complete: number };
const I_SRC: ISrc[] = bi([
  { id: "upsell", name: t("A named expert per member", "Ein benannter Experte pro Mitglied"), decision: true, complete: 91 },
  { id: "winback", name: t("Priority support in two hours", "Prioritätssupport in zwei Stunden"), decision: true, complete: 86 },
  { id: "voice", name: t("Benchmark report", "Benchmark-Bericht"), decision: true, complete: 45 },
  { id: "sentiment", name: t("Invitations to trade fairs", "Einladungen zu Messen"), decision: false, complete: 75 },
  { id: "images", name: t("A member badge", "Ein Mitgliedsabzeichen"), decision: false, complete: 100 },
]);
const useOfI = (s: ISrc) => (!s.decision ? "leave" : s.complete >= 80 ? "core" : "later");
export function SourceGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("voice");
  const story = useStory([
    {
      title: tt("Select now", "Jetzt auswählen"),
      say: tt(`Ems Systems is an example company, not your case. A named expert per member names a KPI it should move, and ${I_SRC[0].complete}% of its data is ready: select now, and test it against a control group.`, `Ems Systems ist ein Beispielunternehmen, nicht Ihr Fall. Ein benannter Experte pro Mitglied nennt einen KPI, den sie bewegen soll, und ${I_SRC[0].complete} % ihrer Daten sind bereit: jetzt auswählen und gegen eine Kontrollgruppe testen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setSelRaw("upsell");
      },
    },
    {
      title: tt("Data first", "Erst die Daten"),
      say: tt(`The benchmark report would move a KPI too, but only ${I_SRC[2].complete}% of its data is ready. Built on now, it would learn the gaps. Fix the data first.`, `Der Benchmark-Bericht würde auch einen KPI bewegen, aber nur ${I_SRC[2].complete} % ihrer Daten sind bereit. Jetzt darauf gebaut, würde sie die Lücken lernen. Erst die Daten verbessern.`),
      look: tt("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"),
      apply: () => {
        setSelRaw("voice");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The member badge has ${I_SRC[4].complete}% of its data ready, but it moves no KPI of the system. However complete, not now. Try the other items.`, `Das Mitgliedsabzeichen hat ${I_SRC[4].complete} % seiner Daten bereit, bewegt aber keinen KPI des Systems. Egal wie vollständig: jetzt nicht. Probieren Sie die anderen Punkte.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setSelRaw("images");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Start from the KPI, not from the tool. An item that names a KPI and has its data ready is selected now; with data not ready it waits; with no KPI it is not now, however good it sounds.", "Gehen Sie vom KPI aus, nicht vom Werkzeug. Ein Punkt, der einen KPI nennt und dessen Daten bereit sind, wird jetzt gewählt; mit nicht bereiten Daten wartet er; ohne KPI ist er jetzt nicht dran, egal wie gut er klingt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 210" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Ems Systems' added values by customer decision and use in the pilot", "Mehrwerte von Ems Systems nach Kundenentscheidung und Nutzung im Pilot")}</title>
        <desc id={`${uid}-d`}>{I_SRC.map((x) => `${x.name}: ${useOfI(x)}`).join(", ")}</desc>
        <rect x="60" y="20" width="220" height="90" fill={C.soft} stroke={C.line} />
        <rect x="280" y="20" width="240" height="90" fill={C.tealSoft} stroke={C.line} />
        <rect x="60" y="110" width="460" height="80" fill={C.mist} stroke={C.line} />
        <text x="170" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.amber}>{tt("Central: prove it first", "Zentral: zuerst belegen")}</text>
        <text x="400" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.teal}>{tt("Central: offer now", "Zentral: jetzt anbieten")}</text>
        <text x="290" y="182" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("Not central: no customer decision", "Nicht zentral: keine Kundenentscheidung")}</text>
        <text x="30" y="70" textAnchor="middle" fontSize="11" fill={C.ash} transform="rotate(-90 30 70)">{tt("customer decides", "Kunde entscheidet")}</text>
        <text x="170" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("used by < 80% of pilot members", "von < 80 % der Pilotmitglieder genutzt")}</text>
        <text x="400" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("used by ≥ 80%", "von ≥ 80 % genutzt")}</text>
        {I_SRC.map((x, i) => {
          const p = pos(x, i);
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <circle cx={p.cx} cy={p.cy} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Added value", "Mehrwert")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>{plain()}
        {u === "core"
          ? tt(`${s.name}: it supports a customer decision (renew, stay when something breaks) and ${s.complete}% of the pilot members used it. Central: offer it now to every member.`, `${s.name}: Er unterstützt eine Kundenentscheidung (verlängern, bleiben, wenn etwas ausfällt), und ${s.complete} % der Pilotmitglieder haben ihn genutzt. Zentral: jetzt jedem Mitglied anbieten.`)
          : u === "later"
            ? tt(`${s.name}: it would support a decision, but only ${s.complete}% of the pilot members used it. Offering it to everyone now risks paying for something few want. Prove it first.`, `${s.name}: Er würde eine Entscheidung unterstützen, aber nur ${s.complete} % der Pilotmitglieder haben ihn genutzt. Ihn jetzt allen anzubieten riskiert, für etwas zu zahlen, das wenige wollen. Zuerst belegen.`)
            : tt(`${s.name}: ${s.complete}% used it, but it supports no decision of the customer; nobody renews or refers because of it. Not central, however popular.`, `${s.name}: ${s.complete} % haben ihn genutzt, aber er unterstützt keine Entscheidung des Kunden; niemand verlängert oder empfiehlt deswegen. Nicht zentral, egal wie beliebt.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

type ICrit = "explain" | "timely" | "reach" | "scale";
const I_CRITS: ICrit[] = ["explain", "timely", "reach", "scale"];
const I_CRIT_NAME = bi({ explain: t("Link to value", "Verbindung zum Wert"), timely: t("Early", "Früh"), reach: t("Reach", "Reichweite"), scale: t("Measured automatically", "Automatisch gemessen") });
const I_COMPS = bi([
  { id: "upgrade", name: t("Renewal rate, members and non-members", "Verlängerungsquote, Mitglieder und Nichtmitglieder"), facts: t("linked to value · every week · every customer · counted by the systems", "mit dem Wert verbunden · jede Woche · jeder Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is the result, it moves as contracts come up each week, it covers every customer and the CRM counts it.", "Hoch auf allen vier: Es ist das Ergebnis, bewegt sich, wenn jede Woche Verträge auslaufen, deckt jeden Kunden ab, und das CRM zählt es.") },
  { id: "survey", name: t("Yearly customer survey", "Jährliche Kundenbefragung"), facts: t("linked to value · yearly · those who answer · by a survey", "mit dem Wert verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but once a year is too late to steer a six-month plan.", "Mit dem Wert verbunden, aber einmal im Jahr ist zu spät, um einen Sechsmonatsplan zu steuern.") },
  { id: "views", name: t("Members signed up", "Angemeldete Mitglieder"), facts: t("not linked to value · every week · every customer · counted by the systems", "nicht mit dem Wert verbunden · jede Woche · jeder Kunde · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it rose while renewals stayed flat: signing up is not staying.", "Leicht zu zählen, und sie stieg, während die Verlängerungen gleich blieben: Anmelden ist nicht Bleiben.") },
  { id: "wins", name: t("Account managers' favourite saves", "Lieblingsrettungen der Account Manager"), facts: t("not linked to value · monthly · cases someone picks · collected by hand", "nicht mit dem Wert verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but chosen by the teller, so the customers who left never appear.", "Anschaulich, aber vom Erzähler ausgewählt, also tauchen die Kunden, die gingen, nie auf.") },
]);
export function CompProfile() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("views");
  const story = useStory([
    {
      title: tt("A KPI that passes", "Ein KPI, der besteht"),
      say: tt(`Ems Systems is an example company, not your case. The renewal rate of members and non-members is linked to value, counted every week for every customer by the systems: High on all four, 12 of 12.`, `Ems Systems ist ein Beispielunternehmen, nicht Ihr Fall. Die Verlängerungsquote von Mitgliedern und Nichtmitgliedern ist mit dem Wert verbunden und wird jede Woche für jeden Kunden von den Systemen gezählt: Hoch auf allen vier, 12 von 12.`),
      look: tt("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"),
      apply: () => {
        setSelRaw("upgrade");
      },
    },
    {
      title: tt("A number that does not", "Eine Zahl, die nicht besteht"),
      say: tt(`Members signed up is automatic and complete, but it rose while renewals stood still: a sign-up is not a reason to stay. The link to value stays Low, whatever the rest.`, `Angemeldete Mitglieder ist automatisch und vollständig, stieg aber, während die Verlängerungen stillstanden: Eine Anmeldung ist kein Grund zu bleiben. Die Verbindung zum Wert bleibt Niedrig, egal wie der Rest ist.`),
      look: tt("the first row, Link to value", "die erste Zeile, Verbindung zum Wert"),
      apply: () => {
        setSelRaw("views");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The yearly survey score is linked to value but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.`, `Der jährliche Befragungswert ist mit dem Wert verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten.`),
      look: tt("the second row, Early", "die zweite Zeile, Früh"),
      apply: () => {
        setSelRaw("survey");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A KPI worth steering by is linked to value, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.", "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Wert verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Ems Systems on four tests", "Ein KPI-Kandidat von Ems Systems nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              {((story.step === 1 && k === "explain") || (story.step === 2 && k === "timely")) && <rect x="-4" y={y - 3} width="556" height="32" rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <text x="0" y={y + 18} fontSize="12" fill={C.ink}>{I_CRIT_NAME[k]}</text>
              {[1, 2, 3].map((b) => (
                <rect key={b} x={160 + (b - 1) * 110} y={y} width="104" height="26" fill={b <= v ? (v === 1 ? C.grey : C.data) : C.paper} stroke={C.ink} strokeDasharray={b <= v ? undefined : "4 3"} />
              ))}
              <text x="500" y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][v]}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("KPI candidate", "KPI-Kandidat")} value={sel} onChange={setSel} options={I_COMPS.map((x) => ({ id: x.id, label: x.name }))} />
      <p className="text-caption text-ash">
        <span className="font-semibold text-ink">{tt("Printed facts: ", "Gedruckte Fakten: ")}</span>
        {c.facts}
      </p>
      <Insight>{plain()}
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and decisions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLiftRaw] = useState(20);
  const [cases, setCasesRaw] = useState(40);
  const story = useStory([
    {
      title: tt("Roll out", "Ausrollen"),
      say: tt(`Ems Systems is an example company, not your case. A test of a referral thank-you shows +30% on 200 decisions per group: clear and proven. Roll out.`, `Ems Systems ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test eines Empfehlungs-Dankeschöns zeigt +30 % bei 200 Entscheidungen pro Gruppe: klar und belegt. Ausrollen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(200);
      },
    },
    {
      title: tt("Keep testing", "Weiter testen"),
      say: tt(`Another test also shows +30%, but on only 40 decisions per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test zeigt auch +30 %, aber nur bei 40 Entscheidungen pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`),
      look: tt("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(40);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`A third test shows +2% on 300 decisions. Many decisions do not rescue a tiny uplift: they prove it is tiny. Stop. Move the two sliders to try your own.`, `Ein dritter Test zeigt +2 % bei 300 Entscheidungen. Viele Entscheidungen retten keinen winzigen Uplift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setLiftRaw(2);
        setCasesRaw(300);
      },
    },
  ]);
  const setLift = (v: number) => {
    story.leave();
    setLiftRaw(v);
  };
  const setCases = (v: number) => {
    story.leave();
    setCasesRaw(v);
  };
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Every test ends in a decision. A clear uplift on enough decisions: roll out. A strong uplift on too few, or a small one: keep testing. No real uplift: stop.", "Jeder Test endet in einer Entscheidung. Ein klarer Uplift bei genug Entscheidungen: ausrollen. Ein starker Uplift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Uplift: stoppen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 200" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Roll out, keep testing or stop, by uplift and decisions per group", "Ausrollen, weiter testen oder stoppen, nach Uplift und Entscheidungen pro Gruppe")}</title>
        <desc id={`${uid}-d`}>{tt(`Uplift ${lift}%, ${cases} decisions: ${act}.`, `Uplift ${lift} %, ${cases} Entscheidungen: ${act}.`)}</desc>
        <rect x={X(CASES_MIN)} y={Y(60)} width={X(300) - X(CASES_MIN)} height={Y(LIFT_ACT) - Y(60)} fill={C.tealSoft} />
        <rect x={X(0)} y={Y(60)} width={X(CASES_MIN) - X(0)} height={Y(LIFT_ACT) - Y(60)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_ACT)} width={X(300) - X(0)} height={Y(LIFT_WATCH) - Y(LIFT_ACT)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_WATCH)} width={X(300) - X(0)} height={Y(-10) - Y(LIFT_WATCH)} fill={C.mist} />
        <text x={X(200)} y={Y(45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.teal}>{tt("roll out", "ausrollen")}</text>
        <text x={X(50)} y={Y(45)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(6)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(-4)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("stop", "stoppen")}</text>
        <line x1={X(0)} y1={Y(0)} x2={X(300)} y2={Y(0)} stroke={C.rust} strokeDasharray="4 3" />
        <line x1={X(0)} y1={Y(-10)} x2={X(0)} y2={Y(60)} stroke={C.ash} />
        <text x={X(150)} y="196" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("decisions (renewed or not, signed or not) in the smaller group →", "Entscheidungen (verlängert oder nicht, unterschrieben oder nicht) in der kleineren Gruppe →")}</text>
        <text x="16" y={Y(25)} textAnchor="middle" fontSize="11" fill={C.ash} transform={`rotate(-90 16 ${Y(25)})`}>{tt("uplift % →", "Uplift % →")}</text>
        {story.step !== null && <circle cx={X(cases)} cy={Y(lift)} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <circle cx={X(cases)} cy={Y(lift)} r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-lift`} className="smallcaps block">{tt(`Uplift over the control group: ${lift > 0 ? "+" : ""}${lift}%`, `Uplift gegenüber der Kontrollgruppe: ${lift > 0 ? "+" : ""}${lift} %`)}</label>
          <input id={`${uid}-lift`} type="range" min={-10} max={60} step={1} value={lift} onChange={(e) => setLift(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
        <div>
          <label htmlFor={`${uid}-cases`} className="smallcaps block">{tt(`Decisions per group: ${cases}`, `Entscheidungen pro Gruppe: ${cases}`)}</label>
          <input id={`${uid}-cases`} type="range" min={10} max={300} step={10} value={cases} onChange={(e) => setCases(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
      </div>
      <Insight>{plain()}
        {act === "intervene"
          ? tt(`An uplift of ${lift}% on ${cases} decisions per group: clear and proven. Roll out, and hand it to the team that runs it.`, `Ein Uplift von ${lift} % bei ${cases} Entscheidungen pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, das es betreibt.`)
          : act === "watch"
            ? lift >= LIFT_ACT
              ? tt(`An uplift of ${lift}% looks strong, but ${cases} decisions are too few to trust it (fewer than ${CASES_MIN}). Keep testing; customer operations runs it until the size is reached.`, `Ein Uplift von ${lift} % sieht stark aus, aber ${cases} Entscheidungen sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; Customer Operations lässt ihn laufen, bis die Größe erreicht ist.`)
              : tt(`An uplift of ${lift}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Uplift von ${lift} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`)
            : tt(`An uplift of ${lift}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Uplift von ${lift} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B5 · how an architecture is built: Ems's referral programme and its base */

/**
 * The worked example of Materi B5 on the example company Ems Systems (a Münster IT provider) (Case assumption): a small version of the Route 2 panel. Two controls set the same
 * two facts the panel reads: does the membership start before the referral thank-you, and are its claims or data backed. The links in the picture break the way the
 * panel's do, and "What this shows" says what the break means.
 */
export function ArchExample() {
  const [measFirst, setMeasFirstRaw] = useState(true);
  const [ready, setReadyRaw] = useState(true);
  const story = useStory([
    {
      title: tt("The base first", "Die Basis zuerst"),
      say: tt("Ems Systems is an example company, not your case. It starts its membership and its KPIs first, so its referral thank-you builds on a benefit members already have and is measured from its first month.", "Ems Systems ist ein Beispielunternehmen, nicht Ihr Fall. Es startet zuerst seine Mitgliedschaft und seine KPIs, damit sein Empfehlungs-Dankeschön auf einem Vorteil aufbaut, den Mitglieder schon haben, und ab dem ersten Monat gemessen wird."),
      look: tt("the solid teal link between the referral thank-you and the base", "die durchgezogene teal Verbindung zwischen Empfehlungs-Dankeschön und Basis"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The tool before the base", "Das Werkzeug vor der Basis"),
      say: tt("Now the referral thank-you starts first. There is no membership to build on and nothing measures it, so nobody can say whether it works. Its link is dashed.", "Jetzt startet das Empfehlungs-Dankeschön zuerst. Es gibt keine Mitgliedschaft, auf der es aufbaut, und nichts misst es, also kann niemand sagen, ob es wirkt. Seine Verbindung ist gestrichelt."),
      look: tt("the dashed amber link and the note on the referral thank-you", "die gestrichelte amberfarbene Verbindung und der Vermerk am Empfehlungs-Dankeschön"),
      apply: () => {
        setMeasFirstRaw(false);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Built on the membership, but on a benefit only 75% of pilot members used, it would scale an offer that does not hold. Base first, then a part on proven uptake. Try the two buttons.", "Auf der Mitgliedschaft aufgebaut, aber auf einem Vorteil, den nur 75 % der Pilotmitglieder nutzten, würde es ein Angebot skalieren, das nicht trägt. Zuerst die Basis, dann ein Baustein auf belegter Nutzung. Probieren Sie die beiden Schaltflächen."),
      look: tt("the uptake note under the referral thank-you", "den Nutzungsvermerk unter dem Empfehlungs-Dankeschön"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(false);
      },
    },
  ]);
  const setMeasFirst = (v: boolean) => {
    story.leave();
    setMeasFirstRaw(v);
  };
  const setReady = (v: boolean) => {
    story.leave();
    setReadyRaw(v);
  };
  const dataPct = ready ? 90 : 75;
  const dataOk = dataPct >= 80;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An architecture is built in order: the base first (the membership and the KPIs), then the proof of uptake, then the parts that grow it. Where a link in that chain is missing, the part above it cannot be trusted.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (die Mitgliedschaft und die KPIs), dann der Beleg der Nutzung, dann die Bausteine, die sie wachsen lassen. Wo ein Glied dieser Kette fehlt, lässt sich dem Baustein darüber nicht trauen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div role="group" aria-label={tt("Ems's referral programme and its base", "Das Empfehlungsprogramm von Ems und seine Basis")} className="mx-auto max-w-xl">
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What customers meet: the referral form in the portal", "Was Kunden erleben: das Empfehlungsformular im Portal")}</div>
        <div className="my-1 flex h-7 items-center justify-center" aria-hidden />
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("Referral thank-you: a free training day for both firms", "Empfehlungs-Dankeschön: ein kostenloser Schulungstag für beide Firmen")}</p>
          <p className="text-ash">{tt(measFirst ? "Starts in month 1" : "Starts in month 1, before the base", measFirst ? "Startet in Monat 1" : "Startet in Monat 1, vor der Basis")}</p>
          {!measFirst && <p className="text-accent">{tt("no membership to build on and nothing measures it yet", "noch keine Mitgliedschaft, auf der es aufbaut, und nichts misst es")}</p>}
          {!dataOk && <p className="text-accent">{tt(`the benefit it builds on was used by ${dataPct}% of pilot members, below 80%, when it starts`, `der Vorteil, auf dem es aufbaut, wurde von ${dataPct} % der Pilotmitglieder genutzt, unter 80 %, wenn es startet`)}</p>}
        </div>
        <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", measFirst ? "text-ash" : "text-accent")}>
          <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", measFirst ? "border-solid border-signal" : "border-dashed border-gold")} />
          <span>{measFirst ? tt("builds on the membership", "baut auf der Mitgliedschaft auf") : tt("no membership to build on", "keine Mitgliedschaft, auf der es aufbaut")}</span>
        </div>
        <div className="rounded-lg border border-signal bg-signalSoft p-2 text-caption leading-snug">
          <p className="font-semibold text-ink">{tt("Membership with its added values and KPIs", "Mitgliedschaft mit ihren Mehrwerten und KPIs")}</p>
          <p className="text-ash">{measFirst ? tt("Starts in month 1", "Startet in Monat 1") : tt("Starts in month 3, after the referral thank-you", "Startet in Monat 3, nach dem Empfehlungs-Dankeschön")}</p>
        </div>
        <div className="flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal text-ash">
          <span aria-hidden className="block h-full w-0 border-l-[3px] border-solid border-signal" />
          <span>{tt("what members really use flows up", "Was Mitglieder wirklich nutzen, fließt nach oben")}</span>
        </div>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt(`Where the uptake shows: the pilot and the CRM, ${dataPct}% of pilot members used the benefit it builds on`, `Wo sich die Nutzung zeigt: Pilot und CRM, ${dataPct} % der Pilotmitglieder nutzten den Vorteil, auf dem es aufbaut`)}</div>
      </div>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Two things to change", "Zwei Dinge zum Ändern")}</p>
        <Toggles<string> label={tt("The membership starts", "Die Mitgliedschaft startet")} value={measFirst ? "first" : "after"} onChange={(v) => setMeasFirst(v === "first")} options={[{ id: "first", label: tt("Before the thank-you", "Vor dem Dankeschön") }, { id: "after", label: tt("After the thank-you", "Nach dem Dankeschön") }]} />
        <Toggles<string> label={tt("Uptake behind the thank-you", "Nutzung hinter dem Dankeschön")} value={ready ? "ready" : "weak"} onChange={(v) => setReady(v === "ready")} options={[{ id: "ready", label: tt("90% of pilot members", "90 % der Pilotmitglieder") }, { id: "weak", label: tt("75% of pilot members", "75 % der Pilotmitglieder") }]} />
      </div>
      <Insight>{plain()}
        {measFirst && dataOk
          ? tt("The base exists before the part and the part builds on a benefit members use. Ems can say whether the thank-you works, and it scales something that holds. This is what a plan that holds looks like.", "Die Basis steht vor dem Baustein, und der Baustein baut auf einem Vorteil auf, den Mitglieder nutzen. Ems kann sagen, ob das Dankeschön wirkt, und es skaliert etwas, das trägt. So sieht ein Plan aus, der hält.")
          : !measFirst
            ? tt("The thank-you starts before the membership exists. Its link to the base is dashed: Ems would pay for a part and never know whether it works. The fix is the order: the membership and KPIs first.", "Das Dankeschön startet, bevor die Mitgliedschaft steht. Seine Verbindung zur Basis ist gestrichelt: Ems würde für einen Baustein zahlen und nie wissen, ob er wirkt. Die Lösung ist die Reihenfolge: zuerst Mitgliedschaft und KPIs.")
            : tt("It builds on the membership, but the benefit was used by only 75% of pilot members, below the 80% a part should start on. It would scale an offer that does not hold. The fix is to prove the uptake first, or to hold the part back until it is.", "Es baut auf der Mitgliedschaft auf, aber der Vorteil wurde nur von 75 % der Pilotmitglieder genutzt, unter den 80 %, auf denen ein Baustein starten sollte. Es würde ein Angebot skalieren, das nicht trägt. Die Lösung ist, zuerst die Nutzung zu belegen oder den Baustein zurückzuhalten, bis sie es ist.")}
      </Insight>
    </div>
  );
}
