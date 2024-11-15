export interface Taram {
  taram_id: string;
  taram_hex: number;
  taram_version: string;
  is_internal: boolean;
  is_rented: boolean;
  kiosk_id: string;
  calibration_file: FileList;
  calibration_version: string;
  model_report: FileList;
  additional_info: string;
  registered_date: string;
}
