export interface Organisation {
  org_id: string;
  org_name: string;
  creation_date: string | null;
  org_secret_key: string | null;
  org_address: string | null;
  org_district: string | null;
  org_state: string | null;
  org_state_code: string | null;
  org_pincode: string | null;
}

export interface User {
  user_id: string;
  user_name: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  address: string | null;
  district: string | null;
  state_code: string | null;
  pincode: string | null;
  mobile_number: string;
  email: string | null;
  user_role: string;
  registration_date: string | null;
  organisation: Organisation;
  zohobook_id: string | null;
  is_zohoid_valid: boolean;
}
