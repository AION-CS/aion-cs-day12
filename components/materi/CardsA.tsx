"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { AutomationGrid, DelayCost, FairTest, KpiTree, MomentProfile, PilotExample, ScoreExample } from "@/components/materi/diagramsA";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EXPLAIN_RULE } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all. */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Customer retention comes in two kinds. Transactional retention pays customers to stay (a discount, points, a gift): it works until someone pays more. Relational retention gives them a reason to stay (a service that works for them, people they trust, peers they meet): a competitor cannot copy it with a lower price. Satisfaction alone is not retention: satisfied customers still leave if nothing holds them.", "Kundenbindung gibt es in zwei Arten. Transaktionale Bindung bezahlt Kunden fürs Bleiben (ein Rabatt, Punkte, ein Geschenk): Sie wirkt, bis jemand mehr zahlt. Relationale Bindung gibt ihnen einen Grund zu bleiben (ein Service, der für sie funktioniert, Menschen, denen sie trauen, andere Kunden, die sie treffen): Ein Wettbewerber kann sie mit einem niedrigeren Preis nicht kopieren. Zufriedenheit allein ist keine Bindung: Zufriedene Kunden gehen trotzdem, wenn nichts sie hält.")}
      reasoning={[
        tt("Transactional retention: the customer stays because it pays (a discount, points, a gift, a lock-in). It is quick to start, costs margin on every renewal and ends when a competitor offers more.", "Transaktionale Bindung: Der Kunde bleibt, weil es sich auszahlt (ein Rabatt, Punkte, ein Geschenk, eine Bindungsfrist). Sie ist schnell gestartet, kostet bei jeder Verlängerung Marge und endet, wenn ein Wettbewerber mehr bietet."),
        tt("Relational retention: the customer stays because of value they would lose by leaving (a service that works for them, trusted people, a community). It takes longer to build and lasts.", "Relationale Bindung: Der Kunde bleibt wegen eines Werts, den er beim Gehen verlöre (ein Service, der für ihn funktioniert, vertraute Menschen, eine Community). Sie braucht länger zum Aufbau und hält."),
        tt("Short-term versus long-term: an incentive changes behaviour this quarter; added value changes it for years. A retention system that runs on incentives alone has to keep paying.", "Kurzfristig gegen langfristig: Ein Anreiz ändert das Verhalten in diesem Quartal; Mehrwert ändert es über Jahre. Ein Bindungssystem, das nur auf Anreizen läuft, muss immer weiter zahlen."),
        tt("Satisfaction, loyalty and retention differ: satisfaction is how customers feel, loyalty is their willingness to stay and recommend, retention is whether they actually renew. Satisfaction is necessary, not enough.", "Zufriedenheit, Loyalität und Bindung unterscheiden sich: Zufriedenheit ist, wie Kunden sich fühlen, Loyalität ihre Bereitschaft zu bleiben und zu empfehlen, Bindung, ob sie tatsächlich verlängern. Zufriedenheit ist nötig, aber nicht genug."),
        tt("In IT services, relationships last years and switching is costly, so relational retention pays twice: customers stay longer and bring others.", "Bei IT-Dienstleistungen dauern Beziehungen Jahre, und ein Wechsel ist aufwendig, also zahlt sich relationale Bindung doppelt aus: Kunden bleiben länger und bringen andere mit."),
      ]}
      sources={["reichheld1990", "dowling1997"]}
    >
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Reichheld and Sasser (1990) showed that keeping customers longer raises profit strongly, because long-standing customers buy more, cost less to serve and refer others. Dowling and Uncles (1997) warned that many loyalty programmes only buy behaviour: they are easily copied, cost margin and rarely create real loyalty unless they add value to the product itself.",
            "Reichheld und Sasser (1990) zeigten, dass es den Gewinn stark erhöht, Kunden länger zu halten, weil langjährige Kunden mehr kaufen, weniger Betreuungskosten verursachen und andere empfehlen. Dowling und Uncles (1997) warnten, dass viele Treueprogramme nur Verhalten kaufen: Sie sind leicht zu kopieren, kosten Marge und schaffen selten echte Loyalität, außer sie geben dem Produkt selbst einen Mehrwert.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Why customers renewed · a worked example on Werra Datentechnik", "Warum Kunden verlängert haben · ein Beispiel mit Werra Datentechnik")} caption={tt("Choose a bar or a button and read whether the reason is transactional or relational, and how long it holds.", "Wählen Sie einen Balken oder eine Schaltfläche und lesen Sie, ob der Grund transaktional oder relational ist und wie lange er hält.")}>
        <DelayCost />
      </Diagram>
      <ShowMore id="A1" part="table" label={tt("Show the table: transactional versus relational retention", "Tabelle zeigen: Transaktionale gegen relationale Bindung")}>
        <DataTable
          head={[tt("", ""), tt("Transactional retention", "Transaktionale Bindung"), tt("Relational retention", "Relationale Bindung")]}
          rows={[
            [tt("Why the customer stays", "Warum der Kunde bleibt"), tt("It pays to stay", "Bleiben zahlt sich aus"), tt("Leaving would cost value they have", "Gehen kostete Wert, den sie haben")],
            [tt("Examples", "Beispiele"), tt("Discount, points, gifts, lock-in", "Rabatt, Punkte, Geschenke, Bindungsfrist"), tt("Service that works for them, trusted people, community", "Service, der für sie funktioniert, vertraute Menschen, Community")],
            [tt("How long it holds", "Wie lange sie hält"), tt("Until someone pays more", "Bis jemand mehr zahlt"), tt("As long as the value lasts", "So lange der Wert besteht")],
            [tt("What it costs", "Was sie kostet"), tt("Margin on every renewal", "Marge bei jeder Verlängerung"), tt("Effort to build, then little per customer", "Aufwand zum Aufbau, dann wenig pro Kunde")],
          ]}
          caption={tt("Transactional versus relational retention", "Transaktionale gegen relationale Bindung")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A membership gives customers something for belonging. What it gives decides whether it retains: an incentive (money, points, a discount) pays for staying; a service added value (faster help, reviews, training) makes the product work better; a community (user groups, a forum, an advisory board) connects customers with each other. Most memberships that last combine service and community.", "Eine Mitgliedschaft gibt Kunden etwas dafür, dass sie dazugehören. Was sie gibt, entscheidet, ob sie bindet: Ein Anreiz (Geld, Punkte, ein Rabatt) bezahlt fürs Bleiben; ein Service-Mehrwert (schnellere Hilfe, Reviews, Schulung) lässt das Produkt besser funktionieren; eine Community (User Groups, ein Forum, ein Beirat) verbindet Kunden miteinander. Die meisten Mitgliedschaften, die halten, verbinden Service und Community.")}
      reasoning={[
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("Advantages of a membership model: customers stay longer because they would lose something by leaving, they use more of the product, and members who know each other refer others.", "Vorteile eines Mitgliedsmodells: Kunden bleiben länger, weil sie beim Gehen etwas verlören, sie nutzen mehr vom Produkt, und Mitglieder, die einander kennen, empfehlen andere."),
        tt("Benefits customers find attractive in B2B IT: faster and named help, advice that saves them time, training for their own staff, and exchange with peers who have the same problems. Discounts rank low once the service works.", "Vorteile, die Kunden im B2B-IT-Bereich attraktiv finden: schnellere und benannte Hilfe, Beratung, die ihnen Zeit spart, Schulung für die eigenen Mitarbeitenden und Austausch mit anderen, die dieselben Probleme haben. Rabatte zählen wenig, sobald der Service funktioniert."),
        tt("Risks of a membership: it becomes a discount club (margin lost, no loyalty won), benefits nobody uses (cost without effect), and members who feel second-class when the promised service is not delivered.", "Risiken einer Mitgliedschaft: Sie wird zum Rabattclub (Marge verloren, keine Loyalität gewonnen), Vorteile, die niemand nutzt (Kosten ohne Wirkung), und Mitglieder, die sich zweitklassig fühlen, wenn der versprochene Service nicht kommt."),
        tt("A simple membership approach names who can join, the two or three added values they get, and how you will see whether they use them.", "Ein einfacher Mitgliedschaftsansatz nennt, wer beitreten kann, die zwei oder drei Mehrwerte, die Mitglieder erhalten, und woran Sie sehen, ob sie sie nutzen."),
      ]}
      sources={["bolton2000", "mcalexander2002"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Bolton, Kannan and Bramlett (2000) found that members of a loyalty programme rated the company's service more forgivingly and stayed longer, but only where the programme came with real service value. McAlexander, Schouten and Koenig (2002) showed that customers who meet other customers and the company's people form a community, and that this community strengthens their loyalty to the company itself.",
            "Bolton, Kannan und Bramlett (2000) fanden, dass Mitglieder eines Treueprogramms den Service des Unternehmens nachsichtiger bewerteten und länger blieben, aber nur dort, wo das Programm echten Servicewert brachte. McAlexander, Schouten und Koenig (2002) zeigten, dass Kunden, die andere Kunden und die Menschen des Unternehmens treffen, eine Community bilden, und dass diese Community ihre Loyalität zum Unternehmen selbst stärkt.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("One area, three kinds of benefit · a worked example on Werra Datentechnik", "Ein Bereich, drei Arten von Vorteil · ein Beispiel mit Werra Datentechnik")} caption={tt("Choose an area and a kind of benefit and compare the three versions; then try the worked sort below.", "Wählen Sie einen Bereich und eine Art von Vorteil und vergleichen Sie die drei Versionen; probieren Sie dann die Beispielsortierung darunter.")}>
        <MomentProfile />
      </Diagram>
      <ShowMore id="A2" part="extra" label={tt("Show: Free is not the same as an incentive", "Zeigen: Kostenlos ist nicht dasselbe wie ein Anreiz")}>
        <Callout label={tt("Free is not the same as an incentive", "Kostenlos ist nicht dasselbe wie ein Anreiz")} tone="rust">
          <p>{tt("A free training seat is a service: the customer receives know-how. A €100 training discount is an incentive: the customer receives money. Ask what the customer receives, not what it costs.", "Ein kostenloser Schulungsplatz ist ein Service: Der Kunde erhält Know-how. Ein Schulungsrabatt von 100 € ist ein Anreiz: Der Kunde erhält Geld. Fragen Sie, was der Kunde erhält, nicht was es kostet.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Referrals work because people trust people they know more than any advertisement. A customer becomes a multiplier when two things come together: they are satisfied enough to vouch for you, and they are in contact with others who could buy. Customers who talk mostly about price are the opposite: they join for a discount and leave for a better one.", "Empfehlungen wirken, weil Menschen Menschen, die sie kennen, mehr vertrauen als jeder Werbung. Ein Kunde wird zum Multiplikator, wenn zwei Dinge zusammenkommen: Er ist zufrieden genug, um für Sie einzustehen, und er steht in Kontakt mit anderen, die kaufen könnten. Kunden, die vor allem über den Preis sprechen, sind das Gegenteil: Sie treten wegen eines Rabatts bei und gehen für einen besseren.")}
      reasoning={[
        tt("Ask first for a referral: satisfaction of 80% or more AND in regular contact with other firms of their industry. Both are needed: satisfaction without a network reaches nobody; a network without satisfaction spreads a lukewarm message.", "Zuerst um eine Empfehlung bitten: Zufriedenheit von 80 % oder mehr UND regelmäßiger Kontakt mit anderen Firmen ihrer Branche. Beides ist nötig: Zufriedenheit ohne Netzwerk erreicht niemanden; ein Netzwerk ohne Zufriedenheit verbreitet eine laue Botschaft."),
        tt("Joins only for a discount: the customer talks mostly about price and discounts. A discount club retains them only as long as the discount is the best on offer; they need added value first.", "Tritt nur wegen eines Rabatts bei: Der Kunde spricht vor allem über Preis und Rabatte. Ein Rabattclub bindet ihn nur, solange der Rabatt das beste Angebot ist; er braucht zuerst Mehrwert."),
        tt("Why customers refer: they want to help a peer and they trust the provider. Trust is the central factor; a reward can make referring easier, but it cannot replace trust.", "Warum Kunden empfehlen: Sie wollen einem Kollegen helfen, und sie vertrauen dem Anbieter. Vertrauen ist der zentrale Faktor; eine Belohnung kann Empfehlen erleichtern, aber Vertrauen nicht ersetzen."),
        tt("A very satisfied customer with no contact to peers is still valuable: ask for a testimonial or a reference call instead of a referral.", "Ein sehr zufriedener Kunde ohne Kontakt zu anderen ist trotzdem wertvoll: Bitten Sie um ein Testimonial oder ein Referenzgespräch statt um eine Empfehlung."),
        tt("Referral systems come in forms: a simple ask at the right moment, a thank-you in value for one or both sides, a cash reward, and network effects where members bring members. Value for both sides builds trust; cash for volume invites misuse (Materi A6).", "Empfehlungssysteme gibt es in verschiedenen Formen: eine einfache Bitte im richtigen Moment, ein Dankeschön in Wert für eine oder beide Seiten, eine Geldprämie und Netzwerkeffekte, bei denen Mitglieder Mitglieder bringen. Wert für beide Seiten baut Vertrauen auf; Geld für Menge lädt zu Missbrauch ein (Materi A6)."),
      ]}
      sources={["kumar2010", "schmitt2011"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kumar, Petersen and Leone (2010) found that the customers who buy the most are not always the ones who refer the most: referral value depends on the customer's network and their willingness to recommend, and firms should ask the customers who have both. Schmitt, Skiera and Van den Bulte (2011) showed that customers won through referrals were more loyal and more valuable than customers won in other ways.",
            "Kumar, Petersen und Leone (2010) fanden, dass die Kunden, die am meisten kaufen, nicht immer die sind, die am meisten empfehlen: Der Empfehlungswert hängt vom Netzwerk des Kunden und seiner Bereitschaft zu empfehlen ab, und Firmen sollten die Kunden fragen, die beides haben. Schmitt, Skiera und Van den Bulte (2011) zeigten, dass über Empfehlungen gewonnene Kunden treuer und wertvoller waren als auf anderem Weg gewonnene.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Who to ask, who only wants a discount · a worked example on Werra Datentechnik", "Wen man fragt, wer nur einen Rabatt will · ein Beispiel mit Werra Datentechnik")} caption={tt("Choose a customer on the grid or in the list and read where they stand and why.", "Wählen Sie einen Kunden im Raster oder in der Liste und lesen Sie, wo er steht und warum.")}>
        <AutomationGrid />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: who to ask, and what to do with the others", "Tabelle zeigen: Wen man fragt, und was mit den anderen zu tun ist")}>
        <DataTable
          head={[tt("Satisfied (80%+)?", "Zufrieden (80 %+)?"), tt("In contact with peers?", "In Kontakt mit anderen?"), tt("What to do", "Was zu tun ist")]}
          rows={[
            [tt("Yes", "Ja"), tt("Yes", "Ja"), tt("Ask first for a referral, and thank both sides with value", "Zuerst um eine Empfehlung bitten, und beiden Seiten mit Wert danken")],
            [tt("Yes", "Ja"), tt("No", "Nein"), tt("Ask for a testimonial or a reference call", "Um ein Testimonial oder ein Referenzgespräch bitten")],
            [tt("No", "Nein"), tt("Yes", "Ja"), tt("Fix what is missing first; a referral now carries a lukewarm message", "Zuerst beheben, was fehlt; eine Empfehlung trüge jetzt eine laue Botschaft")],
            [tt("Talks about price", "Spricht über den Preis"), tt("Either", "Egal"), tt("Offer added value, not a bigger discount", "Mehrwert anbieten, keinen größeren Rabatt")],
          ]}
          caption={tt("Who to ask, and what to do with the others", "Wen man fragt, und was mit den anderen zu tun ist")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on referrals, compare how often leads became customers when they came through a referral and when they came from marketing. Three figures read it: the close rate of each group, the lift, and the extra revenue a year.", "Um Empfehlungen einen Euro-Wert zu geben, vergleichen Sie, wie oft Leads zu Kunden wurden, wenn sie über eine Empfehlung kamen, und wenn sie aus dem Marketing kamen. Drei Werte lesen es: die Abschlussquote jeder Gruppe, der Lift und der zusätzliche Umsatz pro Jahr.")}
      reasoning={[
        tt("Close rate = deals ÷ leads × 100. Take both numbers from the same group's rows.", "Abschlussquote = Abschlüsse ÷ Leads × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Lift = close rate of referred leads ÷ close rate of marketing leads. Work out the marketing rate from its own rows first; the groups are not the same size, so compare rates, never counts.", "Lift = Abschlussquote empfohlener Leads ÷ Abschlussquote der Marketing-Leads. Berechnen Sie die Marketing-Quote zuerst aus ihren eigenen Zeilen; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Extra revenue a year = referred leads a year × (referral rate − marketing rate, as a share of one) × average deal value. Only the difference counts: the same number of marketing leads would have closed their share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = empfohlene Leads pro Jahr × (Empfehlungsquote − Marketing-Quote, als Anteil von eins) × durchschnittlicher Auftragswert. Nur der Unterschied zählt: Dieselbe Zahl an Marketing-Leads hätte ihren Anteil ohnehin abgeschlossen. Ein Punkt ist 0,01."),
        tt("Use the referred leads expected next year, not last year's referred leads.", "Nehmen Sie die im nächsten Jahr erwarteten empfohlenen Leads, nicht die empfohlenen Leads des letzten Jahres."),
        tt("These figures compare leads that customers chose to refer with leads from marketing, so they are not yet a fair test: say them as an estimate, and test fairly before you promise the full amount (Materi A6).", "Diese Werte vergleichen Leads, die Kunden empfehlen wollten, mit Leads aus dem Marketing, sind also noch kein fairer Test: Sagen Sie sie als Schätzung, und testen Sie fair, bevor Sie den ganzen Betrag versprechen (Materi A6)."),
        tt("A sentence about referrals quotes at least one figure, says what to change first, and how sure it can be.", "Ein Satz über Empfehlungen nennt mindestens einen Wert, sagt, was zuerst zu ändern ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "schmitt2011"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. Applied to referrals, the groups are leads that came two ways. The worked example uses Werra Datentechnik's numbers; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Auf Empfehlungen angewandt, sind die Gruppen Leads, die auf zwei Wegen kamen. Das Beispiel nutzt die Zahlen von Werra Datentechnik; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What a referral is worth · worked example on Werra Datentechnik (Case assumption)", "Was eine Empfehlung wert ist · Beispiel mit Werra Datentechnik (Fallannahme)")} caption={tt("Move the slider to change how many referred leads Werra gets in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele empfohlene Leads Werra pro Jahr bekommt.")}>
        <PilotExample />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Werra Datentechnik", "Rechnung · Werra Datentechnik"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Close rate of referred leads", "1 · Abschlussquote empfohlener Leads"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Close rate of marketing leads", "2 · Abschlussquote der Marketing-Leads"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Retention programmes produce many numbers; few of them steer. An outcome KPI is the result (customers kept, revenue from existing customers, customers won through referrals); a driver KPI comes before it (members who use a benefit, referrals submitted); a guardrail must not get worse (the cost of rewards, fake referrals); a vanity metric counts sign-ups or reach (members signed up, likes).", "Bindungsprogramme erzeugen viele Zahlen; wenige davon steuern. Ein Outcome-KPI ist das Ergebnis (gehaltene Kunden, Umsatz mit Bestandskunden, über Empfehlungen gewonnene Kunden); ein Treiber-KPI kommt davor (Mitglieder, die einen Vorteil nutzen, eingereichte Empfehlungen); eine Guardrail darf nicht schlechter werden (die Kosten der Belohnungen, gefälschte Empfehlungen); eine Vanity Metric zählt Anmeldungen oder Reichweite (angemeldete Mitglieder, Likes).")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a metric measures, not how it behaved last year: a driver that did not move with value is still a driver. A referral submitted is a driver; a referred firm that signed is an outcome.", "Ordnen Sie zu, was eine Kennzahl misst, nicht wie sie sich letztes Jahr verhielt: Ein Treiber, der sich nicht mit dem Wert bewegte, ist trotzdem ein Treiber. Eine eingereichte Empfehlung ist ein Treiber; eine empfohlene Firma, die unterschrieb, ist ein Outcome."),
        RISK_RULE.v,
        tt("How to use each kind: outcome → the target on the management dashboard; driver → the Customer Success team, reviewed weekly; guardrail → a limit that stops an approach; vanity → stop reporting it as success. A bonus on a number rewards reporting it, not moving it.", "Wie man jede Art nutzt: Outcome → das Ziel im Management-Dashboard; Treiber → das Customer-Success-Team, wöchentlich geprüft; Guardrail → eine Grenze, die einen Ansatz stoppt; Vanity → nicht mehr als Erfolg berichten. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("For memberships and referrals, an economic guardrail is essential: count what rewards and discounts cost per customer kept, and how many referrals turn out to be fake.", "Für Mitgliedschaften und Empfehlungen ist eine wirtschaftliche Guardrail unverzichtbar: Zählen Sie, was Belohnungen und Rabatte pro gehaltenem Kunden kosten und wie viele Empfehlungen sich als gefälscht erweisen."),
        tt("A good set of three KPIs has at least one outcome and one driver, each with where the number comes from, what you would aim for and why it is a KPI; a guardrail is a strong third.", "Ein gutes Set aus drei KPIs hat mindestens ein Outcome und einen Treiber, jeder mit Quelle der Zahl, dem, was Sie anstreben würden, und warum er ein KPI ist; eine Guardrail ist ein starker dritter."),
      ]}
      sources={["kaplan1992", "ries2011"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) called the numbers that go up whatever you do “vanity metrics”. In retention programmes, members signed up is the classic one: it rises with every campaign and says nothing about whether anyone stayed.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nannte die Zahlen, die steigen, egal was man tut, „Vanity Metrics“. In Bindungsprogrammen sind angemeldete Mitglieder die klassische: Sie steigen mit jeder Kampagne und sagen nichts darüber, ob jemand geblieben ist.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A KPI tree for memberships and referrals · a worked example on Werra Datentechnik", "Ein KPI-Baum für Mitgliedschaften und Empfehlungen · ein Beispiel mit Werra Datentechnik")} caption={tt("Choose a metric to read its kind, then show whether each moved with customer value last year.", "Wählen Sie eine Kennzahl, um ihre Art zu lesen, und zeigen Sie dann, ob sich jede letztes Jahr mit dem Kundenwert bewegte.")}>
        <KpiTree />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four kinds of metric", "Tabelle zeigen: Die vier Arten von Kennzahlen")}>
        <DataTable
          head={[tt("Kind", "Art"), tt("What it is", "Was es ist"), tt("Where it sits", "Wo es steht")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four kinds of metric", "Die vier Arten von Kennzahlen")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("Whether an approach really keeps customers or brings referrals is tested, not believed: one change, a random split of customers in the same weeks, judged by the result, with a size fixed before the start. And every reward passes a second test: does it build trust, or does it buy behaviour and invite misuse?", "Ob ein Ansatz wirklich Kunden hält oder Empfehlungen bringt, wird getestet, nicht geglaubt: eine Änderung, eine zufällige Aufteilung der Kunden in denselben Wochen, am Ergebnis gemessen, mit einer vor dem Start festgelegten Größe. Und jede Belohnung besteht einen zweiten Test: Baut sie Vertrauen auf, oder kauft sie Verhalten und lädt zu Missbrauch ein?")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last year, large with small customers, or customers an account manager chose lets something other than the change explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem Vorjahr, von großen mit kleinen Kunden oder mit Kunden, die ein Account Manager ausgewählt hat, lässt etwas anderes als die Änderung den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for expensive acquisition: referred firms that became customers), not promises to refer and not e-mails sent.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei teurer Gewinnung: empfohlene Firmen, die Kunden wurden), nicht Versprechen zu empfehlen und nicht versandte E-Mails."),
        tt("Fix the size before you start: about 100 decisions per group and at least one full sales cycle. Stopping when the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 Entscheidungen pro Gruppe und mindestens ein voller Verkaufszyklus. Zu stoppen, wenn die Variante vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("Wrong incentives: cash per referral buys names, not customers, invites fake and self-referrals, and turns a trusted advice into a paid one; a small reward can even make people less willing to help than no reward. Value for both sides, paid only when the referred firm signs, keeps trust.", "Falsche Anreize: Geld pro Empfehlung kauft Namen, nicht Kunden, lädt zu gefälschten und Selbstempfehlungen ein und macht aus einem vertrauten Rat einen bezahlten; eine kleine Belohnung kann Menschen sogar weniger hilfsbereit machen als gar keine. Wert für beide Seiten, erst gezahlt, wenn die empfohlene Firma unterschreibt, hält das Vertrauen."),
        tt("Real uncertainties: a small base, referred firms that were warmer to begin with (not a fair split), referrals not recorded, and a new competitor or price war. “The bigger the reward, the more good referrals”, “every satisfied customer will refer if asked” and “a membership keeps customers whatever the product does” are mistakes, not uncertainties.", "Echte Unsicherheiten: eine kleine Basis, empfohlene Firmen, die von Anfang an wärmer waren (keine faire Aufteilung), nicht erfasste Empfehlungen und ein neuer Wettbewerber oder Preiskampf. „Je größer die Belohnung, desto mehr gute Empfehlungen“, „jeder zufriedene Kunde empfiehlt, wenn man ihn fragt“ und „eine Mitgliedschaft hält Kunden, egal was das Produkt leistet“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "gneezy2000", "ryu2007"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Gneezy and Rustichini (2000) found that a small payment can make people do less than no payment at all, because it turns a favour into a transaction. Ryu and Feick (2007) showed that rewards raise referrals most where the tie between the two people is weak, which is also where trust is weakest.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Gneezy und Rustichini (2000) fanden, dass eine kleine Zahlung Menschen weniger tun lassen kann als gar keine, weil sie aus einem Gefallen ein Geschäft macht. Ryu und Feick (2007) zeigten, dass Belohnungen Empfehlungen dort am meisten erhöhen, wo die Beziehung zwischen zwei Menschen schwach ist, also dort, wo auch das Vertrauen am schwächsten ist.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test of a referral ask, and how sure it is · a worked example on Werra Datentechnik", "Ein fairer Test einer Empfehlungsbitte, und wie sicher er ist · ein Beispiel mit Werra Datentechnik")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many new customers each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele Neukunden jede Gruppe hat.")}>
        <FairTest />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: trust or wrong incentive? (Case assumption)", "Tabelle zeigen: Vertrauen oder falscher Anreiz? (Fallannahme)")}>
        <DataTable
          head={[tt("How the referral is rewarded", "Wie die Empfehlung belohnt wird"), tt("Builds trust or buys behaviour?", "Baut Vertrauen auf oder kauft Verhalten?"), tt("Why", "Warum")]}
          rows={[
            [tt("A thank-you in value for both firms, once the referred firm signs", "Ein Dankeschön in Wert für beide Firmen, sobald die empfohlene Firma unterschreibt"), tt("Builds trust", "Baut Vertrauen auf"), tt("Both sides gain, and only real customers are thanked.", "Beide Seiten gewinnen, und nur echte Kunden werden bedankt.")],
            [tt("€500 cash for every name submitted", "500 € Geld für jeden eingereichten Namen"), tt("Buys behaviour", "Kauft Verhalten"), tt("It pays for names, invites fake referrals and makes advice look paid.", "Es zahlt für Namen, lädt zu gefälschten Empfehlungen ein und lässt Rat bezahlt wirken.")],
            [tt("A simple ask at the quarterly review, with a ready intro e-mail", "Eine einfache Bitte im Quartalsreview, mit fertiger Vorstellungs-E-Mail"), tt("Builds trust", "Baut Vertrauen auf"), tt("It makes referring easy for customers who already trust you.", "Es macht Empfehlen leicht für Kunden, die Ihnen schon vertrauen.")],
            [tt("Points for every referral, whether or not it signs", "Punkte für jede Empfehlung, egal ob sie unterschreibt"), tt("Buys behaviour", "Kauft Verhalten"), tt("Volume is rewarded, not quality; the points become the reason.", "Menge wird belohnt, nicht Qualität; die Punkte werden zum Grund.")],
          ]}
          caption={tt("Trust or wrong incentive? (Case assumption)", "Vertrauen oder falscher Anreiz? (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: retention effect (how much it keeps or wins customers), scalability (whether it can grow without the cost growing with it) and economic viability (whether it pays for itself). Then check the budget and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Bindungswirkung (wie stark sie Kunden hält oder gewinnt), Skalierbarkeit (ob sie wachsen kann, ohne dass die Kosten mitwachsen) und Wirtschaftlichkeit (ob sie sich selbst trägt). Prüfen Sie dann das Budget und welche Probleme Sie beantworten.")}
      reasoning={[
        EXPLAIN_RULE.v,
        tt("Retention effect: 3 if it gives many customers a lasting reason to stay or brings new customers directly, 2 if it helps some customers or only for a while, 1 if it answers none of the problems.", "Bindungswirkung: 3, wenn sie vielen Kunden einen dauerhaften Grund zum Bleiben gibt oder direkt Neukunden bringt, 2, wenn sie einigen Kunden oder nur eine Zeit lang hilft, 1, wenn sie keines der Probleme beantwortet."),
        tt("Economic viability: 3 if what it brings clearly exceeds what it costs and the cost does not keep growing with rewards, 2 if it roughly pays for itself, 1 if it costs margin on every customer or pays for behaviour nobody can check.", "Wirtschaftlichkeit: 3, wenn sie klar mehr bringt, als sie kostet, und die Kosten nicht mit Belohnungen weiter wachsen, 2, wenn sie sich ungefähr selbst trägt, 1, wenn sie bei jedem Kunden Marge kostet oder für Verhalten zahlt, das niemand prüfen kann."),
        tt("Match each measure to the problems it really answers: what gives customers a reason to stay answers “low customer retention”; what brings new customers more cheaply, for example through existing ones, answers “expensive new customer acquisition”; what makes existing customers use more, meet peers or refer answers “potential of existing customers unused”. Merchandise answers none.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: Was Kunden einen Grund zum Bleiben gibt, beantwortet „geringe Kundenbindung“; was Neukunden günstiger bringt, etwa über Bestandskunden, beantwortet „teure Neukundengewinnung“; was Bestandskunden mehr nutzen, andere treffen oder empfehlen lässt, beantwortet „Potenzial der Bestandskunden ungenutzt“. Merchandise beantwortet keines."),
        tt("The label after the weeks says what kind of thing a measure is: a referral, a community, a service added value, an incentive that is only a reward, or a tool whose rules nobody can see. The brief's three problems call for real added value and for referrals that rest on trust; an incentive alone, such as a discount, a gift or a cash bonus, pays for behaviour without building it.", "Das Etikett hinter den Wochen sagt, was für eine Art Ding eine Maßnahme ist: eine Empfehlung, eine Community, ein Service-Mehrwert, ein Anreiz, der nur eine Belohnung ist, oder ein Werkzeug, dessen Regeln niemand sieht. Die drei Probleme des Auftrags verlangen echten Mehrwert und Empfehlungen, die auf Vertrauen beruhen; ein Anreiz allein, etwa ein Rabatt, ein Geschenk oder eine Geldprämie, bezahlt ein Verhalten, ohne es aufzubauen."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for retention effect, what makes the customer stay or refer; for economic viability, whether what it brings is worth what it costs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Wirkung auf die Bindung, was den Kunden bleiben oder empfehlen lässt; bei der Wirtschaftlichkeit, ob das, was es bringt, seine Kosten wert ist."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score and by dependency: what scales and feeds the others (the referral programme, the community where referrers meet peers) goes first; what adds service for each member comes next.", "Ordnen Sie nach Wert und nach Abhängigkeit: Was skaliert und die anderen speist (das Empfehlungsprogramm, die Community, in der Empfehler andere treffen), kommt zuerst; was jedem Mitglied Service hinzufügt, kommt danach."),
      ]}
      sources={["hubbard2014", "reichheld2003"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Hubbard (2014) advises measuring what would change a decision. Reichheld (2003) argued that willingness to recommend is one of the best signs of future growth, because customers who recommend also stay. The plan names the evaluation for this day: retention effect × scalability × economic viability.",
            "Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Reichheld (2003) argumentierte, dass die Bereitschaft zu empfehlen eines der besten Zeichen für künftiges Wachstum ist, weil Kunden, die empfehlen, auch bleiben. Der Plan nennt die Bewertung für diesen Tag: Bindungswirkung × Skalierbarkeit × Wirtschaftlichkeit.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Werra Datentechnik, scored", "Drei Maßnahmen von Werra Datentechnik, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreExample />
      </Diagram>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Scalability is read from how the cost grows, never guessed.", "Die Skalierbarkeit wird daraus gelesen, wie die Kosten wachsen, nie geschätzt."),
            tt("A measure that keeps customers only while it pays them scores low on economic viability.", "Eine Maßnahme, die Kunden nur hält, solange sie sie bezahlt, punktet bei der Wirtschaftlichkeit niedrig."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
