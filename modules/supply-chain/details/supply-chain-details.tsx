import React from "react";
import { LoadingDetailsPlaceholder } from "../../template/loading-details-placeholder";
import { statuses, statusText, SupplyChain } from "../supply-chain-list";
import clsx from "clsx";
import { Company, CompanyListItem } from "../../company/list";
import useSWR from "swr";
import { Button } from "@tremor/react";
import { toast } from "sonner";
import { SmallLoadingPlaceholder } from "../../template/small-loading-placeholder";
import { KementerianButtons } from "./kementerian-buttons";
import { PerusahaanButtons } from "./perusahaan-buttons";

export function SupplyChainDetails({ details, isLoading }: { details: SupplyChain | undefined; isLoading: boolean }) {
  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Nama</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.Nama}</dd>
        </div>

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
          <dt className="text-sm font-medium leading-6 text-gray-900">Deskripsi</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="sm:w-3/4">{details.Deskripsi}</div>
          </dd>
        </div>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Perusahaan yang bergabung</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100">
              {details.listPerusahaan.map((id) => {
                return <CompanyItem key={id} id={id} />;
              })}
            </ul>
          </dd>
        </div>
      </dl>

      <PerusahaanButtons details={details} />

      <KementerianButtons details={details} />
    </div>
  );
}

function CompanyItem({ id }: { id: string }) {
  const { data, isLoading } = useSWR<{ data: Company }>(`/company/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder />;
  }

  if (!data) return null;

  return <CompanyListItem company={data.data} />;
}
