"use client";

import { FC, useEffect } from "react";

interface InputProps {
  label: string;
  name: string;
  form?: UseFormReturn | any;
}

import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateActivity } from "@/app/(routes)/sales/[salesid]/Itinerary/page";

type StateType = Record<string, string>;
type SetStateType = React.Dispatch<React.SetStateAction<StateType>>;

interface SelectProps {
  state: StateType;
  addStayForDay: (day: string, activity: string) => void;
  setState: SetStateType;
  day: string;
  data: DateActivity[];
}

const BasicSelectField: FC<SelectProps> = ({
  state,
  setState,
  addStayForDay,
  day,
  data,
}) => {
  const handleDropdownChange = (selectedDay: string, newValue: string) => {
    addStayForDay(day, newValue);
    setState((prevState) => ({
      ...prevState,
      [selectedDay]: newValue,
    }));
  };
  return (
    <>
      <Select
        value={state[day] !== "" ? state[day] : "none"}
        onValueChange={(data) => {
          handleDropdownChange(day, data);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stay" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PB">PB</SelectItem>
          <SelectItem value="HL">HL</SelectItem>
          <SelectItem value="NL">NL</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default BasicSelectField;
