import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../Itinerary/page";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { Itinerary } from "@prisma/client";
import { RoomBookingForm } from "../Components/Form3/RoomBookingForm";

export type RoomBookingProps = {
  place?: string;
  hotel: string[];
  guestChoice: string;
  choosedhotel: string;
  roomType: string;
  plan: string;
  checkIn: string;
  checkOut?: string;
  rooms: string;
  Ex_ADL: string;
  CWB: string;
  CWOB: string;
  comp_Child: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.salesid);
  //   const stayValues = guestUser?.itinerary.map((entry) => entry.stay);
  //   const dataArray: RoomBookingProps[] = Array.from(
  //     guestUser?.itinerary!,
  //     (entry) => ({
  //       place: entry.stay,
  //       hotel: "",
  //       guestChoice: "",
  //       roomType: "",
  //       plan: "",
  //       checkIn: "",
  //       checkOut: "",
  //       rooms: "",
  //       Ex_ADL: "",
  //       CWB: "",
  //       CWOB: "",
  //       comp_Child: "",
  //     })
  //   );

  const processData = () => {
    let processedData = [];
    let currentRow = null;

    for (let i = 0; i < guestUser!?.itinerary.length; i++) {
      const item = guestUser!.itinerary[i];

      if (currentRow && currentRow.place === item.stay) {
        currentRow.checkOut = item.date;
      } else {
        if (currentRow) {
          processedData.push(currentRow);
        }
        currentRow = {
          checkIn: item.date,
          place: item.stay,
          hotel: [],
          guestChoice: "",
          choosedhotel: "",
          roomType: "",
          plan: "",
          rooms: "",
          Ex_ADL: "",
          CWB: "",
          CWOB: "",
          comp_Child: "",
          checkOut: item.date,
          guestId: props.params.salesid,
        };
      }

      // If 'stay' value changes, set the 'out' date to the next date
      if (
        i < guestUser!?.itinerary.length - 1 &&
        guestUser!?.itinerary[i + 1].stay !== item.stay
      ) {
        currentRow.checkOut = guestUser!?.itinerary[i + 1].date;
      }

      // Push the last item
      if (i === guestUser?.itinerary.length! - 1) {
        processedData.push(currentRow);
      }
    }

    return processedData;
  };

  const dataArray: RoomBookingProps[] = processData();

  return (
    <>
      <DeskNav />
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/sales/${props.params.salesid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Room Booking Section</h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <RoomBookingForm
          paramsid={props.params.salesid}
          RoomTableData={dataArray}
        />
      </div>
    </>
  );
};

export default page;
