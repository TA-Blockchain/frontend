import { Info } from "@/components/info";
import { CreateDivision } from "@/modules/divisions/create-division";
import { DivisionList } from "@/modules/divisions/division-list";
import { Divider, Text } from "@tremor/react";
import React from "react";

const info = {
  title: "Buat divisi baru",
  description: "Divisi adalah sub-organisasi yang dapat mengelola pengiriman dan kendaraan perusahaan.",
};

export default function DivisionPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Manajemen Divisi</h1>
      <Text className="mt-0.5">Kelola divisi internal perusahaan terkait.</Text>

      <div className="mt-8 space-y-8">
        <div>
          <Info {...info} />
          <CreateDivision />
        </div>

        <Divider />

        <div>
          <Info title="Divisi yang terdaftar" />
          <DivisionList />
        </div>
      </div>
    </main>
  );
}

DivisionPage.title = "Manajemen Divisi | Carbon Chain";
