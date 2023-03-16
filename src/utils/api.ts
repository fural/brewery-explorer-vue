import { request } from "./request";

export const api = {
  get: <TResponse>(url: string, config?: RequestInit) =>
    request<TResponse>(url, config),
};
