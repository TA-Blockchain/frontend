import { RiAttachment2 } from "@remixicon/react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { useState } from "react";
import { Company } from "./list";

export function ProposalModal(company: Company) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
      >
        View proposal<span className="sr-only">, {company.nama}</span>
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true} className="z-[100]">
        <DialogPanel className="sm:max-w-2xl">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Nama Perusahaan</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{company.nama}</dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{company.email}</dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">No. Telepon</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{company.nomorTelepon}</dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Lokasi</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{company.lokasi}</dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Deskripsi Perusahaan</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{company.deskripsi}</dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                  <dd className="mt-2 text-sm text-gray-900">
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
                            href={company.urlSuratProposal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-end">
              <Button className="rounded-tremor-small">Approve</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
