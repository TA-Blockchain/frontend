import { Info } from "@/components/info";
import { InviteStaf } from "@/modules/staf/invite-staf";
import { StafList } from "@/modules/staf/staf-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Undang staf baru",
  description: "Staf Kementerian dapat mengelola perusahaan dan perdagangan karbon.",
};

export default function DashboardAdminKementrian() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Staf</h1>
      <Text className="mt-0.5">Daftar Staf Kementerian yang terdaftar di platform Carbon Chain.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <InviteStaf />
        </div>

        <Divider />

        <div>
          <Info title="Staf yang terdaftar" />
          <StafList />
        </div>
      </div>
    </main>
  );
}
