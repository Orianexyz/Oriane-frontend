import type { AxiosInstance } from "axios";

export async function apiCall<T>(
  apiClient: AxiosInstance,
  endpoint: string,
  navigate?: (path: string) => void,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: object
): Promise<T> {
  try {
    const response =
      method === "GET"
        ? await apiClient.get(endpoint)
        : method === "POST"
        ? await apiClient.post(endpoint, body)
        : method === "PUT"
        ? await apiClient.put(endpoint, body)
        : method === "PATCH"
        ? await apiClient.patch(endpoint, body)
        : method === "DELETE"
        ? await apiClient.delete(endpoint)
        : null;

    return response?.data as T;
  } catch (error) {
    if (navigate) {
      navigate("/error");
    }
    throw error;
  }
}
