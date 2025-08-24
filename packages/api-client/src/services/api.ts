// packages/services/apiService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CommonErrorResponse } from "../type";
import { supabase } from "./supabase/client";

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      async config => {
        const auth = await supabase.auth.getSession();
        const token = auth.data.session?.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  private async handleResponse<T>(resolver: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await resolver;
      return response.data;
    } catch (error) {
      return Promise.reject({
        error: (error as CommonErrorResponse).response?.data,
        status: (error as CommonErrorResponse).response?.status,
      });
    }
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.handleResponse(
      this.axiosInstance.get<T>(endpoint, {
        ...config,
        headers: {
          ...config?.headers,
          "ngrok-skip-browser-warning": "true", // This header is used to skip the ngrok warning in the browser
        },
      })
    );
  }

  async post<T, R>(endpoint: string, payload?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleResponse(
      this.axiosInstance.post<T, AxiosResponse<R>>(endpoint, payload, config)
    );
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.handleResponse(this.axiosInstance.delete<T>(endpoint, config));
  }

  async patch<T, R>(endpoint: string, payload: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleResponse(
      this.axiosInstance.patch<T, AxiosResponse<R>>(endpoint, payload, config)
    );
  }

  async put<T, R>(endpoint: string, payload?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleResponse(
      this.axiosInstance.put<T, AxiosResponse<R>>(endpoint, payload, config)
    );
  }
}
