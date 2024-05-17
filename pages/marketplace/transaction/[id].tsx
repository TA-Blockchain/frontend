import { NotFoundPlaceholder } from "@/modules/template/not-found";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Text } from "@tremor/react";
import { TransaksiKarbonDetails } from "@/modules/marketplace/transaction/transaksi-karbon-details";
import { TransaksiKarbonDetailsType } from "@/modules/marketplace/transaction/types";

export default function TransaksiKarbonDetailsPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { data: transaksiKarbon, isLoading } = useSWR<{ data: TransaksiKarbonDetailsType }>(
    `/carbon_trading/transactions/${id}`
  );

  if (!transaksiKarbon && !isLoading) {
    return (
      <NotFoundPlaceholder description="Maaf, rincian transaksi jual beli karbon yang Anda cari tidak ditemukan." />
    );
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Rincian Transaksi Jual Beli Karbon</h1>
      <Text className="mt-0.5">Informasi umum mengenai transaksi jual beli karbon perusahaan terkait.</Text>

      <div className="mt-4">
        <TransaksiKarbonDetails details={transaksiKarbon?.data} isLoading={isLoading} />
      </div>
    </main>
  );
}

TransaksiKarbonDetailsPage.title = "Rincian Transaksi Jual Beli Karbon | Carbon Chain";
