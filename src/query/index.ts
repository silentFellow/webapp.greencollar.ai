import { api } from "@/api";

export const fetchUser = async (identity: string) => {
  // TODO: not sure if it works
  const response = await api.get(
    `/user?user_name=${identity}&mobile=${identity}&email=${identity}&verify_zoho=true`,
  );
  return response;
};

export const fetchUserByUsername = async (username: string) => {
  const response = await api.get(`/user?user_name=${username}&verify_zoho=true`);
  return response;
};

export const fetchUserByMobile = async (mobile: number) => {
  const response = await api.get(`/user?mobile=${mobile}&verify_zoho=true`);
  return response;
};

export const fetchUserByEmail = async (email: string) => {
  const response = await api.get(`/user?email=${email}&verify_zoho=true`);
  return response;
};
