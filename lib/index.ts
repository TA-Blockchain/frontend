import axios, { AxiosError } from "axios";

import { UninterceptedApiError } from "@/types/api";
import { toast } from "sonner";

import Router from "next/router";

export const fetcher = async (url: string) => {
  if (url.includes("undefined")) return undefined;
  return api.get(url).then((res) => res.data);
};

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
    config.headers.Authorization = token ?? "";
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // Network Error
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error, please try again later.");

      // API Error
    } else if (error.response?.data.error) {
      const errorMessage = error.response.data.error;

      handleInvalidToken(errorMessage, () =>
        toast.error(errorMessage, {
          id: errorMessage,
        })
      );

      // API Error with message
    } else if (error.response?.data?.message) {
      const errorMessage = error.response.data?.message;

      handleInvalidToken(errorMessage, () =>
        toast.error(errorMessage, {
          id: errorMessage,
        })
      );

      // Invalid Token
    } else if (error.response?.status === 401) {
      handleInvalidToken("Invalid token");
    }

    return Promise.reject(error);
  }
);

export const loadingPlaceholder = (length: number) => Array.from({ length }, (_) => null);

const handleInvalidToken = (message: string, callback?: () => void) => {
  if (message === "Invalid token") {
    toast.error("Invalid token, please login again.");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    Router.replace("/login");
  } else {
    callback?.();
  }
};
