import { mobileNavbarLi, mobileNavbarUl } from "@/constants/variants";
import { motion } from "framer-motion";

interface MobileNavbarProps {
  setType: React.Dispatch<React.SetStateAction<null | "signup" | "signin">>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbar = ({ setType, setIsOpen }: MobileNavbarProps) => {
  const handleCLick = (type: "signup" | "signin") => {
    setIsOpen(false),
      setTimeout(() => {
        setType(type);
      }, 500);
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "100%" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center md:hidden fixed w-full top-16 overflow-hidden bg-red-300"
    >
      <motion.ul
        initial="hidden"
        animate="show"
        variants={mobileNavbarUl}
        className="flex flex-col gap-8 mt-20 text-2xl text-center font-bold"
      >
        <motion.li
          onClick={() => handleCLick("signup")}
          className="text-2xl font-semibold text-fuchsia-500  cursor-pointer"
          variants={mobileNavbarLi}
        >
          Sign up for free!
        </motion.li>
        <motion.li
          onClick={() => handleCLick("signin")}
          className="text-2xl font-semibold text-cyan-500 cursor-pointer"
          variants={mobileNavbarLi}
        >
          Sign in
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default MobileNavbar;
