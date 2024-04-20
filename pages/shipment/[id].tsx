import { Text } from "@tremor/react";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Shipment } from "@/modules/shipment/shipment-list";
import { ShipmentDetails } from "@/modules/shipment/shipment-details";

export default function ShipmentDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: shipment, isLoading } = useSWR<{ data: Shipment }>(`/company/shipment/detail/${id}`);

  if (!shipment && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, perjalanan yang Anda cari tidak ditemukan." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Perjalanan</h1>
      <Text className="mt-0.5">Kelola detail dan setujui perjalanan terkait.</Text>

      <div className="mt-4">
        <ShipmentDetails details={shipment?.data} isLoading={isLoading} />
      </div>
    </main>
  );
}

ShipmentDetailsPage.title = "Rincian Perjalanan | Carbon Chain";
