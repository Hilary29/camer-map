'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Candidate } from "@/types/election"

const candidateSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  party: z.string().min(1, "Le parti est requis"),
})

interface CandidateManagementProps {
  candidates: Candidate[]
  onAddCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>
  onRemoveCandidate: (id: string) => Promise<void>
}

export function CandidateManagement({
  candidates,
  onAddCandidate,
  onRemoveCandidate,
}: CandidateManagementProps) {
  const [isAdding, setIsAdding] = useState(false)

  const { register, handleSubmit, reset } = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
  })

  async function handleAddCandidate(data: z.infer<typeof candidateSchema>) {
    try {
      setIsAdding(true)
      await onAddCandidate(data)
      reset()
    } catch (error) {
      console.error(error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Candidats</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleAddCandidate)} className="space-y-4">
          <Input {...register("firstName")} placeholder="Prénom" />
          <Input {...register("lastName")} placeholder="Nom" />
          <Input {...register("party")} placeholder="Parti" />
          <Button type="submit" disabled={isAdding}>
            Ajouter un candidat
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between">
              <span>
                {candidate.firstName} {candidate.lastName} ({candidate.party})
              </span>
              <Button onClick={() => onRemoveCandidate(candidate.id)} variant="destructive">
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

