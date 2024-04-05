import { Info } from "@/components/info";
import { Label } from "@/components/label";
import { useMutation } from "@/hooks/use-mutation";
import { Button, TextInput } from "@tremor/react";
import React from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ChangePasswordPayload>();

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
  );
}
