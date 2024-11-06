import ToolTip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { TbBoxMultiple, TbDeselect, TbReportAnalytics, TbReportOff } from "react-icons/tb";
import { checkPermissions } from "@/lib/utils";
import { Order } from "@/features/test/pages/home/types";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelScanRequest } from "../../query";

const ScanInfo = ({ scan }: { scan: Order }) => {
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);

  const queryClient = useQueryClient();
  const cancelScanMutation = useMutation({
    mutationKey: ["cancel_scan", scan.scan_request_id],
    mutationFn: () => cancelScanRequest(scan.scan_request_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scans"] });
      setIsCancelling(false);
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return (
    <div className="flex">
      {scan.scan_request_status.toLowerCase() === "completed" && (
        <>
          <ToolTip
            children={
              <Button
                variant="ghost"
                onClick={() => {
                  navigate(`/test/report/${scan.sample.crop_id}/${scan.scan_request_id}`);
                }}
              >
                <TbReportAnalytics />
              </Button>
            }
            content={"Scan Report"}
          />

          <ToolTip
            children={
              <Button
                variant="ghost"
                onClick={() => {
                  navigate(`/test/reports/${scan.order_id}`);
                }}
              >
                <TbBoxMultiple />
              </Button>
            }
            content={"Order Report"}
          />
        </>
      )}

      {scan.scan_request_status.toLowerCase() === "pending" && (
        <AlertDialog open={isCancelling} onOpenChange={setIsCancelling}>
          <ToolTip
            children={
              <AlertDialogTrigger asChild>
                <Button variant="ghost" onClick={() => setIsCancelling(true)}>
                  <AiOutlineClose />
                </Button>
              </AlertDialogTrigger>
            }
            content={"Click to cancel"}
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete scan {scan.scan_name}{" "}
                from the server...
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                onClick={() => {
                  toast.promise(cancelScanMutation.mutateAsync, {
                    loading: "Cancelling scan...",
                    success: "Scan cancelled successfully",
                    error: "An error occurred while cancelling scan",
                  });
                }}
                // onClick={() => console.log("clicked")}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {scan.scan_request_status.toLowerCase() === "cancelled" && (
        <>
          <ToolTip
            children={
              <Button
                variant="ghost"
                onClick={() => {
                  navigate(`/test/reports/${scan.order_id}`);
                }}
              >
                <TbReportOff />
              </Button>
            }
            content={"Test cancelled"}
          />
          <ToolTip
            children={
              <Button variant="ghost" onClick={() => console.log(scan.scan_request_status)}>
                <BiError />
              </Button>
            }
            content={"Error"}
          />
        </>
      )}
      {scan.scan_request_status.toLowerCase() === "error" && (
        <ToolTip
          children={
            <Button
              variant="ghost"
              onClick={() => {
                navigate(`/test/reports/${scan.order_id}`);
              }}
            >
              <BiError />
            </Button>
          }
          content={"Error"}
        />
      )}

      {checkPermissions("gca_admin") && (
        <ToolTip
          children={
            <Button
              variant="ghost"
              onClick={() => {
                navigate(`/test/debug/${scan.scan_request_id}`);
              }}
            >
              <TbDeselect />
            </Button>
          }
          content={"Debug"}
        />
      )}
    </div>
  );
};

export default ScanInfo;
