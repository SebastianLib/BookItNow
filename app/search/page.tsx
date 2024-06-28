"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetWorkers } from "@/hooks/useGetWorkers";
import SearchWorkers from "./components/SearchWorkers";

const SearchPage = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const service = searchParams.get("service");

  const [url, setUrl] = useState(`/api/search?category=${category}&service=${service}`);
  
  useEffect(() => {
    setUrl(`/api/search?category=${category}&service=${service}`);
  }, [category, service]);

  const { data, isLoading } = useQuery({
    queryKey: ["categories", url],
    queryFn: () => useGetWorkers(url),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  }, [url]);

  if (!category && !service) return null;
  if (isLoading || !data) return <div>loading</div>;

  const services = data?.categories?.flatMap((category: any) => [
    ...category.services,
  ]);

  const filteredCategory = data?.categories.find((cat) => cat.id === category);

  return (
    <section className="w-full">
      <div className="w-full flex items-center mt-[74px] md:mt-[90px] h-28 bg-orange-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold capitalize">
            {filteredCategory?.name}
            <span className="text-3xl text-gray-600 ml-4">
              {data.users.length} Results
            </span>
          </h2>
        </div>
      </div>
      <MaxWidthWrapper className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:justify-start">
        <SearchForm
          categories={data.categories}
          services={services}
          categoryId={category!}
          setUrl={setUrl}
        />
        <SearchWorkers workers={data.users}/>
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchPage;
