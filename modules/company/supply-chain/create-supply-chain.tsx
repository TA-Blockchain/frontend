import React from "react";
import { Company } from "../list";
import { Button, Dialog, DialogPanel, MultiSelect, MultiSelectItem, Textarea, TextInput } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { Label } from "@/components/label";

type CreateSupplyChainPayload = {
  nama: string;
  deskripsi: string;
  listPerusahaan: Array<string>;
};

export function CreateSupplyChain({ details }: { details: Company | undefined }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutate } = useSWRConfig();

  const { data, isLoading: isLoadingPerusahaan } = useSWR<{ data: Array<Company> }>("/company");

  const { register, handleSubmit, reset, resetField, control } = useForm<CreateSupplyChainPayload>({
    shouldUnregister: true,
  });

  const { trigger, isMutating } = useMutation<CreateSupplyChainPayload>("/company/supply_chain");

  const onSubmit = async (payload: CreateSupplyChainPayload) => {
    try {
      await trigger({
        ...payload,
        listPerusahaan: [details?.id ?? "", ...payload.listPerusahaan],
      });

      toast.success("Proposal supply chain berhasil dibuat.");
      reset();

      setIsOpen(false);

      setTimeout(async () => {
        await mutate(`/company/${details?.id}`);
      }, 3000);
    } catch (error) {}
  };

  const companies = data?.data.filter((perusahaan) => perusahaan.id !== details?.id) ?? [];

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="mt-2 rounded-tremor-small">
        Buat supply chain baru
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => {
          if (isMutating) return;
          setIsOpen(false);
        }}
        static={true}
      >
        <DialogPanel className="sm:max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="nama" required>
                Nama
              </Label>
              <TextInput
                {...register("nama")}
                id="nama"
                autoComplete="off"
                placeholder="Nama supply chain"
                className="mt-2"
                required
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="deskripsi" required>
                Deskripsi
              </Label>
              <Controller
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="deskripsi"
                    autoComplete="off"
                    placeholder="Supply chain ini bertujuan untuk..."
                    className="mt-2"
                    required
                  />
                )}
                name="deskripsi"
                defaultValue=""
                control={control}
              />
            </div>
            <div className="w-full">
              <Label required htmlFor="listPerusahaan">
                Perusahaan yang bergabung
              </Label>
              <Controller
                render={({ field }) => (
                  <MultiSelect
                    id="listPerusahaan"
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
                    className="mt-1 w-full rounded-tremor-small"
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
            <Button loading={isMutating} type="submit" className="w-full rounded-tremor-small">
              Buat supply chain
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
