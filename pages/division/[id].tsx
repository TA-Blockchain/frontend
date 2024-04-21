import { DivisionDetails } from "@/modules/divisions/division-details";
import { Division } from "@/modules/divisions/division-list";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import { VehicleListReadOnly } from "@/modules/vehicle/vehicle-list-read-only";
import { ShipmentListReadOnly } from "@/modules/shipment/shipment-list-read-only";
import { Info } from "@/components/info";

export default function DivisionDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: division, isLoading } = useSWR<{ data: Division }>(`/company/division/detail/${id}`);

  if (!division && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, divisi yang Anda cari tidak ditemukan." />;
  }

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
              <DivisionDetails details={division?.data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <VehicleListReadOnly idDivisi={id} />
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
                      <ShipmentListReadOnly idDivisi={id} type="divisi_pengirim" />
                    </TabPanel>
                    <TabPanel>
                      <ShipmentListReadOnly idDivisi={id} type="divisi_penerima" />
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

DivisionDetailsPage.title = "Division Details | Carbon Chain";
