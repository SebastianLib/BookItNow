"use client";
import { Category, Service } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  SearchFormSchema,
  SearchFormSchemaType,
} from "@/schemas/SearchFormSchema";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
const SearchForm = ({
  setUrl,
  categories,
  services,
  categoryId,
}: {
  categories: Category[];
  services: Service[];
  categoryId: string;
  setUrl: any;
}) => {
  const router = useRouter();
  const form = useForm<SearchFormSchemaType>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      category: categoryId,
    },
  });

 function onSubmit(values: SearchFormSchemaType) {
    let url = `/api/search?category=${values.category}`;
    if (values.service) {
      url += `&service=${values.service}`;
    }
    setUrl(url)
    router.push(`/search?category=${values.category}&service=${values.service}`)
  }

  const clearCategory = () => {
    form.setValue("category", "");
    form.trigger("category");  
  };

  const clearService = () => {
    form.setValue("service", "");
    form.trigger("service");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[300px]"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-xl">Category</FormLabel>
                <button 
                  type="button"
                  className="bg-gray-200 uppercase text-gray-400 px-3 hover:bg-cyan-500 hover:text-white transition"
                  onClick={()=>{clearCategory(), clearService()}}
                >
                  Clear
                </button>
              </div>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="max-w-[300px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-xl">Service</FormLabel>
                <button 
                  type="button"
                  className="bg-gray-200 uppercase text-gray-400 px-3 hover:bg-cyan-500 hover:text-white transition"
                  onClick={clearService}
                >
                  Clear
                </button>
              </div>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="max-w-[300px]">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services
                    .filter(
                      (service) =>
                         form.getValues().category ? service.categoryId === form.getValues().category : true
                    )
                    .map((service) => (
                      <SelectItem value={service.id} key={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;