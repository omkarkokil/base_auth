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
import { toast } from "@/components/ui/use-toast";
import CruiseModal from "@/components/Custom/Modal/Sales/Cruise/CruiseModal";
import { CruiseFormProps } from "../../Cruise/page";

interface CruiseProps {
  id: string;
}

const CruiseForm: React.FC<CruiseProps> = ({ id }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  //   const [ids, setids] = useState("");
  const [data, setData] = useState<CruiseFormProps[]>([]);

  const columns: ColumnDef<CruiseFormProps>[] = [
    {
      accessorKey: "time",
      header: () => <div className="text-left">Time</div>,
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
      accessorKey: "journeyDate",
      header: "Journey Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>{row.getValue("journeyDate")}</div>
        </div>
      ),
    },

    {
      accessorKey: "route",
      header: () => <div className="text-left">Route</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("route")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "cruise",
      header: () => <div className="text-left">Cruise</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("cruise")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "seat_class",
      header: () => <div className="text-left">seat class</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">
              {row.getValue("seat_class")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "PNR",
      header: () => <div className="text-left">PNR</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <div className="text-center font-medium">{row.getValue("PNR")}</div>
          </div>
        );
      },
    },

    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     return (
    //       <Dialog open={open} onOpenChange={setOpen}>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //               <span className="sr-only ">Open menu</span>
    //               <MoreHorizontal className="h-4 w-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Add Actions</DropdownMenuLabel>
    //             <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-primary hover:!text-white">
    //               <UserPlus2 className="mr-2 h-4 w-4" />
    //               <span>Add form data</span>
    //             </DropdownMenuItem>

    //             <DropdownMenuItem
    //               //   onClick={() => DeleteGuest()}
    //               className="pr-10 cursor-pointer hover:!bg-danger hover:!text-white"
    //             >
    //               <Trash2 className="mr-2 h-4 w-4" />
    //               Delete Guest data
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </Dialog>
    //     );
    //   },
    // },
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

      const res = await fetch("/api/guest/cruise", {
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
        router.push(`/sales/${id}/Vehical`);
        alert("succcess");
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

  return (
    <div className="w-full ">
      <div className="flex w-full justify-between items-center py-4">
        <Input
          placeholder="Filter by tourist name..."
          //   value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          //   onChange={(event) =>
          //     table.getColumn("name")?.setFilterValue(event.target.value)
          //   }
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
          <CruiseModal
            open={open}
            id={id}
            setOpen={setOpen}
            setData={setData}
          />
          {/* <SalesGuestModal open={open} setOpen={setOpen} /> */}
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
                    <Ship className="h-12 w-12 text-success" />
                    <div className="flex flex-col items-start">
                      <h1 className="text-2xl pb-2 font-semibold text-success">
                        Create Cruise requisition /This also can be empty
                      </h1>
                      <p className="font-medium text-sm  text-success">
                        Please create Cruise first by using add new cruise
                        button for preview if no cruise also click next step to
                        got to next one
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
              "Next step"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CruiseForm;
