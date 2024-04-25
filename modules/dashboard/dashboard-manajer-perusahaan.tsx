import React from "react";
import { useUser } from "@/hooks/use-user";
import useSWR from "swr";
import { Text } from "@tremor/react";
import { Division } from "@/modules/divisions/division-list";
import { VehicleListReadOnly } from "@/modules/vehicle/vehicle-list-read-only";
import { ShipmentListReadOnly } from "@/modules/shipment/shipment-list-read-only";
import { Info } from "@/components/info";
import { DivisionDetailsManager } from "@/modules/divisions/division-details-manager";
import { Tabs } from "@/components/tabs";

export default function DashboardManajerPerusahaan() {
  const {
    user: { idDivisi },
  } = useUser();

  const { data: division, isLoading } = useSWR<{ data: Division }>(`/company/division/detail/${idDivisi}`);

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Divisi</h1>
      <Text className="mt-0.5">Informasi umum, kendaraan, dan riwayat perjalanan divisi terkait.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Rincian", "Kendaraan", "Riwayat Perjalanan"]}
          tabPanels={[
            () => <DivisionDetailsManager details={division?.data} isLoading={isLoading} />,
            () => <VehicleListReadOnly idDivisi={idDivisi} />,
            () => (
              <div key="perjalanan" className="mt-4">
                <Info
                  title="Perjalanan yang tercatat"
                  description="Perjalanan adalah pengiriman barang antar divisi internal atau perusahaan lain."
                />
                <Tabs
                  className="mt-2"
                  prefix="shipment"
                  tabList={["Menuju", "Mendatang"]}
                  tabPanels={[
                    () => <ShipmentListReadOnly idDivisi={idDivisi} type="divisi_pengirim" />,
                    () => <ShipmentListReadOnly idDivisi={idDivisi} type="divisi_penerima" />,
                  ]}
                />
              </div>
            ),
          ]}
        />
      </div>
    </main>
  );
}
