import { ScanFileData, ScanValue } from "@/features/test/pages/csv-sample/types";

export const parseCSV = async (file: File): Promise<ScanFileData | Error> => {
  try {
    const text = await file.text();
    const lines = text.split("\n");

    const scanProperties: Record<string, string> = {};
    const scanValues: ScanValue[] = [];

    let startCollectingSpectrum = false;
    let skipHeaders = false;

    for (const line of lines) {
      const data = line.split(",");
      if (!line.includes("*")) {
        if (startCollectingSpectrum) {
          if (skipHeaders) {
            if (data.length < 4) continue;

            scanValues.push({
              wavelength: parseFloat(data[0].trim()),
              absorbance: parseFloat(data[1].trim()),
              reference: parseFloat(data[2].trim()),
              signal: parseFloat(data[3].trim()),
            });
          } else {
            skipHeaders = true;
            continue;
          }
        } else {
          if (!Object.keys(scanProperties).includes(data[0])) {
            scanProperties[data[0]] =
              data.slice(1).length === 1 ? data[1] : data.slice(1).slice(1, -1).toString();
          }
        }
      } else {
        if (line.toLowerCase().includes("scan data")) {
          startCollectingSpectrum = true;
        } else {
          continue;
        }
      }
    }

    const fileData: ScanFileData = { scan_properties: scanProperties, scan_values: scanValues };
    return fileData;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to parse data: ${error.message}`);
    else throw new Error("An unknown error occured");
  }
};
