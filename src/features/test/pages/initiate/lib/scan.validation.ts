import { z } from "zod";
import { Crop } from "@/types";

export const getScanSchema = (selectedCrop: Crop | undefined) => {
  const baseSchema = z.object({
    order_id: z.string().min(1, "This field is required"),
    scan_request_id: z.string().min(1, "This field is required"),
    operator_id: z.string().min(1, "This field is required"),
    on_behalf_of_id: z.string().min(1, "This field is required"),
    taram_id: z.string().min(1, "This field is required"),
    sample: z.object({
      sample_id: z.string().min(1, "This field is required"),
      sub_sample_id: z.string().min(1, "This field is required"),
      sample_name: z.string().min(1, "This field is required"),
      subsample_name: z.string().min(1, "This field is required"),
      crop_id: z.string().min(1, "This field is required"),
      sample_details: z.array(
        z.object({
          crop_property_id: z.string(),
          crop_property_value: z.string(),
        }),
      ),
    }),
    selected_predictable_properties: z.array(
      z.object({
        predictable_property_id: z.string(),
        is_selected: z.literal(0).or(z.literal(1)),
        cost: z.number(),
      }),
    ),
  });

  if (selectedCrop) {
    const extendedSchema = baseSchema.extend({
      sample: baseSchema.shape.sample.extend({
        sample_details: z.array(
          z
            .object({
              crop_property_id: z.string().or(z.literal("")),
              crop_property_value: z.string().or(z.literal("")),
            })
            .refine(
              prop => {
                const cropProperty = selectedCrop.crop_property.find(
                  p => p.crop_property_id === prop.crop_property_id,
                );
                if (cropProperty && cropProperty.mandatory.toLowerCase() === "true") {
                  return prop.crop_property_value !== undefined && prop.crop_property_value !== "";
                }
                return true;
              },
              {
                message: "This field is required",
                path: ["crop_property_value"],
              },
            ),
        ),
      }),
      selected_predictable_properties: z
        .array(
          z.object({
            predictable_property_id: z.string(),
            is_selected: z.literal(0).or(z.literal(1)),
            cost: z.number(),
          }),
        )
        .refine(
          props => {
            return props.every(prop =>
              selectedCrop.crop_predictable_property.some(
                p => p.predictable_property_id === prop.predictable_property_id,
              ),
            );
          },
          {
            message: "Invalid predictable property ID",
          },
        ),
    });

    return extendedSchema;
  }

  return baseSchema;
};

export const scanDefValues = {
  order_id: "",
  scan_request_id: "",
  operator_id: "",
  on_behalf_of_id: "",
  taram_id: "",
  sample: {
    sample_id: "",
    sub_sample_id: "",
    sample_name: "",
    subsample_name: "",
    crop_id: "",
    sample_details: [],
  },
  selected_predictable_properties: [],
};

export type ScanFormType = z.infer<ReturnType<typeof getScanSchema>>;
