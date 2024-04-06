import React, { useEffect } from "react";
import { Button, Dialog, DialogPanel, Textarea, TextInput } from "@tremor/react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";
import { useUser } from "@/hooks/use-user";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import useSWR from "swr";
import { Manager } from "../managers/manager-list";
import dynamic from "next/dynamic";
import SearchLocation from "./search-location";

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

const defaultValues = {
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
    getValues,
  } = methods;

  const { trigger, isMutating } = useMutation<CreateDivisionPayload>("/company/division");

  const { data: managers, isLoading: isLoadingManagers } = useSWR<{ data: Array<Manager> }>("/auth/list/manager");

  const {
    user: { idPerusahaan },
  } = useUser();

  const { mutate } = useOptimisticList(`/company/division/${idPerusahaan}`);

  const onSubmit = async (payload: CreateDivisionPayload) => {
    console.log(payload);
    return;
    try {
      await trigger(payload);

      toast.success("Division created successfully.");
      reset();

      await mutate(payload);
    } catch (error) {}
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
          <TextInput
            {...register("name")}
            placeholder="Division Name"
            className="w-full sm:w-fit rounded-tremor-small"
            required
          />
          <div className="flex gap-2 w-full">
            <div>
              <Controller
                render={({ field }) => (
                  <SearchSelect
                    {...field}
                    onSearchValueChange={(value) => {
                      if (value === "") {
                        resetField("idManajer");
                      }
                    }}
                    enableClear
                    placeholder={isLoadingManagers ? "Loading managers..." : "Select a manager of this division"}
                    className="w-full rounded-tremor-small sm:max-w-xs"
                    required
                  >
                    {managers?.data.map((manager) => {
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
              Continue
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
                <SearchLocation
                  onChange={({ lat, lng, location }) => {
                    resetField("lat", {
                      defaultValue: lat,
                    });
                    resetField("lng", {
                      defaultValue: lng,
                    });
                    resetField("lokasi", {
                      defaultValue: location,
                    });
                  }}
                />

                <div className="mt-4 space-y-3">
                  <Map>
                    <div className="hidden">
                      <TextInput readOnly {...register("lat")} placeholder="Latitude" />
                      <TextInput readOnly {...register("lng")} placeholder="Longitude" />
                    </div>
                  </Map>
                  <Controller
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        readOnly
                        id="lokasi"
                        className="bg-gray-100 cursor-not-allowed hover:bg-gray-100"
                        autoComplete="off"
                        placeholder="Pilih lokasi pada map"
                        required
                      />
                    )}
                    name="lokasi"
                    defaultValue=""
                    control={control}
                  />
                </div>

                <Button loading={isMutating} type="submit" className="mt-4 w-full rounded-tremor-small">
                  Create Division
                </Button>
              </DialogPanel>
            </Dialog>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
