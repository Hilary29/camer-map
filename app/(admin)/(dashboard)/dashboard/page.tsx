

import React from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { VotingResults } from "@/components/voting-results";
import { ChevronDown } from 'lucide-react'
import type { VotingCenterResult } from '../../../../types/voting'
import { VotingStationForm } from "@/components/voting-station-form"
import { saveVotingResults } from "../../../actions"
import { Candidate } from "@/types/election"

// Exemple de candidats (à remplacer par vos vraies données)
const candidates: Candidate[] = [
  {
    id: "1",
    firstName: "Paul",
    lastName: "Biya",
    party: "RDPC",
  },
  {
    id: "2",
    firstName: "Maurice",
    lastName: "Kamto",
    party: "MRC",
  },
  {
    id: "3",
    firstName: "Cabral",
    lastName: "Libii",
    party: "PCRN",
  },
]

const page = () => {
  return (
    <div className="flex min-h-screen  flex-col">
      <div className="flex-1  p-4 sm:p-8">
      <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Saisie des Résultats Électoraux</h1>
        <p className="text-muted-foreground">
          Remplissez le formulaire ci-dessous avec les résultats du bureau de vote.
        </p>
      </div>

      <VotingStationForm 
        candidates={candidates}
        onSubmit={saveVotingResults}
      />
    </div>

      </div>
    </div>

  );
};

export default page;
