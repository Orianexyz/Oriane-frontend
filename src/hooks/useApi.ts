import { useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import apiDelete from "@/api/delete";
import apiGet from "@/api/get";
import apiPatch from "@/api/patch";
import apiPost from "@/api/post";
import apiPut from "@/api/put";
import { normalizeUrl } from "@/lib/utils";

const baseURL = import.meta.env.VITE_API_URL || "No API URL set";

// Crear instancia de Axios
export const apiClient = axios.create({
  baseURL: normalizeUrl(baseURL),
  timeout: 10000,
});

// Interceptor para configurar los encabezados antes de cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set("Content-Type", "application/json");
    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo global de errores en respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - logging out");
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

const useApi = () => {
  const navigate = useNavigate();

  // Función para configurar el token manualmente
  const setAuthorization = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  // Métodos de la API organizados por tipo de solicitud
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
