"use client";
import { cn } from "@/lib/utils";
import SignUpForm from "./form/SignUpForm";
import SignInForm from "./form/SignInForm";
import {motion } from "framer-motion";
import { X } from "lucide-react";
import { authVariants } from "@/constants/variants";
import { useAuthModalStore } from "@/store/AuthModalStore";


const FormDialog = () => {
  const {type, changeType} = useAuthModalStore(state => state)
  const handleClick = (e: any) => {
    if (e.target.classList.contains("bg-black/50")) {
      changeType(null);
    }
  };

  const handleChangeType = () => {
      if (type === "signup") {
        changeType("signin")
      } else {
        changeType("signup")
      }
    };

  return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
        className={cn(
          "items-center justify-center hidden",
          type && "flex fixed inset-0 bg-black/50"
        )}
        onClick={(e) => handleClick(e)}
      >
        <motion.div
          key={type}
          variants={authVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative bg-white py-14 px-16"
        >
          <h2 className="text-center mb-6 text-xl font-semibold">{type === "signup" ? "Sign Up" : "Sign In"}</h2>
          {type === "signup" ? (
            <SignUpForm/>
          ) : (
            <SignInForm/>
          )}
          
          <p className="text-center text-sm text-gray-600 mt-2">
            If you {type === "signup" && "don't"} have an account, please&nbsp;
            <span
              className="font-bold cursor-pointer underline underline-offset-2"
              onClick={handleChangeType}
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </span>
          </p>
          <div
            className="absolute top-4 right-4 "
            onClick={() => changeType(null)}
          >
            <X className="hover:text-black/80 transition-colors cursor-pointer"/>
          </div>
        </motion.div>
      </motion.div>
  );
};

export default FormDialog;
