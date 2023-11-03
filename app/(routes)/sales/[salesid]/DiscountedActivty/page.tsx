import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../Itinerary/page";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { Itinerary } from "@prisma/client";
import { RoomBookingForm } from "../Components/Form3/RoomBookingForm";
import CruiseForm from "../Components/Form4/CruiseForm";
import DiscountedForm from "../Components/Form6/DiscountForm";

export type CruiseFormProps = {
  seat_class: string;
  PNR: string;
  time: string;
  route: string;
  cruise: string;
  journeyDate: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.salesid);
  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/sales/${props.params.salesid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Complimentary / Discounted Activities Section
          </h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <DiscountedForm id={props.params.salesid} />
        {/* <CruiseForm id={props.params.salesid} /> */}
      </div>
    </>
  );
};

export default page;
