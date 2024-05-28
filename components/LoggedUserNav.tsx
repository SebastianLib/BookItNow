"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { creatorLinks } from "@/constants/creatorLinks";
import { userLinks } from "@/constants/userLinks";

interface LoggedUserNavProps {
  user: {
    email?: string | null;
    id: string;
    image?: string | null;
    isCreator: boolean;
  };
}

const LoggedUserNav = ({ user }: LoggedUserNavProps) => {
  return (
    <div className="hidden md:flex items-center gap-10">
      {user.isCreator ? (
        <>
          {creatorLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-xl text-cyan-500 hover:text-cyan-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </>
      ) : (
        <>
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-xl text-cyan-500 hover:text-cyan-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </>
      )}
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`,
          })
        }
      >
        Sign out
      </Button>
      <Link href="/profile">
        <Image
          src={user.image || "/userImg.png"}
          alt="user image"
          width={50}
          height={50}
          className="rounded-full overflow-hidden cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default LoggedUserNav;
