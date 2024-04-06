import React from "react";
import { Company } from "./list";
import { EmptyPlaceholder } from "../template/empty-placeholder";

const info = {
  title: "Data supply chain tidak ditemukan",
  description: "Ikut serta dalam supply chain untuk melihat data supply chain perusahaan.",
};

export function DetailSupplyChain({ details }: { details: Company | undefined }) {
  if (!details) return null;

  const supplyChainIds = details.supplyChain;
  if (!supplyChainIds || supplyChainIds.length === 0) {
    return <EmptyPlaceholder {...info} />;
  }

  return <div>supply-chain</div>;
}
