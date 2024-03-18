import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";

import { UninterceptedApiError } from "@/types/api";

export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === "string"
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);
