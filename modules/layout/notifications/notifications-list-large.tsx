import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Notification } from "./notifications-menu";

import { useRouter } from "next/navigation";
import { useNotifications } from "./use-notifications";
import { EmptyPlaceholder } from "@/modules/template/empty-placeholder";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function NotificationsListLarge({ notificationObject }: { notificationObject: Notification }) {
  const router = useRouter();

  const notifications = useNotifications(notificationObject);

  if (notifications.length === 0) {
    return (
      <EmptyPlaceholder
        title="Notifikasi kosong"
        description="Notifikasi yang masuk akan ditampilkan di halaman ini."
      />
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm border overflow-hidden">
      <ul role="list" className="">
        {notifications.map((event, eventIdx) => (
          <li key={event.id}>
            <button
              className="w-full group hover:bg-gray-100 pt-4 pb-2 pl-4 pr-6"
              onClick={() => router.push(event.href)}
            >
              <div className="relative pb-2">
                {eventIdx !== notifications.length - 1 ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-center space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.iconBackground,
                        "h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white group-hover:ring-gray-100"
                      )}
                    >
                      <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-left text-sm text-gray-500 line-clamp-2">{event.content}</p>
                  </div>

                  <ChevronRightIcon className="shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
