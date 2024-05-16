import { Info } from "@/components/info";
import { ManagerList } from "@/modules/managers/manager-list";
import { CreateProposalKarbon } from "@/modules/marketplace/create-proposal-karbon";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Buat proposal penjualan karbon",
  description: "Setelah proposal disetujui oleh kementrian, perusahaan dapat menjual kuota karbon.",
};

export default function MarketplacePage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Jual Beli Kuota Karbon</h1>
      <Text className="mt-0.5">Kuota karbon perusahaan yang dijual di platform Carbon Chain.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <CreateProposalKarbon />
        </div>

        <Divider />

        <div>
          <Info title="Proposal penjualan Anda" />
          <ManagerList />
        </div>
      </div>
    </main>
  );
}

MarketplacePage.title = "Jual Beli Kuota Karbon | Carbon Chain";
