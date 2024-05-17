import { Tabs } from "@/components/tabs";
import { useUser } from "@/hooks/use-user";
import { TransaksiKarbonList } from "@/modules/marketplace/transaction/transaksi-karbon-list";
import { TransaksiKarbonListKementrian } from "@/modules/marketplace/transaction/transaksi-karbon-list-kementrian";
import { Text } from "@tremor/react";
import React from "react";

const subtitle = {
  "admin-perusahaan": "Riwayat transaksi jual beli kuota karbon perusahaan Anda di platform Carbon Chain.",
  "admin-kementerian": "Riwayat transaksi jual beli kuota karbon yang terdaftar di platform Carbon Chain",
  "staf-kementerian": "Riwayat transaksi jual beli kuota karbon yang terdaftar di platform Carbon Chain",
  "manager-perusahaan": "",
};

export default function MarketplaceTransactionPage() {
  const {
    user: { userType },
  } = useUser();

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Riwayat Transaksi Kuota Karbon</h1>
      <Text className="mt-0.5">{subtitle[userType]}</Text>

      {userType === "admin-perusahaan" && (
        <Tabs
          className="mt-2"
          tabList={["Selesai", "Menunggu Persetujuan", "Gagal"]}
          tabPanels={[
            () => <TransaksiKarbonList status={"approve"} />,
            () => <TransaksiKarbonList status={"pending"} />,
            () => <TransaksiKarbonList status={"reject"} />,
          ]}
        />
      )}

      {(userType === "staf-kementerian" || userType === "admin-kementerian") && (
        <Tabs
          className="mt-2"
          tabList={["Selesai", "Menunggu Persetujuan", "Gagal"]}
          tabPanels={[
            () => <TransaksiKarbonListKementrian status={"approve"} />,
            () => <TransaksiKarbonListKementrian status={"approve penjual"} />,
            () => <TransaksiKarbonListKementrian status={"reject"} />,
          ]}
        />
      )}
    </main>
  );
}

MarketplaceTransactionPage.title = "Transaksi Kuota Karbon | Carbon Chain";
