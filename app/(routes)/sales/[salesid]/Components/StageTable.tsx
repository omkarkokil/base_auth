"use client";

import { data } from "@/app/data/StageData";
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
  ArrowUpDown,
  Calendar,
  CalendarCheck2,
  CarTaxiFront,
  ChevronDown,
  LogIn,
  MoreHorizontal,
  Palmtree,
  Timer,
  TramFront,
  Trash2,
  UserCircle,
  UserCog2,
  UserPlus2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DriverModal } from "@/components/Custom/Modal/DriverModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

export type StageFormProps = {
  id: string;
  sr: number;
  Stages: string;
  status: boolean;
  href: string;
};

export const columns: ColumnDef<StageFormProps>[] = [
  {
    accessorKey: "sr",
    header: () => <div className="text-left">Sr No.</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  gap-2">
          <div className="text-center font-medium">{row.getValue("sr")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "Stages",
    header: () => <div className="text-left">Activity Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  gap-2">
          <CalendarCheck2 className="h-4 text-primary" />
          <div className="text-center font-medium">
            {row.getValue("Stages")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        {row.getValue("status") === true ? (
          <div className="flex shadow-md bg-green-100 py-1 px-4 w-max rounded-lg items-center gap-2">
            <div
              className="
            block 
            rounded-full 
            bg-green-400 
            ring-2
            ring-gray-50
            h-2 
            w-2 
           "
            ></div>
            <div className="text-green-500 font-semibold">Complete</div>
          </div>
        ) : (
          <div className="flex shadow-md bg-red-100 py-1 px-4 w-max rounded-lg items-center gap-2">
            <div
              className="
            block 
            rounded-full 
            bg-red-400 
            ring-2
            ring-gray-50
            h-2 
            w-2 
           "
            ></div>
            <div className="text-red-500 font-semibold">Incomplete</div>
          </div>
        )}
      </>
    ),
  },

  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
  },

  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <>
          {/* {row.original.status} */}
          <Link href={row.original.href}>
            <Button className="text-primary  hover:!text-white shadow-md bg-sky-100 h-max py-1  flex gap-2 hover:!bg-primary">
              <LogIn className="w-4 h-4" />
              <p>Go next</p>
            </Button>
          </Link>
        </>
      );
    },
  },
];

export function StageTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border mt-6">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
