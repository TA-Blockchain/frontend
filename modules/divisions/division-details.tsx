import React from "react";
import { Division } from "./division-list";
import { useMutation } from "@/hooks/use-mutation";
import { Manager } from "../managers/manager-list";
import useSWR from "swr";

export function DivisionDetails({ details }: { details: Division }) {
  const { trigger } = useMutation(`/company/division/${details.id}`, undefined, {
    method: "DELETE",
  });

  const { data: allManagers } = useSWR<{ data: Array<Manager> }>("/auth/list/manager");

  const manager = allManagers?.data?.find((manager) => manager.id === details.manajer);

  return (
    <div>
      <div className="sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Rincian Divisi</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Informasi umum, kendaraan, dan riwayat perjalanan divisi terkait.
        </p>
      </div>
      <div className="mt-4 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nama Divisi</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.name}</dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Manajer</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a href={`mailto:${manager?.email}`} className="truncate hover:underline">
                {manager?.email}
              </a>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Alamat Lengkap</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{details.lokasi}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
