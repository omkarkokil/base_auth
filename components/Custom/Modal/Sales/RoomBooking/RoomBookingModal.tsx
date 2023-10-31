"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputField from "@/components/Custom/Input/InputField";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import SearchSelect from "@/components/Custom/Select/SearchSelect";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name field is mandatory.",
  }),
  roomtype: z.string().min(1, {
    message: "Room Type field is mandatory.",
  }),
  plan: z.string().min(1, {
    message: "Room Type field is mandatory.",
  }),
});

const RoomBookingModal = () => {
  const [hotels, setHotels] = useState("");
  const [guestChoice, setGuestChoice] = useState("");
  const hotelData: string[] = ["A", "B", "C", "D"];
  const guestData: string[] = ["Particular", "Preffred", "Optional"];
  // const hotelData: string[] = ["A", "B", "C", "D"];
  const [hotelOpen, setHotelOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      roomtype: "",
      plan: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("hii");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DialogContent className=" bg-white sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Room Booking</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6  w-full"
        >
          <div className="flex w-full justify-start items-start flex-col gap-4">
            <div className="w-full">
              <h1 className="my-2 text-sm font-semibold">Stay</h1>
              <p className="text-xs w-[20%] py-2 px-2 border-[.5px] border-gray-300 rounded-md ">
                PB
              </p>
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="name"
                label="Guest Name"
                placeholder="Enter guest name"
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <SearchSelect
                data={hotelData}
                open={hotelOpen}
                setOpen={setHotelOpen}
                value={hotels}
                setValue={setHotels}
                label="hotels"
                placeholder={"select hotels..."}
              />
            </div>
            <div className="w-full">
              <SearchSelect
                data={guestData}
                open={guestOpen}
                setOpen={setGuestOpen}
                value={guestChoice}
                setValue={setGuestChoice}
                label="Guest choice"
                placeholder={"select guestchoice..."}
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="roomtype"
                label="Room Type"
                placeholder="Enter Room Type"
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="plan"
                label="Plan"
                placeholder="Enter plan"
                desc=" This is your public display guest."
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-primary" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default RoomBookingModal;
