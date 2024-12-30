"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Candidate, VotingResults } from "@/types/election"
import { CandidateManagement } from "./candidate-form"

const formSchema = z.object({
  id: z.string().min(1, "L'identifiant est requis"),
  region: z.string().min(1, "La région est requise"),
  department: z.string().min(1, "Le département est requis"),
  commune: z.string().min(1, "La commune est requise"),
  openingTime: z.string(),
  closingTime: z.string(),
  registeredVoters: z.number().min(0, "Le nombre doit être positif"),
  actualVoters: z.number().min(0, "Le nombre doit être positif"),
  nullVotes: z.number().min(0, "Le nombre doit être positif"),
  blankVotes: z.number().min(0, "Le nombre doit être positif"),
  authenticated: z.boolean(),
  candidateVotes: z.array(
    z.object({
      candidateId: z.string(),
      votes: z.number().min(0, "Le nombre doit être positif"),
    })
  ),
})

const regions = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
]

const departments: Record<string, string[]> = {
  Centre: ["Mfoundi", "Lekié", "Nyong-et-Kellé"],
  // Ajoutez les départements pour chaque région
}

interface VotingStationFormProps {
  candidates: Candidate[]
  onSubmit: (data: VotingResults) => Promise<void>
  onAddCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>
  onRemoveCandidate: (id: string) => Promise<void>
}

export function VotingStationForm({ candidates, onSubmit, onAddCandidate, onRemoveCandidate }: VotingStationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openingTime: "07:00",
      closingTime: "18:00",
      registeredVoters: 0,
      actualVoters: 0,
      nullVotes: 0,
      blankVotes: 0,
      authenticated: true, // Valeur par défaut pour authenticated
      candidateVotes: candidates.map(candidate => ({
        candidateId: candidate.id,
        votes: 0,
      })),
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      await onSubmit(values)
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Bureau de Vote</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifiant du Bureau</FormLabel>
                    <FormControl>
                      <Input placeholder="001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Région</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une région" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Département</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un département" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments[form.watch("region")]?.map(department => (
                          <SelectItem key={department} value={department}>
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commune"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commune</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure d&apos;ouverture</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de fermeture</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résultats du Vote</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="registeredVoters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Électeurs inscrits</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="actualVoters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votants</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nullVotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votes nuls</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blankVotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votes blancs</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <CandidateManagement
          candidates={candidates}
          onAddCandidate={onAddCandidate}
          onRemoveCandidate={onRemoveCandidate}
        />

        <Card>
          <CardHeader>
            <CardTitle>Votes par Candidat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {candidates.map((candidate, index) => (
                <FormField
                  key={candidate.id}
                  control={form.control}
                  name={`candidateVotes.${index}.votes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {candidate.firstName} {candidate.lastName} ({candidate.party})
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer les résultats
          </Button>
        </div>
      </form>
    </Form>
  )
}

