import { api } from "@/api";

export const fetchCreateUserTemplate = async () => {
  const response = await api.get("/template?template_name=USER_CREATE");
  return response;
};
