import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import SalesForm from "../Components/Form1/SalesForm";
import { Iternairyform } from "../Components/Form2/Iternairyform";

const Itinerary = () => {
  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/sales/1"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Itinerary or Day Plans Form
          </h1>
        </div>
      </div>
      <div className="px-8 ">
        <Iternairyform />
      </div>
    </>
  );
};

export default Itinerary;
