import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { StageTable } from "./Components/StageTable";

const page = () => {
  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/sales"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Sales Requisition Form Stages
          </h1>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-50 h-[60vh]">
        <StageTable />
      </div>
    </>
  );
};

export default page;
