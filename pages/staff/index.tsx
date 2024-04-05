import { Info } from "@/components/info";
import { InviteStaf } from "@/modules/staf/invite-staf";
import { StafList } from "@/modules/staf/staf-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Invite new users",
  description: "Staf Kementerian can manage companies and carbon trading.",
};

export default function StaffPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Staff Management</h1>
      <Text className="mt-0.5">Manage Staf Kementerian accounts.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <InviteStaf />
        </div>

        <Divider />

        <div>
          <Info title="Existing users" />
          <StafList />
        </div>
      </div>
    </main>
  );
}

StaffPage.title = "Staff Management | Carbon Chain";
