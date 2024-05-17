import React from "react";
import { Button, NumberInput } from "@tremor/react";
import { toast } from "sonner";
import { useMutation } from "@/hooks/use-mutation";
import { SmallLoadingPlaceholder } from "@/modules/template";
import useSWR from "swr";
import { Company } from "@/modules/company/list";
import { useOptimisticList } from "@/hooks/use-optimistic";

type CreateProposalKarbonPayload = {
  kuotaYangDijual: number;
  status: "0";
};

export function CreateProposalKarbon({ idPerusahaan }: { idPerusahaan: string }) {
  const [kuota, setKuota] = React.useState<number | "">();

  const { data, isLoading } = useSWR<{ data: Company }>(`/company/${idPerusahaan}`);

  const { trigger, isMutating } = useMutation<CreateProposalKarbonPayload>("/carbon_trading/sales-proposal");
  const { mutate } = useOptimisticList(`/carbon_trading/sales-proposal/perusahaan/${idPerusahaan}`);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { kuotaYangDijual: typeof kuota === "number" ? kuota : 0, status: "0" } as const;
      await trigger(payload);

      toast.success("Proposal penjualan karbon berhasil dibuat.");
      setKuota("");

      await mutate(payload);
    } catch (error) {}
  };

  if (isLoading) {
    return <SmallLoadingPlaceholder amount={1} />;
  }

  if (!data) return null;

  const min = 1;
  const max = data?.data.sisaKuota;

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex sm:flex-col sm:max-w-sm">
        <NumberInput
          value={kuota}
          onValueChange={(value) => setKuota(value)}
          min={min}
          max={max}
          placeholder="Kuota yang dijual (kgCO2e)"
          className="w-full sm:w-full rounded-tremor-small"
          required
        />
        <Button loading={isMutating} type="submit" className="rounded-tremor-small">
          Buat Proposal Penjualan
        </Button>
      </div>
    </form>
  );
}
