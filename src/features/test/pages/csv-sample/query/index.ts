import { api } from "@/api";
import { CreatePredictRequest } from "@/features/test/pages/csv-sample/types";
import { ScanFormType } from "@/features/test/components/test-form/lib/scan.validation";

export const getScanRequest = async (id: string): Promise<ScanFormType> => {
  const response = await api.get(`/scanrequest/${id}`);
  return response.data;
};

export const createPredictRequest = async (data: CreatePredictRequest) => {
  const response = api.post("/predictrequest", data);
  return response;
};
