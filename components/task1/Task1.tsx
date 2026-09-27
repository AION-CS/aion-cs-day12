"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { TASK1_MINUTES } from "@/lib/routes";

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
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine benefits from a first draft of a membership programme (Block 1.1).", "Neun Vorteile aus einem ersten Entwurf eines Mitgliedsprogramms (Block 1.1).")}</li>
            <li>{tt("Last year's leads from marketing and from referrals, and eight existing customers (Blocks 1.2 and 1.3).", "Die Leads des letzten Jahres aus Marketing und Empfehlungen, und acht Bestandskunden (Blöcke 1.2 und 1.3).")}</li>
            <li>{tt("Twelve metrics ConnectIT reports today (Block 2.1).", "Zwölf Kennzahlen, die ConnectIT heute berichtet (Block 2.1).")}</li>
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
          <p className="smallcaps">{tt(`How the task runs · about ${TASK1_MINUTES} min`, `So läuft die Aufgabe · ca. ${TASK1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Understand membership benefits, put a euro figure on referrals, recognise which customers to ask and which only want a discount, and develop three retention approaches (Level 1).", "Mitgliedervorteile verstehen, Empfehlungen einen Euro-Wert geben, erkennen, welche Kunden man fragt und welche nur einen Rabatt wollen, und drei Bindungsansätze entwickeln (Level 1).")}</li>
            <li>{tt("Define KPIs for memberships and referrals and design a fair A/B test (Level 2).", "KPIs für Mitgliedschaften und Empfehlungen festlegen und einen fairen A/B-Test entwerfen (Level 2).")}</li>
            <li>{tt("Choose three retention measures, evaluate their economic viability and defend the order.", "Drei Bindungsmaßnahmen wählen, ihre Wirtschaftlichkeit bewerten und die Reihenfolge begründen.")}</li>
          </ol>
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
        <p className="smallcaps text-accent">{tt(`Task 1 · about ${TASK1_MINUTES} minutes`, `Task 1 · ca. ${TASK1_MINUTES} Minuten`)}</p>
        <h2 id="task1-h">{tt("Retention Analysis: membership, referral, value", "Retention Analysis: Mitgliedschaft, Empfehlung, Wert")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand retention models", "Bindungsmodelle verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <Block12 />
      <Block13 />
      <Block14 />
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <Block22 />
      <Block23 />
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
