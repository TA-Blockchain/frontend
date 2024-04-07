import { Label } from "@/components/label";
import { useMutation } from "@/hooks/use-mutation";
import { RiAttachment2, RiPhoneLine } from "@remixicon/react";
import { Button, Divider, Textarea, TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type RegisterCompanyPayload = {
  username: string;
  email: string;
  namaPerusahaan: string;
  lokasi: string;
  nomorTelepon: string;
  deskripsi: string;
  urlSuratProposal: string;
};

export function RegisterCompany() {
  const router = useRouter();

  const { handleSubmit, register, reset, control } = useForm<RegisterCompanyPayload>();

  const { trigger, status } = useMutation<RegisterCompanyPayload>("/company");

  const onSubmit = async (data: RegisterCompanyPayload) => {
    try {
      await trigger(data);
      toast.success("Perusahaan telah didaftarkan.", {
        duration: 5000,
      });
      reset();
    } catch (error) {}
  };

  if (status.state === "success") {
    return (
      <div className="relative grid place-items-center h-dvh pt-4">
        <div className="sm:mx-auto sm:max-w-xl w-full sm:text-center">
          <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Perusahaan Anda telah didaftarkan.
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Formulir Anda segera kami tinjau dan konfirmasi melalui email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid place-items-center h-full pt-4">
      <div className="sm:mx-auto sm:max-w-xl w-full">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Daftarkan perusahaan Anda
        </h3>
        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Isi formulir di bawah ini untuk mendaftarkan perusahaan Anda.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="username" required>
                Username
              </Label>
              <TextInput
                {...register("username")}
                id="username"
                autoComplete="off"
                placeholder="john"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="email" required>
                Email
              </Label>
              <TextInput
                {...register("email")}
                type="email"
                id="email"
                autoComplete="off"
                placeholder="john@company.com"
                className="mt-2"
                required
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="namaPerusahaan" required>
                Nama Perusahaan
              </Label>
              <TextInput
                {...register("namaPerusahaan")}
                id="namaPerusahaan"
                autoComplete="off"
                placeholder="John Doe Inc."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="nomorTelepon" required>
                Nomor Telepon
              </Label>
              <TextInput
                {...register("nomorTelepon")}
                icon={RiPhoneLine}
                id="nomorTelepon"
                autoComplete="off"
                placeholder="0123-456-789"
                className="mt-2"
                required
              />
            </div>

            <div className="col-span-full">
              <Label htmlFor="lokasi" required>
                Lokasi
              </Label>
              <TextInput
                {...register("lokasi")}
                id="lokasi"
                autoComplete="off"
                placeholder="Jl. Jend. Sudirman No. 1, Jakarta Pusat"
                className="mt-2"
                required
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="urlSuratProposal" required>
                Url Surat Proposal
              </Label>
              <TextInput
                {...register("urlSuratProposal")}
                icon={RiAttachment2}
                id="urlSuratProposal"
                autoComplete="off"
                placeholder="https://abc.com/proposal.pdf"
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
                    placeholder="John Doe Inc. adalah perusahaan yang bergerak di bidang teknologi..."
                    className="mt-2"
                    required
                  />
                )}
                name="deskripsi"
                defaultValue=""
                control={control}
              />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <button
              disabled={status.state === "loading"}
              onClick={() => {
                router.push("/login");
              }}
              type="button"
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Cancel
            </button>
            <Button loading={status.state === "loading"} type="submit" className="rounded-tremor-small">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
