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

// user creation
export interface UserProperty {
  property_name: string;
  property_display_name: string;
  property_type: "string" | "secret" | "email" | "integer" | "list";
  property_description: string;
  property_values?: string[];
  mandatory: number;
  min_length?: number;
  max_length?: number;
}

export type UserTemplate = UserProperty[];
