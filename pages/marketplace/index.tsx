import { Info } from "@/components/info";
import { useUser } from "@/hooks/use-user";
import { ManagerList } from "@/modules/managers/manager-list";
import { CreateProposalKarbon } from "@/modules/marketplace/create-proposal-karbon";
import { ProposalKarbonListReadOnly } from "@/modules/marketplace/proposal-karbon-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Buat proposal penjualan karbon",
  description: "Setelah proposal disetujui oleh kementrian, perusahaan dapat menjual kuota karbon.",
};

export default function MarketplacePage() {
  const {
    user: { idPerusahaan, userType },
  } = useUser();
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
          {userType === "admin-perusahaan" && (
            <>
              <Info title="Proposal penjualan Anda" />
              <ProposalKarbonListReadOnly idPerusahaan={idPerusahaan} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

MarketplacePage.title = "Jual Beli Kuota Karbon | Carbon Chain";
