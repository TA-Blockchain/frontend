import React from "react";
import { Button, Dialog, DialogPanel, Textarea, TextInput } from "@tremor/react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList, useOptimisticListUpdate } from "@/hooks/use-optimistic";
import { useUser } from "@/hooks/use-user";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import useSWR from "swr";
import { Manager } from "../managers/manager-list";
import dynamic from "next/dynamic";
import SearchLocation from "./search-location";
import { RefreshAddressButton } from "./refresh-address-button";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

type CreateDivisionPayload = {
  name: string;
  lokasi: string;
  lat: string;
  lng: string;
  idManajer: string;
};

type CreateDivisionApiPayload = {
  name: string;
  lokasi: string;
  lat: string;
  long: string;
  idManajer: string;
};

const defaultValues = {
  name: "",
  lokasi: "",
  idManajer: "",
  lat: (-6.1754).toString(),
  lng: (106.8272).toString(),
};

export function CreateDivision() {
  const [isOpen, setIsOpen] = React.useState(false);
  const methods = useForm<CreateDivisionPayload>({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    formState: { dirtyFields },
  } = methods;

  const { trigger, isMutating } = useMutation<CreateDivisionApiPayload>("/company/division");

  const { data: allManagers, isLoading: isLoadingManagers } = useSWR<{ data: Array<Manager> }>("/auth/list/manager");
  const { mutate: mutateManagersList } = useOptimisticListUpdate("/auth/list/manager");

  const managers = allManagers?.data?.filter((manager) => !manager?.["data-manager"]?.idDivisi) ?? [];

  const {
    user: { idPerusahaan },
  } = useUser();

  const { mutate } = useOptimisticList(`/company/division/${idPerusahaan}`);

  const onSubmit = async (payload: CreateDivisionPayload) => {
    try {
      await trigger({
        name: payload.name,
        lokasi: payload.lokasi,
        lat: payload.lat,
        long: payload.lng,
        idManajer: payload.idManajer,
      });

      await mutateManagersList(
        {
          "data-manager": {
            idDivisi: "something",
          },
        },
        (item) => item.id === payload.idManajer
      );

      toast.success("Divisi baru berhasil dibuat.");
      reset();
      resetField("lokasi", {
        defaultValue: "",
      });
      setIsOpen(false);

      await mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
        <TextInput
          {...register("name")}
          placeholder="Nama divisi"
          className="w-full sm:w-fit rounded-tremor-small"
          required
        />
        <div className="flex gap-2 w-full">
          <div>
            <Controller
              render={({ field }) => (
                <SearchSelect
                  disabled={isLoadingManagers}
                  {...field}
                  onSearchValueChange={(value) => {
                    if (value === "") {
                      resetField("idManajer");
                    }
                  }}
                  enableClear
                  placeholder={
                    isLoadingManagers
                      ? "Memuat manajer..."
                      : managers.length === 0
                      ? "Manajer tidak tersedia"
                      : "Pilih manajer"
                  }
                  className="w-full rounded-tremor-small sm:max-w-xs"
                  required
                >
                  {managers.map((manager) => {
                    return (
                      <SearchSelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SearchSelectItem>
                    );
                  })}
                </SearchSelect>
              )}
              name="idManajer"
              control={control}
            />
          </div>
          <Button
            disabled={!dirtyFields.name || !dirtyFields.idManajer}
            onClick={() => {
              setIsOpen(true);
            }}
            loading={isMutating}
            type="button"
            className="rounded-tremor-small"
          >
            Lanjut
          </Button>
          <Dialog
            open={isOpen}
            onClose={() => {
              if (isMutating) return;
              setIsOpen(false);
            }}
            static={true}
          >
            <DialogPanel className="sm:max-w-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <SearchLocation
                  onChange={({ lat, lng }) => {
                    resetField("lat", {
                      defaultValue: lat,
                    });
                    resetField("lng", {
                      defaultValue: lng,
                    });
                  }}
                />

                <div className="mt-4 space-y-3">
                  <Map>
                    <div className="hidden">
                      <input readOnly {...register("lat")} placeholder="Latitude" required />
                      <input readOnly {...register("lng")} placeholder="Longitude" required />
                    </div>
                  </Map>
                  <div className="relative flex items-end gap-2">
                    <Controller
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="lokasi"
                          autoComplete="off"
                          spellCheck="false"
                          placeholder="Alamat Lengkap Divisi"
                          required
                        />
                      )}
                      name="lokasi"
                      defaultValue=""
                      control={control}
                    />

                    <RefreshAddressButton
                      onRefresh={(location) => {
                        resetField("lokasi", {
                          defaultValue: location,
                        });
                      }}
                    />
                  </div>
                </div>

                <Button loading={isMutating} type="submit" className="mt-4 w-full rounded-tremor-small">
                  Buat divisi baru
                </Button>
              </form>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </FormProvider>
  );
}
