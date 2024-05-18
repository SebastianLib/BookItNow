"use client";
import { Category, Service } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import {
  UserServicesSchema,
  UserServicesSchemaType,
} from "@/schemas/UserServicesSchema";
import UserCategoryForm from "./UserCategoryForm";
import { useEffect } from "react";

interface AllServicesProps {
  categoriesWithServices: Category[] &
    {
      services: Service[];
    }[];
}

const AllServices = ({ categoriesWithServices }: AllServicesProps) => {
  const form = useForm<UserServicesSchemaType>({
    resolver: zodResolver(UserServicesSchema),
  });
  const watchCategory = form.watch("category");
  const services = categoriesWithServices.flatMap((category:any) => [...category.services]);
  
  function onSubmit(data: UserServicesSchemaType) {}

  useEffect(()=>{
    console.log(services.filter(service => service.categoryId === watchCategory))
    
  },[watchCategory])

  return (
    <Dialog>
      <DialogTrigger className="border border-cyan-500 bg-background hover:bg-accent text-cyan-500 px-6 py-2 rounded-full">
        Change Your Services
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center font-bold w-full p-2 md:p-4 max-w-xl bg-white"
          >
              <UserCategoryForm category={categoriesWithServices} form={form}/>
            <Button
              type="submit"
              className="px-8 py-8 md:px-16 rounded-none text-lg md:text-xl"
            >
              OK!
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AllServices;
