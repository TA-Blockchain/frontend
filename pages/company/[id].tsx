import { CompanyDetails } from "@/modules/company/details";
import { Company } from "@/modules/company/list";
import { LoadingPlaceholder } from "@/modules/template/loading-placeholder";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export default function CompanyDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: company, isLoading } = useSWR<{ data: Company }>(`/company/${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <NotFoundPlaceholder description="Sorry, we couldn't find the company you're looking for." />;
  }

  return (
    <main>
      {company && <CompanyDetails details={company.data} />}

      {/* <h1 className="text-tremor-title font-semibold">Companies</h1>
      <Text className="mt-0.5">Manage companies and review awaiting proposals.</Text>

      <div className="mt-4">
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Approved</Tab>
            <Tab>Waiting for Approval</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyList status={1} />
            </TabPanel>
            <TabPanel>
              <CompanyList status={0} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div> */}
    </main>
  );
}

CompanyDetailsPage.title = "Company Details | Carbon Chain";
