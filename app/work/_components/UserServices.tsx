import { UserService } from '@prisma/client'
import React from 'react'

interface UserServicesProps{
    services:UserService[]
}

const UserServices = ({services}:UserServicesProps) => {
  return (
    <div>UserServices</div>
  )
}

export default UserServices