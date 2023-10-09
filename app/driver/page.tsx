import DeskNav from "@/components/Custom/Navbar/DeskNav";
import React from "react";
import { DriverTable } from "./components/DriverTable";

const page = () => {
  return (
    <>
      <DeskNav />
      <div className="flex items-center w-full justify-center">
        <div className="w-full px-10">
          <DriverTable />
        </div>
      </div>
    </>
  );
};

export default page;
