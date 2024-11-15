export interface CropPropertyValue {
  crop_property_id: string;
  crop_property_value: string;
  image_id: string;
}

export interface CropProperty {
  crop_property_id: string;
  crop_property_name: string;
  crop_property_type: string;
  crop_property_value_list: CropPropertyValue[];
  mandatory: string;
}

export interface CropPredictableProperty {
  predictable_property_id: string;
  predictable_property_name: string;
  predictable_property_description: string;
}

export interface Crop {
  crop_id: string;
  crop_name: string;
  image_id: string;
  is_internal: string;
  crop_property: CropProperty[];
  crop_predictable_property: CropPredictableProperty[];
}
