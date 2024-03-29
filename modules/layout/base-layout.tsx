import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const unauthenticatedPaths = ["/login", "/register", "/password/reset"];

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <React.Fragment>
      {unauthenticatedPaths.includes(pathname) ? children : <AuthLoader>{children}</AuthLoader>}
    </React.Fragment>
  );
}

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { state } = useUser({ devMode: true });

  const router = useRouter();
  const pathname = usePathname();

  if (state === "unauthenticated" && !unauthenticatedPaths.includes(pathname)) {
    router.replace("/login");
  }

  return (
    <div className="py-4">
      {state === "loading" && <PageLoader />}
      {state === "authenticated" && children}
    </div>
  );
}

function PageLoader() {
  return <div>Loading...</div>;
}
