"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useGenerateMinutes } from "@/hooks/useGenerateMinutes";
import { useAddAvailability } from "@/actions/useAddAvailability";
import { AddAvailabilitySchema, AddAvailabilitySchemaType } from "@/schemas/AddAvailabilitySchema";


export function Availability() {
    const mutation = useAddAvailability()

  const form = useForm<AddAvailabilitySchemaType>({
    resolver: zodResolver(AddAvailabilitySchema),
    defaultValues: {
      day: "Monday",
      hours: [],
    },
  });

  async function onSubmit(data: AddAvailabilitySchemaType) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 text-center">
                <FormLabel className="font-bold text-3xl">Your Hours</FormLabel>
                <FormDescription>
                  Select the hours when you are available
                </FormDescription>
              </div>
              <div className="h-[400px] overflow-auto flex flex-col gap-1">
              {useGenerateMinutes().map((item) => (
                <FormItem
                  key={item.time}
                  className={cn(
                    "flex flex-row hours-start space-x-3 space-y-0 text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/15 cursor-pointer",
                    field.value?.includes(item.value) && "bg-cyan-500 hover:bg-cyan-400 text-white",
                  )}
                >
                  <FormControl>
                    <Checkbox
                    className="hidden"
                      checked={field.value?.includes(item.value)}
                      onCheckedChange={(checked) => {   
                        return checked
                          ? field.onChange([...field.value || [], item.value])
                          : field.onChange(
                              field.value?.filter((value) => value !== item.value)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="w-full cursor-pointer font-semibold p-3">{item.time}</FormLabel>
                </FormItem>
              ))}
              </div>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button disabled={mutation.isPending} type="submit">Submit</Button>
      </form>
    </Form>
  );
}
