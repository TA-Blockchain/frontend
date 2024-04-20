import React from "react";
import { useMutation } from "@/hooks/use-mutation";
import { useUser } from "@/hooks/use-user";
import { useOptimistic } from "@/hooks/use-optimistic";
import { Button } from "@tremor/react";
import { toast } from "sonner";
import { Shipment } from "./shipment-list";

function replaceNullWithEmptyString(obj: { [key: string]: any }) {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = "";
    }
  }

  return obj;
}

export function ShipmentApproval({ details }: { details: Shipment }) {
  const { trigger, isMutating } = useMutation(`/company/shipment/${details?.id}`, undefined, {
    method: "PUT",
  });

  const { mutate } = useOptimistic(`/company/shipment/detail/${details?.id}`);

  const {
    user: { userType, idPerusahaan, idDivisi },
  } = useUser();

  const isOwner = details.idDivisiPengirim === idDivisi;
  const isRejected = details.status === "Rejected";
  const isPending = details.status === "Need Approval" && new Date(details.waktuBerangkat) < new Date();
  //   const canApprove = details.idDivisiPenerima === idDivisi;
  const canApprove = true;
  const isApproved = details.status === "Approved";

  return (
    userType === "manager-perusahaan" && (
      <div className="flex justify-end gap-2">
        {isOwner && !isRejected && (
          <Button
            loading={isMutating}
            onClick={async () => {
              await trigger({
                ...replaceNullWithEmptyString(details),
                status: "Rejected",
              });

              mutate({
                status: "Rejected",
              });

              toast.success("Anda membatalkan perjalanan.");
            }}
            className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
          >
            Batalkan
          </Button>
        )}
        {canApprove && (isPending || isApproved) && (
          <Button
            disabled={isApproved}
            loading={isMutating}
            onClick={async () => {
              await trigger({
                ...replaceNullWithEmptyString(details),
                status: "Approved",
              });

              mutate({
                status: "Approved",
              });

              toast.success("Anda telah menyelesaikan perjalanan.");
            }}
            className="rounded-tremor-small"
          >
            {isPending && "Selesaikan Perjalanan"}
            {isApproved && "Perjalanan Selesai"}
          </Button>
        )}
      </div>
    )
  );
}
