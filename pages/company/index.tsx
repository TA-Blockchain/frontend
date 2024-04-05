import { CompanyList } from "@/modules/company/list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import React from "react";

export default function CompanyPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Companies</h1>
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
      </div>
    </main>
  );
}

CompanyPage.title = "Companies | Carbon Chain";
