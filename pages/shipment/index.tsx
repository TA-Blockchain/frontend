import { Info } from "@/components/info";
import { ShipmentList } from "@/modules/shipment/shipment-list";
import { CreateShipment } from "@/modules/shipment/create-shipment";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Buat perjalanan baru",
  description: "Perjalanan adalah pengiriman barang antar divisi internal atau perusahaan lain.",
};

export default function ShipmentPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Perjalanan</h1>
      <Text className="mt-0.5">Kelola perjalanan yang keluar dan masuk ke divisi terkait.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <CreateShipment />
        </div>

        <Divider />

        <div>
          <Info title="Perjalanan yang tercatat" />
          <ShipmentList />
        </div>
      </div>
    </main>
  );
}

ShipmentPage.title = "Manajemen Perjalanan | Carbon Chain";
