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
import { FC, SetStateAction, useState } from "react";
import SearchSelect from "@/components/Custom/Select/SearchSelect";

const formSchema = z.object({
  rooms: z.string().min(1, {
    message: "Room field is mandatory.",
  }),
  roomType: z.string().min(1, {
    message: "Room Type field is mandatory.",
  }),
  plan: z.string().min(1, {
    message: "Room Type field is mandatory.",
  }),
  Ex_ADL: z.string().min(1, {
    message: "Ex_ADL field is mandatory.",
  }),
  CWB: z.string().min(1, {
    message: "Ex_ADL field is mandatory.",
  }),
  CWOB: z.string().min(1, {
    message: "Ex_ADL field is mandatory.",
  }),
  comp_Child: z.string().min(1, {
    message: "Ex_ADL field is mandatory.",
  }),
});

import Select from "react-select";
import { RoomBookingProps } from "@/app/(routes)/sales/[salesid]/RoomBooking/page";

const options = [
  { value: "hotel1", label: "Hotel1" },
  { value: "hotel2", label: "hotel2" },
  { value: "hotel3", label: "hotel3" },
];

type RoomBookingInputProps = {
  id: string;
  addRoomBookingRow: (day: string, rowData: any) => void;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  place: string | undefined;
};

const RoomBookingModal: FC<RoomBookingInputProps> = ({
  id,
  addRoomBookingRow,
  setOpen,
  place,
}) => {
  const [guestOpen, setGuestOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [guestChoice, setGuestChoice] = useState("");
  const guestData: string[] = ["Particular", "Preffred", "Optional"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: "",
      plan: "",
      rooms: "",
      Ex_ADL: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (hotels.length <= 0 || guestChoice.length <= 0) {
      console.log("not");

      return false;
    }

    try {
      addRoomBookingRow(id, {
        ...values,
        hotel: hotels,
        guestChoice: guestChoice,
      });
      console.log(id);

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectChange = (selectedOption: any) => {
    const extractedValues = selectedOption.map((item: any) => item.value);
    setHotels(extractedValues);
  };

  return (
    <DialogContent className="bg-white overflow-y-auto max-h-[90vh] height-[80vh] sm:max-w-[600px]">
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
                {place}
              </p>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium " htmlFor="hotel">
                Select Hotels
              </label>
              <div className="mt-2">
                <Select
                  className="placeholder:text-md text-sm outline-none border-none"
                  id="hotel"
                  options={options}
                  isMulti
                  onChange={handleSelectChange}
                />
              </div>
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
                name="roomType"
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
            <div className="w-full">
              <InputField
                form={form}
                name="rooms"
                label="Rooms..."
                placeholder="Enter Room..."
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="Ex_ADL"
                label="Ex-ADL..."
                placeholder="Enter Ex-ADL..."
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="CWB"
                label="CWB..."
                placeholder="Enter CWB..."
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="CWOB"
                label="CWOB..."
                placeholder="Enter CWOB..."
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="comp_Child"
                label="comp_child..."
                placeholder="Enter comp_child..."
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
