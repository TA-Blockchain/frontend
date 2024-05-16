import React from "react";
import { LoadingDetailsPlaceholder } from "@/modules/template/loading-details-placeholder";

import { ProposalKarbon, statuses, statusText } from "./proposal-karbon-list";
import { CompanyItem } from "@/modules/supply-chain/details/supply-chain-details";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";
import { KementerianButtons } from "./kementrian-buttons";
import KuotaCarbonCard from "./kuota-carbon-card";

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
          <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div
              className={clsx(
                statuses[details.status],
                "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {statusText[details.status]}
            </div>
          </dd>
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

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Kuota tersisa</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <KuotaCarbonCard id={details.idPerusahaan} />
          </dd>
        </div>
      </dl>

      <KementerianButtons details={details} />
    </div>
  );
}
