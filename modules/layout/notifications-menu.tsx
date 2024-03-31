import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { RiNotificationLine } from "@remixicon/react";
import { NotificationsList } from "./notifications-list";

export function NotificationsMenu() {
  const router = useRouter();

  return (
    <Menu as="div" className="relative text-left inline-block h-5 w-5">
      <Menu.Button className="text-gray-400 hover:text-gray-500">
        <span className="sr-only">View notifications</span>
        <RiNotificationLine className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute -right-16 max-w-[calc(100vw-2.5rem)] sm:-right-4 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="font-medium text-gray-900">Inbox</p>
          </div>

          <div className="whitespace-nowrap p-4">
            <NotificationsList />

            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 w-full mt-4"
            >
              View All Notifications
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
