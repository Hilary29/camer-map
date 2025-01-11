'use client'

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { VotingStationForm } from "@/components/voting-station-form"
import { saveVotingResults, addCandidate, removeCandidate, getCandidates } from "../actions"
import { Candidate, VotingResults } from "@/types/election"

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setIsLoading(true)
        const loadedCandidates = await getCandidates()
        setCandidates(loadedCandidates)
      } catch (error) {
        toast.error("Erreur lors du chargement des candidats")
        console.error("Erreur lors du chargement des candidats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCandidates()
  }, [])

  const handleAddCandidate = async (candidate: Omit<Candidate, "id">) => {
    try {
      const newCandidate = await addCandidate(candidate)
      setCandidates(prev => [...prev, newCandidate])
      toast.success(`${candidate.firstName} ${candidate.lastName} a été ajouté avec succès`)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'ajout du candidat"
      toast.error(message)
      console.error("Erreur lors de l'ajout du candidat:", error)
      throw error
    }
  }

  const handleRemoveCandidate = async (id: string) => {
    try {
      await removeCandidate(id)
      setCandidates(prev => prev.filter(candidate => candidate.id !== id))
      toast.success("Le candidat a été supprimé avec succès")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de la suppression du candidat"
      toast.error(message)
      console.error("Erreur lors de la suppression du candidat:", error)
      throw error
    }
  }

  const handleSubmitResults = async (data: VotingResults) => {
    try {
      setIsSubmitting(true)
      await saveVotingResults(data)
      toast.success("Les résultats ont été enregistrés avec succès")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'enregistrement des résultats"
      toast.error(message)
      console.error("Erreur lors de l'enregistrement des résultats:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Chargement des candidats...</p>
        </div>
      </div>
    )
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
            onSubmit={handleSubmitResults}
            onAddCandidate={handleAddCandidate}
            onRemoveCandidate={handleRemoveCandidate}
            
          />
        </div>
      </div>
    </div>
  )
}

