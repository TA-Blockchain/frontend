import useSWR from "swr";

import { EmptyPlaceholder } from "../template/empty-placeholder";
import { LoadingPlaceholder } from "../template/loading-placeholder";
import { useUser } from "@/hooks/use-user";
import { RiArrowRightUpLine, RiCommunityLine } from "@remixicon/react";
import Link from "next/link";

const placeholderProps = {
  title: "Divisi belum tersedia",
  description: "Tambahkan divisi perusahaan Anda untuk memulai.",
};

export type Division = {
  id: string;
  name: string;
  lokasi: string;
  perusahaan: string;
  lat: string;
  long: string;
  manajer: string;
};

export function DivisionList() {
  const {
    user: { idPerusahaan },
  } = useUser();
  const { data, isLoading } = useSWR<{ data: Array<Division> }>(`/company/division/${idPerusahaan}`);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (data?.data.length === 0 || !data) {
    return <EmptyPlaceholder {...placeholderProps} />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data.map((division) => (
        <li
          key={division.id}
          className="group relative hover:border-tremor-brand-subtle transition border shadow-sm rounded-md"
        >
          <Link href={`/division/${division.id}`} className="h-full flex justify-between gap-x-6 p-5">
            <div className="w-full flex items-center min-w-0 gap-x-4">
              <RiCommunityLine className="shrink-0 w-10 h-10 text-gray-500" />
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900">{division.name}</p>
                <p className="text-xs leading-5 text-gray-500 line-clamp-2">{division.lokasi}</p>
              </div>
            </div>
            <span
              className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle transition group-hover:text-tremor-brand-subtle"
              aria-hidden={true}
            >
              <RiArrowRightUpLine className="h-4 w-4" aria-hidden={true} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
