import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";

const apiPut = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const updateProtectedUser = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/users/protected/${id}`,
      navigate,
      "PUT",
      data
    );

  const updateWatchedUser = async (id: string, data: object) =>
    await apiCall(apiClient, `/api/users/watched/${id}`, navigate, "PUT", data);

  const updateProtectedContent = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/content/protected/${id}`,
      navigate,
      "PUT",
      data
    );

  const updateWatchedContent = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/content/watched/${id}`,
      navigate,
      "PUT",
      data
    );

  return {
    updateProtectedUser,
    updateWatchedUser,
    updateProtectedContent,
    updateWatchedContent,
  };
};

export default apiPut;
