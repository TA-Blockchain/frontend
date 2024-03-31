import { api } from "@/lib";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import useSWRImmutable from "swr/immutable";

type UserState = "authenticated" | "unauthenticated" | "loading";

type UserType = "admin-kementerian" | "admin-sc" | "manager-sc" | "staff";

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
  user: UserData | null | undefined;
  state: UserState;
  login: (payload: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
} {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWRImmutable<UserData | null>("/auth/me", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const router = useRouter();

  const login = React.useCallback(
    async (payload: LoginFormValues) => {
      try {
        const response = await api.post<{ data: UserDataWithToken }>("/auth/login", payload);
        const userData = response.data.data;
        localStorage.setItem("token", userData.token);

        const { token, ...rest } = userData;

        localStorage.setItem("userData", JSON.stringify(rest));
        mutate(rest);

        router.replace("/dashboard");
        toast.success(`Welcome back, ${userData.username}!`, {
          position: "bottom-right",
          id,
        });
      } catch (err) {
        toast.error("Invalid credentials, please try again.", {
          id,
        });
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

  React.useEffect(() => {
    if (!isLoading && !user) {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        mutate(JSON.parse(userData));
      }
    }
  }, [isLoading, mutate, user]);

  let state: UserState = "loading";

  if (!isLoading) {
    if (user) state = "authenticated";
    if (!user) state = "unauthenticated";
  }

  return { user, state, login, logout };
}
