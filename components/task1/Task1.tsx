"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, TASK1_MINUTES } from "@/lib/routes";

const CORE_MIN = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["1.3"] + BLOCK_MINUTES["2.1"] + BLOCK_MINUTES["2.4"];

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: ConnectIT Services GmbH", "Der Fall: ConnectIT Services GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("ConnectIT Services GmbH provides managed IT services to the Mittelstand: support, cloud workplaces and security for firms with 20 to 500 staff. It keeps too few of its customers, winning new ones through ads, fairs and cold calls is expensive, and the potential of existing customers is unused: satisfied customers are rarely asked for a referral and many use only a fraction of the service. In a market with high competitive pressure, where customers switch providers often, ConnectIT wants to retain customers for the long term through a membership model and referrals.", "ConnectIT Services GmbH erbringt Managed IT Services für den Mittelstand: Support, Cloud-Arbeitsplätze und Sicherheit für Firmen mit 20 bis 500 Mitarbeitenden. Es hält zu wenige seiner Kunden, Neukunden über Anzeigen, Messen und Kaltakquise zu gewinnen ist teuer, und das Potenzial der Bestandskunden ist ungenutzt: Zufriedene Kunden werden selten um eine Empfehlung gebeten, und viele nutzen nur einen Bruchteil des Service. In einem Markt mit hohem Wettbewerbsdruck, in dem Kunden oft den Anbieter wechseln, will ConnectIT Kunden durch ein Mitgliedsmodell und Empfehlungen langfristig binden.")}
        </Gloss>
      </p>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first sign: last year ${num(PILOT.control.sent)} leads from marketing closed at ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}%, while ${num(PILOT.variant.sent)} leads that customers referred closed at ${num(FORECAST.f1, { maximumFractionDigits: 1 })}%, ${num(FORECAST.f2)} times as often. Customers chose whom to refer, so it is a hint of what a programme could do, not proof.`,
            `Ein erstes Zeichen: Im letzten Jahr schlossen ${num(PILOT.control.sent)} Leads aus dem Marketing mit ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % ab, während ${num(PILOT.variant.sent)} Leads, die Kunden empfohlen hatten, mit ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % abschlossen, ${num(FORECAST.f2)}-mal so oft. Kunden wählten, wen sie empfahlen, also ist es ein Hinweis darauf, was ein Programm leisten könnte, kein Beweis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine benefits from a first draft of a membership programme (Block 1.1).", "Neun Vorteile aus einem ersten Entwurf eines Mitgliedsprogramms (Block 1.1).")}</li>
            <li>{tt("Eight existing customers (Block 1.3); last year's leads from marketing and from referrals (optional Block 1.2).", "Acht Bestandskunden (Block 1.3); die Leads des letzten Jahres aus Marketing und Empfehlungen (optionaler Block 1.2).")}</li>
            <li>{tt("Twelve metrics ConnectIT reports today (Block 2.1) and nine measures it could fund (Block 2.4).", "Zwölf Kennzahlen, die ConnectIT heute berichtet (Block 2.1), und neun Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks and how the cost of every measure grows are printed in Block 2.4.", "Kosten, Wochen und wie die Kosten jeder Maßnahme wachsen, stehen in Block 2.4.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · four core blocks, about ${CORE_MIN} min`, `So läuft die Aufgabe · vier Kernblöcke, ca. ${CORE_MIN} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine membership benefits into incentive, service or community, and name an advantage of your own (Level 1).", "Block 1.1: neun Mitgliedervorteile in Anreiz, Service oder Community sortieren und einen eigenen Vorteil nennen (Level 1).")}</li>
            <li>{tt("Block 1.3: choose the customers to ask first for a referral and the ones who would join only for a discount, and write three retention approaches (Level 1).", "Block 1.3: die Kunden wählen, die Sie zuerst um eine Empfehlung bitten, und die, die nur wegen eines Rabatts beitreten würden, und drei Bindungsansätze schreiben (Level 1).")}</li>
            <li>{tt("Block 2.1: tag twelve metrics by kind and name your three KPIs (Level 2).", "Block 2.1: zwölf Kennzahlen nach Art zuordnen und Ihre drei KPIs nennen (Level 2).")}</li>
            <li>{tt("Block 2.4: choose three of nine measures, evaluate them and defend the order (Level 2).", "Block 2.4: drei von neun Maßnahmen wählen, bewerten und die Reihenfolge begründen (Level 2).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Four more blocks (about ${TASK1_MINUTES - CORE_MIN} min) are optional and folded.`, `Vier weitere Blöcke (ca. ${TASK1_MINUTES - CORE_MIN} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: low customer retention, expensive new customer acquisition, potential of existing customers unused; a company that wants to retain customers for the long term under high competitive pressure, with customers who switch providers often; a limited marketing budget and high customer satisfaction; €130,000 and five months. Everything else is made up for this exercise: the benefits, the lead figures, the customers, the metrics, the rates and the costs.", "Der Auftrag sagt: geringe Kundenbindung, teure Neukundengewinnung, Potenzial der Bestandskunden ungenutzt; ein Unternehmen, das Kunden unter hohem Wettbewerbsdruck langfristig binden will, mit Kunden, die oft den Anbieter wechseln; ein begrenztes Marketingbudget und hohe Kundenzufriedenheit; 130.000 € und fünf Monate. Alles andere ist für diese Übung erfunden: die Vorteile, die Lead-Zahlen, die Kunden, die Kennzahlen, die Quoten und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-retention-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · four core blocks, optional blocks folded`, `Task 1 · vier Kernblöcke, optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Retention Analysis: membership, referral, value", "Retention Analysis: Mitgliedschaft, Empfehlung, Wert")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand retention models", "Bindungsmodelle verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the referral figures: two close rates side by side", "Block 1.2 · Die Empfehlungswerte lesen: zwei Abschlussquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (customers chose whom to refer); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (Kunden wählten, wen sie empfahlen); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <Block13 />
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Retention Analysis File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Retention Analysis File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each kind of metric is worth, and the uncertainties", "Block 2.2 · Was jede Art von Kennzahl wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads what each kind of metric tells management, from your tags in Block 2.1, and what can mislead a measurement; Block 2.4 can be answered without it.", "Liest, was jede Art von Kennzahl dem Management sagt, aus Ihren Zuordnungen in Block 2.1, und was eine Messung in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a referral ask; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf eine Empfehlungsbitte an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Retention Analysis File", "Vorschau Ihrer Retention Analysis File")}
        exportLabel={tt("Export the Retention Analysis File", "Retention Analysis File exportieren")}
        docTitle="Retention Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
