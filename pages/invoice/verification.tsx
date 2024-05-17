import React from "react";
import { Text } from "@tremor/react";
import { Tabs } from "@/components/tabs";
import { ShipmentVerification } from "@/modules/verification/shipment-verification";
import { CarbonTransactionVerification } from "@/modules/verification/carbon-transaction-verification";

export default function Verification() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Verifikasi Invoice</h1>
      <Text className="mt-0.5">Verifikasi invoice perjalanan dan transaksi jual beli kuota karbon.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Invoice Perjalanan", "Invoice Transaksi Karbon"]}
          tabPanels={[() => <ShipmentVerification />, () => <CarbonTransactionVerification />]}
        />
      </div>
    </main>
  );
}

Verification.title = "Verifikasi Invoice | Carbon Chain";
