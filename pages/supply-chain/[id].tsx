import { Text } from "@tremor/react";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { SupplyChain } from "@/modules/supply-chain/supply-chain-list";
import { SupplyChainDetails } from "@/modules/supply-chain/details/supply-chain-details";

export default function SupplyChainDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: supplyChain, isLoading } = useSWR<{ data: SupplyChain }>(`/company/supply_chain/${id}`);

  if (!supplyChain && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, supply chain yang Anda cari tidak ditemukan." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Supply Chain</h1>
      <Text className="mt-0.5">Informasi umum dan pengelolaan supply chain terkait.</Text>

      <div className="mt-4">
        <SupplyChainDetails details={supplyChain?.data} isLoading={isLoading} />
      </div>
    </main>
  );
}

SupplyChainDetailsPage.title = "Rincian Supply Chain | Carbon Chain";
