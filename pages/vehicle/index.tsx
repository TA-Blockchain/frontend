import { Info } from "@/components/info";
import { CreateVehicle } from "@/modules/vehicle/create-vehicle";
import { VehicleList } from "@/modules/vehicle/vehicle-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Buat kendaraan baru",
  description: "Kendaraan adalah alat transportasi yang digunakan untuk mengirim barang ke divisi lain.",
};

export default function VehiclePage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Kendaraan</h1>
      <Text className="mt-0.5">Kelola kendaraan yang dimiliki divisi terkait.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <CreateVehicle />
        </div>

        <Divider />

        <div>
          <Info title="Kendaraan yang terdaftar" />
          <VehicleList />
        </div>
      </div>
    </main>
  );
}

VehiclePage.title = "Manajemen Kendaraan | Carbon Chain";
