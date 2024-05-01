import React from "react";
import { Text } from "@tremor/react";
import { Tabs } from "@/components/tabs";
import { RiArrowGoBackLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { ShipmentVerification } from "@/modules/verification/shipment-verification";
import { CarbonTransactionVerification } from "@/modules/verification/carbon-transaction-verification";

export default function Verification() {
  const router = useRouter();

  return (
    <>
      <header className="sticky bg-white dark:bg-black inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              if (window.history?.length > 2) {
                router.back();
              } else {
                router.push("/login");
              }
            }}
            className="flex items-center gap-2 p-3 rounded-tremor-small text-tremor-content hover:bg-tremor-brand-faint hover:text-tremor-brand-subtle max-md:hidden"
          >
            <RiArrowGoBackLine className="w-4 h-4" />
          </button>
        </div>
      </header>
      <main className="min-h-dvh pt-4 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-tremor-title font-semibold">Verifikasi Invoice</h1>
        <Text className="mt-0.5">Verifikasi invoice perjalanan dan transaksi jual beli kuota karbon.</Text>

        <div className="mt-4">
          <Tabs
            tabList={["Invoice Perjalanan", "Invoice Transaksi"]}
            tabPanels={[() => <ShipmentVerification />, () => <CarbonTransactionVerification />]}
          />
        </div>
      </main>
    </>
  );
}

Verification.title = "Verifikasi Invoice | Carbon Chain";
