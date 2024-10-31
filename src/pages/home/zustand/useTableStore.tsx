import { create } from "zustand";
import { persist } from "zustand/middleware";
import ScanInfo from "@/pages/home/components/scan-info";
import { Order } from "@/pages/home/types";

type Query = Record<string, string | null>;
type Columns = {
  label: string;
  key: string;
  visible: boolean;
  function?: (info: unknown) => string | JSX.Element;
}[];

const columnFunctions: Record<string, (info: unknown) => string | JSX.Element> = {
  scan_info: info => <ScanInfo scan={info as Order} />,
  scan_request_id: info => {
    if (typeof info !== "string") return "";
    return `...${info.slice(-9)}`;
  },
};

export const useTableStore = create<{
  query: Query;
  columns: Columns;
  setQuery: (query: Query) => void;
  toggleColumns: (column: string) => void;
}>()(
  persist(
    set => ({
      query: {
        crop_id: null,
        crop_property_id: null,
        crop_property_value: null,
        kiosk_id: null,
        kiosk_name: null,
        limit: "10",
        offset: "0",
        operator_id: null,
        predict_property_id: null,
        predict_property_value_gte: null,
        predict_property_value_lte: null,
        sample_name: null,
        scan_date_gte: null,
        scan_date_lte: null,
        scan_request_id: null,
        sort_by_asc: null,
        sort_by_desc: null,
        status: null,
        sub_sample_name: null,
        taram_id: null,
        user_id: null,
      },

      setQuery: query => set({ query }),

      columns: [
        {
          label: "Scan Info",
          key: "scan_info",
          visible: true,
        },
        {
          label: "Scan Id",
          key: "scan_request_id",
          visible: true,
        },
        {
          label: "User Name",
          key: "on_behalf_of_name",
          visible: true,
        },
        {
          label: "Sample",
          key: "sample.sample_name",
          visible: true,
        },
        {
          label: "Sub Sample",
          key: "sample.subsample_name",
          visible: true,
        },
        {
          label: "Operator",
          key: "operator_name",
          visible: false,
        },
        {
          label: "Taram Id",
          key: "taram_id",
          visible: false,
        },
        {
          label: "Scan Date",
          key: "scan_request_date",
          visible: true,
        },
        {
          label: "Test Status",
          key: "scan_request_status",
          visible: true,
        },
        {
          label: "Order Status",
          key: "order_status",
          visible: true,
        },
      ],

      toggleColumns: columnKey =>
        set(state => ({
          columns: state.columns.map(column =>
            column.key === columnKey ? { ...column, visible: !column.visible } : column,
          ),
        })),
    }),
    {
      name: "table-store",
      onRehydrateStorage: () => state => {
        const columns = state?.columns;
        if (columns) {
          columns.forEach(column => {
            if (column.key in columnFunctions) {
              column.function = columnFunctions[column.key];
            }
          });
        }
      },
    },
  ),
);
