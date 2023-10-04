import { authOptions } from "@/services/Auth/authOption";
import { getServerSession } from "next-auth";
import React from "react";

const admin = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    throw new Error("This page can only access by admin");
  }

  return <div>Welcome to admin panel</div>;
};

export default admin;
