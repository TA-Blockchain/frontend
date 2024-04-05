import { Info } from "@/components/info";
import { CreateDivision } from "@/modules/divisions/create-division";
import { DivisionList } from "@/modules/divisions/division-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Create new divisions",
  description: "A division is a sub-organization that can manage their assigned shipments and vehicles.",
};

export default function DivisionPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Division Management</h1>
      <Text className="mt-0.5">Manage your company&apos;s internal divisions.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <CreateDivision />
        </div>

        <Divider />

        <div>
          <Info title="Existing divisions" />
          <DivisionList />
        </div>
      </div>
    </main>
  );
}

DivisionPage.title = "Divisions | Carbon Chain";
