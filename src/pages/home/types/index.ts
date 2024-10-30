interface SampleDetail {
  crop_property_id: string;
  crop_property_value: string;
}

interface Sample {
  sample_id: string;
  sub_sample_id: string;
  crop_id: string;
  sample_name: string;
  subsample_name: string;
  sample_details: SampleDetail[];
}

interface PredictableProperty {
  predictable_property_id: string;
  is_selected: boolean;
}

export interface Order {
  order_id: string;
  order_status: string;
  scan_request_id: string;
  scan_request_date: string;
  scan_request_status: string;
  taram_id: string;
  initiated_at: string;
  operator_id: string;
  operator_name: string;
  on_behalf_of_id: string;
  on_behalf_of_name: string;
  scan_name: string;
  scan_description: string;
  order_invoice_number: string | null;
  sample: Sample;
  selected_predictable_properties: PredictableProperty[];
}
