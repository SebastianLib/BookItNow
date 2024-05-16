"use client";
import Link from "next/link";
import React, { useState } from "react";
import UserAccountNav from "./UserAccountNav";
import PageLogo from "@/util/PageLogo";
import FormDialog from "./FormDialog";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [type, setType] = useState<null | "signup" | "signin">(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = useSession();
  
  return (
    <div className="py-5 bg-white border-bottom border-s-zinc-200 fixed w-full border-b-2 border-cyan-400 z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <PageLogo />
        </Link>
        {data?.user ? (
          <UserAccountNav user={data.user}/>
        ) : (
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
        )}
        {!isOpen ? (
          <Menu
            onClick={() => setIsOpen(true)}
            className="flex md:hidden w-[30px] h-[30px] text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
          />
        ) : (
          <X
            onClick={() => setIsOpen(false)}
            className="flex md:hidden w-[30px] h-[30px] text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
          />
        )}
      </div>
      <AnimatePresence>{isOpen && <MobileNavbar setType={setType} setIsOpen={setIsOpen} user={data?.user}/>}</AnimatePresence>
    </div>
  );
};

export default Navbar;
