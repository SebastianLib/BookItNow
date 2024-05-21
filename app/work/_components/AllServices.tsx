"use client";
import { Category, Service } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  UserServicesSchema,
  UserServicesSchemaType,
} from "@/schemas/UserServicesSchema";
import UserCategoryForm from "./UserCategoryForm";
import { useEffect, useState } from "react";
import { UserServicesForm } from "./UserServicesForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAddUserServicesMutation } from "@/actions/useAddUserServicesMutation";

interface AllServicesProps {
  categoriesWithServices: Category[] &
    {
      services: Service[];
    }[];
}

const AllServices = ({ categoriesWithServices }: AllServicesProps) => {

  const [services, setServices] = useState<Service[]>([])
  const form = useForm<UserServicesSchemaType>({
    resolver: zodResolver(UserServicesSchema),
    defaultValues: {
      category: "",
      services: []
    },
  });
  const mutation = useAddUserServicesMutation()

  const watchCategory = form.watch("category");
  const allServices = categoriesWithServices.flatMap((category: any) => [
    ...category.services,
  ]);

  function onSubmit(data: UserServicesSchemaType) { 
    mutation.mutate(data.services)
  }

  useEffect(() => {
    setServices(allServices.filter((service) => service.categoryId === watchCategory))
  }, [watchCategory]);

  return (
    <Dialog>
      <DialogTrigger className="border border-cyan-500 bg-background hover:bg-accent text-cyan-500 px-6 py-2 rounded-full">
        Change Your Services
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-500 mt-8 mb-4">
          Add New Services
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-8 font-bold w-full p-2 md:p-4 max-w-xl bg-white"
          >
            <UserCategoryForm category={categoriesWithServices} form={form} />
            {watchCategory && (
              <UserServicesForm services={services} form={form} />
            )}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full px-8 py-8 md:px-16 rounded-none text-lg md:text-xl"
            >
              SUBMIT!
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AllServices;
