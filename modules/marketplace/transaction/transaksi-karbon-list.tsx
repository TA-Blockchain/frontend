import useSWR from "swr";
import { EmptyPlaceholder } from "../../template/empty-placeholder";
import { LoadingPlaceholder } from "../../template/loading-placeholder";
import { RiArrowRightUpLine, RiExchangeFundsLine, RiFileLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export type TransaksiKarbonStatus = "pending" | "approve penjual" | "approve" | "reject";

export type TransaksiKarbon = {
  id: string;
  idPerusahaanPembeli: string;
  idProposalPenjual: string;
  kuota: number;
  status: TransaksiKarbonStatus;
  urlBuktiTransaksi: string;
  approvers: [string];
};

export const statuses = {
  pending: "text-orange-800 bg-orange-50 ring-orange-600/20",
  "approve penjual": "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  approve: "text-green-700 bg-green-50 ring-green-600/20",
  reject: "text-red-700 bg-red-50 ring-red-600/20",
};

export const statusText = {
  pending: "Menunggu Persetujuan Penjual",
  "approve penjual": "Menunggu Persetujuan Kementrian",
  approve: "Disetujui",
  reject: "Ditolak",
};

const placeholderProps = {
  title: "Transaksi jual beli karbon tidak ditemukan",
  description: "Transaksi jual beli karbon Anda akan tercatat disini.",
};

export function TransaksiKarbonList({ status }: { status: "pending" | "approve" | "reject" }) {
  const {
    user: { idPerusahaan },
  } = useUser();

  const { data, isLoading } = useSWR<{ data: Array<TransaksiKarbon> }>(
    `/carbon_trading/transactions/penjual/${idPerusahaan}`
  );

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
          <Link href={`/marketplace/transaction/${transaksiKarbon.id}`}>
            <Card className="group px-4 py-5">
              <div className="w-full flex items-center min-w-0 gap-x-4">
                <RiExchangeFundsLine className="shrink-0 w-10 h-10 text-gray-500" />
                <div className="text-xs space-y-2 leading-5 text-gray-500">
                  <div className="flex items-center">
                    <span>Penjualan kuota karbon:</span>
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
