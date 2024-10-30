import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  if (!req.headers["Content-Type"]) req.headers["Content-Type"] = "application/json";

  const store = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_APP_STORAGE_NAME || "") || "{}",
  );
  const accessToken = store?.token;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

api.interceptors.request.use(authInterceptor);
