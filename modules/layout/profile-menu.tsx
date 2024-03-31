import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useUser } from "@/hooks/use-user";
import { RiUserLine } from "@remixicon/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function ProfileMenu() {
  const { logout, user } = useUser();

  return (
    <Menu as="div" className="relative text-left inline-block h-9 w-9">
      <Menu.Button className="">
        <span className="sr-only">Your profile</span>
        <div className="rounded-full p-2 border bg-tremor-brand-faint border-tremor-brand-muted">
          <RiUserLine className="h-5 w-5 text-tremor-brand-subtle" />
        </div>
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
        <Menu.Items className="absolute -right-1 sm:right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">{user?.email}</p>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
