import Image from "next/image";
import { Divider, TextInput } from "@tremor/react";
import { TextLink } from "@/components/text";

const GoogleIcon = (props: any) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

export function LoginForm() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <div className="w-full mx-auto max-w-sm mt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Email address
            </label>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder=""
              autoComplete="off"
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
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
              name="password"
              placeholder=""
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <button
            type="submit"
            className="mt-6 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis w-full"
          >
            Sign in to account
          </button>
        </form>
        <div className="grid place-items-center mt-8">
          <TextLink href="/password/reset" className="text-sm">
            Forgot password?
          </TextLink>
        </div>
      </div>
    </div>
  );
}
