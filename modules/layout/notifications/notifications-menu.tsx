import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { RiNotificationLine } from "@remixicon/react";
import { NotificationsList } from "./notifications-list";
import { EmptyNotifications } from "./empty-notifications";
import useSWR from "swr";
import { Company } from "@/modules/company/list";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export type Notification = {
  // waiting for approval (admin/staf kementerian)
  carbonSalesProposal: Array<any>;
  // waiting for approval (admin/staf kementerian)
  company: Array<Company>;
  // waiting for approval (admin/staf kementerian)
  supplyChain: Array<any>;

  // waiting for approval (admin perusahaan)
  carbonTransaction: Array<any>;
  // waiting for approval (admin perusahaan)
  supplyChainPending: Array<any>;

  // waiting for approval (manager perusahaan)
  shipment: Array<any>;
};

export type NotificationKey = keyof Notification;

export function NotificationsMenu() {
  const { data, isLoading } = useSWR<{ data: Notification }>("/notifications");

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

  // Check if any notifications exist
  const hasNotifications =
    Object.values(notificationObject).some((item) => {
      return item && Array.isArray(item) && item.length > 0;
    }) && !isLoading;

  const router = useRouter();

  return (
    <Menu as="div" className="relative text-left inline-block h-5 w-5">
      <Menu.Button className="relative text-gray-400 hover:text-gray-500">
        <span className="sr-only">Lihat notifikasi</span>
        <RiNotificationLine className="h-5 w-5" aria-hidden="true" />
        {hasNotifications && <div className="w-1.5 h-1.5 absolute -top-0.5 -right-0.5 indicator rounded-full"></div>}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-16 max-w-[calc(100vw-2.5rem)] sm:-right-4 z-10 mt-2.5 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="font-medium text-gray-900">Pesan masuk</p>
          </div>

          <div className="max-sm:w-[calc(100vw-2.5rem)]">
            {!hasNotifications && <EmptyNotifications />}

            {hasNotifications && (
              <>
                <NotificationsList notificationObject={notificationObject as Notification} />

                <Menu.Item
                  as="button"
                  onClick={() => {
                    router.push("/notifications");
                  }}
                  type="button"
                  className="whitespace-nowrap rounded-md bg-white m-4 w-full max-w-[calc(100%-2rem)] px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                >
                  Lihat semua notifikasi
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
