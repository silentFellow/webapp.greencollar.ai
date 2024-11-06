import { api } from "@/api";

export const fetchScanRequest = async (query: string) => {
  const response = await api.get(`/scanrequest?${query || ""}`);
  return response.data;
};

export const cancelScanRequest = async (scanId: string) => {
  const response = await api.put(`/scanrequest/${scanId}`, {
    scan_request_status: "cancelled",
  });
  return response;
};
