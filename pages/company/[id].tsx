import { CompanyDetails } from "@/modules/company/details";
import { Company } from "@/modules/company/list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { DetailSupplyChain } from "@/modules/company/supply-chain";
import { DetailEmisiKarbon } from "@/modules/company/emisi-karbon";

export default function CompanyDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: company, isLoading } = useSWR<{ data: Company }>(`/company/${id}`);

  if (!company && !isLoading) {
    return <NotFoundPlaceholder description="Sorry, we couldn't find the company you're looking for." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Perusahaan</h1>
      <Text className="mt-0.5">Informasi umum, supply chain, dan emisi karbon perusahaan terkait.</Text>

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

CompanyDetailsPage.title = "Company Details | Carbon Chain";
