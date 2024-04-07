import { CompanyList } from "@/modules/company/list";
import { Text, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import React from "react";

export default function CompanyPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Perusahaan</h1>
      <Text className="mt-0.5">Kelola perusahaan dan tinjau proposal yang menunggu persetujuan.</Text>

      <div className="mt-4">
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Disetujui</Tab>
            <Tab>Menunggu Persetujuan</Tab>
            <Tab>Ditolak</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyList status={1} />
            </TabPanel>
            <TabPanel>
              <CompanyList status={0} />
            </TabPanel>
            <TabPanel>
              <CompanyList status={-1} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}

CompanyPage.title = "Manajemen Perusahaan | Carbon Chain";
