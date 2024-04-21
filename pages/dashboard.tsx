import { useUser } from "@/hooks/use-user";

import React, { Suspense } from "react";

const DashboardAdminKementerian = React.lazy(() => import("@/modules/dashboard/dashboard-admin-kementerian"));
const DashboardAdminPerusahaan = React.lazy(() => import("@/modules/dashboard/dashboard-admin-perusahaan"));
const DashboardManajerPerusahaan = React.lazy(() => import("@/modules/dashboard/dashboard-manajer-perusahaan"));
const DashboardStafKementerian = React.lazy(() => import("@/modules/dashboard/dashboard-staf-kementerian"));

export default function HomePage() {
  const {
    user: { userType },
  } = useUser();

  return (
    <>
      <Suspense fallback={null}>
        {userType === "admin-kementerian" && <DashboardAdminKementerian />}
        {userType === "staf-kementerian" && <DashboardStafKementerian />}
        {userType === "admin-perusahaan" && <DashboardAdminPerusahaan />}
        {userType === "manager-perusahaan" && <DashboardManajerPerusahaan />}
      </Suspense>
    </>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
