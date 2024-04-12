import React from "react";
import { RiExternalLinkLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import { useUser } from "@/hooks/use-user";
import useSWR from "swr";
import { CompanyDetails } from "@/modules/company/details";
import { DetailSupplyChain } from "@/modules/company/supply-chain";
import { DetailEmisiKarbon } from "@/modules/company/emisi-karbon";
import { Company } from "@/modules/company/list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import clsx from "clsx";

export default function DashboardAdminPerusahaan() {
  const {
    user: { idPerusahaan, username },
  } = useUser();

  const { data: company, isLoading } = useSWR<{ data: Company }>(`/company/${idPerusahaan}`);

  const isSupplyChainEmpty = company?.data.supplyChain.length === 0;

  return (
    <main>
      {isSupplyChainEmpty && (
        <Card>
          <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Selamat datang, {username}
          </h3>
          <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Supply chain adalah bagian penting dalam menghitung emisi karbon perusahaan Anda. Dengan bergabung ke dalam
            supply chain, Anda dapat memulai perjalanan antar divisi dan menghitung emisi karbon yang dihasilkan.
          </p>
          <div className="mt-6 flex items-center space-x-5">
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Buat supply chain
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-tremor-default font-medium text-tremor-brand dark:text-dark-tremor-brand"
            >
              View tutorials
              <RiExternalLinkLine className="h-4 w-4" aria-hidden={true} />
            </a>
          </div>
        </Card>
      )}

      <h1 className={clsx("text-tremor-title font-semibold", isSupplyChainEmpty && "mt-6")}>Rincian Perusahaan</h1>
      <Text className="mt-0.5">Informasi umum, supply chain, dan emisi karbon perusahaan Anda.</Text>

      <div className="mt-4">
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Rincian</Tab>
            <Tab>Supply Chain</Tab>
            <Tab>Emisi Karbon</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyDetails details={company?.data} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <DetailSupplyChain details={company?.data} />
            </TabPanel>
            <TabPanel>
              <DetailEmisiKarbon details={company?.data} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}
