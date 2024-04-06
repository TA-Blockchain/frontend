import { RiInbox2Line } from "@remixicon/react";

export function EmptyNotifications() {
  return (
    <div className="flex w-60 h-44 items-center justify-center rounded-tremor-small p-4">
      <div className="text-center">
        <RiInbox2Line
          className="mx-auto h-7 w-7 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
          aria-hidden={true}
        />

        <p className="mt-2 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Tidak ada notifikasi
        </p>
      </div>
    </div>
  );
}
