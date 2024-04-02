import { Info } from "@/components/info";
import { Label } from "@/components/label";
import { useUser } from "@/hooks/use-user";
import { Button, TextInput } from "@tremor/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const info = {
  title: "Email",
  description: "Update your email address associated with this account.",
};

type ChangeEmailPayload = {
  email: string;
};

export function ChangeEmailForm() {
  const { user } = useUser();

  const methods = useForm<ChangeEmailPayload>({
    defaultValues: {
      email: user.email,
    },
  });

  const { register, handleSubmit } = methods;

  const onSubmit = async (payload: ChangeEmailPayload) => {};

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
        <Button type="submit" className="rounded-tremor-small mt-6">
          Update email
        </Button>
      </form>
    </FormProvider>
  );
}
