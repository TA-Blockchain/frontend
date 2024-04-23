import useSWR from "swr";

import { EmptyPlaceholder } from "../template/empty-placeholder";
import { LoadingPlaceholder } from "../template/loading-placeholder";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { RiArrowRightUpLine, RiCarLine } from "@remixicon/react";
import { Division } from "../divisions/division-list";
import { Card } from "@tremor/react";

const placeholderProps = {
  title: "Kendaraan tidak ditemukan",
  description: "Setiap kendaraan yang terdaftar akan tercatat disini.",
};

export type Vehicle = {
  id: string;
  divisi: Division;
  carModel: string;
  fuelType: string;
  kmUsage: string;
};

export function VehicleList() {
  const {
    user: { idDivisi },
  } = useUser();

  const { data, isLoading } = useSWR<{ data: Array<Vehicle> }>(`/company/vehicle/${idDivisi}`);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (data?.data.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data.map((vehicle) => (
        <li key={vehicle.id}>
          <Link href={`/vehicle/${vehicle.id}`}>
            <Card className="group px-4 py-5">
              <div className="w-full flex items-center min-w-0 gap-x-4">
                <RiCarLine className="shrink-0 w-10 h-10 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold leading-6 text-gray-900">{vehicle.carModel}</p>
                  <p className="flex text-xs leading-5 text-gray-500">
                    <span>{vehicle.fuelType}</span>
                    <span className="mx-1">•</span>
                    <span>{vehicle.kmUsage} KM</span>
                  </p>
                </div>
              </div>
              <span
                className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
                aria-hidden={true}
              >
                <RiArrowRightUpLine className="h-4 w-4" aria-hidden={true} />
              </span>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
