import useSWR from "swr";

import { EmptyPlaceholder } from "../template/empty-placeholder";
import { LoadingPlaceholder } from "../template/loading-placeholder";
import { useUser } from "@/hooks/use-user";
import { RiArrowRightUpLine, RiCommunityLine } from "@remixicon/react";
import Link from "next/link";

const placeholderProps = {
  title: "No divisions found",
  description: "Create new divisions to get started",
};

type Division = {
  id: string;
  name: string;
  lokasi: string;
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
          <Link href={`/division/${division.id}`} className="flex justify-between gap-x-6 p-5">
            <div className="w-full flex min-w-0 gap-x-4">
              <RiCommunityLine className="w-10 h-10 text-gray-500" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{division.name}</p>
                <p className="flex text-xs leading-5 text-gray-500 truncate">{division.lokasi}</p>
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
