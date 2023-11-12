"use client";

import { format } from "date-fns";
import * as React from "react";
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
  AlertCircle,
  ArrowUpDown,
  Award,
  BadgeDollarSign,
  Calendar,
  CarTaxiFront,
  ChevronDown,
  MoreHorizontal,
  Palmtree,
  Plane,
  Sailboat,
  Ship,
  Timer,
  TramFront,
  Trash2,
  UserCircle,
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

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VehicalFormProps } from "../../Vehical/page";
import VehicalModal from "@/components/Custom/Modal/Sales/Vehical/VehicalModal";
import DiscountedModal from "@/components/Custom/Modal/Sales/Discounted/DiscountedModal";
import FlightModal from "@/components/Custom/Modal/Sales/Flight/FlightModal";
import FiberBoatModal from "@/components/Custom/Modal/Sales/FiberBoat/FiberBoatModal";

interface CruiseProps {
  id: string;
}

const FiberBoatForm: React.FC<CruiseProps> = ({ id }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<VehicalFormProps[]>([]);
  //   console.log(data);

  const columns: ColumnDef<VehicalFormProps>[] = [
    {
      accessorKey: "arrival",
      header: () => <div className="text-left">Activity</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {format(new Date(row.getValue("arrival")), "PP")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "time",
      header: () => <div className="text-left">Flight Time</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("time")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "stay",
      header: () => <div className="text-left">Place</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("stay")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "service",
      header: () => <div className="text-left">Service</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("service")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "boattype",
      header: () => <div className="text-left">Boat Type</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("boattype")}
            </div>
          </div>
        );
      },
    },
  ];

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const values = {
        ...data,
        guestId: id,
      };

      const res = await fetch("/api/guest/fiberboat", {
        method: "POST",
        body:
          data.length > 0
            ? JSON.stringify({
                ...data,
              })
            : JSON.stringify({
                values,
              }),
      });

      if (res.status === 404) {
        alert("All fields are mandatory");
      }

      if (res.ok) {
        router.push(`/sales`);
        alert("Sales Requistion is now completed");
      }
      if (!res.ok) {
        console.log("error");
        alert("Error from backend");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <div className="flex w-full justify-end items-center py-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="bg-primary gap-2 hover:bg-primary">
              <Sailboat /> Fiber boat form
            </Button>
          </DialogTrigger>
          <FiberBoatModal
            open={open}
            id={id}
            setOpen={setOpen}
            setData={setData}
          />
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {data.length > 0 &&
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="bg-slate-100" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="!text-[#333]">
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="!py-3 " key={cell.id}>
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
                  className="h-24 p-0 text-center"
                >
                  <div className="flex bg-[#dcfce7] rounded-md p-8  shadow-md   gap-4 w-full ">
                    <Sailboat className="h-12 w-12 text-success" />
                    <div className="flex flex-col items-start">
                      <h1 className="text-2xl pb-2 font-semibold text-success">
                        Create Fiber boat
                      </h1>
                      <p className="font-medium text-left text-sm  text-success">
                        Please create Flight details first by using add new
                        Flight details requisition button for preview if no
                        Flight details also click next step to got to next one
                      </p>
                    </div>
                  </div>
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
              "Complete sales requisition"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiberBoatForm;
