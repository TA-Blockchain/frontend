import { SupplyChainList } from "@/modules/supply-chain/supply-chain-list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import React from "react";

export default function SupplyChainPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Supply Chain</h1>
      <Text className="mt-0.5">Kelola supply chain perusahaan yang terdaftar di platform Carbon Chain.</Text>

      <div className="mt-4">
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Aktif</Tab>
            <Tab>Menunggu Persetujuan</Tab>
            <Tab>Ditolak</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SupplyChainList status="approve" />
            </TabPanel>
            <TabPanel>
              <SupplyChainList status="pending" />
            </TabPanel>
            <TabPanel>
              <SupplyChainList status="reject" />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}

SupplyChainPage.title = "Manajemen Supply Chain | Carbon Chain";
