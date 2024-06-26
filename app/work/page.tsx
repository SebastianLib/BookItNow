import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import UserServices from "./components/UserServices";
import AllServices from "./components/AllServices";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Availability } from "./components/Availability";

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
  const userServicesIds = userServices.map(
    (userService) => userService.serviceId
  );

  const categoriesWithServices = await db.category.findMany({
    where: {},
    include: {
      services: {
        where: {
          NOT: {
            id: {
              in: userServicesIds,
            },
          },
        },
      },
    },
  });

  return (
    <MaxWidthWrapper className="grid lg:grid-cols-2 gap-20 lg:gap-5">
      <div className="space-y-8 flex flex-col items-center lg:items-start">
        <UserServices services={userServices} />
        <AllServices categoriesWithServices={categoriesWithServices} />
      </div>
      <Availability />
    </MaxWidthWrapper>
  );
};

export default WorkPage;
