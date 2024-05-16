import { Info } from "@/components/info";
import { InviteManager } from "@/modules/managers/invite-manager";
import { ManagerList } from "@/modules/managers/manager-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Undang manajer baru",
  description: "Manajer perusahaan dapat mengelola divisi, pengiriman, dan kendaraan perusahaan terkait.",
};

export default function ManagersPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Manajer</h1>
      <Text className="mt-0.5">Manajer Perusahaan yang terdaftar di platform Carbon Chain.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <InviteManager />
        </div>

        <Divider />

        <div>
          <Info title="Manajer yang terdaftar" />
          <ManagerList />
        </div>
      </div>
    </main>
  );
}

ManagersPage.title = "Manajemen Manajer | Carbon Chain";
