import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";

const apiDelete = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const logout = async () => {
    const { data } = await apiClient.delete("/api/auth/logout");
    return data;
  };
  const protectedUsers = async (id: string) =>
    await apiCall(apiClient, `/api/users/protected/${id}`, navigate, "DELETE");

  const watchedUsers = async (id: string) =>
    await apiCall(apiClient, `/api/users/watched/${id}`, navigate, "DELETE");

  return {
    logout,
    protectedUsers,
    watchedUsers,
  };
};

export default apiDelete;
