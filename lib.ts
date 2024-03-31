import axios, { AxiosError } from "axios";

import { UninterceptedApiError } from "@/types/api";
import { toast } from "sonner";

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
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error, please try again later.");
    }
    // parse error
    if (error.response?.data.error) {
      const errorMessage = error.response.data.error;
      if (typeof errorMessage === "string") {
        toast.error(errorMessage, {
          id: errorMessage,
        });
      }
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.error === "string"
                ? error.response.data.error
                : Object.values(error.response.data.error)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);
