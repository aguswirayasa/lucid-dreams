"use client";
import { motion, useCycle } from "framer-motion";

export const TypingAnimation = () => {
  const headingText = "Transform Dreams into Reality with Lucid Dreams";
  const typingSpeed = 50; // milliseconds
  const backspaceSpeed = 30; // milliseconds
  const delayAfterTyping = 300; // milliseconds
  const delayBetweenCycles = 1000; // milliseconds

  const [cycle, setCycle] = useCycle("typing", "backspace");

  const headingVariants = {
    hidden: {
      opacity: 0,
    },
    typing: {
      opacity: 1,
      transition: {
        delay: delayAfterTyping / 1000,
        staggerChildren: typingSpeed / 1000,
        when: "beforeChildren",
      },
    },
    backspace: {
      opacity: 1,
      transition: {
        delay: delayAfterTyping / 1000,
        staggerChildren: backspaceSpeed / 1000,
        when: "beforeChildren",
      },
    },
  };

  const letterVariants = {
    typing: { opacity: 1 },
    backspace: { opacity: 0 },
  };

  const backspaceVariants = {
    typing: { opacity: 0 },
    backspace: { opacity: 1 },
  };

  const onAnimationComplete = () => {
    setTimeout(() => {
      setCycle();
    }, delayBetweenCycles);
  };

  return (
    <h1 className="text-xl md:text-4xl font-bold">
      <motion.span
        variants={headingVariants}
        initial="hidden"
        animate={cycle}
        onAnimationComplete={onAnimationComplete}
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={char === " " ? backspaceVariants : letterVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
};
