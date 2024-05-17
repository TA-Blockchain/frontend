import React from "react";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { Shipment, statuses, statusText } from "./shipment-list";
import { getCarbonEmissionFormatted, getReadableDateTime } from "@/lib";
import clsx from "clsx";
import { ShipmentApproval } from "./shipment-approval";
import Link from "next/link";
import { RiArrowRightUpLine, RiAttachment2, RiCarLine } from "@remixicon/react";
import { Steps } from "@/components/steps";
import { ShipmentInvoice } from "./shipment-invoice";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/avatar";
import Image from "next/image";
import useSWR from "swr";
import { Manager } from "../managers/manager-list";

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

  const { data, isLoading: isLoadingManager } = useSWR<{ data: Manager }>(
    details?.approver ? `/auth/user/${details?.approver}` : null
  );

  if (isLoading || isLoadingManager) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  const isApproved = details?.status === "Completed";

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="shipment-details absolute inset-0 w-full h-full hidden">
        <ShipmentDetailsComponent manager={data?.data} details={details} />
      </div>

      <ShipmentDetailsComponent manager={data?.data} details={details} real />

      {isApproved && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-white relative">
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

      {user && <ShipmentApproval details={details} />}
    </div>
  );
}

export function ShipmentDetailsComponent({
  details,
  manager,
  real = false,
}: {
  details: Shipment;
  manager?: Manager;
  real?: boolean;
}) {
  const isWaitingBerangkat = new Date(details?.waktuBerangkat) > new Date() && details?.status === "Need Approval";
  const vehicle = details?.transportasi;

  const isCanceled = details?.status === "Rejected";

  const person = {
    name: manager?.name,
    email: manager?.email,
  };

  return (
    <dl className={clsx("divide-y divide-gray-100", real && "relative bg-white z-10")}>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <p
            className={clsx(
              statuses[details?.status],
              !real && "shipment-status",
              "rounded-md w-fit my-1.5 px-1.5 py-0.5 text-xs font-medium border"
            )}
          >
            {isWaitingBerangkat ? "Menunggu Waktu Berangkat" : statusText[details?.status]}
          </p>
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
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {details?.beratMuatan.toLocaleString("id-ID")} kg
        </dd>
      </div>
      {details?.emisiKarbon > 0 && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Emisi Karbon</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {getCarbonEmissionFormatted(details?.emisiKarbon)}
            </span>
          </dd>
        </div>
      )}
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Kendaraan</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <div className="group relative sm:max-w-sm border shadow-sm rounded-md">
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

      {real && details.approver && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Approver</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="sm:max-w-sm flex justify-between gap-x-6 p-4 border shadow-sm rounded-md">
              <div className="flex gap-x-4 w-full">
                <Avatar />
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  <p className="flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${person.email}`} className="truncate hover:underline">
                      {person.email}
                    </a>
                  </p>
                  <div className="mt-2 flex justify-end">
                    <div className="inline-flex items-center rounded-md bg-lime-50 px-2 py-1 text-xs font-medium text-lime-700 ring-1 ring-inset ring-lime-700/10">
                      Manajer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </div>
      )}

      {!real && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Approver</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <p>Disetujui oleh:</p>

            <div className="relative py-2 mt-4">
              <Image src="/logo/cc-stamp.png" width={72} height={72} alt="carbon chain stamp" />
              <div className="absolute top-4 pb-4 left-12 overflow-hidden max-w-xs">
                <p className="text-sm">Manager Divisi {details.divisiPenerima.name}</p>
                <p className="text-xs break-words leading-4">{details.TxId}</p>
              </div>
            </div>

            <a href={`mailto:${person.email}`} className="underline text-tremor-brand">
              {person.email}
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}
