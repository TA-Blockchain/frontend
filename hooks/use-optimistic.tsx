import useSWR from "swr";
import { useSWRConfig } from "swr";

export function useOptimisticList(key: string) {
  const { data, mutate: swrMutate } = useSWR(key);
  const { mutate: globalMutate } = useSWRConfig();

  return {
    mutate: async (newData: any) => {
      const optimisticData = {
        data: [...data.data, newData],
      };

      await swrMutate(optimisticData, false);

      setTimeout(() => {
        globalMutate(key);
      }, 3000);
    },
  };
}

export function useOptimisticListUpdate(key: string) {
  const { data, mutate: swrMutate } = useSWR(key);
  const { mutate: globalMutate } = useSWRConfig();

  return {
    mutate: async (newData: any, mapFn: (item: any) => boolean) => {
      const updatedData = data?.data.map((item: any) => {
        const shouldUpdate = mapFn(item);
        if (shouldUpdate) {
          return {
            ...item,
            ...newData,
          };
        }

        return item;
      });

      const optimisticData = {
        data: updatedData,
      };

      await swrMutate(optimisticData, false);

      setTimeout(() => {
        globalMutate(key);
      }, 3000);
    },
  };
}

export function useOptimistic(key: string) {
  const { data, mutate: swrMutate } = useSWR(key);
  const { mutate: globalMutate } = useSWRConfig();

  return {
    mutate: async (newData: any) => {
      const optimisticData = {
        data: {
          ...data.data,
          ...newData,
        },
      };

      await swrMutate(optimisticData, false);

      setTimeout(() => {
        globalMutate(key);
      }, 3000);
    },
  };
}
