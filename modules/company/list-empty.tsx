import { Text } from "@tremor/react";

const placeholder = Array.from({ length: 6 }, (_) => null);

export function CompanyListEmpty() {
  return (
    <div className="relative mt-4 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 max-h-96 overflow-hidden">
      {placeholder.map((i) => (
        <div
          key={i}
          className="bg-gray-100 w-full h-52 rounded max-sm:first-of-type:rounded-b-none max-sm:even:rounded-t-none"
        ></div>
      ))}

      <div className="absolute -bottom-20 w-full h-full sm:h-60 bg-gradient-to-t from-white"></div>
      <div className="absolute max-sm:h-full sm:bottom-0 w-full grid place-items-center">
        <div className="max-sm:mt-10 text-center px-2">
          <p className="font-medium">No companies created yet</p>
          <Text className="mt-2">
            Proposals from the company will be displayed in the <b>Waiting for Approval</b> tab.
          </Text>
        </div>
      </div>
    </div>
  );
}
