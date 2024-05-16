import { Info } from "@/components/info";
import { Tabs } from "@/components/tabs";
import { useUser } from "@/hooks/use-user";
import { CreateProposalKarbon } from "@/modules/marketplace/create-proposal-karbon";
import KuotaCarbonCard from "@/modules/marketplace/kuota-carbon-card";
import { ProposalKarbonList } from "@/modules/marketplace/proposal-karbon-list";
import { ProposalKarbonListReadOnly } from "@/modules/marketplace/proposal-karbon-list-readonly";
import { Button, Divider, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import React from "react";

const info = {
  "admin-perusahaan": {
    title: "Buat proposal penjualan karbon",
    description: "Setelah proposal disetujui oleh kementrian, perusahaan dapat menjual kuota karbon.",
  },
};

const title = {
  "admin-perusahaan": "Jual Beli Kuota Karbon",
  "admin-kementerian": "Manajemen Jual Beli Penjualan Karbon",
  "staf-kementerian": "Manajemen Jual Beli Penjualan Karbon",
  "manager-perusahaan": "",
};

const subtitle = {
  "admin-perusahaan": "Kuota karbon perusahaan yang dijual di platform Carbon Chain.",
  "admin-kementerian": "Penjualan Kuota karbon perusahaan yang terdaftar di platform Carbon Chain.",
  "staf-kementerian": "Penjualan Kuota karbon perusahaan yang terdaftar di platform Carbon Chain.",
  "manager-perusahaan": "",
};

export default function MarketplacePage() {
  const {
    user: { idPerusahaan, userType },
  } = useUser();

  const router = useRouter();
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">{title[userType]}</h1>
      <Text className="mt-0.5">{subtitle[userType]}</Text>

      <Button onClick={() => router.push("/marketplace/list")} className="rounded-tremor-small mt-4">
        Beli kuota karbon
      </Button>

      <div className="mt-8 space-y-8">
        {userType === "admin-perusahaan" && (
          <>
            <Divider />
            <div className="space-y-4">
              <div>
                <Info
                  title="Buat proposal penjualan kuota karbon"
                  description="Anda dapat menjual kuota karbon setelah proposal disetujui oleh kementrian."
                />
              </div>
              <KuotaCarbonCard id={idPerusahaan} />
              <Info {...info} />
              <CreateProposalKarbon idPerusahaan={idPerusahaan} />
            </div>
          </>
        )}

        <Divider />

        <div>
          {userType === "admin-perusahaan" && (
            <>
              <Info title="Proposal penjualan Anda" />
              <ProposalKarbonListReadOnly idPerusahaan={idPerusahaan} />
            </>
          )}

          {(userType === "admin-kementerian" || userType === "staf-kementerian") && (
            <>
              <Info
                title="Daftar proposal penjualan kuota karbon"
                description="Kelola proposal penjualan kuota karbon perusahaan yang terdaftar di platform Carbon Chain."
              />
              <Tabs
                className="mt-2"
                tabList={["Disetujui", "Menunggu Persetujuan", "Ditolak"]}
                tabPanels={[
                  () => <ProposalKarbonList status={"1"} />,
                  () => <ProposalKarbonList status={"0"} />,
                  () => <ProposalKarbonList status={"2"} />,
                ]}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

MarketplacePage.title = "Jual Beli Kuota Karbon | Carbon Chain";
