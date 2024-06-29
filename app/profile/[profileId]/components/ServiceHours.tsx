"use client";
import { useGenerateTime } from "@/hooks/useGenerateTime";
import { useGetAvailableHours } from "@/hooks/useGetAvailableHours";
import { Hours, UserAvailability } from "@prisma/client";
import { useState } from "react";

export interface ExtendedHours extends Hours {
    show?: boolean;
  }
  
export interface ServiceHoursTypes {
    userAvailability: (UserAvailability & { hours: ExtendedHours[] })[] | undefined;
}

const ServiceHours = ({ userAvailability }: ServiceHoursTypes) => {
  const [serviceTime, setServiceTime] = useState(3);
  const currentDate = useGetAvailableHours({userAvailability, serviceTime})
  
  return (
    <div>
      <h2>Available Hours</h2>
      {currentDate?.hours
        .filter((hour) => hour.show === true)
        .map((hour, index) => (
          <div key={index}>{useGenerateTime(hour.time)}</div>
        ))}
    </div>
  );
};

export default ServiceHours;
