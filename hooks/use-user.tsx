import useSWR from "swr";

type UserState = "authenticated" | "unauthenticated" | "loading";

export function useUser(): { user: any; state: UserState } {
  const { data: user, isLoading } = useSWR("/user");

  let state: UserState = "loading";

  if (!isLoading) {
    if (user) state = "loading";
    if (!user) state = "unauthenticated";
  }

  return { user, state };
}
