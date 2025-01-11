"use client";
import React from 'react'
import {VotingWizard} from './VotingWizard'
import { Candidate, VotingResults } from "@/types/election";
import { useForm, FormProvider } from "react-hook-form";

export default function Page() {

    const candidates: Candidate[] = [
        { id: "1", name: "Candidate 1", party: "Party 1" },
        { id: "2", name: "Candidate 2", party: "Party 2" },
        { id: "3", name: "Candidate 3", party: "Party 3" },
      ];

      const formMethods = useForm<VotingResults>();

      const handleSubmit = async (data: VotingResults) => {
        try {
          console.log("Submitting data:", data);
          // Envoyez les données à une API ou enregistrez-les dans une base de données
          await fetch("/api/submit-voting-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          alert("Données soumises avec succès !");
        } catch (error) {
          console.error("Erreur lors de la soumission :", error);
          alert("Une erreur est survenue lors de la soumission.");
        }
      };
    
  return (
    <div>
             <h1 className="text-2xl font-bold mb-4">Saisie des résultats de vote</h1>
             <FormProvider {...formMethods}>
             <VotingWizard candidates={candidates} onSubmit={handleSubmit} />
             </FormProvider>
             
      
    </div>
  )
}


