import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { StageFormProps, StageTable } from "./Components/StageTable";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { GuestInfo } from "@prisma/client";

export interface IParams {
  salesid: string;
}

const page = async ({ params }: { params: IParams }) => {
  const guestUser = await getSingleGuest(params.salesid);
  const data: StageFormProps[] = [
    {
      id: params.salesid,
      sr: 1,
      status: guestUser && guestUser?.guestInfo?.length <= 0 ? false : true,
      Stages: "Guest info Form",
      href: `/sales/${params.salesid}/GuestInfo`,
    },
    {
      id: params.salesid,
      sr: 2,
      status: guestUser && guestUser.itinerary.length <= 0 ? false : true,
      Stages: " Itinerary or Day Plans Form",
      href: `/sales/${params.salesid}/Itinerary`,
    },
    {
      id: params.salesid,
      sr: 3,
      status: false,
      Stages: " Room Booking Form",
      href: `/sales/${params.salesid}/RoomBooking`,
    },
    {
      id: params.salesid,
      sr: 4,
      status: false,
      Stages: "Cruise Requisition Form",
      href: `/sales/${params.salesid}/Cruise`,
    },
    {
      id: params.salesid,
      sr: 5,
      status: false,
      Stages: "Vehicle Requisition Form",
      href: `/sales/${params.salesid}/Vehical`,
    },
    {
      id: params.salesid,
      sr: 6,
      status: false,
      Stages: "Complimentary / Discounted Activities Form",
      href: `/sales/${params.salesid}/DiscountedActivty`,
    },
    {
      id: params.salesid,
      sr: 7,
      status: false,
      Stages: "Flight Details Form",
      href: `/sales/${params.salesid}/FilghtDetails`,
    },
    {
      id: params.salesid,
      sr: 8,
      status: false,
      Stages: "Fiber Boat Requisition Form",
      href: `/sales/${params.salesid}/FiberBoat`,
    },
  ];

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
        <div className="p-4 w-max px-8  rounded-md border-[.5px] border-gray-300">
          <span className="font-bold">Name of guest :</span> {guestUser?.name}
        </div>
        <StageTable data={data} />
      </div>
    </>
  );
};

export default page;
