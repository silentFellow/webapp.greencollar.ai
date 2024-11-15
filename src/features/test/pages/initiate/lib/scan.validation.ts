import { Crop, CropPredictableProperty } from "@/types";
import { z } from "zod";

export const scanSchame = z.object({
  order_id: z.string(),
  scan_request_id: z.string(),
  operator_id: z.string(),
  on_behalf_of_id: z.string(),
  taram_id: z.string(),
  sample: z.object({
    sample_id: z.string(),
    sub_sample_id: z.string(),
    sample_name: z.string(),
    subsample_name: z.string(),
    crop_id: z.string(),
    sample_details: z.array(
      z.object({
        crop_property_id: z.string(),
        crop_property_value: z.string(),
      }),
    ),
    selected_predictable_properties: z.array(
      z.object({
        predictable_property_id: z.string(),
        is_selected: z.literal(0 | 1),
        cost: z.number(),
      }),
    ),
  }),
});

export const scanValDefValues = {
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
    selected_predictable_properties: [],
  },
};

export type ScanFormType = z.infer<typeof scanSchame>;
