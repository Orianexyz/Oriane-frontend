import { useNavigate } from "react-router-dom";
import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import apiDelete from "@/api/delete";
import apiGet from "@/api/get";
import apiPatch from "@/api/patch";
import apiPost from "@/api/post";
import apiPut from "@/api/put";
import { normalizeUrl } from "@/lib/utils";

const baseURL = import.meta.env.VITE_API_URL || "No API URL set";

export const apiClient = axios.create({
  baseURL: normalizeUrl(baseURL),
  timeout: 10000,
});

// Interceptor para configurar los encabezados antes de enviar cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    (config.headers as AxiosHeaders).set("Content-Type", "application/json");

    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - logging out");
    }
    return Promise.reject(error);
  }
);

const useApi = () => {
  const setAuthorization = (token: string) => {
    apiClient.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (token) {
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          (config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${token}`
          );
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

  const navigate = useNavigate();
  const get = apiGet(apiClient, navigate);
  const post = apiPost(apiClient, navigate);
  const put = apiPut(apiClient, navigate);
  const patch = apiPatch(apiClient, navigate);
  const del = apiDelete(apiClient, navigate);

  return {
    setAuthorization,
    get,
    post,
    put,
    patch,
    del,
  };
};

export default useApi;
