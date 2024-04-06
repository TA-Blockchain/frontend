import React from "react";
import { Company } from "./list";
import { EmptyPlaceholder } from "../template/empty-placeholder";

const info = {
  title: "Emisi karbon kosong",
  description: "Perusahaan ini belum memiliki data emisi karbon.",
};

export function DetailEmisiKarbon({ details }: { details: Company | undefined }) {
  if (!details) return null;

  const emisiKarbon = details.emisiKarbon;
  if (!emisiKarbon) {
    return <EmptyPlaceholder {...info} />;
  }

  return <div>supply-chain</div>;
}
