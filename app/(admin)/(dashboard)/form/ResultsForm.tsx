"use client";

import { VotingResults } from "@/types/election";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ResultsFormProps {
  formData: VotingResults;
  setFormData: (data: VotingResults) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ResultsForm({ formData, setFormData, onNext, onBack }: ResultsFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: formData,
  });

  const handleSave = (data: VotingResults) => {
    setFormData({ ...formData, ...data });
    onNext();
  };

  return (
    
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        <FormField control={control} name="registeredVoters" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre d&apos;inscrits</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Autres champs */}
        <div className="flex justify-between">
          <Button type="button" onClick={onBack}>Précédent</Button>
          <Button type="submit">Suivant</Button>
        </div>
      </form>
   
  );
}
