"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
  onRemoveCandidate 
}: CandidateManagementProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      party: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof candidateSchema>) {
    try {
      setIsSubmitting(true)
      await onAddCandidate(values)
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Gestion des Candidats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 md:grid-cols-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="party"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parti</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="self-end"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </form>
          </Form>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Parti</th>
                  <th className="p-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-t">
                    <td className="p-3">
                      {candidate.firstName} {candidate.lastName}
                    </td>
                    <td className="p-3">{candidate.party}</td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveCandidate(candidate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {candidates.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-3 text-muted-foreground">
                      Aucun candidat enregistré
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

