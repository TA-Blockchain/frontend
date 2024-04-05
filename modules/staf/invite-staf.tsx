import React from "react";
import { Button, TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";

type InviteStafPayload = {
  username: string;
  email: string;
};

const additionalPayload = {
  organizationName: "Kementrian",
  role: "staf-kementerian",
};

export function InviteStaf() {
  const { register, handleSubmit, reset } = useForm<InviteStafPayload>();

  const { trigger, isMutating } = useMutation<InviteStafPayload & typeof additionalPayload>("/auth/user/register");

  const { mutate } = useOptimisticList("/auth/list/staf");

  const onSubmit = async (payload: InviteStafPayload) => {
    try {
      await trigger({ ...payload, ...additionalPayload });

      toast.success("Staf invited successfully.");
      reset();

      await mutate({
        name: payload.username,
        email: payload.email,
      });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
        <TextInput
          {...register("username")}
          id="username"
          placeholder="Username"
          className="w-full sm:w-fit rounded-tremor-small"
          required
        />
        <div className="flex gap-2 w-full">
          <TextInput
            {...register("email")}
            type="email"
            id="email"
            placeholder="Add email..."
            className="w-full rounded-tremor-small sm:max-w-xs"
            required
          />
          <Button loading={isMutating} type="submit" className="rounded-tremor-small">
            Invite
          </Button>
        </div>
      </div>
    </form>
  );
}
