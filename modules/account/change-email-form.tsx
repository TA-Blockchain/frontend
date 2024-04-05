import { Info } from "@/components/info";
import { Label } from "@/components/label";
import { useMutation } from "@/hooks/use-mutation";
import { UserDataWithToken, useUser } from "@/hooks/use-user";
import { Button, TextInput } from "@tremor/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const info = {
  title: "Email",
  description: "Update your email address associated with this account.",
};

type ChangeEmailPayload = {
  email: string;
};

export function ChangeEmailForm() {
  const { user, updateUserData } = useUser();

  const methods = useForm<ChangeEmailPayload>({
    values: {
      email: user.email,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    resetField,
  } = methods;

  const { trigger, isMutating } = useMutation<ChangeEmailPayload, { data: UserDataWithToken }>("/auth/edit/email");

  const onSubmit = async (payload: ChangeEmailPayload) => {
    if (!isDirty) return;
    try {
      const userData = await trigger(payload);
      updateUserData(userData.data.data);
      toast.success("Email changed successfully.");
    } catch (error) {
      resetField("email");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Info {...info} />
        <div className="mt-6">
          <Label htmlFor="email">Update email address</Label>
          <TextInput
            {...register("email")}
            type="email"
            id="email"
            placeholder="john@company.com"
            className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
          />
        </div>
        <Button loading={isMutating} type="submit" className="rounded-tremor-small mt-6">
          Update email
        </Button>
      </form>
    </FormProvider>
  );
}
