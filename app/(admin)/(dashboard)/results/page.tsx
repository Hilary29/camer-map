'use client'

import { useEffect, useState } from "react"
import { toast } from "sonner"
import Footer from "@/components/Footer"
import { Header } from "@/components/Header"
import Hero from "@/components/Hero"
import { VotingResults } from "@/components/voting-results"
import { ChevronDown } from 'lucide-react'
import { VotingStationForm } from "@/components/voting-station-form"
import { saveVotingResults, addCandidate, removeCandidate, getCandidates } from "../actions"
import { Candidate, VotingResults as VotingResultsType } from "@/types/election"

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      toast.error("Erreur lors de l'ajout du candidat")
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
      toast.error("Erreur lors de la suppression du candidat")
      console.error("Erreur lors de la suppression du candidat:", error)
      throw error
    }
  }

  const handleSubmitResults = async (data: VotingResultsType) => {
    try {
      await saveVotingResults(data)
      toast.success("Les résultats ont été enregistrés avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des résultats")
      console.error("Erreur lors de l'enregistrement des résultats:", error)
      throw error
    }
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

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <VotingStationForm 
              candidates={candidates}
              onSubmit={handleSubmitResults}
              onAddCandidate={handleAddCandidate}
              onRemoveCandidate={handleRemoveCandidate}
            />
          )}
        </div>
      </div>
    </div>
  )
}

