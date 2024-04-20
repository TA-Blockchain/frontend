import { Text } from "@tremor/react";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Vehicle } from "@/modules/vehicle/vehicle-list";
import { VehicleDetails } from "@/modules/vehicle/vehicle-details";

export default function VehicleDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: vehicle, isLoading } = useSWR<{ data: Vehicle }>(`/company/vehicle/detail/${id}`);

  if (!vehicle && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, kendaraan yang Anda cari tidak ditemukan." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Kendaraan</h1>
      <Text className="mt-0.5">Kelola detail mengenai kendaraan terkait.</Text>

      <div className="mt-4">
        <VehicleDetails details={vehicle?.data} isLoading={isLoading} />
      </div>
    </main>
  );
}

VehicleDetailsPage.title = "Rincian Kendaraan | Carbon Chain";
