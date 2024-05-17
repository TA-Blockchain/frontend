import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { useUser } from "@/hooks/use-user";
import { useOptimistic } from "@/hooks/use-optimistic";
import { Button } from "@tremor/react";
import { toast } from "sonner";
import { TransaksiKarbonDetailsType } from "./types";

export function KementrianApproval({ details }: { details: TransaksiKarbonDetailsType }) {
  const { trigger, isMutating } = useMutation("/carbon_trading/transactions/verifikasi_transfer_karbon_kementrian");

  const { mutate } = useOptimistic(`/carbon_trading/transactions/${details.id}`);

  const {
    user: { userType, id: idApprover },
  } = useUser();

  const canApprove = userType === "admin-kementerian" || userType === "staf-kementerian";
  const isPending = details.status === "approve penjual";
  const isApproved = details.status === "approve";

  if (!canApprove) return null;

  return (
    <div className="flex justify-end gap-2 bg-white relative pb-6">
      {isPending && (
        <Button
          loading={isMutating}
          onClick={async () => {
            await trigger({
              id: details.id,
              status: "reject",
            });

            mutate({
              status: "reject",
            });

            toast.success("Anda menolak transaksi karbon terkait.");
          }}
          className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
        >
          Tolak
        </Button>
      )}
      {(isPending || isApproved) && (
        <Button
          disabled={isApproved}
          loading={isMutating}
          onClick={async () => {
            await trigger({
              id: details.id,
              status: "approve",
              idApproval: idApprover,
            });

            mutate({
              status: "approve",
            });

            toast.success("Anda menyetujui transaksi karbon terkait.");
          }}
          className="rounded-tremor-small"
        >
          {isPending && "Setujui"}
          {isApproved && "Transaksi karbon disetujui"}
        </Button>
      )}
    </div>
  );
}
