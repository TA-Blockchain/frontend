import React from "react";
import { Button, Dialog, DialogPanel, NumberInput, TextInput } from "@tremor/react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";
import { useUser } from "@/hooks/use-user";
import { Label } from "@/components/label";

type CreateVehiclePayload = {
  idDivisi: string;
  carModel: string;
  fuelType: string;
  kmUsage: string;
};

export function CreateVehicle() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    user: { idDivisi },
  } = useUser();

  const methods = useForm<CreateVehiclePayload>({
    defaultValues: {
      idDivisi,
    },
  });

  const { register, handleSubmit, reset } = methods;

  const { trigger, isMutating } = useMutation<CreateVehiclePayload>("/company/vehicle");

  const { mutate } = useOptimisticList(`/company/vehicle/${idDivisi}`);

  const onSubmit = async (payload: CreateVehiclePayload) => {
    try {
      await trigger(payload);

      toast.success("Kendaraan baru berhasil dibuat.");
      reset();

      setIsOpen(false);

      await mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          loading={isMutating}
          type="button"
          className="rounded-tremor-small"
        >
          Mulai
        </Button>
        <Dialog
          open={isOpen}
          onClose={() => {
            if (isMutating) return;
            setIsOpen(false);
          }}
          static={true}
        >
          <DialogPanel className="sm:max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="carModel" required>
                  Model Kendaraan
                </Label>
                <TextInput
                  {...register("carModel")}
                  id="carModel"
                  placeholder="Contoh: Kijang Innova"
                  required
                  className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                />
              </div>
              <div>
                <Label htmlFor="fuelType" required>
                  Tipe Bahan Bakar
                </Label>
                <TextInput
                  {...register("fuelType")}
                  id="fuelType"
                  placeholder="Contoh: Diesel"
                  required
                  className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                />
              </div>
              <div>
                <Label htmlFor="kmUsage" required>
                  Penggunaan KM
                </Label>
                <NumberInput
                  {...register("kmUsage")}
                  id="kmUsage"
                  min={0}
                  placeholder="Contoh: 1000 (km)"
                  required
                  className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                />
              </div>
              <Button loading={isMutating} type="submit" className="w-full rounded-tremor-small">
                Buat kendaraan baru
              </Button>
            </form>
          </DialogPanel>
        </Dialog>
      </div>
    </FormProvider>
  );
}
