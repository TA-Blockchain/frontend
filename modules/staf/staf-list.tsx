import Avatar from "@/components/avatar";
import useSWR from "swr";
import { StafListEmpty } from "./staf-list-empty";
import { StafRemoveConfirmaation } from "./staf-remove-confirmation";

type Staf = {
  name: string;
  email: string;
};

export function StafList() {
  const { data } = useSWR<{ data: Array<Staf> }>("/auth/list/staf");

  if (data?.data.length === 0) {
    return <StafListEmpty />;
  }

  return (
    <ul role="list" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 p-5 border shadow-sm rounded-md">
          <div className="flex min-w-0 gap-x-4">
            <Avatar />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              <p className="flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${person.email}`} className="truncate hover:underline">
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="-mx-2.5 block px-2.5">
            <StafRemoveConfirmaation />
          </div>
        </li>
      ))}
    </ul>
  );
}
