"use client";
import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
const page = () => {
  return (
    <>
    
      <DeskNav />
    </>
  );
};

export default page;
