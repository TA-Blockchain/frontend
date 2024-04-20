import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { Manager } from "../managers/manager-list";
import useSWR from "swr";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { Shipment, statuses, statusText } from "./shipment-list";
import { getReadableDateTime } from "@/lib";
import clsx from "clsx";
import { ShipmentApproval } from "./shipment-approval";

export function ShipmentDetails({ details, isLoading }: { details: Shipment | undefined; isLoading: boolean }) {
  const { trigger } = useMutation(`/company/shipment/${details?.id}`, undefined, {
    method: "DELETE",
  });

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  const isWaitingBerangkat = new Date(details?.waktuBerangkat) > new Date() && details?.status === "Need Approval";

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Waktu Berangkat</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {getReadableDateTime(details?.waktuBerangkat)}
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
          <dt className="text-sm font-medium leading-6 text-gray-900">Berat Muatan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.beratMuatan} kg</dd>
        </div>

        {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Berat Muatan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.beratMuatan}</dd>
        </div> */}
      </dl>

      <ShipmentApproval details={details} />
    </div>
  );
}
