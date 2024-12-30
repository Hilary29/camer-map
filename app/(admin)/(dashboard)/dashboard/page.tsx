'use client'

import { useEffect, useState } from "react"
import Footer from "@/components/Footer"
import { Header } from "@/components/Header"
import Hero from "@/components/Hero"
import { VotingResults } from "@/components/voting-results"
import { ChevronDown } from 'lucide-react'
import type { VotingCenterResult } from '../../../../types/voting'
import { VotingStationForm } from "@/components/voting-station-form"
import { saveVotingResults, addCandidate, removeCandidate, getCandidates } from "../actions"
import { Candidate } from "@/types/election"

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  useEffect(() => {
    // Load initial candidates
    getCandidates().then(setCandidates)
  }, [])

  const handleAddCandidate = async (candidate: Omit<Candidate, "id">) => {
    const newCandidate = await addCandidate(candidate)
    setCandidates(prev => [...prev, newCandidate])
  }

  const handleRemoveCandidate = async (id: string) => {
    await removeCandidate(id)
    setCandidates(prev => prev.filter(candidate => candidate.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-4 sm:p-8">
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
            onAddCandidate={handleAddCandidate}
            onRemoveCandidate={handleRemoveCandidate}
          />
        </div>
      </div>
    </div>
  )
}

