import React from "react";
import { Division } from "./division-list";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import dynamic from "next/dynamic";

const ReadOnlyMap = dynamic(() => import("@/components/map/read-only-map"), {
  ssr: false,
});

export function DivisionDetailsManager({ details, isLoading }: { details: Division | undefined; isLoading: boolean }) {
  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Nama Divisi</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.name}</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Alamat Lengkap</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="sm:w-3/4">{details.lokasi}</div>

            <div className="mt-4">
              <ReadOnlyMap
                markerPosition={{
                  lat: parseFloat(details.lat),
                  lng: parseFloat(details.long),
                }}
              />
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
