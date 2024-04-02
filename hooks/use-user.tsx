import { api } from "@/lib";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import useSWRImmutable from "swr/immutable";

type UserState = "authenticated" | "unauthenticated" | "loading";

export type UserType = "admin-kementerian" | "admin-perusahaan" | "manager-perusahaan" | "staf-kementerian";

type UserData = {
  email: string;
  id: string;
  idPerusahaan: string;
  organizationName: string;
  userType: UserType;
  username: string;
};

type UserDataWithToken = UserData & {
  token: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

const id = "auth-toast";

export function useUser(): {
  user: UserData;
  state: UserState;
  login: (payload: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
  isRequesting: boolean;
} {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWRImmutable<UserData | null>(
    "/auth/me",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        return JSON.parse(userData);
      }

      return null;
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );

  const [isRequesting, setIsRequesting] = React.useState(false);

  const router = useRouter();

  const login = React.useCallback(
    async (payload: LoginFormValues) => {
      try {
        setIsRequesting(true);
        const userData = await mutate(async () => {
          const response = await api.post<{ data: UserDataWithToken }>("/auth/login", payload);
          const userData = response.data.data;
          localStorage.setItem("token", userData.token);

          const { token, ...rest } = userData;

          localStorage.setItem("userData", JSON.stringify(rest));
          return rest;
        });

        if (userData) {
          router.replace("/dashboard");
          toast.success(`Welcome back, ${userData.username}!`, {
            position: "bottom-right",
            id,
          });
        }
      } catch (err) {
      } finally {
        setIsRequesting(false);
      }
    },
    [mutate, router]
  );

  const logout = React.useCallback(async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    mutate(null);

    router.replace("/login");
    toast.success("You have been logged out.", {
      id,
    });
  }, [mutate, router]);

  let state: UserState = "loading";

  if (!isLoading) {
    if (user) state = "authenticated";
    if (!user) state = "unauthenticated";
  }

  return { user: user as UserData, state, login, logout, isRequesting };
}
