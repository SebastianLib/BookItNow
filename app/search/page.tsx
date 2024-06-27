"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/lib/db";
import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Category, User, UserService } from "@prisma/client";

const SearchPage = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const service = searchParams.get("service");

  if (!category && !service) return null;
  const [url, setUrl] = useState(`/api/search?category=${category}&service=${service}`)

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
      url
      );
      return res.data;
    },
  });

  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },[url])
  
  if (!data) return <div>loading</div>;
  
  const services = data?.categories?.flatMap((category: any) => [
    ...category.services,
  ]);


  const filteredCategory = data?.categories.find(
    (cat: Category) => cat.id === category
  );

  return (
    <section className="w-full">
      <div className="w-full flex items-center mt-[90px] h-28 bg-orange-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold capitalize">
            {filteredCategory?.name}
            <span className="text-3xl text-gray-600 ml-4">
              {data.users.length} Results
            </span>
          </h2>
        </div>
      </div>
      <MaxWidthWrapper className="pt-6 grid grid-cols-3">
        <SearchForm
          categories={data.categories}
          services={services}
          categoryId={category!}
          setUrl={setUrl}
        />
        <div className="col-span-2">
          {data.users.map((worker:(UserService & {user:User})) => (
            <div key={worker.id}>{worker.user.name}</div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchPage;
