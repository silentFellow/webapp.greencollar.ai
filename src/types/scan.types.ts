export interface ScanSampleDetail {
  crop_property_id: string;
  crop_property_value: string;
}

export interface ScanSample {
  sample_id: string;
  sub_sample_id: string;
  crop_id: string;
  sample_name: string;
  subsample_name: string;
  sample_details: ScanSampleDetail[];
}
