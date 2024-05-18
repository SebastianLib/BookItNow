import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import UserServices from "./_components/UserServices";
import AllServices from "./_components/AllServices";

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
  const userServicesIds = userServices.map((userService) => userService.id);

  // const allServices = await db.service.findMany({
  //     where: {
  //         NOT: {
  //             id: {
  //                 in: userServicesIds
  //             }
  //         }
  //     }
  // });
  const categoriesWithServices = await db.category.findMany({
    where: {},
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
    <section>
      <UserServices services={userServices} />
      <AllServices categoriesWithServices={categoriesWithServices}/>
    </section>
  );
};

export default WorkPage;
