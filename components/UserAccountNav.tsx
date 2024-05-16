"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserAccountNavProps{
  user:{
    username:string
    email?: string | null,
    id: string;
    image?: string | null
  }
}

const UserAccountNav = ({user}:UserAccountNavProps) => {
  return (
    <div className="hidden md:flex items-center gap-10">
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

export default UserAccountNav;
