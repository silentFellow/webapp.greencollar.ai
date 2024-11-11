import { z, ZodTypeAny } from "zod";
import { UserTemplate, UserTemplateProperty } from "@/features/test/pages/initiate/types";

export const parseUserSchema = (userTemplate: UserTemplate) => {
  const userSchema = z.object(
    userTemplate.reduce((acc: Record<string, ZodTypeAny>, item: UserTemplateProperty) => {
      let schema;

      switch (item.property_type.toLowerCase()) {
        case "string":
        case "secret":
          schema = z
            .string()
            .min(item.min_length || 0)
            .max(item.max_length || Infinity);
          break;

        case "email":
          schema = z
            .string()
            .email()
            .min(item.min_length || 0)
            .max(item.max_length || Infinity);
          break;

        case "integer":
          schema = z
            .string()
            .regex(/^\d+$/)
            .min(item.min_length || 0)
            .max(item.max_length || Infinity)
            .or(z.string().length(0));
          break;

        case "list":
          if (item.property_values && item.property_values.length > 0) {
            schema = z.enum(item.property_values as [string, ...string[]]);
          } else {
            schema = z
              .string()
              .min(item.min_length || 0)
              .max(item.max_length || Infinity);
          }
          break;

        default:
          schema = z.any();
      }

      if (!item.mandatory) schema = schema.optional();

      acc[item.property_name as string] = schema;
      return acc;
    }, {}),
  );

  return userSchema;
};
