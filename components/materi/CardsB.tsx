"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR, R2_MONTHS } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all. */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("A scalable retention system is not a collection of loyalty offers. It is a membership that gives added value instead of discounts, a referral model that thanks both sides with value, an owner and a KPI for every part, and a monthly review. Membership keeps customers; referrals turn the satisfied ones into the cheapest way to win new ones; together they feed each other.", "Ein skalierbares Bindungssystem ist keine Sammlung von Treueangeboten. Es ist eine Mitgliedschaft, die Mehrwert statt Rabatte gibt, ein Empfehlungsmodell, das beiden Seiten mit Wert dankt, ein Owner und ein KPI für jeden Teil und ein monatliches Review. Die Mitgliedschaft hält Kunden; Empfehlungen machen die Zufriedenen zum günstigsten Weg, neue zu gewinnen; zusammen speisen sie einander.")}
      reasoning={[
        tt("Added value instead of discounts comes first: a membership that pays customers to stay has to keep paying, and a competitor can always pay more.", "Mehrwert statt Rabatte kommt zuerst: Eine Mitgliedschaft, die Kunden fürs Bleiben bezahlt, muss immer weiter zahlen, und ein Wettbewerber kann immer mehr zahlen."),
        tt("A referral that thanks both sides with value, once the referred firm signs, is what keeps referrals honest and new customers cheap: customers refer out of trust, and nothing is paid for names.", "Eine Empfehlung, die beiden Seiten mit Wert dankt, sobald die empfohlene Firma unterschreibt, hält Empfehlungen ehrlich und Neukunden günstig: Kunden empfehlen aus Vertrauen, und für Namen wird nichts gezahlt."),
        tt("An owner and a KPI per part and a monthly review by the same KPIs keep the system honest; both are good additions to the two foundations.", "Ein Owner und ein KPI pro Teil und ein monatliches Review nach denselben KPIs halten das System ehrlich; beides sind gute Ergänzungen zu den zwei Fundamenten."),
        tt("Paying for every referral is the wrong-incentive trap: it brings volume, but weak and fake referrals, and it turns trusted advice into paid promotion.", "Für jede Empfehlung zu zahlen ist die Falle des falschen Anreizes: Es bringt Menge, aber schwache und gefälschte Empfehlungen, und es macht aus vertrautem Rat bezahlte Werbung."),
        tt("A discount for every member is not a vision: it is transactional retention, it costs margin on every renewal and it keeps customers only until someone offers more.", "Ein Rabatt für jedes Mitglied ist kein Zielbild: Es ist transaktionale Bindung, es kostet bei jeder Verlängerung Marge und hält Kunden nur, bis jemand mehr bietet."),
        tt("Thinking in systems instead of single measures: each part should make another stronger, for example members who meet peers in the community are the ones most likely to refer.", "In Systemen statt in Einzelmaßnahmen denken: Jeder Teil sollte einen anderen stärken, etwa sind Mitglieder, die in der Community andere treffen, diejenigen, die am ehesten empfehlen."),
      ]}
      sources={["reichheld1990", "dowling1997"]}
    >
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Reichheld and Sasser (1990) showed that retention and referrals are linked: customers who stay longer cost less, buy more and bring others. Dowling and Uncles (1997) warned that loyalty programmes built on rewards are easily copied and rarely pay; the ones that work add value that belongs to the product and the relationship.",
            "Reichheld und Sasser (1990) zeigten, dass Bindung und Empfehlungen zusammenhängen: Kunden, die länger bleiben, kosten weniger, kaufen mehr und bringen andere mit. Dowling und Uncles (1997) warnten, dass auf Belohnungen gebaute Treueprogramme leicht zu kopieren sind und sich selten lohnen; die, die wirken, geben einen Mehrwert, der zum Produkt und zur Beziehung gehört.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four stages towards a membership and referral system · a worked example on Ems Systems", "Vier Stufen zu einem Mitglieder- und Empfehlungssystem · ein Beispiel mit Ems Systems")} caption={tt("Click a stage and read what changes for the company at that stage.", "Klicken Sie eine Stufe an und lesen Sie, was sich auf dieser Stufe für das Unternehmen ändert.")}>
        <DataStages />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Not every benefit deserves a place in the membership. An added value is central when it supports a decision the customer takes (renew, stay when something breaks, expand, justify the renewal internally); it is ready to offer to everyone when enough pilot members actually used it. How nice it sounds is not the test.", "Nicht jeder Vorteil verdient einen Platz in der Mitgliedschaft. Ein Mehrwert ist zentral, wenn er eine Entscheidung des Kunden unterstützt (verlängern, bleiben, wenn etwas ausfällt, erweitern, die Verlängerung intern rechtfertigen); er ist bereit, allen angeboten zu werden, wenn genug Pilotmitglieder ihn tatsächlich genutzt haben. Wie schön er klingt, ist nicht der Test.")}
      reasoning={[
        tt("The added value supports no customer decision (a badge, gifts, invitations) → not central, however popular.", "Der Mehrwert unterstützt keine Entscheidung des Kunden (ein Abzeichen, Geschenke, Einladungen) → nicht zentral, egal wie beliebt."),
        tt(`It supports a decision and at least ${QUALITY_BAR}% of the pilot members used it → central: offer it now to every member.`, `Er unterstützt eine Entscheidung, und mindestens ${QUALITY_BAR} % der Pilotmitglieder haben ihn genutzt → zentral: jetzt jedem Mitglied anbieten.`),
        tt(`It supports a decision but fewer than ${QUALITY_BAR}% used it → central, but prove it first: offering it to everyone now risks paying for something few want.`, `Er unterstützt eine Entscheidung, aber weniger als ${QUALITY_BAR} % haben ihn genutzt → zentral, aber zuerst belegen: Ihn jetzt allen anzubieten riskiert, für etwas zu zahlen, das wenige wollen.`),
        tt("Cost and how impressive a benefit sounds are not the test: a modest benefit most members use is central; an impressive one few use is not ready.", "Kosten und wie beeindruckend ein Vorteil klingt, sind nicht der Test: Ein bescheidener Vorteil, den die meisten Mitglieder nutzen, ist zentral; ein beeindruckender, den wenige nutzen, ist nicht bereit."),
        tt("Cost is the other main risk of a membership: every added value costs something per member, so benefits nobody uses are pure cost.", "Kosten sind das andere Hauptrisiko einer Mitgliedschaft: Jeder Mehrwert kostet pro Mitglied etwas, also sind Vorteile, die niemand nutzt, reine Kosten."),
      ]}
      sources={["bolton2000", "mcalexander2002"]}
    >
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Bolton, Kannan and Bramlett (2000) found that a programme retains where its members experience real service value, not merely where they are enrolled. McAlexander, Schouten and Koenig (2002) showed that shared experiences with other customers bind members to the company, which is why a community can be an added value in its own right.",
            "Bolton, Kannan und Bramlett (2000) fanden, dass ein Programm dort bindet, wo seine Mitglieder echten Servicewert erleben, nicht schon dort, wo sie angemeldet sind. McAlexander, Schouten und Koenig (2002) zeigten, dass gemeinsame Erlebnisse mit anderen Kunden Mitglieder an das Unternehmen binden, und darum kann eine Community ein eigener Mehrwert sein.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Ems Systems' added values, sorted by customer decision and use in the pilot", "Mehrwerte von Ems Systems, nach Kundenentscheidung und Nutzung im Pilot sortiert")} caption={tt("Click an added value to read where it goes and why.", "Klicken Sie einen Mehrwert an, um zu lesen, wohin er gehört und warum.")}>
        <SourceGrid />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A KPI system for customer retention needs a few KPIs that pass four tests: linked to value, early, covering every customer (members and non-members), and measured automatically. Rate each candidate, capped by its printed facts. Counting sign-ups (members, likes, newsletters) tells you the programme is visible, not that anyone stays.", "Ein KPI-System für Kundenbindung braucht wenige KPIs, die vier Tests bestehen: mit dem Wert verbunden, früh, jeden Kunden abdeckend (Mitglieder und Nichtmitglieder) und automatisch gemessen. Bewerten Sie jeden Kandidaten, gedeckelt durch seine gedruckten Fakten. Anmeldungen zu zählen (Mitglieder, Likes, Newsletter) sagt Ihnen, dass das Programm sichtbar ist, nicht dass jemand bleibt.")}
      reasoning={[
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low", "Niedrig")}: ${c.low} ${tt("High", "Hoch")}: ${c.high}`),
        tt("The printed facts cap the ratings: not linked to value → link Low; after the customer has left or twice a year → early Low, monthly → at most Mid; only some customers → reach at most Mid; by a survey → measured automatically at most Mid, collected by hand → Low.", "Die gedruckten Fakten deckeln die Bewertungen: nicht mit dem Wert verbunden → Verbindung Niedrig; nachdem der Kunde gegangen ist oder zweimal im Jahr → früh Niedrig, monatlich → höchstens Mittel; nur einige Kunden → Reichweite höchstens Mittel; über eine Befragung → automatisch gemessen höchstens Mittel, von Hand gesammelt → Niedrig."),
        tt("A management system needs most of its KPIs to show a change within days or weeks; a number that counts cancellations afterwards is for learning, not for steering.", "Ein Managementsystem braucht die meisten KPIs so, dass sie eine Veränderung innerhalb von Tagen oder Wochen zeigen; eine Zahl, die Kündigungen hinterher zählt, dient dem Lernen, nicht dem Steuern."),
        tt("The KPI with the greatest leverage is usually the driver the problem names, if it is also linked to value and automatic: every part of the programme can be steered by it within weeks.", "Der KPI mit der größten Hebelwirkung ist meist der Treiber, den das Problem nennt, wenn er zugleich mit dem Wert verbunden und automatisch ist: Jeder Teil des Programms lässt sich innerhalb von Wochen daran steuern."),
        tt("Compare members with non-members where you can: a renewal rate that rises only for members who use their benefits shows the programme works; one that rises for everyone may be the market.", "Vergleichen Sie, wo möglich, Mitglieder mit Nichtmitgliedern: Eine Verlängerungsquote, die nur bei Mitgliedern steigt, die ihre Vorteile nutzen, zeigt, dass das Programm wirkt; eine, die bei allen steigt, ist vielleicht der Markt."),
      ]}
      sources={["kaplan1992", "reichheld2003"]}
    >
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Reichheld (2003) argued that a single well-chosen question about recommending predicts growth better than long satisfaction surveys, which is a reason to prefer a few sharp KPIs over many.",
            "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Reichheld (2003) argumentierte, dass eine einzige gut gewählte Frage zum Empfehlen Wachstum besser vorhersagt als lange Zufriedenheitsbefragungen, ein Grund, wenige scharfe KPIs vielen vorzuziehen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four KPI candidates of Ems Systems on four tests", "Vier KPI-Kandidaten von Ems Systems nach vier Tests")} caption={tt("Choose a candidate and compare its profile with the printed facts under it.", "Wählen Sie einen Kandidaten und vergleichen Sie sein Profil mit den gedruckten Fakten darunter.")}>
        <CompProfile />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("A referral model scales when it keeps working as more customers join without the cost rising with every referral. Each approach is tested first: every test ends in a decision, roll out, keep testing or stop, and who acts. Two numbers decide it: the uplift over the control group, and how many decisions it rests on. An approach that invites misuse or costs more than it brings is stopped, however many referrals it produces.", "Ein Empfehlungsmodell skaliert, wenn es weiter wirkt, während mehr Kunden mitmachen, ohne dass die Kosten mit jeder Empfehlung steigen. Jeder Ansatz wird zuerst getestet: Jeder Test endet in einer Entscheidung, ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Uplift gegenüber der Kontrollgruppe und auf wie vielen Entscheidungen er beruht. Ein Ansatz, der zu Missbrauch einlädt oder mehr kostet, als er bringt, wird gestoppt, egal wie viele Empfehlungen er erzeugt.")}
      reasoning={[
        tt(`Roll out when the uplift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} decisions: the gain is clear and proven.`, `Ausrollen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} Entscheidungen hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the uplift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} decisions, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%.`, `Weiter testen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} Entscheidungen beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt.`),
        tt(`Stop when the uplift is below ${LIFT_WATCH}% or negative. Many decisions do not rescue a tiny uplift: they prove it is tiny.`, `Stoppen, wenn der Uplift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Entscheidungen retten keinen winzigen Uplift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if referrals turn out to be fake, or rewards cost more per customer kept than agreed, the approach is not rolled out until the cause is fixed. This is the risk analysis of a referral model: wrong incentives and costs.", "Eine Guardrail kann einen Gewinner stoppen: Erweisen sich Empfehlungen als gefälscht oder kosten Belohnungen pro gehaltenem Kunden mehr als vereinbart, wird der Ansatz nicht ausgerollt, bis die Ursache behoben ist. Das ist die Risikoanalyse eines Empfehlungsmodells: falsche Anreize und Kosten."),
        tt("Scalable: the cost stays the same however many customers take part (a referral form in the portal, a thank-you in value paid only for new customers). Not scalable: cash per referral, which grows with every name, or a person per customer.", "Skalierbar: Die Kosten bleiben gleich, egal wie viele Kunden teilnehmen (ein Empfehlungsformular im Portal, ein Dankeschön in Wert, nur für Neukunden gezahlt). Nicht skalierbar: Geld pro Empfehlung, das mit jedem Namen wächst, oder eine Person pro Kunde."),
        tt("Who acts follows from where the approach lives: what salespeople ask of new customers goes to sales, what members use or attend goes to Customer Success; keep testing belongs to customer operations; a stopped test has no owner.", "Wer handelt, folgt daraus, wo der Ansatz lebt: Was Vertriebsleute von neuen Kunden erbitten, geht an den Vertrieb, was Mitglieder nutzen oder besuchen, an Customer Success; Weitertesten gehört Customer Operations; ein gestoppter Test hat keinen Owner."),
      ]}
      sources={["kohavi2020", "ryu2007", "schmitt2011"]}
    >
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Ryu and Feick (2007) found that rewards increase referrals, most of all between people with weak ties; Schmitt, Skiera and Van den Bulte (2011) found that referred customers are worth more, which is why the reward should follow the customer, not the name.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Ryu und Feick (2007) fanden, dass Belohnungen Empfehlungen erhöhen, am stärksten zwischen Menschen mit schwachen Beziehungen; Schmitt, Skiera und Van den Bulte (2011) fanden, dass empfohlene Kunden mehr wert sind, darum sollte die Belohnung dem Kunden folgen, nicht dem Namen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of decisions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Entscheidungen ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Ems test", "Test bei Ems"), tt("Uplift", "Uplift"), tt("Decisions", "Entscheidungen"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("A thank-you training day once the referred firm signs", "Ein Schulungstag als Dank, sobald die empfohlene Firma unterschreibt"), "+34%", "140", tt("Roll out", "Ausrollen"), tt("Sales", "Vertrieb")],
            [tt("A benchmark report for members", "Ein Benchmark-Bericht für Mitglieder"), "+30%", "35", tt("Keep testing", "Weiter testen"), tt("Customer operations", "Customer Operations")],
            [tt("Double points in the birthday month", "Doppelte Punkte im Geburtstagsmonat"), "+1%", "600", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt(`An architecture is built in order: the base first (the membership and the KPIs), then the rules and the proof of uptake, then the parts that grow the programme on proven uptake, and the rest held back. Four tests tell you whether it holds, and with six months the time test matters. Decide now, pilot in stages, and say what you will watch and when you would stop.`, `Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (die Mitgliedschaft und die KPIs), dann die Regeln und der Beleg der Nutzung, dann die Bausteine, die das Programm auf belegter Nutzung wachsen lassen, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob sie hält, und bei sechs Monaten zählt der Zeittest. Entscheiden Sie jetzt, pilotieren Sie in Stufen, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.`)}
      reasoning={[
        tt(`Build in this order. The base first: the membership with its three added values, the rules for who joins and the KPIs. Then the rules and the proof: the CRM KPIs with a monthly review that shows which benefit each member used, the anti-misuse rules, and the referral page with customer testimonials. Then check the uptake a part builds on. Then the parts that grow the programme, on added values members use. Hold back the rest.`, `Bauen Sie in dieser Reihenfolge. Zuerst die Basis: die Mitgliedschaft mit ihren drei Mehrwerten, den Regeln, wer beitritt, und den KPIs. Dann die Regeln und der Beleg: die KPIs im CRM mit einem monatlichen Review, das zeigt, welchen Vorteil jedes Mitglied nutzte, die Regeln gegen Missbrauch und die Empfehlungsseite mit Kundenstimmen. Dann die Nutzung prüfen, auf der ein Baustein aufbaut. Dann die Bausteine, die das Programm wachsen lassen, auf Mehrwerten, die Mitglieder nutzen. Den Rest halten Sie zurück.`),
        tt(`Four tests check an architecture. The membership comes first: it starts no later than the first programme part. Every funded item has a purpose: it gives members added value or makes a KPI measurable; a tool that sets rewards by itself without showing its rules, and a discount for every renewal, do neither. Uptake proven: a programme part starts once at least ${QUALITY_BAR}% of pilot members used the added value it builds on. It fits: inside the budget and in use by month ${R2_MONTHS}.`, `Vier Tests prüfen eine Architektur. Die Mitgliedschaft kommt zuerst: Sie startet nicht später als der erste Programmbaustein. Jeder finanzierte Punkt hat einen Zweck: Er gibt Mitgliedern einen Mehrwert oder macht einen KPI messbar; ein Werkzeug, das Belohnungen selbst festlegt, ohne seine Regeln zu zeigen, und ein Rabatt für jede Verlängerung tun keines von beidem. Nutzung belegt: Ein Programmbaustein startet, sobald mindestens ${QUALITY_BAR} % der Pilotmitglieder den Mehrwert genutzt haben, auf dem er aufbaut. Es passt: innerhalb des Budgets und bis Monat ${R2_MONTHS} im Einsatz.`),
        tt(`Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After the uptake is proven item starts in the month the monthly review is in use, so the review has to be Now itself: its first meeting shows which benefits members really use. With ${R2_MONTHS} months, an item of 24 weeks is in use only in month 7.`, `Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn die Nutzung belegt ist“ startet in dem Monat, in dem das monatliche Review im Einsatz ist, das Review muss also selbst auf Jetzt stehen: Sein erstes Treffen zeigt, welche Vorteile Mitglieder wirklich nutzen. Bei ${R2_MONTHS} Monaten ist ein Punkt mit 24 Wochen erst in Monat 7 im Einsatz.`),
        tt(`Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured, whose added value is used and that are in use within the ${R2_MONTHS} months) and Risk (the share on a black box, on uptake below ${QUALITY_BAR}% or on an item in use only after the ${R2_MONTHS} months). Measurable and Risk are ranges, because the uptake may be weaker than the brief says: a plan that holds at both ends is the safer one.`, `Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden, deren Mehrwert genutzt wird und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind) und Risiko (der Anteil auf einer Black Box, auf Nutzung unter ${QUALITY_BAR} % oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist). Messbar und Risiko sind Spannen, weil die Nutzung schwächer sein kann, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere.`),
        tt(`Waiting for a market study is also a decision: customers rarely know in advance what will keep them, they show it by what they use and whether they renew, and every month of waiting more of them leave. The brief asks for a decision despite an unclear forecast.`, `Auf eine Marktstudie zu warten ist auch eine Entscheidung: Kunden wissen selten im Voraus, was sie halten wird, sie zeigen es daran, was sie nutzen und ob sie verlängern, und in jedem Monat des Wartens gehen mehr von ihnen. Der Auftrag verlangt eine Entscheidung trotz unklarer Prognose.`),
        tt(`Launching everything at once with a discount feels decisive, but it costs margin on every renewal before anything is measured, and cash for referrals invites misuse. Staging changes something real for customers within weeks and learns what keeps them.`, `Alles auf einmal mit einem Rabatt zu starten fühlt sich entschlossen an, kostet aber Marge bei jeder Verlängerung, bevor etwas gemessen wird, und Bargeld für Empfehlungen lädt zu Missbrauch ein. Stufenweise ändert sich innerhalb von Wochen etwas Reales für Kunden, und man lernt, was sie hält.`),
        tt(`Fund inside the budget, and fund nothing nobody at the company can check: a tool that sets rewards by itself without showing its rules cannot be kept viable. A thank-you is paid only after the referred firm signs, with a cap per customer.`, `Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand prüfen kann: Ein Werkzeug, das Belohnungen selbst festlegt, ohne seine Regeln zu zeigen, lässt sich nicht tragfähig halten. Ein Dankeschön wird erst gezahlt, wenn die empfohlene Firma abschließt, mit einer Obergrenze pro Kunde.`),
        tt(`What you will watch is one figure about customers (the renewal rate, customers who use a service), not your own output or sign-ups (e-mails sent, members signed up, newsletter opens), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.`, `Was Sie beobachten, ist eine Zahl über Kunden (die Verlängerungsquote, Kunden, die einen Service nutzen), nicht Ihr eigener Output oder Anmeldungen (versandte E-Mails, angemeldete Mitglieder, Newsletter-Öffnungen), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern.`),
        tt(`Every plan gives something and costs something. Say what it gives (measured, used, inside the budget and the months) and what it leaves open (an item not now, uptake below 80% if the uptake is weaker, budget left unspent). A plan that differs from this order can still be argued: say why.`, `Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, genutzt, innerhalb von Budget und Monaten) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Nutzung unter 80 %, wenn die Nutzung schwächer ist, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum.`),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt(`A referral programme and its base · a worked example on Ems Systems`, `Ein Empfehlungsprogramm und seine Basis · ein Beispiel mit Ems Systems`)} caption={tt(`Change when the membership starts and how many pilot members use the benefit, and watch the links.`, `Ändern Sie, wann die Mitgliedschaft startet und wie viele Pilotmitglieder den Vorteil nutzen, und beobachten Sie die Verbindungen.`)}>
        <ArchExample />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Ems's figures", "Zahlen von Ems"), tt("Result", "Ergebnis")]}
          rows={[
            [tt(`Month in use: starts in month 1, needs 8 weeks`, `Monat im Einsatz: startet in Monat 1, braucht 8 Wochen`), "1 + 8 ÷ 4 = 1 + 2", tt(`month 3`, `Monat 3`)],
            [tt(`After the uptake is proven: the monthly review is in use in month 2, the item needs 10 weeks`, `Wenn die Nutzung belegt ist: Das monatliche Review ist in Monat 2 im Einsatz, der Punkt braucht 10 Wochen`), "2 + 10 ÷ 4 = 2 + 3", tt(`starts month 2, in use month 5`, `Start Monat 2, im Einsatz Monat 5`)],
            [tt(`Time: a tool of 28 weeks that starts in month 1, in a plan of 6 months`, `Zeit: ein Werkzeug mit 28 Wochen, das in Monat 1 startet, in einem Plan von 6 Monaten`), "1 + 28 ÷ 4 = 1 + 7", tt(`month 8: too late`, `Monat 8: zu spät`)],
            [tt(`Uptake: 90% of pilot members used the benefit, the bar is 80%`, `Nutzung: 90 % der Pilotmitglieder nutzten den Vorteil, die Grenze ist 80 %`), "90 ≥ 80", tt(`ready`, `bereit`)],
            [tt(`The same benefit when the uptake is 15 points weaker`, `Derselbe Vorteil, wenn die Nutzung 15 Punkte schwächer ist`), "90 − 15 = 75 < 80", tt(`not ready`, `nicht bereit`)],
            [tt(`Money: three funded items against Ems's €120,000`, `Geld: drei finanzierte Punkte gegen Ems' 120.000 €`), "45,000 + 30,000 + 15,000", tt(`€90,000, €30,000 left`, `90.000 €, 30.000 € übrig`)],
          ]}
          caption={tt(`Ems's numbers (Case assumption). The panel in the task does this for you and says what it means.`, `Zahlen von Ems (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.`)}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt(`Stage it: the no-regret items first (the membership, the CRM KPIs), the parts that need more proven uptake when the monthly review is in use.`, `Stufenweise: die No-regret-Punkte zuerst (die Mitgliedschaft, die KPIs im CRM), die Bausteine, die mehr belegte Nutzung brauchen, wenn das monatliche Review im Einsatz ist.`),
            tt(`Premortem: imagine the programme failed after six months, and write down why. Those reasons are what you watch.`, `Premortem: Stellen Sie sich vor, das Programm sei nach sechs Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie.`),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: An unclear forecast is not a reason to bet everything, or nothing", "Zeigen: Eine unklare Prognose ist kein Grund, alles oder nichts zu setzen")}>
        <Callout label={tt("An unclear forecast is not a reason to bet everything, or nothing", "Eine unklare Prognose ist kein Grund, alles oder nichts zu setzen")} tone="signal">
          <p>{tt(`Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. Klein (2007) adds the premortem, a short exercise that makes a team name the risks it would otherwise keep to itself.`, `Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Klein (2007) ergänzt das Premortem, eine kurze Übung, die ein Team die Risiken nennen lässt, die es sonst für sich behielte.`)}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
