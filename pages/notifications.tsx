import React from "react";
import useSWR from "swr";
import { Text } from "@tremor/react";
import { useUser } from "@/hooks/use-user";
import { Notification } from "@/modules/layout/notifications/notifications-menu";
import { NotificationsListLarge } from "@/modules/layout/notifications/notifications-list-large";

export default function NotificationsPage() {
  const { data } = useSWR<{ data: Notification }>("/notifications");

  const {
    user: { userType },
  } = useUser();

  let notificationObject = {};

  // Define the appropriate notifications based on userType
  switch (userType) {
    case "admin-kementerian":
    case "staf-kementerian":
      notificationObject = {
        carbonSalesProposal: data?.data.carbonSalesProposal,
        company: data?.data.company,
        supplyChain: data?.data.supplyChain,
      };
      break;
    case "admin-perusahaan":
      notificationObject = {
        carbonTransaction: data?.data.carbonTransaction,
        supplyChainPending: data?.data.supplyChainPending,
      };
      break;
    case "manager-perusahaan":
      notificationObject = {
        shipment: data?.data.shipment,
      };
      break;
    default:
      break;
  }

  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Notifikasi</h1>
      <Text className="mt-0.5">Kelola notifikasi yang masuk di akun Anda.</Text>

      <div className="mt-4">
        <NotificationsListLarge notificationObject={notificationObject as Notification} />
      </div>
    </main>
  );
}

NotificationsPage.title = "Notifikasi | Carbon Chain";
