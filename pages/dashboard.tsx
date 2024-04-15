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

      {/* <ul>
        <li>
          otomatis register admin kementerian di awal run
          <code className="bg-gray-800 text-white px-1 py-0.5 rounded-sm">node app.js</code>
        </li>
        <li>list perjalanan sesuai divisi (manager)</li>
        <li>create perjalanan (manager)</li>
        <li>approve perjalanan (manager)</li>
      </ul> */}
    </>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
