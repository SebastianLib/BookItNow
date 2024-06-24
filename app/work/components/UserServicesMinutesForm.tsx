"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserServicesSchemaType } from "@/schemas/UserServicesSchema";
import { useGenerateMinutes } from "@/hooks/useGenerateMinutes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UserServicesMinutesFormProps {
  form: UseFormReturn<UserServicesSchemaType>;
}

export function UserServicesMinutesForm({
  form,
}: UserServicesMinutesFormProps) {
  const timesArray = useGenerateMinutes().slice(1);
  return (
    <div className="w-full h-[300px] overflow-y-auto">
      <h2 className="text-2xl mb-2">Type Minutes Duration</h2>
      <FormField
        control={form.control}
        name="services"
        render={() => (
          <FormItem className="self-start w-full">
            {form.getValues().services.map((service, index) => (
              <div key={index} className="flex flex-col gap-2 my-4">
                <h3 className="text-cyan-500">{service.name}</h3>
                <Select
                    onValueChange={(e) => {
                    const newValues = [...form.getValues().services];
                    newValues[index].minutes = Number(e);
                    form.setValue("services", newValues);
                  }}
                >
                  <SelectTrigger className="border-cyan-500 border-2 text-cyan-500 focus:border-cyan-700 focus:ring-offset-0 focus:ring-0">
                    <SelectValue  placeholder="30 minutes"/>
                  </SelectTrigger>
                  <SelectContent className="border-cyan-500 border-2">
                    {timesArray.map((time) => {
                      return (
                        <SelectItem
                          key={`${time.value}-${index}`}
                          value={String(time.value)}
                          className={cn(
                            form.getValues().services[index].minutes ===
                              time.value && "text-cyan-500"
                          )}
                        >
                          {time.value} minutes
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
