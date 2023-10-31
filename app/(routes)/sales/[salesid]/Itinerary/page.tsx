import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import SalesForm from "../Components/Form1/SalesForm";
import { Iternairyform } from "../Components/Form2/Iternairyform";
import { IParams } from "../page";
import { useRouter, useSearchParams } from "next/navigation";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { GuestInfo } from "@prisma/client";
import { format } from "date-fns";

export type Props = {
  params: {
    salesid: string;
  };
};

export type DateActivity = {
  day: string;
  date: string;
  activity: string[];
  stay: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.salesid);

  const generateDateActivityArray = (
    startDate: string,
    endDate: string
  ): DateActivity[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const dataArray: any = Array.from({ length: daysDiff }, (_, index) => ({
      day: `Day ${index + 1}`,
      date: new Date(
        start.getTime() + index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      activity: [],
      stay: `data ${index + 1}`,
      guestId: props.params.salesid,
    }));

    return dataArray;
  };

  let [data]: any = guestUser?.guestInfo || [];

  const startDate = data && format(new Date(data.dateOfArrival), "PP");
  const endDate = data && format(new Date(data.dateOfDeparture), "PP");
  let dateActivities = generateDateActivityArray(startDate, endDate);

  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/sales/${props.params.salesid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Itinerary or Day Plans Form
          </h1>
        </div>
      </div>
      <div className="px-8 ">
        <Iternairyform
          paramsid={props.params.salesid}
          dateData={dateActivities}
        />
      </div>
    </>
  );
};

export default page;
