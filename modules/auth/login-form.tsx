import { Button, TextInput } from "@tremor/react";
import { TextLink } from "@/components/text";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormValues, useUser } from "@/hooks/use-user";

export function LoginForm() {
  const methods = useForm<LoginFormValues>();

  const { handleSubmit, register } = methods;

  const { login, isRequesting } = useUser();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <div className="w-full mx-auto max-w-sm mt-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(login)}>
            <div className="mt-6">
              <label
                htmlFor="username"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Username
              </label>
              <TextInput
                {...register("username")}
                id="username"
                placeholder=""
                autoComplete="off"
                className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Password
              </label>
              <TextInput
                type="password"
                id="password"
                {...register("password")}
                placeholder=""
                className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                required
              />
            </div>

            <Button loading={isRequesting} className="mt-6 rounded-tremor-small w-full" type="submit" variant="primary">
              Sign in to account
            </Button>
          </form>
        </FormProvider>
        <div className="grid place-items-center mt-6">
          <TextLink href="/password/reset" className="text-sm">
            Forgot password?
          </TextLink>
        </div>
      </div>
    </div>
  );
}
