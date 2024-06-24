"use client";
import { Button } from "@/components/ui/button";
import { useGenerateMinutes } from "@/hooks/useGenerateMinutes";
import { Service, UserService } from "@prisma/client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUpdateUserServicesMutation } from "@/actions/useUpdateUserServices";

interface UserServicesProps {
  services: (UserService & { service: Service })[];
}

const UserServices = ({ services }: UserServicesProps) => {
  const timesArray = useGenerateMinutes().slice(1);
  const mutation = useUpdateUserServicesMutation();

  return (
    <div className="space-y-10 max-w-[400px] w-full">
      <h2 className="text-3xl font-bold text-center md:text-left">Your Services</h2>
      {services.map((service: UserService & { service: Service }) => {
        return (
          <div
            key={service.id}
            className="flex flex-wrap flex-col items-center md:flex-row justify-between "
          >
            <h3 className="text-xl font-semibold">{service.service.name}</h3>
            <Select
              onValueChange={(e) => {
                mutation.mutate({ id: service.id, value: parseInt(e) });
              }}
            >
              <SelectTrigger className="border-cyan-500 max-w-[150px] border-2 text-cyan-500 focus:border-cyan-700 focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="30 minutes" />
              </SelectTrigger>
              <SelectContent className="border-cyan-500 border-2">
                {timesArray.map((time, index) => {
                  return (
                    <SelectItem
                      key={`${time.value}-${index}`}
                      value={String(time.value)}
                      className={cn(
                        service.minutes === time.value && "text-cyan-500"
                      )}
                    >
                      {time.value} minutes
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default UserServices;
