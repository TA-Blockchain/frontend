import useSWR from "swr";
import { EmptyPlaceholder } from "../../template/empty-placeholder";
import { LoadingPlaceholder } from "../../template/loading-placeholder";
import { RiFileLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";

export type ProposalKarbon = {
  id: string;
  idPerusahaan: string;
  kuotaYangDijual: number;
  status: "0" | "1" | "2";
};

export const statuses = {
  "0": "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  "1": "text-green-700 bg-green-50 ring-green-600/20",
  "2": "text-red-700 bg-red-50 ring-red-600/20",
};

export const statusText = {
  "0": "Menunggu Persetujuan Admin Kementerian",
  "1": "Disetujui",
  "2": "Ditolak",
};

const placeholderProps = {
  title: "Proposal penjualan karbon tidak ditemukan",
  description: "Proposal penjualan karbon Anda akan tercatat disini.",
};

export function ProposalKarbonListReadOnly({ idPerusahaan }: { idPerusahaan: string }) {
  const { data, isLoading } = useSWR<{ data: Array<ProposalKarbon> }>(
    `/carbon_trading/sales-proposal/perusahaan/${idPerusahaan}`
  );

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (data?.data.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data.map((proposalKarbon) => (
        <li key={proposalKarbon.id}>
          <Card className="group px-4 py-5">
            <div className="w-full flex items-center min-w-0 gap-x-4">
              <RiFileLine className="shrink-0 w-10 h-10 text-gray-500" />
              <div className="text-xs space-y-2 leading-5 text-gray-500">
                <div className="flex items-center">
                  <span>Kuota yang dijual:</span>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-blue-700">
                    {getCarbonEmissionFormatted(proposalKarbon.kuotaYangDijual)}
                  </span>
                </div>
                <div
                  className={clsx(
                    statuses[proposalKarbon.status],
                    "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {statusText[proposalKarbon.status]}
                </div>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
