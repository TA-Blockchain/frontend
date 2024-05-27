import useSWR from "swr";
import { EmptyPlaceholder } from "../../template/empty-placeholder";
import { LoadingPlaceholder } from "../../template/loading-placeholder";
import { RiArrowRightUpLine, RiFileLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";
import { ProposalKarbon, statuses } from "./proposal-karbon-list-readonly";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

const placeholderProps = {
  title: "Proposal penjualan karbon tidak ditemukan",
  description: "Proposal penjualan karbon Anda akan tercatat disini.",
};

export const statusText = {
  "0": "Menunggu Persetujuan Admin Kementerian",
  "1": "Dijual",
  "2": "Ditolak",
  "Sudah Habis": "Sudah Habis",
};

export function ProposalKarbonList({ status }: { status: "0" | "1" | "2" }) {
  const { data, isLoading } = useSWR<{ data: Array<ProposalKarbon> }>("/carbon_trading/sales-proposal");

  const {
    user: { idPerusahaan },
  } = useUser();

  const filteredData = data?.data.filter((proposalKarbon) => proposalKarbon.status === status) ?? [];

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (filteredData.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredData.map((proposalKarbon) => {
        const isOwner = proposalKarbon.idPerusahaan === idPerusahaan;
        return (
          <li key={proposalKarbon.id}>
            <Link href={`/marketplace/proposal/${proposalKarbon.id}`}>
              <Card className="group px-4 py-5">
                <div className="w-full flex items-center min-w-0 gap-x-4">
                  <RiFileLine className="shrink-0 w-10 h-10 text-gray-500" />
                  <div className="text-xs space-y-2 leading-5 text-gray-500">
                    <div className="flex items-center">
                      <span>Kuota yang dijual:</span>
                      <span className="inline-flex items-center rounded-full pl-1 pr-2 py-1 text-xs font-medium text-blue-700">
                        {getCarbonEmissionFormatted(proposalKarbon.kuotaYangDijual)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className={clsx(
                          statuses[proposalKarbon.status],
                          "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {statusText[proposalKarbon.status]}
                      </div>
                      {isOwner && (
                        <div
                          className={clsx(
                            "text-cyan-800 bg-cyan-50 ring-cyan-600/20",
                            "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
                          )}
                        >
                          Milik Anda
                        </div>
                      )}
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
        );
      })}
    </ul>
  );
}
