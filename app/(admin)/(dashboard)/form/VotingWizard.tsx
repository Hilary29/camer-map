"use client";

import { useState } from "react";
import { BureauInfoForm } from "./BureauInfoForm";
import { ResultsForm } from "./ResultsForm";
import { CandidateVotesForm } from "./CandidateVotesForm";
import { VotingResults, Candidate } from "@/types/election";

interface VotingWizardProps {
  candidates: Candidate[];
  onSubmit: (data: VotingResults) => Promise<void>;
}

export function VotingWizard({ candidates, onSubmit }: VotingWizardProps) {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState<VotingResults>({
    id: "",
    region: "",
    department: "",
    commune: "",
    openingTime: "07:00",
    closingTime: "18:00",
    registeredVoters: 0,
    actualVoters: 0,
    nullVotes: 0,
    blankVotes: 0,
    authenticated: true,
    centerName: "", // Ajoutez cette propriété
    bureauId: "", // Ajoutez cette propriété
    electionType: "", // Ajoutez cette propriété
    candidateVotes: candidates.map((candidate) => ({
      candidateId: candidate.id,
      votes: 0,
    })),
  });

  const pages = [
    <BureauInfoForm
      key="bureauInfo"
      formData={formData}
      setFormData={setFormData}
      onNext={() => setPage(1)}
    />,
    <ResultsForm
      key="results"
      formData={formData}
      setFormData={setFormData}
      onNext={() => setPage(2)}
      onBack={() => setPage(0)}
    />,
    <CandidateVotesForm
      key="candidateVotes"
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      onBack={() => setPage(1)}
    />,
  ];

  return <div>{pages[page]}</div>;
}
