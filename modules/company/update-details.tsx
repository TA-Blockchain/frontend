import React from "react";
import { Button, Dialog, DialogPanel, Textarea, TextInput } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { Label } from "@/components/label";
import { Company } from "./list";
import { RiPhoneLine } from "@remixicon/react";
import { useOptimistic } from "@/hooks/use-optimistic";

export function UpdateCompanyDetails({ details }: { details: Company }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { register, handleSubmit, reset, control } = useForm<Company>();
  const { mutate: updateCompany } = useOptimistic(`/company/${details?.id}`);

  const { trigger, isMutating } = useMutation<Company>(`/company/${details.id}`, undefined, {
    method: "PUT",
  });

  const onSubmit = async (payload: Company) => {
    try {
      await trigger({
        ...details,
        ...payload,
      });

      toast.success("Detail perusahaan berhasil diperbarui.");
      reset();

      setIsOpen(false);

      updateCompany({
        ...details,
        ...payload,
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" onClick={() => setIsOpen(true)} className="rounded-tremor-small">
          Ubah detail perusahaan
        </Button>
      </div>
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
            <div>
              <Label htmlFor="nama" required>
                Nama Perusahaan
              </Label>
              <TextInput
                {...register("nama")}
                defaultValue={details.nama}
                id="nama"
                autoComplete="off"
                placeholder="Nama perusahaan"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <TextInput
                {...register("email")}
                defaultValue={details.email}
                type="email"
                id="email"
                autoComplete="off"
                placeholder="john@company.com"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="nomorTelepon" required>
                Nomor Telepon
              </Label>
              <TextInput
                {...register("nomorTelepon")}
                icon={RiPhoneLine}
                defaultValue={details.nomorTelepon}
                id="nomorTelepon"
                autoComplete="off"
                placeholder="0123-456-789"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="lokasi" required>
                Lokasi
              </Label>
              <TextInput
                {...register("lokasi")}
                defaultValue={details.lokasi}
                id="lokasi"
                autoComplete="off"
                placeholder="Jl. Jend. Sudirman No. 1, Jakarta Pusat"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="deskripsi" required>
                Deskripsi
              </Label>
              <Controller
                render={({ field }) => (
                  <Textarea
                    {...field}
                    defaultValue={details.deskripsi}
                    id="deskripsi"
                    autoComplete="off"
                    placeholder="John Doe Inc. adalah perusahaan yang bergerak di bidang teknologi..."
                    className="mt-2"
                    required
                  />
                )}
                name="deskripsi"
                defaultValue={details.deskripsi}
                control={control}
              />
            </div>

            <Button loading={isMutating} type="submit" className="w-full rounded-tremor-small">
              Perbarui
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
