"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriB } from "@/components/materi/Materi";
import { Task2 } from "@/components/task2/Task2";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

export function Route2Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-3">
        <div className="space-y-1">
          <p className="smallcaps text-accent">{tt("Route 2 · Level 3 · Management decision", "Route 2 · Level 3 · Managemententscheidung")}</p>
          <h1>{tt("Build a scalable retention system of memberships and referrals", "Ein skalierbares Bindungssystem aus Mitgliedschaften und Empfehlungen aufbauen")}</h1>
        </div>
        <blockquote className="max-w-prose space-y-2 border-l-4 border-gold bg-accentSoft px-4 py-3 text-body text-ink">
          <p>
            <Gloss>
              {tt("Route 1 looked at single parts at ConnectIT: which benefits hold customers, what a referral is worth, which customers to ask and which only want a discount, and how to test without wrong incentives. Level 3 asks a different question: what does a membership and referral system look like for all customers, which added values are central, how does the referral model scale, where are the wrong incentives and the costs, and what do you decide today although nobody can forecast its success?", "Route 1 hat einzelne Teile bei ConnectIT betrachtet: welche Vorteile Kunden halten, was eine Empfehlung wert ist, welche Kunden man fragt und welche nur einen Rabatt wollen, und wie man ohne falsche Anreize testet. Level 3 stellt eine andere Frage: Wie sieht ein Mitglieder- und Empfehlungssystem für alle Kunden aus, welche Mehrwerte sind zentral, wie skaliert das Empfehlungsmodell, wo liegen die falschen Anreize und die Kosten, und was entscheiden Sie heute, obwohl niemand seinen Erfolg vorhersagen kann?")}
            </Gloss>
          </p>
        </blockquote>
      </header>
      <SuggestedOrderBanner
        routeKey="r2"
        text={tt(
          "Route 1 first is recommended, because the situation quotes the kinds of metric and the measures you named there. Every section stays open, so you can work through this route regardless.",
          "Route 1 zuerst wird empfohlen, weil die Lage die Arten von Kennzahlen und die Maßnahmen zitiert, die Sie dort benannt haben. Jeder Abschnitt bleibt offen, Sie können diese Route trotzdem bearbeiten.",
        )}
      />
      <SectionRail route={2} />
      <PageNav route={2} />
      <MateriB />
      <Task2 />
      <ResetRoute route={2} />
    </div>
  );
}
