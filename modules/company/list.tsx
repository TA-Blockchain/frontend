import useSWR from "swr";
import { CompanyListEmpty } from "./list-empty";
import { CompanyListSkeleton } from "./list-skeleton";
import clsx from "clsx";
import { ProposalModal } from "./proposal-modal";
import { RiBuildingLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

const statuses = {
  0: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  1: "text-green-700 bg-green-50 ring-green-600/20",
};

const statusText = {
  0: "Waiting for approval",
  1: "Approved",
};

export type Company = {
  id: string;
  nomorTelepon: string;
  email: string;
  nama: string;
  lokasi: string;
  deskripsi: string;
  urlSuratProposal: string;
  approvalStatus: 0 | 1;
  participantStatus: number;
  supplyChain: Array<any>;
  proposalSupplyChain: Array<any>;
  emisiKarbon: string;
  adminPerusahaan: {
    id: string;
    username: string;
  };
  kuota: number;
  sisaKuota: number;
};

type CompanyListProps = {
  status: 0 | 1;
};

export function CompanyList({ status }: CompanyListProps) {
  const { data, isLoading } = useSWR<{ data: Array<Company> }>("/company");

  const router = useRouter();

  if (isLoading) {
    return <CompanyListSkeleton />;
  }

  const companies = data?.data.filter((company) => company.approvalStatus === status);

  if (companies?.length === 0 || !data) {
    return <CompanyListEmpty />;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {companies?.map((company) => (
        <li key={company.id} className="px-1 even:bg-gray-50 flex items-center justify-between gap-x-6 py-5">
          <div className="flex items-center gap-4">
            <RiBuildingLine className="w-8 h-8 text-gray-500" />
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{company.nama}</p>
                <p
                  className={clsx(
                    statuses[company.approvalStatus],
                    "max-sm:hidden rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {statusText[company.approvalStatus]}
                </p>
              </div>
              <p className="mt-0.5 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <a href={`mailto:${company.email}`} className="truncate hover:underline">
                  {company.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            {company.approvalStatus === 0 && <ProposalModal {...company} />}
            {company.approvalStatus === 1 && (
              <button
                onClick={() => router.push(`/company/${company.id}`)}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition block"
              >
                View company<span className="sr-only">, {company.nama}</span>
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
