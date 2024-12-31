"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResultsTable } from "@/components/results-table"
import { StatisticsCard } from "@/components/statistics-card"
import { VotingStationForm } from "@/components/voting-station-form"
import { aggregateResults, calculateRegionalResults, calculateDepartmentResults } from "@/utils/calculations"
import { saveVotingResults } from "../../../actions"
import { VotingResults, Candidate } from "@/types/election"

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

// Exemple de résultats (à remplacer par vos vraies données)
const initialResults: VotingResults[] = [
  {
    id: "001",
    region: "Centre",
    department: "Mfoundi",
    commune: "Yaoundé 1er",
    candidateVotes: [
      { candidateId: "1", votes: 1500 },
      { candidateId: "2", votes: 1200 },
      { candidateId: "3", votes: 800 },
    ],
    openingTime: "07:00",
    closingTime: "18:00",
    registeredVoters: 4000,
    actualVoters: 3500,
    nullVotes: 100,
    blankVotes: 50,
    authenticated: true,
  },
]

export default function ElectionResults() {
  const [results, setResults] = useState<VotingResults[]>(initialResults)
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [activeTab, setActiveTab] = useState("results")
  const [managedCandidates, setManagedCandidates] = useState<Candidate[]>(candidates)

  const filteredResults = results.filter(result => 
    (!selectedRegion || result.region === selectedRegion) &&
    (!selectedDepartment || result.department === selectedDepartment)
  )

  const aggregated = aggregateResults(filteredResults)

  const handleSubmit = async (data: VotingResults) => {
    try {
      await saveVotingResults(data)
      setResults(prev => [...prev, data])
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
      throw error
    }
  }

  const handleAddCandidate = async (candidate: Omit<Candidate, "id">) => {
    const newId = String(managedCandidates.length + 1)
    const newCandidate: Candidate = { ...candidate, id: newId }
    setManagedCandidates(prev => [...prev, newCandidate])
    return Promise.resolve()
  }

  const handleRemoveCandidate = async (candidateId: string) => {
    setManagedCandidates(prev => prev.filter(c => c.id !== candidateId))
    return Promise.resolve()
  }

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Résultats des Élections Présidentielles
          </h1>
          <p className="text-muted-foreground">
            Consultez et saisissez les résultats des bureaux de vote.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="input">Saisie</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <StatisticsCard
                results={aggregated}
                candidates={managedCandidates}
                title={
                  selectedRegion
                    ? selectedDepartment
                      ? `Résultats - ${selectedDepartment}`
                      : `Résultats - ${selectedRegion}`
                    : "Résultats Nationaux"
                }
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Taux de Participation</CardTitle>
                  <CardDescription>
                    Statistiques de participation au vote
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Électeurs inscrits: {aggregated.registeredVoters}
                      </p>
                      <p className="text-sm font-medium">
                        Votants: {aggregated.actualVoters}
                      </p>
                      <p className="text-sm font-medium">
                        Taux de participation: {aggregated.participationRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Votes Non Exprimés</CardTitle>
                  <CardDescription>
                    Détail des votes nuls et blancs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Votes nuls: {aggregated.nullVotes}
                      </p>
                      <p className="text-sm font-medium">
                        Votes blancs: {aggregated.blankVotes}
                      </p>
                      <p className="text-sm font-medium">
                        Total: {aggregated.nullVotes + aggregated.blankVotes}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ResultsTable
              stations={results}
              candidates={managedCandidates}
              selectedRegion={selectedRegion}
              selectedDepartment={selectedDepartment}
              onRegionChange={setSelectedRegion}
              onDepartmentChange={setSelectedDepartment}
            />
          </TabsContent>

          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Saisie des Résultats</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous avec les résultats du bureau de vote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VotingStationForm
                  candidates={managedCandidates}
                  onSubmit={handleSubmit}
                  onAddCandidate={handleAddCandidate}
                  onRemoveCandidate={handleRemoveCandidate}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

