import React from "react";
import { Card, ProgressCircle } from "@tremor/react";
import { SmallLoadingPlaceholder } from "@/modules/template";
import useSWR from "swr";
import { Company } from "@/modules/company/list";
import { getCarbonEmissionFormatted, getFormattedNumber } from "@/lib";

export function KuotaCarbonCard({ id }: { id: string }) {
  const { data, isLoading } = useSWR<{ data: Company }>(`/company/${id}`);

  if (isLoading) {
    return <SmallLoadingPlaceholder />;
  }

  if (!data) return null;

  const sisaKuota = data?.data.sisaKuota;
  const kuota = data?.data.kuota;
  const percentage = (sisaKuota / kuota) * 100;

  return (
    <Card className="max-sm:mt-2 sm:max-w-sm">
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle
          value={percentage}
          size="md"
          color={percentage > 50 ? "emerald" : percentage > 20 ? "yellow" : "red"}
        >
          <span className="text-xs font-medium text-slate-700">{percentage.toFixed(0)}%</span>
        </ProgressCircle>
        <div>
          <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            {getFormattedNumber(sisaKuota)}/{getCarbonEmissionFormatted(kuota)}
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Penggunaan kuota emisi karbon
          </p>
        </div>
      </div>
    </Card>
  );
}
