import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../Itinerary/page";
import { getSingleGuest } from "@/actions/getSingleGuest";

import VehicalForm from "../Components/Form5/VehicalForm";
import FlightForm from "../Components/Form7/FilghtForm";

export type VehicalFormProps = {
  place: string;
  service: string;
  ac_nonac: string;
  vehical_type: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.salesid);
  //   console.log(guestUser);

  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/sales/${props.params.salesid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Flight Details Section</h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        {/* <VehicalForm id={props.params.salesid} /> */}
        <FlightForm id={props.params.salesid} />
      </div>
    </>
  );
};

export default page;
