import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import UserProfile from './components/UserProfile';
import  db  from '@/lib/db';

const ProfilePage = async() => {
    const data = await getServerSession(authOptions);
    if (!data) redirect("/");
    const user = await db.user.findUnique({
      where: {
        id: data.user.id
      }
    })
    if (!user) redirect("/");
  
    const {password, ...rest} = user
    
  return (
    <MaxWidthWrapper>
        <UserProfile user={rest}/>
    </MaxWidthWrapper>
  )
}

export default ProfilePage