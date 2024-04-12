import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { LoadingDetailsPlaceholder } from "../template/loading-details-placeholder";
import { statuses, statusText, SupplyChain } from "./supply-chain-list";
import clsx from "clsx";
import { Company, CompanyListItem } from "../company/list";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";
import { Button } from "@tremor/react";
import { toast } from "sonner";
import { useOptimistic, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { SmallLoadingPlaceholder } from "../template/small-loading-placeholder";

export function SupplyChainDetails({ details, isLoading }: { details: SupplyChain | undefined; isLoading: boolean }) {
  const { trigger, isMutating } = useMutation(`/company/supply_chain/approve_kementerian/${details?.id}`);

  const { mutate: mutateList } = useOptimisticListUpdate("/company/supply_chain");
  const { mutate } = useOptimistic(`/company/supply_chain/${details?.id}`);

  const {
    user: { userType },
  } = useUser();

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Nama</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Lorem</dd>
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
            <div className="sm:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quam harum aut, architecto illum facilis non
              alias illo aliquid voluptatibus? Dicta sed aliquam quisquam necessitatibus amet, doloribus porro sequi et.
            </div>
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

      {(userType === "admin-kementerian" || userType === "staf-kementerian") && (
        <div className="flex justify-end gap-2">
          {details.status === "pending" && (
            <Button
              loading={isMutating}
              onClick={async () => {
                await trigger({
                  ...details,
                  status: "reject",
                });
                mutateList(
                  {
                    status: "reject",
                  },
                  (item) => item.id === details.id
                );

                mutate({
                  status: "reject",
                });

                toast.success("Proposal supply chain ditolak.");
              }}
              className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
            >
              Tolak proposal
            </Button>
          )}
          {details.status !== "reject" && (
            <Button
              disabled={details.status === "Menunggu Persetujuan Perusahaan" || details.status === "approve"}
              loading={isMutating}
              onClick={async () => {
                await trigger({
                  ...details,
                  status: "Menunggu Persetujuan Perusahaan",
                });
                mutateList(
                  {
                    status: "Menunggu Persetujuan Perusahaan",
                  },
                  (item) => item.id === details.id
                );

                mutate({
                  status: "Menunggu Persetujuan Perusahaan",
                });

                toast.success("Proposal supply chain disetujui.");
              }}
              className="rounded-tremor-small"
            >
              {details.status === "pending" ? "Setujui Proposal" : "Proposal Sudah Disetujui"}
            </Button>
          )}
        </div>
      )}
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
