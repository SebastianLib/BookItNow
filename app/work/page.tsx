import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import UserServices from "./components/UserServices";
import AllServices from "./components/AllServices";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const WorkPage = async () => {
  const data = await getServerSession(authOptions);
  if (!data) redirect("/");

  const userServices = await db.userService.findMany({
    where: {
      userId: data.user.id,
    },
    include: {
      service: true,
    },
  });
  const userServicesIds = userServices.map((userService) => userService.serviceId);
  
  const categoriesWithServices = await db.category.findMany({
    where: {
    },
    include: {
      services: {
        where: {
          NOT: {
            id: {
              in: userServicesIds
            },
          },
        },
      },
    },
  });
  

  return (
    <MaxWidthWrapper>
      <UserServices services={userServices} />
      <AllServices categoriesWithServices={categoriesWithServices}/>
    </MaxWidthWrapper>
  );
};

export default WorkPage;
