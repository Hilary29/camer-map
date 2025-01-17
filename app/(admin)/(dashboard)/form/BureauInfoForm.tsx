"use client";

import { VotingResults } from "@/types/election";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { regions, departments, communes } from "../../../../lib/admin-division";
import { useForm } from "react-hook-form";

interface BureauInfoFormProps {
  formData: VotingResults;
  setFormData: (data: VotingResults) => void;
  onNext: () => void;
}

export function BureauInfoForm({
  formData,
  setFormData,
  onNext,
}: BureauInfoFormProps) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: formData,
  });


  const handleSave = (data: VotingResults) => {
    setFormData({ ...formData, ...data });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
      {/* Identifiant du Bureau */}
      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Identifiant du Bureau</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Région */}
      <FormField
        control={control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Région</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une région" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Département */}
      {region && (
        <FormField
          control={control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Département</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un département" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments[region]?.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Commune */}
      {region && department && (
        <FormField
          control={control}
          name="commune"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commune</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une commune" />
                  </SelectTrigger>
                  <SelectContent>
                    {communes[region]?.[department]?.map((commune) => (
                      <SelectItem key={commune} value={commune}>
                        {commune}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
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
        control={control}
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

      {/* Bouton Suivant */}
      <Button type="submit">Suivant</Button>
    </form>
  );
}
