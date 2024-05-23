"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserServicesSchemaType } from "@/schemas/UserServicesSchema";
import { Input } from "@/components/ui/input";

interface UserServicesMinutesFormProps {
  form: UseFormReturn<UserServicesSchemaType>;
}

export function UserServicesMinutesForm({
  form,
}: UserServicesMinutesFormProps) {
  return (
    <div className="w-full h-[300px] px-2 overflow-y-auto">
      <h2 className="text-2xl mb-2">Type Minutes Duration</h2>
      <FormField
        control={form.control}
        name="services"
        render={() => (
          <FormItem className="self-start w-full">
            {form.getValues().services.map((service, index) => (
              <div key={service.id} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`services.${index}.minutes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">{service.name}</FormLabel>
                      <FormControl>
                        <Input
                          className="flex"
                          type="number"
                          defaultValue={30}
                          placeholder="Service Duration"
                          onChange={(e) =>
                            field.onChange(
                              Number(e.target.value),
                              form.clearErrors()
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
