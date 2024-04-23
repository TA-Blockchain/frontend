import React from "react";
import { useUser } from "@/hooks/use-user";
import useSWR from "swr";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import { Division } from "@/modules/divisions/division-list";
import { VehicleListReadOnly } from "@/modules/vehicle/vehicle-list-read-only";
import { ShipmentListReadOnly } from "@/modules/shipment/shipment-list-read-only";
import { Info } from "@/components/info";
import { DivisionDetailsManager } from "@/modules/divisions/division-details-manager";

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
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Rincian</Tab>
            <Tab>Kendaraan</Tab>
            <Tab>Riwayat Perjalanan</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DivisionDetailsManager details={division?.data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <VehicleListReadOnly idDivisi={idDivisi} />
            </TabPanel>
            <TabPanel>
              <div className="mt-4">
                <Info
                  title="Perjalanan yang tercatat"
                  description="Perjalanan adalah pengiriman barang antar divisi internal atau perusahaan lain."
                />
                <TabGroup className="mt-2">
                  <TabList>
                    <Tab>Menuju</Tab>
                    <Tab>Mendatang</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <ShipmentListReadOnly idDivisi={idDivisi} type="divisi_pengirim" />
                    </TabPanel>
                    <TabPanel>
                      <ShipmentListReadOnly idDivisi={idDivisi} type="divisi_penerima" />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}
