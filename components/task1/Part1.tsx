"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { CalcDiagnosis } from "@/components/ui/CalcDiagnosis";
import { Field } from "@/components/ui/Field";
import { FormulaBuilder } from "@/components/ui/FormulaBuilder";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, FIGURES, FIGURE_IDS, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT } from "@/data/forecast";
import type { Basis, CustId, FigureId } from "@/data/forecast";
import { FIGURE_BUILDERS, figAnswer, figurePartFlags, partKey } from "@/lib/calcBuilder";
import { citesForecastFigure, figMatches, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, figureGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
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
      />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 */

const row = (id: string, label: string, value: string) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2">{label}</td>
    <td className="tnum px-3 py-2 text-right font-semibold">{value}</td>
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const setFig = (id: FigureId, v: string) => patch((s) => ({ fig: { ...s.fig, [id]: v }, figFlagged: s.figFlagged.filter((f) => f !== id), meaningFlagged: false }));
  const check = () =>
    patch((s) => {
      const figFlagged = FIGURE_IDS.filter((id) => s.fig[id].trim() !== "" && !figMatches(s.fig[id], figAnswer(id)));
      const w = s.meaning.trim();
      return { checks: s.checks + 1, figFlagged, figClue: {}, partFlags: figurePartFlags(s.parts), meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · What a referral is worth: three figures", "Block 1.2 · Was eine Empfehlung wert ist: drei Werte")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three tables “Last year”, “Next year” and “All deals” directly below. Answer in the fields under the tables.", "Route 1 → Task 1 → die drei Tabellen „Letztes Jahr“, „Nächstes Jahr“ und „Alle Aufträge“ direkt darunter. Antworten Sie in den Feldern unter den Tabellen.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("ConnectIT's CRM shows how last year's leads ended, split by where they came from: marketing (ads, fairs, cold calls) or a referral by an existing customer. The numbers you need are in the tables below. Look for them first; the buttons “Show where the numbers are” and “Show the formula” are there if you get stuck. The method is taught in", "Das CRM von ConnectIT zeigt, wie die Leads des letzten Jahres endeten, getrennt nach Herkunft: Marketing (Anzeigen, Messen, Kaltakquise) oder die Empfehlung eines Bestandskunden. Die Zahlen, die Sie brauchen, stehen in den Tabellen unten. Suchen Sie sie zuerst selbst; die Schaltflächen „Zeigen, wo die Zahlen stehen“ und „Formel zeigen“ helfen, wenn Sie nicht weiterkommen. Die Methode wird gelehrt in")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        {tt(", on other numbers. What you practise is combining them correctly.", ", mit anderen Zahlen. Was Sie üben, ist, sie richtig zu kombinieren.")}
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative overflow-x-auto rounded-lg border border-line md:col-span-2">
          <table className="w-full border-collapse text-caption">
            <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · leads by where they came from (Case assumption)", "Letztes Jahr · Leads nach Herkunft (Fallannahme)")}</caption>
            <tbody>
              {row("fc-ctl-sent", tt("From marketing · leads", "Aus dem Marketing · Leads"), num(PILOT.control.sent))}
              {row("fc-ctl-orders", tt("From marketing · deals", "Aus dem Marketing · Abschlüsse"), num(PILOT.control.orders))}
              {row("fc-var-sent", tt("Referred by a customer · leads", "Von einem Kunden empfohlen · Leads"), num(PILOT.variant.sent))}
              {row("fc-var-orders", tt("Referred by a customer · deals", "Von einem Kunden empfohlen · Abschlüsse"), num(PILOT.variant.orders))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3">
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Next year", "Nächstes Jahr")}</caption>
              <tbody>{row("fc-yearly", tt("Referred leads a year", "Empfohlene Leads pro Jahr"), num(PILOT.yearly))}</tbody>
            </table>
          </div>
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("All deals", "Alle Aufträge")}</caption>
              <tbody>{row("fc-order", tt("Average deal value", "Durchschnittlicher Auftragswert"), euro(PILOT.order))}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {FIGURE_IDS.map((id) => {
          const f = FIGURES[id];
          const b = FIGURE_BUILDERS[id];
          const flagged = l1.figFlagged.includes(id);
          const partsFlagged = b.parts.some((p) => l1.partFlags.includes(partKey(id, p.id)));
          return (
            <div key={id} className="space-y-2">
              <Field
                id={IDS.figure(id)}
                htmlFor={`fig-${id}-in`}
                label={f.label}
                help={tt(`${f.question} Type the figure as a number, for example ${f.example}.`, `${f.question} Tippen Sie den Wert als Zahl, zum Beispiel ${f.example.replace(".", ",")}.`)}
                flagged={flagged}
                clue={f.clue}
                clueShown={!!l1.figClue[id]}
                onShowClue={() => patch((s) => ({ figClue: { ...s.figClue, [id]: true } }))}
              >
                <input id={`fig-${id}-in`} className="field tnum max-w-xs" inputMode="decimal" autoComplete="off" value={l1.fig[id]} onChange={(e) => setFig(id, e.target.value)} aria-invalid={flagged || undefined} />
              </Field>
              {flagged && (
                <CalcDiagnosis
                  builder={b}
                  figure={id}
                  parts={l1.parts}
                  partFlags={l1.partFlags}
                  name={tt(`your ${id}`, `Ihr ${id}`)}
                  mismatch={(r) => tt(`The parts in the formula calculator are right and give ${r}, but the figure you entered differs. Press “Use this result in ${id}” or check the entry.`, `Die Teile im Formelrechner stimmen und ergeben ${r}, aber Ihr eingetragener Wert weicht ab. Drücken Sie „Ergebnis übernehmen in ${id}“ oder prüfen Sie den Eintrag.`)}
                />
              )}
              <div className="flex flex-wrap items-start gap-2">
                <RevealHint id={`fig-${id}-where`} label={tt("Show where the numbers are", "Zeigen, wo die Zahlen stehen")} title={tt("Numbers you need · the printed rows", "Zahlen, die Sie brauchen · die gedruckten Zeilen")}>
                  <ul className="space-y-1 text-caption">
                    {f.sources.map((s) => (
                      <li key={s.label}>
                        <button type="button" onClick={() => scrollToAndFlash(s.target, "ref")} className="flex min-h-[36px] w-full flex-wrap items-baseline gap-x-2 rounded px-2 py-1 text-left hover:bg-accentSoft">
                          <span className="text-ink">{s.label}:</span>
                          <span className="tnum font-semibold text-ink">{s.value === "F1" ? l1.fig.F1.trim() || tt("your F1", "Ihr F1") : s.value}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </RevealHint>
                <RevealHint id={`fig-${id}-formula`} label={tt("Show the formula", "Formel zeigen")} title={tt(`The formula · from Materi ${f.taughtIn}`, `Die Formel · aus Materi ${f.taughtIn}`)} forceOpen={partsFlagged}>
                  <p className="text-caption text-ink">
                    <Gloss>{f.formula}</Gloss>
                  </p>
                  <FormulaBuilder
                    figure={id}
                    builder={b}
                    parts={l1.parts}
                    partFlags={l1.partFlags}
                    onPart={(k, v) => patch((s) => ({ parts: { ...s.parts, [k]: v }, partFlags: s.partFlags.filter((x) => x !== k) }))}
                    onUse={(v) => setFig(id, String(Math.round(v * 100) / 100))}
                    unit={f.unit}
                    label={id}
                    source={tt("the tables above", "den Tabellen oben")}
                  />
                </RevealHint>
              </div>
              {mentor && <MentorGuide guide={figureGuide(id)} />}
            </div>
          );
        })}
      </div>
      <TextBox
        id={IDS.meaning}
        label={tt("What do referrals mean for ConnectIT?", "Was bedeuten Empfehlungen für ConnectIT?")}
        help={tt("One or two sentences. Use at least one of your figures, say what ConnectIT should change first, and how sure it can be.", "Ein oder zwei Sätze. Nutzen Sie mindestens einen Ihrer Werte, sagen Sie, was ConnectIT zuerst ändern sollte, und wie sicher es sein kann.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which of your figures says how much more often referred leads closed, and which says what it is worth in a year? Quote one and say what follows.", "Welche Ihrer Zahlen sagt, wie viel öfter empfohlene Leads abschlossen, und welche, was es in einem Jahr wert ist? Zitieren Sie eine und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          steps={[
            tt("Say how much more often referred leads closed (your lift, or the two rates).", "Sagen Sie, wie viel öfter empfohlene Leads abschlossen (Ihr Lift, oder die zwei Quoten)."),
            tt("Say what it would be worth in a year.", "Sagen Sie, was es in einem Jahr wert wäre."),
            tt("Finish with the next step, and say it as an estimate: referred firms may have been warmer to begin with.", "Schließen Sie mit dem nächsten Schritt, und sagen Sie es als Schätzung: Empfohlene Firmen waren vielleicht von Anfang an wärmer."),
          ]}
          refs={[{ label: tt("Referred leads a year", "Empfohlene Leads pro Jahr"), value: num(PILOT.yearly), target: "fc-yearly" }]}
        />
      </TextBox>
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my figures and sentence", "Meine Werte und meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {l1.figFlagged.length === 0 && !l1.meaningFlagged && l1.partFlags.length === 0
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt(
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} figure${l1.figFlagged.length === 1 ? " is" : "s are"} outlined above. Each says what to check.` : ""}${l1.meaningFlagged ? " The sentence needs at least one of your figures." : ""}${l1.partFlags.length > 0 ? " A part of the formula calculator is outlined." : ""}`,
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} ${l1.figFlagged.length === 1 ? "Wert ist" : "Werte sind"} oben markiert. Jeder sagt, was zu prüfen ist.` : ""}${l1.meaningFlagged ? " Der Satz braucht mindestens einen Ihrer Werte." : ""}${l1.partFlags.length > 0 ? " Ein Teil des Formelrechners ist markiert." : ""}`,
              )}
        </Reading>
      )}
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
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight existing customers” below: annual contract, satisfaction in the last survey, whether they are in regular contact with other firms of their industry, and what they talk about most. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Bestandskunden“ unten: Jahresvertrag, Zufriedenheit in der letzten Befragung, ob sie in regelmäßigem Kontakt mit anderen Firmen ihrer Branche stehen, und worüber sie vor allem sprechen. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
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
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 to 1.3, and the risk of wrong incentives in Materi A6. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 bis 1.3 und das Risiko falscher Anreize in Materi A6. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you make it measurable: why do memberships retain, why do customers refer, and how would a strategic decision-maker prioritise?", "Bevor Sie es messbar machen: Warum binden Mitgliedschaften, warum empfehlen Kunden, und wie würde eine strategische Entscheiderin priorisieren?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
    </AnswerBlock>
  );
}
