import useSWR from "swr";

export function useOptimisticList(key: string) {
  const { data, mutate: swrMutate } = useSWR(key);

  return {
    mutate: async (newData: any) => {
      const optimisticData = {
        data: [...data.data, newData],
      };

      await swrMutate(optimisticData, false);
    },
  };
}

export function useOptimistic(key: string) {
  const { data, mutate: swrMutate } = useSWR(key);

  return {
    mutate: async (newData: any) => {
      const optimisticData = {
        data: {
          ...data.data,
          ...newData,
        },
      };

      await swrMutate(optimisticData, false);
    },
  };
}
