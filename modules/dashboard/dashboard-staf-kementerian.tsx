import { Tabs } from "@/components/tabs";
import { CompanyList } from "@/modules/company/list";
import { Text } from "@tremor/react";
import React from "react";

export default function DashboardStafKementrian() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Perusahaan</h1>
      <Text className="mt-0.5">Kelola perusahaan dan tinjau proposal yang menunggu persetujuan.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Disetujui", "Menunggu Persetujuan", "Ditolak"]}
          tabPanels={[
            () => <CompanyList status={1} />,
            () => <CompanyList status={0} />,
            () => <CompanyList status={-1} />,
          ]}
        />
      </div>
    </main>
  );
}
