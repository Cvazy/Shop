import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosClassic, axiosWithAuth, errorCatch } from "@/app/api";

export const axiosBaseQuery =
  (
    useAuth = true,
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
    },
    unknown,
    { status?: number; data?: any; message?: string }
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const axiosInstance = useAuth ? axiosWithAuth : axiosClassic;
      const result = await axiosInstance({ url, method, data, params });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
          message: errorCatch(err),
        },
      };
    }
  };
