import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, UserService } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SearchWorkersProps {
  workers: (UserService & { user: User })[];
}

const SearchWorkers = ({ workers }: SearchWorkersProps) => {
  return (
    <div className="flex flex-col gap-10 col-span-2 h-[4000px]">
      {workers.map((worker) => (
        <div
          key={worker.id}
          className="flex flex-col md:flex-row items-center justify-between gap-5 bg-cyan-50 hover:bg-cyan-100 transition cursor-pointer p-4"
        >
          <div className="flex items-center gap-4 lg:gap-10">
            <div className="relative w-20 h-20 lg:w-32 lg:h-32 overflow-hidden rounded-full">
              <Image
                src={worker.user.image || "./userImg.png"}
                fill
                alt="user image"
                className="object-cover rounded-full hover:scale-110 transition"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl">{worker.user.name}</h2>
              <h2 className="font-bold text-lg text-gray-400">
                {worker.user.email}
              </h2>
            </div>
          </div>
          <Link
            href={`/profile/${worker.user.id}`}
            className={cn(
              `text-lg lg:text-xl p-6 lg:p-10 w-full md:w-fit`,
              buttonVariants({ variant: "default" })
            )}
          >
            Choose a date
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchWorkers;
