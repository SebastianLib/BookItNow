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
import {
  AddAvailabilitySchema,
  AddAvailabilitySchemaType,
} from "@/schemas/AddAvailabilitySchema";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetDate } from "@/hooks/useGetDate";
import { useEffect } from "react";

export function Availability() {
  const mutation = useAddAvailability();

  const form = useForm<AddAvailabilitySchemaType>({
    resolver: zodResolver(AddAvailabilitySchema),
    defaultValues: {
      date: new Date(),
      hours: [],
    },
  });

  const selectedDate = form.watch("date");
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["currentDate"],
    queryFn: async () => await useGetDate({ selectedDate }),
  });
  form.setValue("hours", data?.hours.map(hour => hour.time));

  async function onSubmit(data: AddAvailabilitySchemaType) {
    mutation.mutate(data);
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["currentDate"] });
  }, [selectedDate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between">
                <div className="flex flex-col">
                  <FormLabel className="font-bold text-2xl xl:text-3xl">
                    Your Hours
                  </FormLabel>
                  <FormDescription>
                    Select the hours when you are available
                  </FormDescription>
                </div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col md:self-end">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || new Date()}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date.getTime() < new Date().setHours(0, 0, 0, 0)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-[400px] overflow-auto flex flex-col gap-1">
                {useGenerateMinutes().map((item) => (
                  <FormItem
                    key={item.time}
                    className={cn(
                      "flex flex-row hours-start space-x-3 space-y-0 text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/15 cursor-pointer",
                      field.value?.includes(item.value) &&
                        "bg-cyan-500 hover:bg-cyan-400 text-white"
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        className="hidden"
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([
                                ...(field.value || []),
                                item.value,
                              ])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="w-full cursor-pointer font-semibold p-3">
                      {item.time}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={mutation.isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
