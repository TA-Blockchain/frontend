import React from "react";
import { Button, TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useOptimisticList } from "@/hooks/use-optimistic";

type InviteManagerPayload = {
  username: string;
  email: string;
};

const additionalPayload = {
  organizationName: "SupplyChain",
  role: "manager-perusahaan",
};

export function InviteManager() {
  const { register, handleSubmit, reset } = useForm<InviteManagerPayload>();

  const { trigger, isMutating } = useMutation<InviteManagerPayload & typeof additionalPayload>("/auth/user/register");

  const { mutate } = useOptimisticList("/auth/list/manager");

  const onSubmit = async (payload: InviteManagerPayload) => {
    try {
      await trigger({ ...payload, ...additionalPayload });

      toast.success("Manager invited successfully.");
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
