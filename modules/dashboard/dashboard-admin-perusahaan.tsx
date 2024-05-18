import React from "react";
import { Card } from "@tremor/react";
import { useUser } from "@/hooks/use-user";
import useSWR from "swr";
import { CompanyDetails } from "@/modules/company/details";
import { ListSupplyChain } from "@/modules/company/supply-chain/list-supply-chain";
import { DetailEmisiKarbon } from "@/modules/company/emisi-karbon";
import { Company } from "@/modules/company/list";
import { Text } from "@tremor/react";
import clsx from "clsx";
import { useBanner } from "@/hooks/use-banner";
import { CreateSupplyChain } from "../company/supply-chain/create-supply-chain";
import { Tabs } from "@/components/tabs";

export default function DashboardAdminPerusahaan() {
  const {
    user: { idPerusahaan, username },
  } = useUser();

  const { data: company, isLoading } = useSWR<{ data: Company }>(`/company/${idPerusahaan}`);

  const isSupplyChainEmpty = company?.data.supplyChain.length === 0;

  const { isOpen, closeBanner } = useBanner();

  const showBanner = isOpen && isSupplyChainEmpty;

  return (
    <main>
      {showBanner && (
        <Card>
          <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Selamat datang, {username}
          </h3>
          <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Supply chain adalah bagian penting dalam menghitung emisi karbon perusahaan Anda. Dengan bergabung ke dalam
            supply chain, Anda dapat memulai perjalanan antar divisi dan menghitung emisi karbon yang dihasilkan.
          </p>
          <div className="mt-6 flex items-center space-x-5">
            <CreateSupplyChain details={company?.data} withMarginTop={false} />
            <button
              onClick={closeBanner}
              type="button"
              className="whitespace-nowrap rounded-tremor-small border border-tremor-border px-4 py-2 text-tremor-default font-medium text-tremor-content shadow-tremor-input hover:bg-tremor-background-muted hover:text-tremor-content-emphasis dark:border-dark-tremor-border dark:text-dark-tremor-content dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted hover:dark:text-dark-tremor-content-emphasis"
            >
              Nanti saja
            </button>
          </div>
        </Card>
      )}

      <h1 className={clsx("text-tremor-title font-semibold", showBanner && "mt-6")}>Rincian Perusahaan</h1>
      <Text className="mt-0.5">Informasi umum, supply chain, dan emisi karbon perusahaan Anda.</Text>

      <div className="mt-4">
        <Tabs
          tabList={["Rincian", "Supply Chain", "Emisi Karbon"]}
          tabPanels={[
            () => <CompanyDetails details={company?.data} isLoading={isLoading} />,
            () => (
              <>
                {company?.data.supplyChain.length !== 0 && <CreateSupplyChain details={company?.data} />}
                <ListSupplyChain details={company?.data} />
              </>
            ),
            () => <DetailEmisiKarbon details={company?.data} />,
          ]}
        />
      </div>
    </main>
  );
}
