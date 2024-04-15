import React from "react";
import { Company } from "../list";
import { Button, MultiSelect, MultiSelectItem, TextInput } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";
import useSWR from "swr";

type CreateSupplyChainPayload = {
  listPerusahaan: Array<string>;
};

export function CreateSupplyChain({
  details,
  revalidate,
}: {
  details: Company | undefined;
  revalidate: () => Promise<any>;
}) {
  const { data, isLoading: isLoadingPerusahaan } = useSWR<{ data: Array<Company> }>("/company");

  const { register, handleSubmit, reset, resetField, control } = useForm<CreateSupplyChainPayload>();

  const { trigger, isMutating } = useMutation<CreateSupplyChainPayload>("/company/supply_chain");

  const onSubmit = async (payload: CreateSupplyChainPayload) => {
    try {
      await trigger({
        listPerusahaan: [details?.id ?? "", ...payload.listPerusahaan],
      });

      toast.success("Proposal supply chain berhasil dibuat.");
      reset();

      await revalidate();
    } catch (error) {}
  };

  const companies = data?.data.filter((perusahaan) => perusahaan.id !== details?.id) ?? [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
        <div className="sm:max-w-xs w-full">
          <Controller
            render={({ field }) => (
              <MultiSelect
                disabled={isLoadingPerusahaan}
                {...field}
                onValueChange={(value) => {
                  if (value.length === 0) {
                    resetField("listPerusahaan");
                  }
                }}
                placeholder={
                  isLoadingPerusahaan
                    ? "Memuat perusahaan..."
                    : companies.length === 0
                    ? "Perusahaan tidak tersedia"
                    : "Pilih perusahaan"
                }
                className="w-full rounded-tremor-small"
                required
              >
                {companies.map((company) => {
                  return (
                    <MultiSelectItem key={company.id} value={company.id}>
                      {company.nama}
                    </MultiSelectItem>
                  );
                })}
              </MultiSelect>
            )}
            name="listPerusahaan"
            control={control}
          />
        </div>
        <Button loading={isMutating} type="submit" className="rounded-tremor-small">
          Buat supply chain
        </Button>
      </div>
    </form>
  );
}
