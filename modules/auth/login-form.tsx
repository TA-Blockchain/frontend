import { TextInput } from "@tremor/react";
import { TextLink } from "@/components/text";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormValues, useUser } from "@/hooks/use-user";

export function LoginForm() {
  const methods = useForm<LoginFormValues>();

  const { handleSubmit, register } = methods;

  const { login } = useUser();

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
            <button
              type="submit"
              className="mt-6 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis w-full"
            >
              Sign in to account
            </button>
          </form>
        </FormProvider>
        <div className="grid place-items-center mt-8">
          <TextLink href="/password/reset" className="text-sm">
            Forgot password?
          </TextLink>
        </div>
      </div>
    </div>
  );
}
