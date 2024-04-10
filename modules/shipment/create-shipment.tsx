import React from "react";
import { Button, DatePicker, Dialog, DialogPanel, NumberInput, TextInput } from "@tremor/react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";
import { useUser } from "@/hooks/use-user";
import { Label } from "@/components/label";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { Division } from "../divisions/division-list";
import useSWR from "swr";
import { Vehicle } from "../vehicle/vehicle-list";
import { getDateTime } from "@/lib";

type CreateShipmentPayload = {
  idSupplyChain: string;
  idDivisiPenerima: string;
  idTransportasi: string;
  beratMuatan: string;
  tanggalBerangkat: Date;
  waktuBerangkat: string;
};

type CreateShipmentApiPayload = {
  idSupplyChain: string;
  idDivisiPenerima: string;
  idTransportasi: string;
  beratMuatan: string;
  waktuBerangkat: Date;
};

export function CreateShipment() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    user: { idDivisi },
  } = useUser();

  const { data: divisi, isLoading: isLoadingDivisi } = useSWR<{ data: Array<Division> }>(
    `/company/division/${idDivisi}`
  );

  const { data: kendaraan, isLoading: isLoadingKendaraan } = useSWR<{ data: Array<Vehicle> }>(
    `/company/vehicle/${idDivisi}`
  );

  const methods = useForm<CreateShipmentPayload>({
    shouldUnregister: true,
  });

  const { register, handleSubmit, reset, resetField, control } = methods;

  const { trigger, isMutating } = useMutation<CreateShipmentApiPayload>("/company/shipment");

  const { mutate } = useOptimisticList(`/company/shipment/${idDivisi}`);

  const onSubmit = async (payload: CreateShipmentPayload) => {
    try {
      await trigger({
        ...payload,
        waktuBerangkat: getDateTime(payload.tanggalBerangkat, payload.waktuBerangkat),
      });

      toast.success("Perjalanan baru berhasil dibuat.");
      reset();

      setIsOpen(false);

      await mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const divisions = divisi?.data.filter((d) => d.id !== idDivisi) || [];
  const vehicles = kendaraan?.data || [];

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
          <DialogPanel className="sm:max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input className="hidden" {...register("idSupplyChain")} value="" />
              <div>
                <Label htmlFor="idDivisiPenerima" required>
                  Divisi Penerima
                </Label>
                <Controller
                  control={control}
                  name="idDivisiPenerima"
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      disabled={isLoadingDivisi}
                      onSearchValueChange={(value) => {
                        if (value === "") {
                          resetField("idDivisiPenerima");
                        }
                      }}
                      enableClear
                      placeholder={isLoadingDivisi ? "Memuat divisi penerima..." : "Pilih divisi penerima"}
                      className="mt-2 w-full rounded-tremor-small"
                      required
                    >
                      {divisions.map((divisi) => {
                        return (
                          <SearchSelectItem key={divisi.id} value={divisi.id}>
                            {divisi.name}
                          </SearchSelectItem>
                        );
                      })}
                    </SearchSelect>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                <div>
                  <Label htmlFor="idTransportasi" required>
                    Kendaraan
                  </Label>
                  <Controller
                    render={({ field }) => (
                      <SearchSelect
                        disabled={isLoadingKendaraan}
                        {...field}
                        onSearchValueChange={(value) => {
                          if (value === "") {
                            resetField("idTransportasi");
                          }
                        }}
                        enableClear
                        placeholder={isLoadingKendaraan ? "Memuat kendaraan..." : "Pilih kendaraan"}
                        className="mt-2 w-full rounded-tremor-small"
                        required
                      >
                        {vehicles.map((kendaraan) => {
                          return (
                            <SearchSelectItem key={kendaraan.id} value={kendaraan.id}>
                              {kendaraan.carModel}
                            </SearchSelectItem>
                          );
                        })}
                      </SearchSelect>
                    )}
                    name="idTransportasi"
                    control={control}
                  />
                </div>
                <div>
                  <Label htmlFor="beratMuatan" required>
                    Berat Muatan
                  </Label>
                  <NumberInput
                    {...register("beratMuatan")}
                    min={0}
                    id="beratMuatan"
                    placeholder="Contoh: 1000 (kg)"
                    required
                    className="mt-2 w-full rounded-tremor-small"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                <div>
                  <Label htmlFor="tanggalBerangkat" required>
                    Tanggal Berangkat
                  </Label>
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        minDate={new Date()}
                        onValueChange={(value) => {
                          if (!value) {
                            resetField("tanggalBerangkat", {
                              defaultValue: undefined,
                            });
                          } else {
                            resetField("tanggalBerangkat", {
                              defaultValue: value,
                            });
                          }
                        }}
                        enableClear
                        placeholder="Pilih tanggal perjalanan"
                        className="mt-2 w-full rounded-tremor-small"
                      />
                    )}
                    name="tanggalBerangkat"
                    control={control}
                  />
                </div>
                <div>
                  <Label htmlFor="waktuBerangkat" required>
                    Waktu Berangkat
                  </Label>
                  <div className="mt-2">
                    <input
                      className="text-gray-700 focus:ring-2 focus:ring-[#bfdbfe] transition duration-100 text-sm w-full border border-gray-200 focus:border-tremor-brand-subtle rounded-tremor-small"
                      type="time"
                      {...register("waktuBerangkat")}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button loading={isMutating} type="submit" className="w-full rounded-tremor-small">
                Buat perjalanan baru
              </Button>
            </form>
          </DialogPanel>
        </Dialog>
      </div>
    </FormProvider>
  );
}
