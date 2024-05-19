"use client";
import Link from "next/link";
import React, { useState } from "react";
import LoggedUserNav from "./LoggedUserNav";
import PageLogo from "@/util/PageLogo";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import LogoutUserNavbar from "./LogoutUserNavbar";
import { Skeleton } from "./ui/skeleton";
import { useAuthModalStore } from "@/store/AuthModalStore";

const Navbar = () => {
  const {onClose, onOpen, isOpen, type, changeType} = useAuthModalStore(state => state)

  const { data, status } = useSession();

  return (
    <div className="py-5 bg-white border-bottom border-s-zinc-200 fixed w-full border-b-2 border-cyan-400 z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <PageLogo />
        </Link>
        {status === "loading" ? (
            <div className="flex gap-2 items-center">
              <Skeleton className="bg-cyan-500/10 h-8 w-[150px]" />
              <Skeleton className="bg-cyan-500/10 h-8 w-[150px]" />
            <Skeleton className="bg-cyan-500/10 h-12 w-12 rounded-full" />
            </div>
        ) : data?.user ? (
          <LoggedUserNav user={data.user} />
        ) : (
          <LogoutUserNavbar/>
        )}
        {!isOpen ? (
          <Menu
            onClick={onOpen}
            className="flex md:hidden w-[30px] h-[30px] text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
          />
        ) : (
          <X
            onClick={onClose}
            className="flex md:hidden w-[30px] h-[30px] text-cyan-500 hover:text-cyan-700 cursor-pointer transition"
          />
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <MobileNavbar
            user={data?.user}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
