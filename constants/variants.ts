export const authVariants = {
    initial: { y: -500, opacity: 0 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.7,
      },
    },
    exit: {
      y: -500,
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  export const mobileNavbarUl = {
    show: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  export const mobileNavbarLi = {
    hidden: { opacity: 0, x: 400 },
    show: { opacity: 1, x: 0 },
  };
