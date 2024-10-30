import ToolTip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { TbBoxMultiple, TbDeselect, TbReportAnalytics, TbReportOff } from "react-icons/tb";
import { checkPermissions } from "@/lib/utils";
import { Order } from "@/pages/home/types";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiError } from "react-icons/bi";

const ScanInfo = ({ scan }: { scan: Order }) => {
  const navigate = useNavigate();

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
        <ToolTip
          children={
            <Button
              variant="ghost"
              onClick={() => {
                navigate(`/test/reports/${scan.order_id}`);
              }}
            >
              <AiOutlineClose />
            </Button>
          }
          content={"Click to cancel"}
        />
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
