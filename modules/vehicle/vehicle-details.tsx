import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { Manager } from "../managers/manager-list";
import useSWR from "swr";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { getReadableDateTime } from "@/lib";
import clsx from "clsx";
import { Vehicle } from "./vehicle-list";

export function VehicleDetails({ details, isLoading }: { details: Vehicle | undefined; isLoading: boolean }) {
  const { trigger } = useMutation(`/company/vehicle/${details?.id}`, undefined, {
    method: "DELETE",
  });

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Model Kendaraan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.carModel}</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Tipe Bahan Bakar</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.fuelType}</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Penggunaan KM</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details?.kmUsage} km</dd>
        </div>
      </dl>
    </div>
  );
}
