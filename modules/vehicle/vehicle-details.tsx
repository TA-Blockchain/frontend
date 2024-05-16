import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { Vehicle } from "./vehicle-list";
import { RiCommunityLine } from "@remixicon/react";
import { capitalize } from "@/lib";
import clsx from "clsx";

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
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.carModel}</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Tipe Bahan Bakar</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span
              className={clsx(
                details.fuelType === "petrol" && "bg-cyan-50 text-cyan-700 ring-cyan-700/10",
                details.fuelType === "diesel" && "bg-pink-50 text-pink-700 ring-pink-700/10",
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset "
              )}
            >
              {capitalize(details.fuelType)}
            </span>
          </dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Penggunaan KM</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              {details.kmUsage} km
            </span>
          </dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Divisi</dt>
          <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="group relative sm:max-w-lg border shadow-sm rounded-md">
              <div className="h-full flex justify-between gap-x-6 p-5">
                <div className="w-full flex items-center min-w-0 gap-x-4">
                  <RiCommunityLine className="shrink-0 w-10 h-10 text-gray-500" />
                  <div>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{details?.divisi.name}</p>
                    <p className="text-xs leading-5 text-gray-500">{details?.divisi.lokasi}</p>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
