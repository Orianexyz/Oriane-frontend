import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";

const apiPatch = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const patchProtectedUser = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/users/protected/${id}`,
      navigate,
      "PATCH",
      data
    );

  const patchWatchedUser = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/users/watched/${id}`,
      navigate,
      "PATCH",
      data
    );

  const patchProtectedContent = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/content/protected/${id}`,
      navigate,
      "PATCH",
      data
    );

  const patchWatchedContent = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/content/watched/${id}`,
      navigate,
      "PATCH",
      data
    );

  const patchMatchedContent = async (id: string, data: object) =>
    await apiCall(
      apiClient,
      `/api/content/matched/${id}`,
      navigate,
      "PATCH",
      data
    );

  return {
    patchProtectedUser,
    patchWatchedUser,
    patchProtectedContent,
    patchWatchedContent,
    patchMatchedContent,
  };
};

export default apiPatch;
