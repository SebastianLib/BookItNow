import { ExtendedHours } from "@/app/profile/[profileId]/components/ServiceHours";
import { UserAvailability } from "@prisma/client";
import { formatDate } from "date-fns";

interface useGetAvailableHoursProps {
    userAvailability: (UserAvailability & { hours: ExtendedHours[] })[] | undefined;
    serviceTime: number;
}

export const useGetAvailableHours = ({ userAvailability, serviceTime }: useGetAvailableHoursProps) => {
    
    const currentDate = userAvailability?.find(
        (day) => day.date === formatDate(new Date(), "yyyy-MM-dd")
      );
      
    currentDate?.hours
    .sort((a, b) => a.time - b.time)
    .forEach((hour, index) => {
      let show = true;
      for (let i = 1; i <= serviceTime; i++) {
        if (currentDate.hours[index + i]?.time !== hour.time + i * 15) {
          show = false;
          break;
        }
      }
      currentDate.hours[index].show = show;
    });
    return currentDate
};