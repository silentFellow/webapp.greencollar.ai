import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { fetchCreateUserTemplate } from "@/features/test/pages/initiate/query";

export const UseUserForm = () => {
  const userTemplate = useQuery({
    queryKey: ["user_template"],
    queryFn: () => fetchCreateUserTemplate(),
  });

  if (userTemplate.error) return null;

  const schema = z.object({});
  if (userTemplate.isSuccess) {
    userTemplate.data.data.map(field => {
      switch (field.property_type) {
        case "list":
          field.property_name = z.enum(field.property_values);
          break;
        case "string":
        case "email":
        case "secret":
          field.property_name = z.string();
          break;
        case "integer":
          field.property_name = z.number();
          break;
        default:
          field.property_name = z.any();
      }

      schema.extend({
        [field.property_name]: field.property_name,
      });
    });
  }
  console.log(schema);

  return <div>UseUserForm</div>;
};
