import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateMinutes } from "@/hooks/useGenerateMinutes";
import { cn } from "@/lib/utils";
import { UserServicesSchemaType } from "@/schemas/UserServicesSchema";
import { Category } from "@prisma/client";
import { SelectContent } from "@radix-ui/react-select";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface UserCategoryForProps {
  form: UseFormReturn<UserServicesSchemaType>;
  category: Category[];
}

const UserCategoryForm = ({ form, category }: UserCategoryForProps) => {

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full",
            form.getValues().category && "text-cyan-500"
          )}
        >
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="text-lg md:text-2xl p-8">
              <SelectTrigger className="border-cyan-500 border-2 focus:border-cyan-700 focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-20 w-[300px] md:w-[400px] border-cyan-500 border-2">
              {category.map((category) => (
                <SelectItem
                  className={cn(
                    "text-lg px-8 py-4 text-black",
                    form.getValues().category === category.id && "text-cyan-500"
                  )}
                  value={category.id}
                  key={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default UserCategoryForm;
