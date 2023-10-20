import DeskNav from "@/components/Custom/Navbar/DeskNav";
import React from "react";
import SalesForm from "./Components/SalesForm";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/home"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Sales Requisition Form</h1>
        </div>
        {/* <p className="mt-2 px-8  text-sm">
          This is the sales requisition form from sales team
        </p> */}
      </div>
      <div className="px-8 py-4 bg-gray-50">
        <SalesForm />
      </div>
    </>
  );
};

export default page;
