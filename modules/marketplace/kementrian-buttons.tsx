import React from "react";
import { ProposalKarbon } from "./proposal-karbon-list";
import { useMutation } from "@/hooks/use-mutation";
import { useUser } from "@/hooks/use-user";
import { useOptimistic, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { Button } from "@tremor/react";
import { toast } from "sonner";

export function KementerianButtons({ details }: { details: ProposalKarbon }) {
  const { trigger, isMutating } = useMutation(`/carbon_trading/sales-proposal/${details?.id}`, undefined, {
    method: "PUT",
  });

  const { mutate: mutateList } = useOptimisticListUpdate("/carbon_trading/sales-proposal");
  const { mutate } = useOptimistic(`/carbon_trading/sales-proposal/${details?.id}`);

  const {
    user: { userType },
  } = useUser();

  return (
    (userType === "admin-kementerian" || userType === "staf-kementerian") && (
      <div className="flex justify-end gap-2">
        {details.status === "0" && (
          <Button
            loading={isMutating}
            onClick={async () => {
              await trigger({
                ...details,
                status: "2",
              });
              mutateList(
                {
                  status: "2",
                },
                (item) => item.id === details.id
              );

              mutate({
                status: "2",
              });

              toast.success("Proposal penjualan karbon ditolak.");
            }}
            className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
          >
            Tolak proposal
          </Button>
        )}
        {details.status !== "2" && (
          <Button
            disabled={details.status === "1"}
            loading={isMutating}
            onClick={async () => {
              await trigger({
                ...details,
                status: "1",
              });
              mutateList(
                {
                  status: "1",
                },
                (item) => item.id === details.id
              );

              mutate({
                status: "1",
              });

              toast.success("Proposal penjualan karbon disetujui.");
            }}
            className="rounded-tremor-small"
          >
            {details.status === "0" && "Setujui Proposal"}
            {details.status === "1" && "Proposal Sudah Disetujui"}
          </Button>
        )}
      </div>
    )
  );
}
