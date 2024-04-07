import { ExclamationTriangleIcon, HandThumbUpIcon, UserIcon } from "@heroicons/react/20/solid";
import { Notification } from "./notifications-menu";

import { Company } from "@/modules/company/list";

function handleNotificationType(key: keyof Notification, value: any) {
  // Handle single values
  let content: string | React.ReactNode = "";
  let icon = UserIcon;
  let iconBackground = "bg-gray-400";
  let href = "";

  switch (key) {
    // Cases for different notification types
    case "carbonSalesProposal":
      content = "Menunggu persetujuan proposal penjualan karbon";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    case "company":
      const company = value as Company;
      content = (
        <span>
          Perusahaan <b>{company.nama}</b> menunggu persetujuan proposal registrasi.
        </span>
      );
      icon = ExclamationTriangleIcon;
      iconBackground = "bg-yellow-500";
      href = `/company/${company.id}`;
      break;
    case "supplyChain":
      content = "Menunggu persetujuan rantai pasok";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    case "carbonTransaction":
      content = "Menunggu persetujuan transaksi karbon";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    case "supplyChainPending":
      content = "Menunggu persetujuan rantai pasok";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    case "shipment":
      content = "Menunggu persetujuan pengiriman";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    default:
      break;
  }

  return {
    id: Math.random(),
    content,
    href,
    icon,
    iconBackground,
  };
}

export function useNotifications(notificationObject: Notification) {
  const notifications = Object.entries(notificationObject).flatMap(([untypedKey, value]) => {
    const key = untypedKey as keyof Notification;

    // Skip if the value is empty
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return [];
    }

    // Handle arrays with more than one value
    if (Array.isArray(value) && value.length > 1) {
      return value.map((item) => {
        return handleNotificationType(key, item);
      });
    }

    return [handleNotificationType(key, value[0])];
  });

  return notifications;
}
