export interface UserTemplateProperty {
  property_name: string;
  property_display_name: string;
  property_type: "string" | "secret" | "email" | "integer" | "list";
  property_description: string;
  property_values?: string[];
  mandatory: number;
  min_length?: number;
  max_length?: number;
}

export type UserTemplate = UserTemplateProperty[];
