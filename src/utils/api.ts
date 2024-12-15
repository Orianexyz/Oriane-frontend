import type { AxiosInstance, AxiosResponse } from "axios";

export async function apiCall<T>(
  apiClient: AxiosInstance,
  endpoint: string,
  navigate?: (path: string) => void,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: object
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await (method === "GET"
      ? apiClient.get(endpoint)
      : method === "POST"
      ? apiClient.post(endpoint, body)
      : method === "PUT"
      ? apiClient.put(endpoint, body)
      : method === "PATCH"
      ? apiClient.patch(endpoint, body)
      : method === "DELETE"
      ? apiClient.delete(endpoint)
      : Promise.reject(new Error("Unsupported HTTP method")));

    return response.data;
  } catch (error) {
    if (navigate) {
      navigate("/error");
    }
    throw error;
  }
}
