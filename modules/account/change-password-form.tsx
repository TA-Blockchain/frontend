import { Info } from "@/components/info";
import { Label } from "@/components/label";
import { useMutation } from "@/hooks/use-mutation";
import { Button, TextInput } from "@tremor/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const info = {
  title: "Password",
  description: "Update your password associated with this account.",
};

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export function ChangePasswordForm() {
  const methods = useForm<ChangePasswordPayload>();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  const { trigger, isMutating } = useMutation<ChangePasswordPayload>("/auth/edit/password");

  const onSubmit = async (payload: ChangePasswordPayload) => {
    if (!isDirty) return;
    try {
      await trigger(payload);
      toast.success("Password changed successfully.");
      reset();
    } catch (error) {}
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Info {...info} />
        <div className="mt-6">
          <Label htmlFor="current-password">Current password</Label>
          <TextInput
            {...register("currentPassword")}
            type="password"
            id="current-password"
            placeholder=""
            className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            required
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="new-password">New password</Label>
          <TextInput
            {...register("newPassword")}
            type="password"
            id="new-password"
            placeholder=""
            className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            required
          />
        </div>
        <Button loading={isMutating} type="submit" className="rounded-tremor-small mt-6">
          Update password
        </Button>
      </form>
    </FormProvider>
  );
}
