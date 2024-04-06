import { DivisionDetails } from "@/modules/divisions/division-details";
import { Division } from "@/modules/divisions/division-list";
import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export default function DivisionDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: division, isLoading } = useSWR<{ data: Division }>(`/company/division/detail/${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!division) {
    return <NotFoundPlaceholder description="Sorry, we couldn't find the division you're looking for." />;
  }

  return (
    <main>
      {division && <DivisionDetails details={division.data} />}

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
              <DivisionList status={1} />
            </TabPanel>
            <TabPanel>
              <DivisionList status={0} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div> */}
    </main>
  );
}

DivisionDetailsPage.title = "Division Details | Carbon Chain";
