import DeskNav from "@/components/Custom/Navbar/DeskNav";
import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { getGuestList } from "@/actions/getGuestAction";
import SalesTable from "@/components/Custom/Table/SalesTable";
import { Guest } from "@prisma/client";
import { getSingleGuest } from "@/actions/getSingleGuest";

const page = async () => {
  const guestList = await getGuestList();

  const GetGuest = async (id: string) => {
    "use server";
    const getGuest = await getSingleGuest(id);
    return getGuest;
  };

  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/home"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Sales Requisition Section</h1>
        </div>
        {/* <p className="mt-2 px-8  text-sm">
          This is the sales requisition form from sales team
        </p> */}
      </div>
      <div className="px-8 py-4 h-[84vh] bg-gray-50">
        <SalesTable guestList={guestList as Guest[]} Guest={GetGuest} />
      </div>
    </>
  );
};

export default page;
