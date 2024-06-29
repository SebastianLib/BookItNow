import db from "@/lib/db";
import React from "react";
import  { formatDate } from "date-fns"
import ServiceHours from "./components/ServiceHours";

const ProfileId = async({ params }: { params: { profileId: string } }) => {
    const {profileId} = params;

    const user = await db.user.findUnique({
        where:{
            id: profileId,
        },
        include:{
            userService: true,
            userAvailability: {
                include:{
                    hours: true,
                }
            }
        }
    })
  return <div>
    <ServiceHours userAvailability={user?.userAvailability}/>
  </div>;
};

export default ProfileId;
