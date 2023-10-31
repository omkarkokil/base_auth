"use client";
import React, { FC, useRef, useState } from "react";

export interface Item {
  id: number;
  text: string;
}

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  CalendarClock,
  ChevronDown,
  MapPin,
  Menu,
  MoreHorizontal,
  Trash2,
  UserCog2,
  UserPlus2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { datas } from "@/app/data/itenarydata";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ItineraryModal } from "@/components/Custom/Modal/Sales/Itinerary/ItineraryModal";
import { DateActivity } from "../../Itinerary/page";
import { Item } from "@radix-ui/react-dropdown-menu";
import BasicSelectField from "@/components/Custom/Select/BasicSelectField";
import { RoomBookingProps } from "../../RoomBooking/page";
import RoomBookingModal from "@/components/Custom/Modal/Sales/RoomBooking/RoomBookingModal";

export type ActivityStateProps = string[];
type ItenaryInputProps = {
  RoomTableData: RoomBookingProps[];
  paramsid: string;
};

export const RoomBookingForm: FC<ItenaryInputProps> = ({
  RoomTableData,
  paramsid,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RoomBookingProps[]>(RoomTableData);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      if (res.ok) {
        console.log("success");
      }
      if (!res.ok) {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [formdata, setFormData] = useState<string[]>([]);
  const [openedDialogId, setOpenedDialogId] = useState<string | null>(null);
  const [dropdownValues, setDropdownValues] = useState<Record<string, string>>(
    {}
  );

  const toggleDialog = (day: string) => {
    if (openedDialogId === day) {
      setOpenedDialogId(null); // Close the dialog
    } else {
      setOpenedDialogId(day); // Open the dialog for the specific day
    }
  };

  const columns: ColumnDef<RoomBookingProps>[] = [
    {
      accessorKey: "place",
      header: "Place",
      cell: ({ row }) => (
        <div className="flex flex-col gap-4">
          <div className="capitalize flex gap-4 items-center">
            <CalendarClock className="h-5 w-5 text-primary" />{" "}
            {row.original.place}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "hotel",
      header: () => <div className="text-left">Hotel</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 items-center">
            {row.original.hotel.length <= 0 ? "-" : row.original.hotel}
          </div>
        );
      },
    },
    {
      accessorKey: "guestChoice",
      header: () => <div className="text-left">Guest Choice</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.guestChoice.length <= 0
              ? "-"
              : row.original.guestChoice}
          </div>
        );
      },
    },
    {
      accessorKey: "roomType",
      header: () => <div className="text-left">Room Type</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.guestChoice.length <= 0
              ? "-"
              : row.original.guestChoice}
          </div>
        );
      },
    },
    {
      accessorKey: "plan",
      header: () => <div className="text-left">Plan</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.plan.length <= 0 ? "-" : row.original.plan}
          </div>
        );
      },
    },
    {
      accessorKey: "checkIn",
      header: () => <div className="text-left">Check In</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.checkIn.length <= 0 ? "-" : row.original.checkIn}
          </div>
        );
      },
    },
    {
      accessorKey: "checkOut",
      header: () => <div className="text-left">Check Out</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {!row.original.checkOut ? "-" : row.original.checkOut}
          </div>
        );
      },
    },
    {
      accessorKey: "rooms",
      header: () => <div className="text-left">Rooms</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.rooms.length <= 0 ? "-" : row.original.rooms}
          </div>
        );
      },
    },
    {
      accessorKey: "ex_ADL",
      header: () => <div className="text-left">EX_ADL</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.ex_ADL.length <= 0 ? "-" : row.original.ex_ADL}
          </div>
        );
      },
    },
    {
      accessorKey: "CWB",
      header: () => <div className="text-left">CWB</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.CWB.length <= 0 ? "-" : row.original.CWB}
          </div>
        );
      },
    },
    {
      accessorKey: "CWOB",
      header: () => <div className="text-left">CWOB</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize flex gap-4 ">
            {row.original.CWOB.length <= 0 ? "-" : row.original.CWOB}
          </div>
        );
      },
    },
    {
      accessorKey: "comp_Child",
      header: () => <div className="text-left">Comp_Child</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize text-center flex gap-4 ">
            {row.original.comp_Child.length <= 0
              ? "-"
              : row.original.comp_Child}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only ">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <RoomBookingModal />
          </Dialog>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border mt-8">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <div className="space-x-2">
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading ? (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              "Next step"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
