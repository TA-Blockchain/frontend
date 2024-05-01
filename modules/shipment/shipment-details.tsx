import React from "react";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { Shipment, statuses, statusText } from "./shipment-list";
import { getReadableDateTime } from "@/lib";
import clsx from "clsx";
import { ShipmentApproval } from "./shipment-approval";
import Link from "next/link";
import { RiArrowRightUpLine, RiAttachment2, RiCarLine } from "@remixicon/react";
import { Steps } from "@/components/steps";
import { ShipmentInvoice } from "./shipment-invoice";
import { useUser } from "@/hooks/use-user";

function getSteps(details: Shipment) {
  const isWaitingBerangkat = new Date(details?.waktuBerangkat) > new Date() && details?.status === "Need Approval";

  const steps = [
    {
      name: "Perjalanan dibuat",
      description: (
        <span>
          Perjalanan <b>{details.id}</b> menuju divisi <b>{details.divisiPenerima.name}</b> akan berangkat pada{" "}
          <b>{getReadableDateTime(details?.waktuBerangkat)}</b>
        </span>
      ),
      status: "complete",
    },
  ] as {
    name: string;
    description: string | React.ReactNode;
    status: "complete" | "current" | "upcoming";
  }[];

  switch (details?.status) {
    case "Rejected":
      if (!isWaitingBerangkat) {
        steps.push({
          name: "Perjalanan sedang berlangsung",
          description: (
            <span>
              Perjalanan sedang menuju divisi <b>{details.divisiPenerima.name}</b>
            </span>
          ),
          status: "complete",
        });
      }

      steps.push({
        name: "Perjalanan dibatalkan",
        description: (
          <span>
            Perjalanan menuju divisi <b>{details.divisiPenerima.name}</b> telah dibatalkan oleh divisi{" "}
            <b>{details.divisiPengirim.name}</b>
          </span>
        ),
        status: "complete",
      });

      return steps;

    case "Completed":
      steps.push({
        name: "Perjalanan sedang berlangsung",
        description: (
          <span>
            Perjalanan sedang menuju divisi <b>{details.divisiPenerima.name}</b>
          </span>
        ),
        status: "complete",
      });
      steps.push({
        name: "Perjalanan selesai",
        description: (
          <span>
            Perjalanan <b>{details.id}</b> telah selesai. Anda bisa melihat invoice perjalanan di bagian bawah halaman.
          </span>
        ),
        status: "complete",
      });
      return steps;

    case "Need Approval":
      if (!isWaitingBerangkat) {
        steps.push({
          name: "Perjalanan sedang berlangsung",
          description: (
            <span>
              Perjalanan sedang menuju divisi <b>{details.divisiPenerima.name}</b>
            </span>
          ),
          status: "current",
        });
      } else {
        steps.push({
          name: "Perjalanan sedang menunggu waktu berangkat",
          description: (
            <span>
              Perjalanan akan menuju divisi <b>{details.divisiPenerima.name}</b> pada{" "}
              <b>{getReadableDateTime(details?.waktuBerangkat)}</b>
            </span>
          ),
          status: "current",
        });
      }

      return steps;

    default:
      return steps;
  }
}

export function ShipmentDetails({ details, isLoading }: { details: Shipment | undefined; isLoading: boolean }) {
  const { user } = useUser();

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  const isWaitingBerangkat = new Date(details?.waktuBerangkat) > new Date() && details?.status === "Need Approval";

  const vehicle = details?.transportasi;

  const isCanceled = details?.status === "Rejected";
  const isApproved = details?.status === "Completed";

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="py-2">
              <p
                className={clsx(
                  statuses[details?.status],
                  "rounded-md w-fit mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {isWaitingBerangkat ? "Menunggu Waktu Berangkat" : statusText[details?.status]}
              </p>
            </div>
          </dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Riwayat Perjalanan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <Steps steps={getSteps(details)} isCanceled={isCanceled} />
          </dd>
        </div>

        {details?.waktuSampai && (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Waktu Sampai</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {getReadableDateTime(details?.waktuSampai)}
            </dd>
          </div>
        )}

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Berat Muatan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.beratMuatan} kg</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Kendaraan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="group relative sm:max-w-lg border shadow-sm rounded-md">
              <Link href={`/vehicle/${vehicle.id}`}>
                <div className="group px-4 py-5">
                  <div className="w-full flex items-center min-w-0 gap-x-4">
                    <RiCarLine className="shrink-0 w-10 h-10 text-gray-500" />
                    <div>
                      <p className="text-sm font-semibold leading-6 text-gray-900">{vehicle.carModel}</p>
                      <p className="flex text-xs leading-5 text-gray-500">
                        <span>{vehicle.fuelType}</span>
                        <span className="mx-1">•</span>
                        <span>{vehicle.kmUsage} KM</span>
                      </p>
                    </div>
                  </div>
                  <span
                    className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
                    aria-hidden={true}
                  >
                    <RiArrowRightUpLine className="h-4 w-4" aria-hidden={true} />
                  </span>
                </div>
              </Link>
            </div>
          </dd>
        </div>

        {isApproved && (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Invoice</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <RiAttachment2 className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">invoice_perjalanan.pdf</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <ShipmentInvoice id={details.id} />
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        )}
      </dl>

      {user && <ShipmentApproval details={details} />}
    </div>
  );
}
