import useSWR from "swr";
import { EmptyPlaceholder } from "../../template/empty-placeholder";
import { LoadingPlaceholder } from "../../template/loading-placeholder";
import { RiArrowRightUpLine, RiExchangeFundsLine, RiFileLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";
import Link from "next/link";
import { statuses, statusText, TransaksiKarbon } from "./transaksi-karbon-list";

const placeholderProps = {
  title: "Transaksi jual beli karbon tidak ditemukan",
  description: "Transaksi jual beli karbon di platform Carbon Chain akan tercatat disini.",
};

export function TransaksiKarbonListKementrian({ status }: { status: "approve penjual" | "approve" | "reject" }) {
  const { data, isLoading } = useSWR<{ data: Array<TransaksiKarbon> }>("/carbon_trading/transactions");

  const filteredData = data?.data.filter((transaksiKarbon) => transaksiKarbon.status === status) ?? [];

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (filteredData.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredData.map((transaksiKarbon) => (
        <li key={transaksiKarbon.id}>
          <Link href={`/marketplace/proposal/${transaksiKarbon.id}`}>
            <Card className="group px-4 py-5">
              <div className="w-full flex items-center min-w-0 gap-x-4">
                <RiExchangeFundsLine className="shrink-0 w-10 h-10 text-gray-500" />
                <div className="text-xs space-y-2 leading-5 text-gray-500">
                  <div className="flex items-center">
                    <span>Kuota yang dibeli:</span>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-blue-700">
                      {getCarbonEmissionFormatted(transaksiKarbon.kuota)}
                    </span>
                  </div>
                  <div
                    className={clsx(
                      statuses[transaksiKarbon.status],
                      "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {statusText[transaksiKarbon.status]}
                  </div>
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
        </li>
      ))}
    </ul>
  );
}
