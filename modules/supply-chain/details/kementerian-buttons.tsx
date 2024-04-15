import React from "react";
import { SupplyChain } from "../supply-chain-list";
import { useMutation } from "@/hooks/use-mutation";
import { useUser } from "@/hooks/use-user";
import { useOptimistic, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { Button } from "@tremor/react";
import { toast } from "sonner";

export function KementerianButtons({ details }: { details: SupplyChain }) {
  const { trigger, isMutating } = useMutation(`/company/supply_chain/approve_kementerian/${details?.id}`);

  const { mutate: mutateList } = useOptimisticListUpdate("/company/supply_chain");
  const { mutate } = useOptimistic(`/company/supply_chain/${details?.id}`);

  const {
    user: { userType },
  } = useUser();

  return (
    (userType === "admin-kementerian" || userType === "staf-kementerian") && (
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
            {details.status === "pending" && "Setujui Proposal"}
            {details.status === "Menunggu Persetujuan Perusahaan" && "Proposal Sudah Disetujui"}
            {details.status === "approve" && "Supply Chain Sudah Disetujui"}
          </Button>
        )}
      </div>
    )
  );
}
