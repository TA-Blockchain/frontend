import React from "react";
import { LoadingDetailsPlaceholder } from "@/modules/template/loading-details-placeholder";

import { statuses, statusText } from "./transaksi-karbon-list";
import { getCarbonEmissionFormatted } from "@/lib";
import clsx from "clsx";
import { UserType, useUser } from "@/hooks/use-user";
import { Signature, TransaksiKarbonDetailsType } from "./types";
import { Steps } from "@/components/steps";
import { RiAttachment2 } from "@remixicon/react";
import { KementrianApproval } from "./kementrian-approval";
import { PerusahaanApproval } from "./perusahaan-approval";
import { Avatar } from "@/components/avatar";
import { TransactionInvoice } from "./transaksi-invoice";
import useSWR from "swr";
import { SmallLoadingPlaceholder } from "@/modules/template";
import Image from "next/image";

function getSteps(details: TransaksiKarbonDetailsType) {
  const steps = [
    {
      name: "Transaksi jual beli karbon dimulai",
      description: (
        <span>
          Perusahaan <b>{details.perusahaanPembeli.nama}</b> membeli kuota karbon sebanyak{" "}
          <b>{getCarbonEmissionFormatted(details.kuota)}</b>.
        </span>
      ),
      status: "complete",
    },
  ] as {
    name: string;
    description: string | React.ReactNode;
    status: "complete" | "current" | "upcoming";
  }[];

  switch (details.status) {
    case "reject":
      if (details.approvers.length > 0) {
        steps.push({
          name: "Menunggu persetujuan perusahaan penjual",
          description: (
            <span>Menunggu persetujuan dari perusahaan penjual untuk memverifikasi transaksi karbon terkait.</span>
          ),
          status: "complete",
        });
      }

      if (details.approvers.length > 1) {
        steps.push({
          name: "Menunggu persetujuan Kementrian",
          description: <span>Menunggu persetujuan dari Kementrian untuk memverifikasi transaksi karbon terkait.</span>,
          status: "complete",
        });
      }

      steps.push({
        name: "Transaksi jual beli dibatalkan",
        description: (
          <span>
            Transaksi jual beli kuota karbon <b>{details.id}</b> telah dibatalkan karena tidak mendapatkan persetujuan
            dari Perusahaan Penjual atau Kementrian.
          </span>
        ),
        status: "complete",
      });

      return steps;

    case "pending":
      steps.push({
        name: "Menunggu persetujuan perusahaan penjual",
        description: (
          <span>Menunggu persetujuan dari perusahaan penjual untuk memverifikasi transaksi karbon terkait.</span>
        ),
        status: "current",
      });
      return steps;

    case "approve penjual":
      steps.push({
        name: "Perusahaan penjual menyetujui transaksi karbon",
        description: (
          <span>
            Transaksi karbon terkait telah disetujui oleh perusahaan penjual. Menunggu persetujuan dari Kementrian.
          </span>
        ),
        status: "complete",
      });
      steps.push({
        name: "Menunggu persetujuan Kementrian",
        description: <span>Menunggu persetujuan dari Kementrian untuk memverifikasi transaksi karbon terkait.</span>,
        status: "current",
      });
      return steps;

    case "approve":
      steps.push({
        name: "Perusahaan penjual telah menyetujui transaksi karbon",
        description: (
          <span>
            Transaksi karbon terkait telah disetujui oleh perusahaan penjual. Menunggu persetujuan dari Kementrian.
          </span>
        ),
        status: "complete",
      });

      steps.push({
        name: "Transaksi karbon telah disetujui",
        description: (
          <span>
            Transaksi karbon sebesar <b>{getCarbonEmissionFormatted(details.kuota)}</b> telah disetujui oleh perusahaan
            pembeli dan Kementrian. Anda bisa melihat invoice transaksi di bagian bawah halaman.
          </span>
        ),
        status: "complete",
      });
      return steps;

    default:
      return steps;
  }
}

export function TransaksiKarbonDetails({
  details,
  isLoading,
}: {
  details: TransaksiKarbonDetailsType | undefined;
  isLoading: boolean;
}) {
  const {
    user: { userType },
  } = useUser();

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  const isApproved = details?.status === "approve";

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="transaction-details absolute inset-0 w-full h-full hidden">
        <TransaksiKarbonDetailsComponent details={details} />
      </div>

      <TransaksiKarbonDetailsComponent details={details} real />

      {isApproved && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-white relative">
          <dt className="text-sm font-medium leading-6 text-gray-900">Invoice</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <RiAttachment2 className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">invoice_transaksi_karbon.pdf</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <TransactionInvoice id={details.id} />
                </div>
              </li>
            </ul>
          </dd>
        </div>
      )}

      {userType === "admin-perusahaan" && <PerusahaanApproval details={details} />}
      {(userType === "staf-kementerian" || userType === "admin-kementerian") && (
        <KementrianApproval details={details} />
      )}
    </div>
  );
}

export function TransaksiKarbonDetailsComponent({
  details,
  real = false,
}: {
  details: TransaksiKarbonDetailsType;
  real?: boolean;
}) {
  const isCanceled = details?.status === "reject";

  return (
    <dl className={clsx("divide-y divide-gray-100", real && "relative bg-white z-10")}>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <p
            className={clsx(
              statuses[details?.status],
              !real && "transaction-status",
              "rounded-md w-fit my-1.5 px-1.5 py-0.5 text-xs font-medium border"
            )}
          >
            {statusText[details?.status]}
          </p>
        </dd>
      </div>

      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Riwayat Transaksi</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <Steps steps={getSteps(details)} isCanceled={isCanceled} />
        </dd>
      </div>

      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Kuota yang dibeli</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {getCarbonEmissionFormatted(details.kuota)}
          </span>
        </dd>
      </div>

      {real && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Bukti Transaksi</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <RiAttachment2 className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">bukti_transaksi.pdf</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={details.urlBuktiTransaksi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-tremor-brand hover:text-tremor-brand-emphasis"
                  >
                    Lihat
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      )}

      {real && details.approvers.length === 3 && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Approvers</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-wrap gap-4">
            {details.approvers.map((approver) => {
              return <UserInfo key={approver} id={approver} idPerusahaanPembeli={details.perusahaanPembeli.id} />;
            })}
          </dd>
        </div>
      )}

      {!real && details.approvers.length === 3 && (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Approver</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <p>Disetujui oleh:</p>
            <div className="w-full grid md:grid-cols-2 gap-4">
              {details.approvers.map((approver, index) => {
                return (
                  <UserInfoPDF
                    key={approver}
                    id={approver}
                    signature={details.signatures[index]}
                    idPerusahaanPembeli={details.perusahaanPembeli.id}
                  />
                );
              })}
            </div>
          </dd>
        </div>
      )}
    </dl>
  );
}

function UserInfo({ id, idPerusahaanPembeli }: { id: string; idPerusahaanPembeli: string }) {
  const { data, isLoading: isLoading } = useSWR<{
    data: {
      name: string;
      email: string;
      "data-admin": {
        idPerusahaan: string;
      };
      role: UserType;
    };
  }>(`/auth/user/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder amount={1} />;
  }

  if (!data) return null;

  const person = data?.data;
  const isPembeli = person["data-admin"]?.idPerusahaan === idPerusahaanPembeli;

  return (
    <div className="min-w-[320px] flex-1 flex justify-between gap-x-6 p-4 border shadow-sm rounded-md">
      <div className="flex gap-x-4 w-full">
        <Avatar />
        <div className="flex-1">
          <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
          <p className="flex text-xs leading-5 text-gray-500">
            <a href={`mailto:${person.email}`} className="truncate hover:underline">
              {person.email}
            </a>
          </p>
          <div className="mt-2 flex justify-end">
            {(person.role === "admin-kementerian" || person.role === "staf-kementerian") && (
              <div className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                Kementrian
              </div>
            )}
            {person.role === "admin-perusahaan" && (
              <div
                className={clsx(
                  isPembeli
                    ? "bg-cyan-50 text-cyan-700 ring-cyan-700/10"
                    : "bg-yellow-50 text-yellow-700 ring-yellow-700/10",
                  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {isPembeli ? "Pembeli" : "Penjual"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UserInfoPDF({
  id,
  signature,
  idPerusahaanPembeli,
}: {
  id: string;
  signature: Signature;
  idPerusahaanPembeli: string;
}) {
  const { data, isLoading: isLoading } = useSWR<{
    data: {
      name: string;
      email: string;
      "data-admin": {
        idPerusahaan: string;
      };
      role: UserType;
    };
  }>(`/auth/user/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder amount={1} />;
  }

  if (!data) return null;

  const person = data?.data;
  const isPembeli = person["data-admin"]?.idPerusahaan === idPerusahaanPembeli;

  const role =
    person.role === "admin-kementerian" || person.role === "staf-kementerian"
      ? "Kementrian"
      : isPembeli
      ? "Perusahaan Pembeli"
      : "Perusahaan Penjual";

  return (
    <div className="font-mono text-xs">
      <div className="relative py-2 mt-4">
        <Image src="/logo/cc-stamp.png" width={72} height={72} alt="carbon chain stamp" />
        <div className="absolute top-2 pb-4 left-14 overflow-hidden max-w-xs">
          <p>{signature.signTime}</p>
          <p className="max-w-[200px] break-words leading-4">{signature.signature}</p>
        </div>
      </div>

      <p>{role}</p>
      <a href={`mailto:${person.email}`} className="underline text-tremor-brand">
        {person.email}
      </a>
    </div>
  );
}
