import { api } from "@/api";

export const fetchScanRequest = async (query: string) => {
  const response = await api.get(`/scanrequest?${query || ""}`);
  return response.data;
};
