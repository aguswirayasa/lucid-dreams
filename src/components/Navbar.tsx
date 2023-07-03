"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <NavigationMenu.Root
      className="bg-gray-950 text-teal-500 flex justify-between items-center px-10 py-2"
      orientation="horizontal"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="Lucid Dreams"
              width={200}
              height={100}
            />
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.List className="flex justify-between items-center gap-6">
        <NavigationMenu.Item>
          <Link href={"/showcase"}>
            <p className="text-lg font-bold hover:text-white hover:border-b-2 border-teal-500 hover:scale-105 transition-all duration-200  ease-in-out">
              Showcase
            </p>
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link href={"/playground"}>
            <p className="text-lg font-bold hover:text-white hover:border-b-2 border-teal-500 hover:scale-105 transition-all duration-200  ease-in-out">
              Playground
            </p>
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;
