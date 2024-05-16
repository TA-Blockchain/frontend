import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Text } from "@tremor/react";
import { ProposalKarbonDetails } from "@/modules/marketplace/proposal/proposal-karbon-details";
import { ProposalKarbon } from "@/modules/marketplace/proposal/proposal-karbon-list-readonly";

export default function ProposalKarbonDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: proposalKarbon, isLoading } = useSWR<{ data: ProposalKarbon }>(`/carbon_trading/sales-proposal/${id}`);

  if (!proposalKarbon && !isLoading) {
    return (
      <NotFoundPlaceholder description="Maaf, rincian proposal penjualan karbon yang Anda cari tidak ditemukan." />
    );
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Proposal Penjualan Karbon</h1>
      <Text className="mt-0.5">Informasi umum mengenai proposal penjualan karbon perusahaan terkait.</Text>

      <div className="mt-4">
        <ProposalKarbonDetails details={proposalKarbon?.data} isLoading={isLoading} />
      </div>
    </main>
  );
}

ProposalKarbonDetailsPage.title = "Rincian Proposal Penjualan Karbon | Carbon Chain";
