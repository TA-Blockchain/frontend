import React from "react";
import { Company, statuses, statusText } from "./list";
import { RiAttachment2 } from "@remixicon/react";
import clsx from "clsx";
import { LoadingDetailsPlaceholder } from "@/modules/template";
import { Button, NumberInput } from "@tremor/react";
import { useMutation } from "@/hooks/use-mutation";
import { useOptimistic, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { getCarbonEmissionFormatted } from "@/lib";
import { KuotaCarbonCard } from "@/modules/marketplace/kuota-carbon-card";
import { UpdateCompanyDetails } from "./update-details";

export function CompanyDetails({ details, isLoading }: { details: Company | undefined; isLoading: boolean }) {
  const [kuota, setKuota] = React.useState<number>();

  const { trigger, isMutating } = useMutation(`/company/approve/${details?.id}`, undefined, {
    method: "PUT",
  });

  const { trigger: reject, isMutating: isRejecting } = useMutation(`/company/reject/${details?.id}`, undefined, {
    method: "PUT",
  });

  const { mutate: mutateList } = useOptimisticListUpdate("/company");
  const { mutate } = useOptimistic(`/company/${details?.id}`);

  const {
    user: { userType, idPerusahaan },
  } = useUser();

  if (isLoading) {
    return <LoadingDetailsPlaceholder />;
  }

  if (!details) return null;

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await trigger({
            kuota,
          });
          mutateList(
            {
              approvalStatus: 1,
              kuota,
              sisaKuota: kuota,
            },
            (item) => item.id === details.id
          );

          mutate({
            approvalStatus: 1,
            kuota,
            sisaKuota: kuota,
          });

          toast.success("Proposal perusahaan disetujui.");
        }}
      >
        <dl className="divide-y divide-gray-100">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nama Perusahaan</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.nama}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div
                className={clsx(
                  statuses[details.approvalStatus],
                  "w-fit rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {statusText[details.approvalStatus]}
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Alamat Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a href={`mailto:${details.email}`} className="truncate hover:underline">
                {details.email}
              </a>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nomor Telepon</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.nomorTelepon}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Alamat Lengkap</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{details.lokasi}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Deskripsi Perusahaan</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.deskripsi}</dd>
          </div>

          {details.approvalStatus !== -1 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Kuota Karbon</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0 sm:col-span-2">
                {details.approvalStatus === 1 ? (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {getCarbonEmissionFormatted(details.kuota)}
                  </span>
                ) : (
                  <NumberInput
                    value={kuota}
                    onValueChange={(value) => setKuota(value)}
                    min={1}
                    placeholder="Alokasi kuota awal (kgCO2e)"
                    className="w-full sm:max-w-sm rounded-tremor-small"
                    required
                  />
                )}
              </dd>
            </div>
          )}

          {details.approvalStatus === 1 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Sisa Kuota Karbon</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0 sm:col-span-2">
                <KuotaCarbonCard id={details.id} />
              </dd>
            </div>
          )}

          {(userType === "admin-kementerian" || userType === "staf-kementerian") && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Lampiran</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <RiAttachment2 className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">proposal_perusahaan.pdf</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={details.urlSuratProposal}
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
        </dl>

        {(userType === "admin-kementerian" || userType === "staf-kementerian") && (
          <div className="flex justify-end gap-2">
            {details.approvalStatus === 0 && (
              <Button
                type="button"
                loading={isRejecting || isMutating}
                onClick={async () => {
                  await reject();
                  mutateList(
                    {
                      approvalStatus: -1,
                    },
                    (item) => item.id === details.id
                  );

                  mutate({
                    approvalStatus: -1,
                  });

                  toast.success("Proposal perusahaan ditolak.");
                }}
                className="rounded-tremor-small bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
              >
                Tolak proposal
              </Button>
            )}
            {details.approvalStatus !== -1 && (
              <Button
                type="submit"
                disabled={details.approvalStatus === 1}
                loading={isMutating || isRejecting}
                className="rounded-tremor-small"
              >
                {details.approvalStatus === 0 ? "Setujui Proposal" : "Proposal Sudah Disetujui"}
              </Button>
            )}
          </div>
        )}
      </form>
      {userType === "admin-perusahaan" && idPerusahaan === details.id && <UpdateCompanyDetails details={details} />}
    </div>
  );
}
