"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { useCardMore } from "@/store/useCardMore";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, SECTIONS, materialAnchorId } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["reichheld1990", "dowling1997", "bolton2000", "mcalexander2002", "kumar2010", "schmitt2011", "provost2013", "kaplan1992", "ries2011", "kohavi2020", "gneezy2000", "ryu2007", "hubbard2014", "reichheld2003"];
const REFS_B: RefKey[] = ["reichheld1990", "dowling1997", "bolton2000", "mcalexander2002", "kaplan1992", "reichheld2003", "kohavi2020", "ryu2007", "schmitt2011", "courtney1997", "klein2007"];

const CARDS_A_META = MATERIALS.filter((m) => m.block === "A");
const CARDS_B_META = MATERIALS.filter((m) => m.block === "B");

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation, video and rule", "Alle Zusatzerklärungen, Videos und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Customer retention through memberships and referrals: transactional versus relational retention, membership models, customers as multipliers, what a referral is worth, and how to measure and test it without wrong incentives", "Kundenbindung durch Mitgliedschaften und Empfehlungen: transaktionale gegen relationale Bindung, Mitgliedsmodelle, Kunden als Multiplikatoren, was eine Empfehlung wert ist, und wie man ohne falsche Anreize misst und testet")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Seven cards, Level 1 and Level 2 in one run: knowledge first (transactional and relational retention, membership models, customers as multipliers, what a referral is worth), then application (KPIs for memberships and referrals, fair tests and wrong incentives, choosing measures). Every diagram uses Werra Datentechnik, another company, so the task is never answered for you.", "Sieben Karten, Level 1 und Level 2 in einem Durchgang: zuerst Wissen (transaktionale und relationale Bindung, Mitgliedsmodelle, Kunden als Multiplikatoren, was eine Empfehlung wert ist), dann Anwendung (KPIs für Mitgliedschaften und Empfehlungen, faire Tests und falsche Anreize, Maßnahmen wählen). Jedes Diagramm nutzt Werra Datentechnik, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      {CARDS_A.map((C, i) => {
        const m = CARDS_A_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Retention Analysis File.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für die Retention Analysis File nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("A scalable retention system: the vision, the central added values, the KPI system, a scalable referral model with a view to wrong incentives and costs, and a strategic decision under an unclear forecast", "Ein skalierbares Bindungssystem: das Zielbild, die zentralen Mehrwerte, das KPI-System, ein skalierbares Empfehlungsmodell mit Blick auf falsche Anreize und Kosten, und eine strategische Entscheidung bei unklarer Prognose")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards for Level 3. You stop improving single measures and start designing how the whole company retains customers and wins new ones through them. Each card ends in rules the task uses; each diagram uses Ems Systems, another company.", "Fünf Karten für Level 3. Sie verbessern keine einzelnen Maßnahmen mehr, sondern gestalten, wie das ganze Unternehmen Kunden bindet und über sie neue gewinnt. Jede Karte endet mit Regeln, die die Aufgabe nutzt; jedes Diagramm nutzt Ems Systems, ein anderes Unternehmen.")}
      </p>
      {CARDS_B.map((C, i) => {
        const m = CARDS_B_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Retention System Memo.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für das Retention System Memo nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
