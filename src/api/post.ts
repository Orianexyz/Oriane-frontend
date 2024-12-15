import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";

const apiPost = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    return await apiCall(apiClient, "/api/auth/login", undefined, "POST", {
      email,
      password,
    });
  };

  const protectedUsers = async (data: object) =>
    await apiCall(apiClient, "/api/users/protected", navigate, "POST", data);

  const watchedUsers = async (data: object) =>
    await apiCall(apiClient, "/api/users/watched", navigate, "POST", data);

  const protectedContent = async (data: object) =>
    await apiCall(apiClient, "/api/content/protected", navigate, "POST", data);

  const watchedContent = async (data: object) =>
    await apiCall(apiClient, "/api/content/watched", navigate, "POST", data);

  return {
    login,
    protectedUsers,
    watchedUsers,
    protectedContent,
    watchedContent,
  };
};

export default apiPost;
