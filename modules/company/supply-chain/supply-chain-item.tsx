import React from "react";

import useSWR from "swr";
import { SmallLoadingPlaceholder } from "@/modules/template/small-loading-placeholder";
import { statuses, statusText, SupplyChain } from "@/modules/supply-chain/supply-chain-list";
import { RiArrowRightUpLine, RiBuilding2Line } from "@remixicon/react";
import clsx from "clsx";
import Link from "next/link";
import { Card } from "@tremor/react";

export function SupplyChainItem({ id }: { id: string }) {
  const { data, isLoading } = useSWR<{ data: SupplyChain }>(`/company/supply_chain/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder />;
  }

  if (!data) return null;

  return <SupplyChainListItem supplyChain={data.data} />;
}

function SupplyChainListItem({ supplyChain }: { supplyChain: SupplyChain }) {
  return (
    <Link href={`/supply-chain/${supplyChain.id}`} key={supplyChain.id}>
      <Card className="group px-4 pt-5 pb-1">
        <div className="flex space-x-2">
          <div className="p-2 shrink-0">
            <RiBuilding2Line className="w-12 h-12 text-gray-600" />
          </div>
          <div className="mt-1 overflow-hidden">
            <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {supplyChain.Nama}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-tremor-content dark:text-dark-tremor-content">
              {supplyChain.Deskripsi}
            </p>
          </div>
        </div>
        <div className="mt-2 grid place-items-end divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border">
          <div className="py-2">
            <p
              className={clsx(
                statuses[supplyChain.status],
                "rounded-md w-fit mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {statusText[supplyChain.status]}
            </p>
          </div>
        </div>
        <span
          className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
          aria-hidden={true}
        >
          <RiArrowRightUpLine className="h-4 w-4" aria-hidden={true} />
        </span>
      </Card>
    </Link>
  );
}
