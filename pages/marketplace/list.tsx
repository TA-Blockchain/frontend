import { DivisionDetails } from "@/modules/divisions/division-details";
import { Division } from "@/modules/divisions/division-list";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Text } from "@tremor/react";
import { VehicleListReadOnly } from "@/modules/vehicle/vehicle-list-read-only";
import { ShipmentListReadOnly } from "@/modules/shipment/shipment-list-read-only";
import { Info } from "@/components/info";
import { Tabs } from "@/components/tabs";

export default function DivisionDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: division, isLoading } = useSWR<{ data: Division }>(`/company/division/detail/${id}`);

  if (!division && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, rincian penjualan karbon yang Anda cari tidak ditemukan." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Divisi</h1>
      <Text className="mt-0.5">Informasi umum, kendaraan, dan riwayat perjalanan divisi terkait.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Rincian", "Kendaraan", "Riwayat Perjalanan"]}
          tabPanels={[
            () => <DivisionDetails details={division?.data} isLoading={isLoading} />,
            () => <VehicleListReadOnly idDivisi={id} />,
            () => (
              <div className="mt-4">
                <Info
                  title="Perjalanan yang tercatat"
                  description="Perjalanan adalah pengiriman barang antar divisi internal atau perusahaan lain."
                />
                <Tabs
                  className="mt-2"
                  prefix="shipment"
                  tabList={["Menuju", "Mendatang"]}
                  tabPanels={[
                    () => <ShipmentListReadOnly idDivisi={id} type="divisi_pengirim" />,
                    () => <ShipmentListReadOnly idDivisi={id} type="divisi_penerima" />,
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

DivisionDetailsPage.title = "Rincian Penjualan Karbon | Carbon Chain";
