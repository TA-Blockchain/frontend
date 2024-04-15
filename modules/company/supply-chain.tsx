import React from "react";
import { Company } from "./list";
import { EmptyPlaceholder } from "../template/empty-placeholder";
import { Button } from "@tremor/react";
import { useUser } from "@/hooks/use-user";

const info = {
  title: "Data supply chain tidak ditemukan",
  description: "Ikut serta dalam supply chain untuk melihat data supply chain perusahaan.",
};

export function DetailSupplyChain({ details }: { details: Company | undefined }) {
  const {
    user: { idPerusahaan },
  } = useUser();

  if (!details) return null;

  const supplyChainIds = details.supplyChain;
  if (!supplyChainIds || supplyChainIds.length === 0) {
    const isOwner = details?.id === idPerusahaan;
    return (
      <EmptyPlaceholder
        {...info}
        button={isOwner ? <Button className="rounded-tremor-small">Buat supply chain</Button> : null}
      />
    );
  }

  return <div>supply-chain</div>;
}
