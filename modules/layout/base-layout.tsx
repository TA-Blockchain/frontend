import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Header } from "./header";

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
      <Header />
      {state === "loading" && <PageLoader />}
      {state === "authenticated" && (
        <div className="min-h-dvh pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      )}
    </div>
  );
}

function PageLoader() {
  return <div>Loading...</div>;
}
