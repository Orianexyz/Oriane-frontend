import type { AxiosInstance } from "axios";
import { apiCall } from "@/utils/api";
import type {
  ProtectedUser,
  WatchedUser,
  ProtectedContent,
  WatchedContent,
  MatchedContent,
  AuthenticatedUser,
} from "@/types/database.types";
import { ITEMS_PER_PAGE } from "@/constants";

const apiGet = (
  apiClient: AxiosInstance,
  navigate?: (path: string) => void
) => {
  const protectedUsers = async (): Promise<ProtectedUser[]> =>
    await apiCall<ProtectedUser[]>(apiClient, `/api/users/protected`, navigate);

  const watchedUsers = async (): Promise<WatchedUser[]> =>
    await apiCall<WatchedUser[]>(apiClient, `/api/users/watched`, navigate);

  const protectedContent = async (
    searchTerm: string = "",
    offset: number = 0,
    limit: number = ITEMS_PER_PAGE
  ): Promise<ProtectedContent[]> => {
    const response = await apiClient.get(`/api/content/protected`, {
      params: { searchTerm, offset, limit },
    });
    return response.data;
  };

  const watchedContent = async (): Promise<WatchedContent[]> =>
    await apiCall<WatchedContent[]>(
      apiClient,
      `/api/content/watched`,
      navigate
    );

  const matchedContent = async (): Promise<MatchedContent[]> =>
    await apiCall<MatchedContent[]>(
      apiClient,
      `/api/content/matched`,
      navigate
    );

  const auth = async (): Promise<AuthenticatedUser> => {
    try {
      const response = await apiCall<AuthenticatedUser>(
        apiClient,
        `/api/auth/user`
      );
      return response;
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
      throw error;
    }
  };

  return {
    protectedUsers,
    watchedUsers,
    protectedContent,
    watchedContent,
    matchedContent,
    auth,
  };
};

export default apiGet;
