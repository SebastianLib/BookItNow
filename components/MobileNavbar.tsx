import { creatorLinks } from "@/constants/creatorLinks";
import { logoutUserLinks } from "@/constants/logoutUserLinks";
import { userLinks } from "@/constants/userLinks";
import { mobileNavbarLi, mobileNavbarUl } from "@/constants/variants";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface MobileNavbarProps {
  user?: {
    email?: string | null;
    id: string;
    image?: string | null;
    isCreator: boolean;
  };
}

const MobileNavbar = ({  user }: MobileNavbarProps) => {
  const {onClose, isOpen, changeType} = useAuthModalStore(state => state)

  const handleCLick = (type: "signup" | "signin") => {
    onClose()
      setTimeout(() => {
        changeType(type);
      }, 500);
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "50%" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center md:hidden fixed w-full top-[72px] overflow-hidden bg-white border-b-2 border-cyan-500"
    >
      <motion.ul
        initial="hidden"
        animate="show"
        variants={mobileNavbarUl}
        className="flex flex-col gap-8 mt-20 text-2xl text-center font-bold"
      >
        {user ? (
          <>
            <motion.li
              className="text-2xl font-semibold text-cyan-500  cursor-pointer"
              variants={mobileNavbarLi}
            >
              <Link href="profile">My Profie</Link>
            </motion.li>
            <motion.li
              className="text-2xl font-semibold text-cyan-500  cursor-pointer"
              variants={mobileNavbarLi}
            >
              <Link
                href="profile"
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/`,
                  })
                }
              >
                Sign Out
              </Link>
            </motion.li>
            {user.isCreator ? (
              <>
                {creatorLinks.map((link) => (
                  <motion.li
                  key={link.href}
                    className="text-2xl font-semibold text-cyan-500  cursor-pointer"
                    variants={mobileNavbarLi}
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </>
            ) : (
              <>
                {userLinks.map((link) => (
                  <motion.li
                  key={link.href}
                    className="text-2xl font-semibold text-cyan-500  cursor-pointer"
                    variants={mobileNavbarLi}
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {logoutUserLinks.map((link) => (
              <motion.li
                key={link.type}
                onClick={() => handleCLick(link.type)}
                className="text-2xl font-semibold text-cyan-500  cursor-pointer"
                variants={mobileNavbarLi}
              >
                {link.label}
              </motion.li>
            ))}
          </>
        )}
      </motion.ul>
    </motion.div>
  );
};

export default MobileNavbar;
