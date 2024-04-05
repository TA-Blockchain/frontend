import { Info } from "@/components/info";
import { InviteManager } from "@/modules/managers/invite-manager";
import { ManagerList } from "@/modules/managers/manager-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Invite new users",
  description: "Company managers can manage their assigned division, shipment, and vehicles.",
};

export default function ManagersPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Managers Management</h1>
      <Text className="mt-0.5">Manage your company&apos;s division managers accounts.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <InviteManager />
        </div>

        <Divider />

        <div>
          <Info title="Existing users" />
          <ManagerList />
        </div>
      </div>
    </main>
  );
}

ManagersPage.title = "Managers Management | Carbon Chain";
