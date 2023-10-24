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
  ArrowUpDown,
  Calendar,
  CarTaxiFront,
  ChevronDown,
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
import { data } from "@/app/data/driverdata";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { SalesGuestModal } from "@/components/Custom/Modal/Sales/SalesGuestModal";

export type Payment = {
  id: string;
  email: string;
  status: string;
  name: string;
  trName: string;
  activity: string;
  time: string;
  date: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "trName",
    header: () => <div className="text-left">Guest Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  gap-2">
          <UserCircle className="h-4 text-secondary" />
          <div className="text-center font-medium">
            {row.getValue("trName")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Filed Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 text-primary" />
        <div>{format(new Date(row.getValue("date")), "PP")}</div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Booked Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 text-primary" />
        <div>{format(new Date(row.getValue("date")), "PP")}</div>
      </div>
    ),
  },

  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "activity",
    header: () => <div className="text-left">Diffent Activity</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  gap-2">
          <Palmtree
            className={`h-4 ${
              row.getValue("activity") ? "text-success" : "text-danger"
            }`}
          />
          <div className="text-center font-medium">
            {row.getValue("activity") ? (
              row.getValue("activity")
            ) : (
              <p className="text-danger">Not yet fixed</p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => "",
    cell: () => "",
  },

  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  //   },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only ">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <Link href={"/sales/1"}>
              <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-primary hover:!text-white">
                <UserCog2 className="mr-2 h-4 w-4" />
                <span>Update Guest data</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-danger hover:!text-white">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Guest data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function SalesTable() {
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
    <div className="w-full ">
      <div className="flex w-full justify-between items-center py-4">
        <Input
          placeholder="Filter by tourist name..."
          value={(table.getColumn("trName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("trName")?.setFilterValue(event.target.value)
          }
          autoComplete="off"
          autoCorrect="off"
          className="max-w-sm"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary">
              <UserPlus2 /> Add new guest
            </Button>
          </DialogTrigger>
          <SalesGuestModal id={"1"} />
        </Dialog>
      </div>
      <div className="rounded-md border">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
