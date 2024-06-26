import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/lib/db";
import React from "react";
import SearchForm from "./components/SearchForm";

const SearchPage = async({ params }: { params: { categoryId: string } }) => {

  const categories= await db.category.findMany({
    include:{
      services: true,
    }
  })

  const services = categories.flatMap((category: any) => [
    ...category.services,
  ]);
  console.log(services);
  

    const data = await db.userService.findMany({
        where:{
            service:{
                    categoryId: params.categoryId
            }
        },include:{
            user: true,
            service: {
              include:{
                category: true,
              }
            }
        },
        distinct: ['userId'],
    })
    const filteredCategory = categories.find(
      (category) => category.id === params.categoryId
    );
    if(!filteredCategory) return null;
    
  return (
    <section className="w-full">
      <div className="w-full flex items-center mt-[90px] h-28 bg-orange-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold capitalize">
           {filteredCategory.name}
            <span className="text-3xl text-gray-600 ml-4">{data.length} Results</span>
          </h2>
        </div>
      </div>
      <MaxWidthWrapper className="pt-6 grid grid-cols-3">
        <SearchForm categories={categories} services={services}/>
        <div className="col-span-2">
        {data.map((worker)=>(
          <div>{worker.user.name}</div>
        ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchPage;
