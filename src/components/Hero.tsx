"use client";
import Image from "next/image";
import React from "react";
import { TypingAnimation } from "./TypingAnimation";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="col-span-12 md:col-span-6 text-white grid gap-3">
        <TypingAnimation />
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" text-sm md:text-xl font-normal max-w-xl text-justify"
        >
          Welcome to Lucid Dreams! Turn your wildest dreams into reality with
          our cutting-edge AI technology. Get started now and experience the
          magic of Lucid Dreams!
        </motion.p>
        <Link href={"/playground"}>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-teal-500 text-xl font- uppercase rounded-sm text-black w-2/5 py-2 px-3"
          >
            try for free
          </motion.button>
        </Link>
      </div>
      <div className="col-span-6 hidden md:grid place-items-center place-content-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={"/hero.jpeg"}
            width={500}
            height={500}
            alt="hero"
            className="hidden md:block rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
