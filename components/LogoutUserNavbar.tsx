import { AnimatePresence } from 'framer-motion'
import React from 'react'
import FormDialog from './FormDialog'
import { creatorLinks } from '@/constants/creatorLinks';
import Link from 'next/link';
import { userLinks } from '@/constants/userLinks';

interface LogoutUserNavbar {
type: "signup" | "signin" | null;
  setType: React.Dispatch<React.SetStateAction<null | "signup" | "signin">>;
}

const LogoutUserNavbar = ({type, setType}:LogoutUserNavbar) => {
  return (
    <>
    <div className="hidden md:flex gap-10">
    <p
      onClick={() => setType("signup")}
      className="text-xl font-semibold text-fuchsia-500 hover:text-fuchsia-700 cursor-pointer transition"
    >
      Sign up for free!
    </p>
    <p
      onClick={() => setType("signin")}
      className="text-xl font-semibold text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
    >
      Sign in
    </p>

  </div>
  <AnimatePresence>
    {type ? <FormDialog type={type} setType={setType} /> : null}
  </AnimatePresence>
  </>
  )
}

export default LogoutUserNavbar