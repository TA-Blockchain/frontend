import useSWR from "swr";

import { useRouter } from "next/navigation";
import { LoadingPlaceholder } from "../template/loading-placeholder";
import { EmptyPlaceholder } from "../template/empty-placeholder";
import { RiArrowRightUpLine, RiBuilding2Line } from "@remixicon/react";
import { Card } from "@tremor/react";
import clsx from "clsx";
import Link from "next/link";

const approvedPlaceholderProps = {
  title: "Belum ada supply chain yang terdaftar",
  description: (
    <>
      Proposal supply chain yang masuk akan ditampilkan di tab <b>Menunggu Persetujuan</b>.
    </>
  ),
};

const waitingForApprovalPlaceholderProps = {
  title: "Proposal supply chain kosong",
  description: "Proposal supply chain yang masuk akan ditampilkan di halaman ini.",
};

const rejectedPlaceholderProps = {
  title: "Proposal supply chain kosong",
  description: "Proposal supply chain yang ditolak akan ditampilkan di halaman ini.",
};

export const statuses = {
  pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  "Menunggu Persetujuan Perusahaan": "text-orange-700 bg-orange-50 ring-orange-600/20",
  reject: "text-red-700 bg-red-50 ring-red-600/20",
  approve: "text-green-700 bg-green-50 ring-green-600/20",
};

export const statusText = {
  pending: "Menunggu Persetujuan Admin Kementerian",
  "Menunggu Persetujuan Perusahaan": "Menunggu Persetujuan Perusahaan",
  reject: "Ditolak",
  approve: "Disetujui",
};

export type SupplyChain = {
  id: string;
  listPerusahaan: Array<string>;
  status: "pending" | "Menunggu Persetujuan Perusahaan" | "reject" | "approve";
  proposalSupplyChain: Array<{
    id: string;
    status: "pending" | "reject" | "approve";
  }>;
};

type SupplyChainListProps = {
  status: "pending" | "reject" | "approve";
};

export function SupplyChainList({ status }: SupplyChainListProps) {
  const { data, isLoading } = useSWR<{ data: Array<SupplyChain> }>("/company/supply_chain");

  const router = useRouter();

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  const supplyChains = data?.data.filter((sc) => {
    if (status === "pending") {
      return sc.status === "pending" || sc.status === "Menunggu Persetujuan Perusahaan";
    }
    return sc.status === status;
  });

  if (supplyChains?.length === 0 || !data) {
    if (status === "pending") {
      return <EmptyPlaceholder {...waitingForApprovalPlaceholderProps} />;
    } else if (status === "approve") {
      return <EmptyPlaceholder {...approvedPlaceholderProps} />;
    }
    return <EmptyPlaceholder {...rejectedPlaceholderProps} />;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {supplyChains?.map((sc) => (
        <Link href={`/supply-chain/${sc.id}`} key={sc.id}>
          <Card className="group px-4 pt-5 pb-1">
            <div className="flex space-x-2">
              <div className="p-2 shrink-0">
                <RiBuilding2Line className="w-12 h-12 text-gray-600" />
              </div>
              <div className="mt-1 overflow-hidden">
                <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Lorem Ipsum
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-tremor-content dark:text-dark-tremor-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate delectus consequuntur, modi
                  excepturi aut natus mollitia accusantium adipisci earum tenetur inventore, ipsa ullam repudiandae
                  laudantium autem iure reprehenderit? Aut.
                </p>
              </div>
            </div>
            <div className="mt-2 grid place-items-end divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border">
              <div className="py-2">
                <p
                  className={clsx(
                    statuses[sc.status],
                    "max-sm:hidden rounded-md w-fit mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {statusText[sc.status]}
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
      ))}
    </div>
  );
}
