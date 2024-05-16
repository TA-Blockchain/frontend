import {
  DocumentIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Notification } from "./notifications-menu";

import { Company } from "@/modules/company/list";
import { Shipment } from "@/modules/shipment/shipment-list";
import { getCarbonEmissionFormatted, getReadableDateTime } from "@/lib";
import { SupplyChain } from "@/modules/supply-chain/supply-chain-list";
import { UserData, useUser } from "@/hooks/use-user";

function handleNotificationType(key: keyof Notification, value: any, currentUser: UserData) {
  // Handle single values
  let content: string | React.ReactNode = "";
  let icon = UserIcon;
  let iconBackground = "bg-gray-400";
  let href = "";

  switch (key) {
    // Cases for different notification types
    case "carbonSalesProposal":
      content = (
        <span>
          Menunggu persetujuan proposal penjualan sebanyak <b>{getCarbonEmissionFormatted(value.kuotaYangDijual)}</b>{" "}
          kuota karbon.
        </span>
      );
      icon = DocumentIcon;
      iconBackground = "bg-blue-500";
      href = `/marketplace/proposal/${value.id}`;
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
      icon = DocumentIcon;
      iconBackground = "bg-blue-500";
      break;
    case "supplyChainPending":
      const supplyChainPending = value as SupplyChain;
      const hasSelfApprove = supplyChainPending.proposalSupplyChain.some(
        (proposal) => proposal.status === "approve" && proposal.id === currentUser.idPerusahaan
      );
      content = hasSelfApprove ? (
        <span>
          Menunggu perusahaan lain untuk bergabung ke Supply Chain <b>{supplyChainPending.Nama}</b>
        </span>
      ) : (
        <span>
          Menunggu persetujuan Anda untuk bergabung ke Supply Chain <b>{supplyChainPending.Nama}</b>
        </span>
      );
      href = `/supply-chain/${supplyChainPending.id}`;
      icon = MegaphoneIcon;
      iconBackground = "bg-orange-500";
      break;
    case "shipment":
      const shipment = value as Shipment;
      const waktuBerangkat = getReadableDateTime(shipment.waktuBerangkat);
      const isWaitingBerangkat = new Date(shipment.waktuBerangkat) > new Date() && shipment.status === "Need Approval";
      content = isWaitingBerangkat ? (
        <span>
          Pengiriman baru akan diantarkan pada <b>{waktuBerangkat}</b>
        </span>
      ) : (
        <span>
          Menunggu Anda menyelesaikan perjalanan <b>{waktuBerangkat}</b>
        </span>
      );
      href = `/shipment/${shipment.id}`;
      icon = isWaitingBerangkat ? TruckIcon : QuestionMarkCircleIcon;
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
  const { user } = useUser();

  const notifications = Object.entries(notificationObject).flatMap(([untypedKey, value]) => {
    const key = untypedKey as keyof Notification;

    // Skip if the value is empty
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return [];
    }

    // Handle arrays with more than one value
    if (Array.isArray(value) && value.length > 1) {
      return value.map((item) => {
        return handleNotificationType(key, item, user);
      });
    }

    return [handleNotificationType(key, value[0], user)];
  });

  return notifications;
}
