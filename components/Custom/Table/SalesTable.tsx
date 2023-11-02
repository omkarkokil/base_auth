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

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { SalesGuestModal } from "@/components/Custom/Modal/Sales/SalesGuestModal";
import { getGuestList } from "@/actions/getGuestAction";
import { Guest, GuestInfo } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

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

interface guestProps {
  guestList: Guest[];
  Guest: (id: string) => string[] | any;
}

const SalesTable: React.FC<guestProps> = ({ guestList, Guest }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [ids, setids] = useState("");

  const CheckGuest = async (id: string) => {
    const data = await Guest(id);
    if (data.guestInfo.length <= 0) {
      router.push(`/sales/${id}/GuestInfo`);
    } else {
      router.push(`/sales/${id}`);
    }
  };

  useEffect(() => {
    if (!open) {
      setids("");
    }
  }, [open]);

  const DeleteGuest = async (id: string) => {
    const res = await fetch(`/api/guest/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast({
        title: "Sales requisition form is not deleted server error",
        variant: "destructive",
      });
    }

    if (res.ok) {
      router.refresh();
      toast({
        title: "Sales requisition form deleted successfully",
        variant: "default",
      });
      return res.json();
    }
  };
  const columns: ColumnDef<Guest>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-left">Guest Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <UserCircle className="h-4 text-secondary" />
            <div className="text-center font-medium">
              {row.getValue("name")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "filledDate",
      header: "Filed Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 text-primary" />
          <div>{format(new Date(row.getValue("filledDate")), "PP")}</div>
        </div>
      ),
    },
    {
      accessorKey: "bookedDate",
      header: "Booked Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 text-primary" />
          <div>{format(new Date(row.getValue("bookedDate")), "PP")}</div>
        </div>
      ),
    },

    {
      accessorKey: "id",
      header: () => null,
      cell: () => null,
    },
    {
      accessorKey: "points",
      header: () => <div className="text-left">Points</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <Award className={`h-4 text-warning`} />
            <div className="text-center font-medium">
              {row.getValue("points")}
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only ">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Add Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => CheckGuest(row.original.id)}
                  className="pr-10 cursor-pointer hover:!bg-primary hover:!text-white"
                >
                  <UserPlus2 className="mr-2 h-4 w-4" />
                  <span>Add form data</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Change Actions</DropdownMenuLabel>
                <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-success hover:!text-white">
                  <DialogTrigger
                    onClick={() => {
                      setids(row.original.id);
                    }}
                    asChild
                  >
                    <div className=" flex items-center">
                      <UserCog2 className="mr-2 h-4 w-4" />
                      <span>Edit Form data</span>
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => DeleteGuest(row.original.id)}
                  className="pr-10 cursor-pointer hover:!bg-danger hover:!text-white"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Guest data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SalesGuestModal id={ids} open={open} setOpen={setOpen} />
          </Dialog>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: guestList,
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
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          autoComplete="off"
          autoCorrect="off"
          className="max-w-sm"
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="bg-primary hover:bg-primary">
              <UserPlus2 /> Add new guest
            </Button>
          </DialogTrigger>

          {/* <SalesGuestModal open={open} setOpen={setOpen} /> */}
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {guestList.length > 0 &&
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
                  <div className="flex bg-[#fee2e2] rounded-md p-8  shadow-md   gap-4 w-full ">
                    <AlertCircle className="h-12 w-12 text-danger" />
                    <div className="flex flex-col items-start">
                      <h1 className="text-2xl pb-2 font-semibold text-danger">
                        Guest Sales Requisition data is not found
                      </h1>
                      <p className="font-medium text-sm  text-danger">
                        Please create data first by using add new guest button
                        to preview Guest Sales Requisition data
                      </p>
                    </div>
                  </div>
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
};

export default SalesTable;
