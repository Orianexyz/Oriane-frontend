import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";

const apiDelete = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const logout = async (token: string) => {
    await apiCall(apiClient, `/api/auth/logout`, navigate, "DELETE", {
      token,
    });
  };
  const protectedUsers = async (id: string) =>
    await apiCall(apiClient, `/api/users/protected/${id}`, navigate, "DELETE");

  const watchedUsers = async (id: string) =>
    await apiCall(apiClient, `/api/users/watched/${id}`, navigate, "DELETE");

  return {
    auth: {
      logout,
    },
    protectedUsers,
    watchedUsers,
  };
};

export default apiDelete;
