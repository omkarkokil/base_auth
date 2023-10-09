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
  UserCircle,
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
import { DriverModal } from "@/components/Custom/Modal/DriverModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 text-primary" />
        <div>{format(new Date(row.getValue("date")), "PP")}</div>
      </div>
    ),
  },
  {
    accessorKey: "trName",
    header: () => <div className="text-left">Tourist Name</div>,
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
    accessorKey: "id",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "activity",
    header: () => <div className="text-left">Activity</div>,
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

        // <div className="font-medium w-max">
        //   <Badge
        //     variant={"outline"}
        //     className={`
        //      ${
        //        row.getValue("activity") === "Treking"
        //          ? "text-success hover:!text-success"
        //          : row.getValue("activity") === "Water Sports"
        //          ? "text-primary"
        //          : "text-danger border-[0.5px] border-danger hover:!text-danger"
        //      }
        //     cursor-pointer w-max`}
        //   >
        //     {row.getValue("activity")}
        //   </Badge>
        // </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => "",
    cell: () => "",
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Driver Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 font-medium">
          <CarTaxiFront className="h-4 text-warning" />
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`rounded-full h-[.65rem] w-[.65rem] border-[.5px] shadow-xl  ${
                    row.getValue("status") === "not on work"
                      ? "bg-red-500"
                      : row.getValue("status") === "engage"
                      ? "bg-warning"
                      : row.getValue("status") === "availabel"
                      ? "bg-success"
                      : "bg-black"
                  }  `}
                ></div>
                <TooltipContent>
                  <p>{row.getValue("status")}</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider> */}
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-left w-max">Time to pick</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Timer className="h-4  text-success" />
          {row.getValue("time")}
        </div>
      );
    },
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
        <Dialog>
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
              <DialogTrigger className="flex items-center">
                <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-warning hover:!text-white">
                  <CarTaxiFront className="mr-2 h-4 w-4" />
                  <span>Assign the driver</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DriverModal id={row.getValue("id")} />
        </Dialog>
      );
    },
  },
];

export function DriverTable() {
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
      <div className="flex items-center py-4">
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
      </div>
      <div className="rounded-md border">
        <Table>
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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
