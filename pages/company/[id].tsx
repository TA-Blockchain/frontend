import { CompanyDetails } from "@/modules/company/details";
import { Company } from "@/modules/company/list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { ListSupplyChain } from "@/modules/company/supply-chain/list-supply-chain";
import { DetailEmisiKarbon } from "@/modules/company/emisi-karbon";
import { useUser } from "@/hooks/use-user";
import { CreateSupplyChain } from "@/modules/company/supply-chain/create-supply-chain";

export default function CompanyDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: company, isLoading } = useSWR<{ data: Company }>(`/company/${id}`);

  const {
    user: { idPerusahaan, userType },
  } = useUser();

  const isOwner = idPerusahaan === company?.data.id;

  const canSeeMore = isOwner || userType === "admin-kementerian" || userType === "staf-kementerian";

  if (!company && !isLoading) {
    return <NotFoundPlaceholder description="Maaf, perusahaan yang Anda cari tidak ditemukan." />;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Perusahaan</h1>
      <Text className="mt-0.5">Informasi umum, supply chain, dan emisi karbon perusahaan terkait.</Text>

      <div className="mt-4">
        {canSeeMore ? (
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
                {isOwner && company?.data.supplyChain.length !== 0 && <CreateSupplyChain details={company?.data} />}
                <ListSupplyChain details={company?.data} />
              </TabPanel>
              <TabPanel>
                <DetailEmisiKarbon details={company?.data} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        ) : (
          <CompanyDetails details={company?.data} isLoading={isLoading} />
        )}
      </div>
    </main>
  );
}

CompanyDetailsPage.title = "Rincian Perusahaan | Carbon Chain";
