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
} from "lucide-react";

import { Button } from "@/components/ui/button";

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

import { ItineraryModal } from "@/components/Custom/Modal/Sales/Itinerary/ItineraryModal";
import { DateActivity } from "../../Itinerary/page";
import { Item } from "@radix-ui/react-dropdown-menu";
import BasicSelectField from "@/components/Custom/Select/BasicSelectField";
import { useRouter } from "next/navigation";

export type ItienaryProps = {
  date: string;
  stay: string;
  lightshow: string;
  Special: string;
};
export type ActivityStateProps = string[];
type ItenaryInputProps = {
  dateData: DateActivity[];
  paramsid: string;
};

export const Iternairyform: FC<ItenaryInputProps> = ({
  dateData,
  paramsid,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DateActivity[]>(dateData);

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
        router.push(`/sales/${paramsid}/RoomBooking`);
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

  const addActivityForDay = (day: string, activity: string[]) => {
    setData((prevRows) =>
      prevRows.map((row) => {
        return row.day === day ? { ...row, activity: activity } : row;
      })
    );
  };

  const addStayForDay = (day: string, stay: string) => {
    setData((prevRows) =>
      prevRows.map((row) => {
        console.log(prevRows);
        return row.day === day ? { ...row, stay: stay } : row;
      })
    );
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

  const columns: ColumnDef<DateActivity>[] = [
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
            {row.original.date}
          </div>
        </div>
      ),
    },
    {
      id: "activity",
      enableHiding: false,
      cell: ({ row }) => (
        <>
          <section className="flex mr-80 flex-row items-center gap-6 justify-end">
            <aside>
              {Array.isArray(row.original.activity) ? (
                row.original.activity.join(", ")
              ) : (
                <p className="text-center">No data</p>
              )}
            </aside>
            <aside>
              <Dialog
                open={open && openedDialogId === row.original.day}
                onOpenChange={setOpen}
              >
                <DialogTrigger
                  onClick={() => {
                    toggleDialog(row.original.day);
                  }}
                  asChild
                >
                  <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                </DialogTrigger>
                <ItineraryModal
                  setOpen={setOpen}
                  formdata={formdata}
                  setFormData={setFormData}
                  addActivityForDay={addActivityForDay}
                  day={row.original.day}
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
          <div className="text-right w-max font-medium flex justify-center items-center gap-4">
            <MapPin className="h-5 w-5 text-success" />
            <div>
              <BasicSelectField
                state={dropdownValues}
                addStayForDay={addStayForDay}
                setState={setDropdownValues}
                data={dateData}
                day={row.original.day}
              />
            </div>
          </div>
        );
      },
    },
  ];

  /* -------------------------- Dragable functioning -------------------------- */

  const draggedItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    draggedItem.current = index;
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItem.current === null) return;

    // Get the activity and stay from the row that was dragged
    const draggedActivity = data[draggedItem.current].activity;
    const draggedStay = data[draggedItem.current].stay;

    // Also store the target row's activity and stay
    const targetActivity = data[index].activity;
    const targetStay = data[index].stay;

    // Clone the current data
    const newData = [...data];

    // Set the dragged activity and stay to the target row
    newData[index].activity = draggedActivity;
    newData[index].stay = draggedStay;

    // Set the target row's original activity and stay to the dragged row
    newData[draggedItem.current].activity = targetActivity;
    newData[draggedItem.current].stay = targetStay;

    // Update state
    setData(newData);

    // Reset the dragged item
    draggedItem.current = null;
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
    // getPaginationRowModel: getPaginationRowModel(),
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
