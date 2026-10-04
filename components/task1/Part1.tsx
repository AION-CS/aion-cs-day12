"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Incentive, service or community?", "Block 1.1 · Anreiz, Service oder Community?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine benefits on the sort board below, from ConnectIT's first draft of a membership programme, collected from marketing, sales and Customer Success. Answer on the sort board.", "Route 1 → Task 1 → die neun Vorteile auf der Sortiertafel unten, aus dem ersten Entwurf eines Mitgliedsprogramms von ConnectIT, gesammelt bei Marketing, Vertrieb und Customer Success. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("benefit", "Vorteil")}
        intro={tt("Drag a benefit onto the kind of value it gives, or select it and then select a kind. Select a placed one to move it again. One kind per benefit: incentive, service added value or community.", "Ziehen Sie einen Vorteil auf die Art von Wert, die er gibt, oder wählen Sie ihn aus und dann eine Art. Wählen Sie einen platzierten, um ihn zu verschieben. Eine Art pro Vorteil: Anreiz, Service-Mehrwert oder Community.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1 to A3", "Testfragen · aus Materi A1 bis A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every benefit. They repeat the tests from Materi A1 and A2; they never say which benefit goes where.", "Stellen Sie diese Fragen zu jedem Vorteil. Sie wiederholen die Tests aus Materi A1 und A2; sie sagen nie, welcher Vorteil wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("An advantage of a membership model", "Ein Vorteil eines Mitgliedsmodells")}
        help={tt("Name one advantage a membership model would give ConnectIT, in a market where customers switch providers often, and why it works (“so …”). At least 30 characters.", "Nennen Sie einen Vorteil, den ein Mitgliedsmodell ConnectIT in einem Markt bringen würde, in dem Kunden oft den Anbieter wechseln, und warum er wirkt („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What the case says (the brief)", "Was der Fall sagt (der Auftrag)"), value: tt("low retention, expensive new customers, potential of existing customers unused", "niedrige Bindung, teure Neukunden, Potenzial der Bestandskunden ungenutzt"), target: "case-brief" },
            { label: tt("The three kinds of value (Materi A1 and A2)", "Die drei Arten von Wert (Materi A1 und A2)"), value: tt("incentive · service added value · community", "Anreiz · Service-Mehrwert · Community"), target: "mat-A2" },
            { label: tt("The nine benefits above", "Die neun Vorteile oben"), value: tt("see what the teams already put in the draft", "sehen Sie, was die Teams schon in den Entwurf geschrieben haben"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name the kind of value you mean: an incentive, a service added value or a community.", "Nennen Sie die Art von Wert, die Sie meinen: einen Anreiz, einen Service-Mehrwert oder eine Community."),
            tt("Say what it gives the customer (a saving, help, people to learn from).", "Sagen Sie, was es dem Kunden gibt (eine Ersparnis, Hilfe, Menschen, von denen er lernt)."),
            tt("Finish with “so …”: why that keeps the customer with ConnectIT.", "Schließen Sie mit „also …“: warum das den Kunden bei ConnectIT hält."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the referral figures: two close rates side by side", "Block 1.2 · Die Empfehlungswerte lesen: zwei Abschlussquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two close rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Abschlussquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("ConnectIT's CRM shows how last year's leads ended, split by where they came from: marketing campaigns, or referrals from customers. The app divides deals by leads and prints both close rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell ConnectIT. How such a rate is worked out is shown in", "Das CRM von ConnectIT zeigt, wie die Leads des letzten Jahres endeten, aufgeteilt danach, woher sie kamen: aus Marketingkampagnen oder aus Empfehlungen von Kunden. Die App teilt Abschlüsse durch Leads und druckt beide Abschlussquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie ConnectIT sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · leads by where they came from (Case assumption)", "Letztes Jahr · Leads nach Herkunft (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Leads", "Leads")}</th>
              <th className="px-3 py-2 text-right">{tt("Deals", "Abschlüsse")}</th>
              <th className="px-3 py-2 text-right">{tt("Close rate (printed)", "Abschlussquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("From marketing", "Aus dem Marketing"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("Referred by a customer", "Von einem Kunden empfohlen"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 leads, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} closed when they came from marketing and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} when a customer referred them, so referred leads closed ${num(FORECAST.f2)} times as often. But satisfied customers refer firms that already suit ConnectIT, so the gap may overstate what a programme can do.`, `So lesen Sie es: Von je 100 Leads schlossen ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} ab, wenn sie aus dem Marketing kamen, und ${num(FORECAST.f1, { maximumFractionDigits: 1 })}, wenn ein Kunde sie empfahl; empfohlene Leads schlossen also ${num(FORECAST.f2)}-mal so oft ab. Aber zufriedene Kunden empfehlen Firmen, die ohnehin zu ConnectIT passen, also kann der Abstand überschätzen, was ein Programm leisten kann.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the referral figures mean for ConnectIT?", "Was bedeuten die Empfehlungswerte für ConnectIT?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what ConnectIT should do next, and why it cannot be sure yet that a programme would produce the same result.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was ConnectIT als Nächstes tun sollte, und warum es noch nicht sicher sein kann, dass ein Programm dasselbe Ergebnis brächte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much more often referred leads closed, and who chose whom to refer? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel öfter empfohlene Leads abschlossen, und wer wählte, wen er empfahl? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Close rates, marketing and referred", "Abschlussquoten, Marketing und empfohlen"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Deals behind each group", "Abschlüsse hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("customers chose whom to refer", "Kunden wählten, wen sie empfahlen"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much more often referred leads closed (the two rates, or “three times”).", "Sagen Sie, wie viel öfter empfohlene Leads abschlossen (die zwei Quoten, oder „dreimal“)."),
            tt("Say what ConnectIT should do next, for example test a referral ask fairly.", "Sagen Sie, was ConnectIT als Nächstes tun sollte, zum Beispiel eine Empfehlungsbitte fair testen."),
            tt("Say it as an estimate: customers chose whom to refer.", "Sagen Sie es als Schätzung: Kunden wählten, wen sie empfahlen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Referrers, discount seekers, and three retention approaches", "Block 1.3 · Empfehler, Rabattsuchende, und drei Bindungsansätze")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight existing customers” below: annual contract, satisfaction in the last survey, whether they are in regular contact with other firms of their industry, and what they talk about most. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Bestandskunden“ unten: Jahresvertrag, Zufriedenheit in der letzten Befragung, ob sie in regelmäßigem Kontakt mit anderen Firmen ihrer Branche stehen, und worüber sie vor allem sprechen. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one existing customer of ConnectIT. “Annual contract” is what the customer pays a year. “Satisfaction in the last survey” says how happy the customer was. “In contact with peers? · Talks most about” says whether the customer knows other customers of ConnectIT and what it keeps coming back to: the price, the service, or the people.", "So lesen Sie die Tabelle. Jede Zeile ist ein Bestandskunde von ConnectIT. „Jahresvertrag“ ist, was der Kunde pro Jahr zahlt. „Zufriedenheit in der letzten Befragung“ sagt, wie zufrieden der Kunde war. „In Kontakt mit anderen Firmen? · Spricht vor allem über“ sagt, ob der Kunde andere Kunden von ConnectIT kennt und worauf er immer wieder zurückkommt: den Preis, den Service oder die Menschen.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight existing customers · last survey and account managers' notes (Case assumption)", "Acht Bestandskunden · letzte Befragung und Notizen der Account Manager (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Customer", "Kunde")}</th>
              <th className="px-3 py-2 text-right">{tt("Annual contract, €", "Jahresvertrag, €")}</th>
              <th className="px-3 py-2">{tt("Satisfaction in the last survey", "Zufriedenheit in der letzten Befragung")}</th>
              <th className="px-3 py-2">{tt("In contact with peers? · Talks most about", "In Kontakt mit anderen Firmen? · Spricht vor allem über")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} customers to ask first for a referral`, `a · Die ${PICK} Kunden, die Sie zuerst um eine Empfehlung bitten`)}</p>
          <OptionList<CustId> multi label={tt("Ask first for a referral", "Zuerst um eine Empfehlung bitten")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} customers who would join only for a discount`, `b · Die ${PICK} Kunden, die nur wegen eines Rabatts beitreten würden`)}</p>
          <OptionList<CustId> multi label={tt("Would join only for a discount", "Würden nur wegen eines Rabatts beitreten")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a referral needs a customer who is satisfied enough to vouch for ConnectIT and who has someone to tell. Which customers are 80% or more satisfied and in contact with peers? And who talks mostly about price and discounts?", "Hinweis: Eine Empfehlung braucht einen Kunden, der zufrieden genug ist, um für ConnectIT einzustehen, und der jemanden hat, dem er es erzählt. Welche Kunden sind zu 80 % oder mehr zufrieden und in Kontakt mit anderen Firmen? Und wer spricht vor allem über Preis und Rabatte?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three retention approaches", "c · Drei Bindungsansätze")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Develop three retention approaches for ConnectIT, each built on a different kind of value: an incentive, a service added value, or a community. Say what ConnectIT offers, to which customers, and why they stay or refer.", "Entwickeln Sie drei Bindungsansätze für ConnectIT, jeden auf einer anderen Art von Wert: ein Anreiz, ein Service-Mehrwert oder eine Community. Sagen Sie, was ConnectIT anbietet, für welche Kunden, und warum sie bleiben oder empfehlen.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Approach ${i + 1}`, `Ansatz ${i + 1}`)}
              help={tt(`Choose the kind of value, then write what ConnectIT offers, to which customers, and why they stay or refer, in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie die Art von Wert und schreiben Sie dann, was ConnectIT anbietet, für welche Kunden, und warum sie bleiben oder empfehlen, in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose an approach no other row uses, and finish with “so” and what the customer understands or feels.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie einen Ansatz, den keine andere Zeile nutzt, und schließen Sie mit „sodass“ und dem, was der Kunde versteht oder fühlt.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Approach", "Ansatz")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the approach…", "Ansatz wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
          <WritingHelp
            id="insight-kit"
            refs={[
              { label: tt("Who refers and who only wants a discount (Materi A3)", "Wer empfiehlt und wer nur einen Rabatt will (Materi A3)"), value: tt("satisfied · knows peers · talks about service and people", "zufrieden · kennt andere Firmen · spricht über Service und Menschen"), target: "mat-A3" },
              { label: tt("The eight customers (table above)", "Die acht Kunden (Tabelle oben)"), value: tt("satisfaction, contact with peers, what each talks about", "Zufriedenheit, Kontakt mit anderen Firmen, worüber jeder spricht"), target: "cust-c1" },
            ]}
            steps={[
              tt("Choose the retention approach and name the customers or the moment it is for.", "Wählen Sie den Bindungsansatz und nennen Sie die Kunden oder den Moment, für den er gedacht ist."),
              tt("Say the approach in one sentence, concretely.", "Sagen Sie den Ansatz in einem Satz, konkret."),
              tt("Finish with why it keeps the customer, and the risk it brings.", "Schließen Sie mit dem, warum es den Kunden hält, und dem Risiko, das es mitbringt."),
            ]}
          />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and approaches", "Meine Wahl und Ansätze prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the approaches. All ${INSIGHT_COUNT} use different kinds of value and say why the customer stays or refers; whether they are good is for you and your facilitator to judge.`, `Bei den Ansätzen ist nichts markiert. Alle ${INSIGHT_COUNT} nutzen verschiedene Arten von Wert und sagen, warum der Kunde bleibt oder empfiehlt; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} approach${l1.insFlagged.length === 1 ? " is" : "es are"} outlined: the kind of value is missing or repeated, the text is short, or it does not say why the customer stays or refers.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Ansatz ist" : "Ansätze sind"} markiert: Die Art von Wert fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, warum der Kunde bleibt oder empfiehlt.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("Why do memberships work as a retention tool, and what is the difference between an incentive and real added value?", "Warum wirken Mitgliedschaften als Bindungsinstrument, und was ist der Unterschied zwischen einem Anreiz und echtem Mehrwert?"), help: tt("One or two sentences, using one incentive and one added value from Block 1.1.", "Ein oder zwei Sätze, mit einem Anreiz und einem Mehrwert aus Block 1.1.") },
    { k: "causation", label: tt("Why do customers refer, and where is the risk of wrong incentives?", "Warum empfehlen Kunden, und wo liegt das Risiko falscher Anreize?"), help: tt("Name what makes a customer refer, a customer from Block 1.3, and one incentive that would do harm.", "Nennen Sie, was einen Kunden empfehlen lässt, einen Kunden aus Block 1.3 und einen Anreiz, der schaden würde.") },
    { k: "decider", label: tt("How would a strategic decision-maker prioritise, and what makes a model scalable?", "Wie würde eine strategische Entscheiderin priorisieren, und was macht ein Modell skalierbar?"), help: tt("Name what they would do first, what they would leave out, and how they would measure it. Be concrete.", "Nennen Sie, was sie zuerst tun würde, was sie weglassen würde und wie sie es messen würde. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 and 1.3, and the risk of wrong incentives in Materi A6. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 und 1.3 und das Risiko falscher Anreize in Materi A6. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you make it measurable: why do memberships retain, why do customers refer, and how would a strategic decision-maker prioritise?", "Bevor Sie es messbar machen: Warum binden Mitgliedschaften, warum empfehlen Kunden, und wie würde eine strategische Entscheiderin priorisieren?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
