import React from "react";
import { Company } from "./list";
import { EmptyPlaceholder } from "@/modules/template/empty-placeholder";
import useSWR from "swr";
import { LoadingPlaceholder } from "@/modules/template/loading-placeholder";
import { RiTruckLine } from "@remixicon/react";
import { Shipment } from "@/modules/shipment/shipment-list";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { getReadableDateTime } from "@/lib";

const placeholderProps = {
  title: "Emisi karbon kosong",
  description: "Perusahaan ini belum memiliki data emisi karbon.",
};

type CarbonEmission = {
  id: string;
  perjalanan: Array<Shipment>;
  perusahaan: string;
  totalEmisi: number;
  isEmpty: boolean;
};

export function DetailEmisiKarbon({ details }: { details: Company | undefined }) {
  const { data, isLoading } = useSWR<{ data: CarbonEmission[] }>(`/company/carbon_emission/perusahaan/${details?.id}`);
  const router = useRouter();

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (data?.data?.[0].isEmpty || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  const perjalanan = data?.data?.[0].perjalanan.reverse() ?? [];

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {perjalanan.toReversed().map((shipment) => {
        return (
          <li key={shipment.id} className="px-1 even:bg-gray-50 flex items-center justify-between gap-x-6 py-5">
            <div className="flex items-center gap-4">
              <RiTruckLine className="w-8 h-8 text-gray-700" />
              <div className="space-y-1">
                <p className="mt-0.5 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  {getReadableDateTime(shipment.waktuSampai)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {shipment.emisiKarbon.toFixed(3)} kgCO2e
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {shipment.beratMuatan} kg
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => router.push(`/shipment/${shipment.id}`)}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition block"
              >
                Lihat rincian
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
