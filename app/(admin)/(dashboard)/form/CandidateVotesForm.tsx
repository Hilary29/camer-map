"use client";

import { VotingResults, Candidate } from "@/types/election";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface CandidateVotesFormProps {
  formData: VotingResults;
  setFormData: (data: VotingResults) => void;
  onSubmit: (data: VotingResults) => Promise<void>;
  onBack: () => void;
}

export function CandidateVotesForm({ formData, setFormData, onSubmit, onBack }: CandidateVotesFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: formData,
  });

  const handleSave = async (data: VotingResults) => {
    setFormData({ ...formData, ...data });
    await onSubmit({ ...formData, ...data });
  };

  return (
    
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        {formData.candidateVotes.map((candidate, index) => (
          <FormField key={index} control={control} name={`candidateVotes.${index}.votes`} render={({ field }) => (
            <FormItem>
              <FormLabel>Votes pour {candidate.candidateId}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        ))}
        <div className="flex justify-between">
          <Button type="button" onClick={onBack}>Précédent</Button>
          <Button type="submit">Soumettre</Button>
        </div>
      </form>
    
  );
}
