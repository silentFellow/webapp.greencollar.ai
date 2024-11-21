import { api } from "@/api";
import { ScanFormType } from "@/features/test/components/test-form/lib/scan.validation";
import { OrderCreationResponse } from "@/types";

// user section
export const fetchCreateUserTemplate = async () => {
  const response = await api.get("/template?template_name=USER_CREATE");
  return response;
};

export const createUser = async (data: Record<string, string>) => {
  const response = await api.post("/user", data);
  return response;
};

// scan section
export const fetchCropTemplate = async () => {
  const response = await api.get("/crop");
  return response;
};

export const fetchAllKiosks = async () => {
  const response = await api.get("/kiosk");
  return response;
};

export const fetchAllTarams = async () => {
  const response = await api.get("/taram");
  return response;
};

export const fetchTaramAssociatedWithKiosk = async (kiosk: string) => {
  const response = await api.get(`/taram?kiosk_id=${kiosk}`);
  return response;
};

export const createScan = async (data: ScanFormType): Promise<OrderCreationResponse> => {
  const response = await api.post("/scanrequest", data);
  return response.data;
};
