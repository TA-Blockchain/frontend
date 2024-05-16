import React from "react";
import { LoadingDetailsPlaceholder } from "@/modules/template/loading-details-placeholder";

import { ProposalKarbon } from "./proposal-karbon-list";
import { CompanyItem } from "@/modules/supply-chain/details/supply-chain-details";
import { getCarbonEmissionFormatted } from "@/lib";

export function ProposalKarbonDetails({
  details,
  isLoading,
}: {
  details: ProposalKarbon | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Id</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.id}</dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Perusahaan</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <CompanyItem id={details.idPerusahaan} />
          </dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Kuota yang dijual</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {getCarbonEmissionFormatted(details.kuotaYangDijual)}
            </span>
          </dd>
        </div>

        {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
        </div> */}
      </dl>
    </div>
  );
}
