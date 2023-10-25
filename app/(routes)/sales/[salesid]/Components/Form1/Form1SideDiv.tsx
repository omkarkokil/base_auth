import React, { FC } from "react";
import { StateInputProps } from "./SalesForm";
import { format } from "date-fns";
import {
  AlertCircle,
  Book,
  Building2,
  Plane,
  User2,
  Users2,
} from "lucide-react";

type SideProps = {
  state: StateInputProps;
  filledData?: string;
  arrivedDate?: string;
  departTureDate?: string;
  arrivalValue?: string;
  departureValue?: string;
  vipValue?: string;
  channel?: string;
  total?: number;
};

const Form1SideDiv: FC<SideProps> = ({
  state,
  filledData,
  arrivedDate,
  departTureDate,
  arrivalValue,
  departureValue,
  vipValue,
  channel,
  total,
}) => {
  return (
    <section className="flex flex-col  w-[50%]  py-5">
      {!filledData &&
      !state.assignedTo &&
      !state.guest &&
      !state.contact &&
      !state.email &&
      !state.service &&
      !state.category &&
      !vipValue &&
      !channel &&
      !arrivedDate &&
      !arrivalValue &&
      !departTureDate &&
      !departureValue &&
      !state.adult &&
      !state.adult12 &&
      !state.infant &&
      !state.ch35 &&
      !state.ch512 ? (
        <article className="bg-white space-y-4 p-4 shadow-md">
          <div className="font-semibold items-center flex gap-4 text-xl text-danger">
            <div className="bg-danger shadow-xl p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-white  " />
            </div>
            For preview Please enter data first
          </div>
        </article>
      ) : (
        <aside className="flex flex-col gap-4">
          {state.assignedTo || filledData ? (
            <article className="bg-white space-y-4 p-4 shadow-md">
              <div className="font-semibold items-center flex gap-4 text-xl text-primary">
                <div className=" shadow-xl p-2 bg-primary rounded-full">
                  <Book className="h-5 w-5  text-white" />
                </div>
                Basic Form data{" "}
              </div>
              <div className="flex gap-10 ">
                {state.assignedTo && (
                  <div className="flex gap-2">
                    <p className="font-semibold">Assigned To : -</p>
                    <p>{state.assignedTo}</p>
                  </div>
                )}
                {filledData && (
                  <div className="flex gap-2">
                    <p className="font-semibold">FormFilled Date:-</p>
                    <p>{format(new Date(filledData), "PP")}</p>
                  </div>
                )}
              </div>
            </article>
          ) : (
            ""
          )}

          {state.guest || state.contact || state.email ? (
            <article className="bg-white space-y-4 p-4 shadow-md">
              <div className="font-semibold items-center flex gap-4 text-xl text-success">
                <div className="bg-success shadow-xl p-2 rounded-full">
                  <User2 className="h-5 w-5 text-white " />
                </div>
                Guest Info
              </div>
              {state.guest && (
                <>
                  <p className="font-semibold">Name of guest: -</p>
                  <p>{state.guest}</p>
                </>
              )}
              {state.contact && (
                <>
                  <p className="font-semibold">Contact No of guest: -</p>
                  <p>{state.contact}</p>
                </>
              )}
              {state.email && (
                <>
                  <p className="font-semibold">Email of guest: -</p>
                  <p>{state.email}</p>
                </>
              )}
            </article>
          ) : (
            ""
          )}

          {state.service || state.category || vipValue || channel ? (
            <article className="bg-white space-y-4 p-4 shadow-md">
              <div className="font-semibold items-center flex gap-4 text-xl text-warning">
                <div className="bg-warning shadow-xl p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-white " />
                </div>
                Services
              </div>
              {channel && (
                <>
                  <p className="font-semibold">Channel: -</p>
                  <p>{channel}</p>
                </>
              )}
              {state.service && (
                <>
                  <p className="font-semibold">Servies for guest: -</p>
                  <p>{state.service}</p>
                </>
              )}
              {state.category && (
                <>
                  <p className="font-semibold">Entered Category: -</p>
                  <p>{state.category}</p>
                </>
              )}

              {vipValue && (
                <>
                  <p className="font-semibold">VIP Courtesy: -</p>
                  <p>{vipValue}</p>
                </>
              )}
            </article>
          ) : (
            ""
          )}

          {arrivedDate || arrivalValue || departTureDate || departureValue ? (
            <article className="bg-white space-y-4 p-4 shadow-md">
              <h1 className="font-semibold items-center flex gap-4 text-xl text-danger">
                <div className="bg-danger shadow-xl p-2 rounded-full">
                  <Plane className="h-5 w-5 text-white " />
                </div>
                Arrival and Departure
              </h1>

              <div className="flex items-center gap-2">
                {arrivedDate && (
                  <>
                    <p className="font-semibold">Arrival Date: -</p>
                    <p>{format(new Date(arrivedDate), "PP")}</p>
                  </>
                )}
                {arrivalValue && (
                  <>
                    <p className="font-semibold">Arrival Time: -</p>
                    <p>{arrivalValue}</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                {departTureDate && (
                  <>
                    <p className="font-semibold">Departure Date: -</p>
                    <p>{format(new Date(departTureDate), "PP")}</p>
                  </>
                )}
                {departureValue && (
                  <>
                    <p className="font-semibold">Departure Time:- </p>
                    <p>{departureValue}</p>
                  </>
                )}
              </div>
            </article>
          ) : (
            ""
          )}

          {state.adult ||
          state.adult12 ||
          state.infant ||
          state.ch35 ||
          state.ch512 ? (
            <article className="bg-white space-y-4 p-4 shadow-md">
              <h1 className="font-semibold items-center flex gap-4 text-xl text-purple-600">
                <div className=" bg-purple-600 shadow-xl p-2 rounded-full">
                  <Users2 className="h-5 w-5  text-white" />
                </div>
                Number of Guest:-
              </h1>

              {state.adult && (
                <>
                  <p className="font-semibold">Total Adult: -</p>
                  <p>{state.adult}</p>
                </>
              )}
              {state.adult12 && (
                <>
                  <p className="font-semibold">Adult 12+: -</p>
                  <p>{state.adult12}</p>
                </>
              )}
              {state.ch512 && (
                <>
                  <p className="font-semibold">No of guest under 5-12 : -</p>
                  <p>{state.ch512}</p>
                </>
              )}
              {state.ch35 && (
                <>
                  <p className="font-semibold">No of guest under 3-5 : -</p>
                  <p>{state.ch35}</p>
                </>
              )}
              {state.infant && (
                <>
                  <p className="font-semibold">Infant: -</p>
                  <p>{state.infant}</p>
                </>
              )}

              {state.infant &&
                state.ch35 &&
                state.ch512 &&
                state.adult &&
                state.adult12 && (
                  <>
                    <p className="font-semibold">Total: -</p>
                    <p>{total}</p>
                  </>
                )}
            </article>
          ) : (
            ""
          )}
        </aside>
      )}
    </section>
  );
};

export default Form1SideDiv;
