import useSWR from "swr";

import { Avatar } from "@/components/avatar";
import { EmptyPlaceholder } from "../template/empty-placeholder";
import { LoadingPlaceholder } from "../template/loading-placeholder";

const placeholderProps = {
  title: "Perjalanan tidak ditemukan",
  description: "Setiap perjalanan antar divisi akan tercatat disini.",
};

type Shipment = {
  id: string;
  idPerusahaan: string;
  idSupplyChain: string;
  idDivisiPengirim: string;
  idDivisiPenerima: string;
  status: "Need Approval" | "Approved" | "Rejected";
  waktuBerangkat: string;
  waktuSampai: string;
  idTransportasi: string;
  beratMuatan: number;
  emisiKarbon: number;
};

export function ShipmentListReadOnly({ idDivisi }: { idDivisi: string }) {
  const { data, isLoading } = useSWR<{ data: Array<Shipment> }>(`/company/shipment/${idDivisi}`);

  console.log(data);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (data?.data.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data.map((shipment) => (
        <li key={shipment.id} className="flex justify-between gap-x-6 p-5 border shadow-sm rounded-md">
          {/* <div className="flex min-w-0 gap-x-4">
            <Avatar />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{shipment.carModel}</p>
              <p className="flex text-xs leading-5 text-gray-500">
                <span>{shipment.fuelType}</span>
                <span className="mx-1">•</span>
                <span>{shipment.kmUsage} KM</span>
              </p>
            </div>
          </div> */}
        </li>
      ))}
    </ul>
  );
}
