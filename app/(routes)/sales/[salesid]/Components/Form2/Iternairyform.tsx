"use client";
import React, { useRef, useState } from "react";

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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SalesGuestModal } from "@/components/Custom/Modal/Sales/SalesGuestModal";
import { ItineraryModal } from "@/components/Custom/Modal/Sales/Itinerary/ItineraryModal";

export type ItienaryProps = {
  date: string;
  stay: string;
  lightshow: string;
  Special: string;
};

export type ActivityStateProps = string[];

export function Iternairyform() {
  const [open, setOpen] = useState(false);
  const [formdata, setFormData] = useState<ActivityStateProps>([]);
  let day = 1;
  const columns: ColumnDef<ItienaryProps>[] = [
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     return <Menu className="h-4 w-4" />;
    //   },
    // },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex flex-col gap-4">
          <div className="capitalize flex gap-4 items-center">
            <Calendar className="h-5 w-5 text-primary" /> Day{" "}
            {Number(row.id) + 1}
          </div>
          <div className="capitalize flex gap-4 items-center">
            <CalendarClock className="h-5 w-5 text-primary" />{" "}
            {format(new Date(row.original.date), "PP")}
          </div>
        </div>
      ),
    },
    {
      id: "activty",
      enableHiding: false,
      cell: ({ row }) => (
        <>
          <section className="flex flex-row items-center justify-between">
            <aside>
              {formdata.length >= 1 ? (
                formdata?.map((item, id) => <p key={id}>{item},</p>)
              ) : (
                <p className="text-center">No data</p>
              )}
            </aside>
            <aside>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                </DialogTrigger>
                <ItineraryModal
                  setOpen={setOpen}
                  formdata={formdata}
                  setFormData={setFormData}
                />
              </Dialog>
            </aside>
          </section>
        </>
      ),
    },
    {
      accessorKey: "stay",
      header: () => <div className="text-center">Stay</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium flex justify-center items-center gap-4">
            <MapPin className="h-5 w-5 text-success" />
            {row.original.stay}
          </div>
        );
      },
    },
  ];

   /* -------------------------- Dragable functioning -------------------------- */

  const [data, setData] = useState<ItienaryProps[]>(datas);
  const draggedItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    draggedItem.current = index;
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItem.current === null) return;

    const draggedData = data[draggedItem.current];
    const newList = [...data];

    newList.splice(draggedItem.current, 1);
    newList.splice(index, 0, draggedData);

    setData(newList);
  };

  /* -------------------------- Dragable functioning -------------------------- */

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
                  draggable={true}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
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
