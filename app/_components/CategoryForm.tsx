"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Homeschema, HomeschemaType } from "@/schemas/HomeSchema";

interface CategoryFormProps {
  categories: Category[];
}

export function CategoryForm({ categories }: CategoryFormProps) {
  const form = useForm<HomeschemaType>({
    resolver: zodResolver(Homeschema),
  });

  function onSubmit(data: HomeschemaType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center font-bold w-full p-2 md:p-4 max-w-xl bg-white"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className={cn(
              "flex-grow",
              form.getValues().category && "text-cyan-500"
            )}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl
                  className="text-lg md:text-2xl p-8 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent
                outline-none"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem className="text-lg px-8 " value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="px-8 py-8 md:px-16 rounded-none text-lg md:text-xl">
          OK!
        </Button>
      </form>
    </Form>
  );
}
