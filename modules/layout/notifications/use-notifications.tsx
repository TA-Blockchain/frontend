import {
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Notification } from "./notifications-menu";

import { Company } from "@/modules/company/list";
import { Shipment } from "@/modules/shipment/shipment-list";
import { getReadableDateTime } from "@/lib";
import { SupplyChain } from "@/modules/supply-chain/supply-chain-list";

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
      href = `/company/${company.id}`;
      icon = ExclamationTriangleIcon;
      iconBackground = "bg-yellow-500";
      break;
    case "supplyChain":
      const supplyChain = value as SupplyChain;
      content = "Menunggu persetujuan Anda untuk memvalidasi proposal Supply Chain";
      href = `/supply-chain/${supplyChain.id}`;
      icon = MegaphoneIcon;
      iconBackground = "bg-yellow-500";
      break;
    case "carbonTransaction":
      content = "Menunggu persetujuan Anda untuk memvalidasi transaksi karbon";
      icon = HandThumbUpIcon;
      iconBackground = "bg-blue-500";
      break;
    case "supplyChainPending":
      const supplyChainPending = value as SupplyChain;
      content = "Menunggu persetujuan Anda untuk bergabung ke Supply Chain";
      href = `/supply-chain/${supplyChainPending.id}`;
      icon = MegaphoneIcon;
      iconBackground = "bg-orange-500";
      break;
    case "shipment":
      const shipment = value as Shipment;
      const waktuBerangkat = getReadableDateTime(shipment.waktuBerangkat);
      content = (
        <span>
          Menunggu persetujuan perjalanan <b>{waktuBerangkat}</b>
        </span>
      );
      href = `/shipment/${shipment.id}`;
      icon = QuestionMarkCircleIcon;
      iconBackground = "bg-orange-400";
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
