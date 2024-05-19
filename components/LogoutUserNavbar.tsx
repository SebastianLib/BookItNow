import { AnimatePresence } from 'framer-motion'
import React from 'react'
import FormDialog from './FormDialog'
import { useAuthModalStore } from '@/store/AuthModalStore';

const LogoutUserNavbar = () => {
  const {type, changeType} = useAuthModalStore(state => state)
  return (
    <>
    <div className="hidden md:flex gap-10">
    <p
      onClick={()=>changeType("signup")}
      className="text-xl font-semibold text-fuchsia-500 hover:text-fuchsia-700 cursor-pointer transition"
    >
      Sign up for free!
    </p>
    <p
      onClick={() => changeType("signin")}
      className="text-xl font-semibold text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
    >
      Sign in
    </p>

  </div>
  <AnimatePresence>
    {type ? <FormDialog/> : null}
  </AnimatePresence>
  </>
  )
}

export default LogoutUserNavbar