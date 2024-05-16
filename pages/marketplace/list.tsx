import { Tabs } from "@/components/tabs";
import { useUser } from "@/hooks/use-user";
import { ProposalKarbonCompanyList } from "@/modules/marketplace/proposal/proposal-karbon-company-list";
import { ProposalKarbonList } from "@/modules/marketplace/proposal/proposal-karbon-list";
import { Button, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function MarketplaceListPage() {
  const {
    user: { userType, idPerusahaan },
  } = useUser();

  const router = useRouter();

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Jual Beli Kuota Karbon</h1>
      <Text className="mt-0.5">Kuota karbon perusahaan yang dijual di platform Carbon Chain.</Text>

      <Button onClick={() => router.push("/marketplace/transaction")} className="rounded-tremor-small mt-4">
        Lihat semua transaksi
      </Button>

      {userType === "admin-perusahaan" && (
        <Tabs
          className="mt-2"
          tabList={["Milik Anda", "Semua"]}
          tabPanels={[
            () => <ProposalKarbonCompanyList idPerusahaan={idPerusahaan} />,
            () => <ProposalKarbonList status={"1"} />,
          ]}
        />
      )}

      {(userType === "admin-kementerian" || userType === "staf-kementerian") && <ProposalKarbonList status={"1"} />}
    </main>
  );
}

MarketplaceListPage.title = "Jual Beli Kuota Karbon | Carbon Chain";
