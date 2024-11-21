import { ScanFormType } from "@/features/test/components/test-form/lib/scan.validation";

export interface CreatePredictRequest {
  predict_request_id: string;
  predict_request_date: string;
  scan_request: ScanFormType;
  scan_info: ScanInfo;
}

interface ScanInfo {
  scan_id: string;
  scan_date: string;
  taram_id: string;
  sub_sample_id: string;
  scan_status: 0 | 1;
  iterations: number;
  unified_scan_data: ScanFileData[];
}

export interface ScanValue {
  wavelength: number;
  absorbance: number;
  reference: number;
  signal: number;
}

export interface ScanFileData {
  scan_properties: Record<string, string>;
  scan_values: ScanValue[];
}
