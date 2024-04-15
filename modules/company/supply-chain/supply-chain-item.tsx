import React from "react";

import useSWR from "swr";
import { SmallLoadingPlaceholder } from "@/modules/template/small-loading-placeholder";
import { statuses, statusText, SupplyChain } from "@/modules/supply-chain/supply-chain-list";
import { useRouter } from "next/router";
import { RiBuilding2Line } from "@remixicon/react";
import clsx from "clsx";

export function SupplyChainItem({ id }: { id: string }) {
  const { data, isLoading } = useSWR<{ data: SupplyChain }>(`/company/supply_chain/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder />;
  }

  if (!data) return null;

  return <SupplyChainListItem supplyChain={data.data} />;
}

function SupplyChainListItem({ supplyChain }: { supplyChain: SupplyChain }) {
  const router = useRouter();

  return (
    <li key={supplyChain.id} className="px-1 even:bg-gray-50 flex items-center justify-between gap-x-6 py-5">
      <div className="flex items-center gap-4">
        <RiBuilding2Line className="shrink-0 w-8 h-8 text-gray-500" />
        <div className="overflow-hidden">
          <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">Lorem</p>
            <p
              className={clsx(
                statuses[supplyChain.status],
                "max-sm:hidden rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {statusText[supplyChain.status]}
            </p>
          </div>
          <p className="mt-0.5 gap-x-2 text-xs leading-5 text-gray-500 max-w-2xl line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, velit laborum dolor nemo temporibus aut, qui
            unde sunt voluptatibus nostrum aliquid, voluptatem quisquam! Nam reiciendis reprehenderit maxime facilis at
            odit.
          </p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <button
          onClick={() => router.push(`/supply-chain/${supplyChain.id}`)}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition block"
        >
          Lihat rincian<span className="sr-only">, Lorem</span>
        </button>
      </div>
    </li>
  );
}
