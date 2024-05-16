import { Tabs } from "@/components/tabs";
import { useUser } from "@/hooks/use-user";
import { ProposalKarbonCompanyList } from "@/modules/marketplace/proposal/proposal-karbon-company-list";
import { ProposalKarbonList } from "@/modules/marketplace/proposal/proposal-karbon-list";
import { Text } from "@tremor/react";
import React from "react";

export default function MarketplaceTransactionPage() {
  const {
    user: { userType, idPerusahaan },
  } = useUser();

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Riwayat Transaksi Kuota Karbon</h1>
      <Text className="mt-0.5">Riwayat transaksi kuota karbon perusahaan Anda di platform Carbon Chain.</Text>

      {userType === "admin-perusahaan" && (
        <Tabs
          className="mt-2"
          tabList={["Selesai", "Menunggu Persetujuan", "Gagal"]}
          tabPanels={[
            () => <ProposalKarbonCompanyList idPerusahaan={idPerusahaan} />,
            () => <ProposalKarbonList status={"1"} />,
            () => <ProposalKarbonList status={"2"} />,
          ]}
        />
      )}
    </main>
  );
}

MarketplaceTransactionPage.title = "Transaksi Kuota Karbon | Carbon Chain";
