import { Tabs } from "@/components/tabs";
import { SupplyChainList } from "@/modules/supply-chain/supply-chain-list";
import { Text } from "@tremor/react";
import React from "react";

export default function SupplyChainPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Supply Chain</h1>
      <Text className="mt-0.5">Kelola supply chain perusahaan yang terdaftar di platform Carbon Chain.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Aktif", "Menunggu Persetujuan", "Ditolak"]}
          tabPanels={[
            () => <SupplyChainList status="approve" />,
            () => <SupplyChainList status="pending" />,
            () => <SupplyChainList status="reject" />,
          ]}
        />
      </div>
    </main>
  );
}

SupplyChainPage.title = "Manajemen Supply Chain | Carbon Chain";
