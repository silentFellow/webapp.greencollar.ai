import Breadcrumbs from "@/components/Breadcrumbs";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import TestForm from "@/features/test/components/test-form";
import { OrderCreationResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createPredictRequest, getScanRequest } from "./query";
import { parseCSV } from "./lib";
import { CreatePredictRequest, ScanFileData } from "./types";
import { ScanFormType } from "@/features/test/components/test-form/lib/scan.validation";
import { getCurrentDateTime } from "@/lib/utils";

const CsvSample = () => {
  const [response, setResponse] = useState<OrderCreationResponse>();
  const scan_request_id = response?.scan_request_id;

  const [taramHex, setTaramHex] = useState<number>();

  const scanRequest = useQuery<ScanFormType>({
    queryKey: ["scan", scan_request_id],
    queryFn: async () => {
      if (!scan_request_id) return {} as ScanFormType;
      const response = getScanRequest(scan_request_id);
      return response;
    },
  });

  const createPredictRequestMutation = useMutation({
    mutationKey: ["predict", scan_request_id],
    mutationFn: async (data: CreatePredictRequest) => {
      const response = createPredictRequest(data);
      return response;
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    const fileData: ScanFileData[] = [];

    const { day, month, hours, minutes, seconds, year } = getCurrentDateTime();
    const dateTimeNormal = `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
    const dateTimeForHex = `${day}${month}${year}${hours}${minutes}${seconds}`;

    for (const file of files) {
      try {
        const data = await parseCSV(file);
        if (data instanceof Error) throw data;
        fileData.push(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occured");
        }
      }
    }

    if (!scan_request_id || !scanRequest || !scanRequest.data) return;

    const predictRequestData: CreatePredictRequest = {
      predict_request_id: `${taramHex}0003${dateTimeForHex}`,
      predict_request_date: dateTimeNormal,
      scan_request: scanRequest.data,
      scan_info: {
        scan_id: `${taramHex}0003${dateTimeForHex}`,
        scan_date: dateTimeNormal,
        taram_id: scanRequest.data?.taram_id || "",
        sub_sample_id: scanRequest.data?.sample.sub_sample_id || "",
        scan_status: response.scan_request_status.toLowerCase() === "completed" ? 1 : 0,
        iterations: files.length,
        unified_scan_data: fileData,
      },
    };

    createPredictRequestMutation.mutateAsync(predictRequestData);
  };

  return (
    <section className="col gap-2">
      <Breadcrumbs
        path={{
          Tools: "/tools",
          "CSV-Sample": "/tools/csv-sample",
        }}
      />

      <TestForm setResponse={setResponse} setTaramHex={setTaramHex} />

      {response && (
        <div className="mt-6 col gap-3">
          <h2 className="font-bold">Upload Files: </h2>
          <div className="w-[90%] mx-auto p-3 rounded-md border border-black col gap-3">
            <FileUploader files={files} setFiles={setFiles} />

            {files.length > 0 && (
              <Button className="w-full" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CsvSample;
