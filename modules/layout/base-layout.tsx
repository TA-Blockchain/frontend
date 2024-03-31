import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Header } from "./header";
import clsx from "clsx";

const unauthenticatedPaths = ["/login", "/register", "/password/reset"];
const authenticatedPaths = [
  "/dashboard",
  "/company",
  "/division",
  "/managers",
  "/marketplace",
  "/shipment",
  "/vehicle",
];

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const { state } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (state === "unauthenticated" && authenticatedPaths.includes(pathname)) {
      router.replace("/login");
    }
  }, [pathname, router, state]);

  React.useEffect(() => {
    if (state === "authenticated" && unauthenticatedPaths.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [pathname, router, state]);

  if (state === "unauthenticated" && unauthenticatedPaths.includes(pathname)) return children;
  if (state === "unauthenticated" && authenticatedPaths.includes(pathname)) return null;

  const showHeader = authenticatedPaths.some((path) => pathname?.includes(path));
  return (
    <div className="py-4">
      {showHeader && <Header />}
      <div className={clsx(showHeader && "min-h-dvh pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
        {children}
      </div>
    </div>
  );
}
