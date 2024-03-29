import useSWR from "swr";

type UserState = "authenticated" | "unauthenticated" | "loading";

export function useUser({ devMode = false }: { devMode?: boolean }): { user: any; state: UserState } {
  const { data: user, isLoading } = useSWR("/user");

  let state: UserState = "loading";

  if (!isLoading) {
    if (user) state = "loading";
    if (!user) state = "unauthenticated";
  }

  if (devMode) {
    return {
      user: "123",
      state: "authenticated",
    };
  }

  return { user, state };
}
