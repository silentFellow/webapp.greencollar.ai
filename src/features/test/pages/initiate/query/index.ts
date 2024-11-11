import { api } from "@/api";

export const fetchCreateUserTemplate = async () => {
  const response = await api.get("/template?template_name=USER_CREATE");
  return response;
};

export const createUser = async (data: Record<string, string>) => {
  const response = await api.post("/user", data);
  return response;
};
