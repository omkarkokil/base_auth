import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { authOptions } from "@/services/Auth/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const admin = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    redirect("/home");
  }

  return (
    <>
      <DeskNav />
      Welcome to admin panel
    </>
  );
};

export default admin;
