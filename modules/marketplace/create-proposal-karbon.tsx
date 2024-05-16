import React from "react";
import { Button, NumberInput, TextInput } from "@tremor/react";
import { toast } from "sonner";
import { useMutation } from "@/hooks/use-mutation";

type CreateProposalKarbonPayload = {
  kuotaYangDijual: number;
  status: "0";
};

export function CreateProposalKarbon() {
  const [kuota, setKuota] = React.useState<number | "">();

  const { trigger, isMutating } = useMutation<CreateProposalKarbonPayload>("/carbon_trading/sales-proposal");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger({ kuotaYangDijual: typeof kuota === "number" ? kuota : 0, status: "0" });

      toast.success("Proposal penjualan karbon berhasil dibuat.");
      setKuota("");
    } catch (error) {}
  };

  const min = 1;
  const max = 1000;

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex sm:flex-col sm:max-w-xs">
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
