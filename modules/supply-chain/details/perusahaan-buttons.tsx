import React from "react";
import { SupplyChain } from "../supply-chain-list";
import { useMutation } from "@/hooks/use-mutation";
import { useUser } from "@/hooks/use-user";
import { useOptimistic, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { Button } from "@tremor/react";
import { toast } from "sonner";

export function PerusahaanButtons({ details }: { details: SupplyChain }) {
  const { trigger, isMutating, data } = useMutation(`/company/supply_chain/approve_perusahaan/${details?.id}`);

  const { mutate: mutateList } = useOptimisticListUpdate("/company/supply_chain");
  const { mutate } = useOptimistic(`/company/supply_chain/${details?.id}`);

  const {
    user: { userType, ...rest },
  } = useUser();

  const hasPerusahaanApproved = details.proposalSupplyChain.some(
    (value) => value.id === rest.idPerusahaan && value.status === "approve"
  );

  const hasPerusahaanReject = details.proposalSupplyChain.some(
    (value) => value.id === rest.idPerusahaan && value.status === "reject"
  );

  const isPending = details.proposalSupplyChain.some(
    (value) => value.id === rest.idPerusahaan && value.status === "pending"
  );

  const pendingCount = details.proposalSupplyChain.filter((value) => value.status === "pending").length;

  return (
    userType === "admin-perusahaan" && (
      <div className="flex justify-end gap-2">
        {isPending && !data && (
          <Button
            loading={isMutating}
            onClick={async () => {
              await trigger({
                idSupplyChain: details.id,
                idPerusahaan: rest.idPerusahaan,
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

              toast.success("Anda menolak bergabung.");
            }}
            className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
          >
            Tolak proposal
          </Button>
        )}
        {!hasPerusahaanReject && !data && (
          <Button
            disabled={hasPerusahaanApproved}
            loading={isMutating}
            onClick={async () => {
              await trigger({
                idSupplyChain: details.id,
                idPerusahaan: rest.idPerusahaan,
                status: "approve",
              });

              if (pendingCount === 1) {
                mutateList(
                  {
                    status: "approve",
                  },
                  (item) => item.id === details.id
                );

                mutate({
                  status: "approve",
                });

                toast.success("Anda bergabung ke supply chain.");
              } else {
                toast.success("Menunggu perusahaan lainnya.");
              }
            }}
            className="rounded-tremor-small"
          >
            {isPending && "Ikut bergabung"}
            {hasPerusahaanApproved && "Menunggu Perusahaan Lainnya"}
            {hasPerusahaanReject && "Anda menolak proposal ini"}
          </Button>
        )}
      </div>
    )
  );
}
