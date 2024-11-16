import { useQuery } from "@tanstack/react-query";
import {
  fetchTaramAssociatedWithKiosk,
  fetchAllKiosks,
} from "@/features/test/pages/initiate/query";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import DropDown from "@/components/Dropdwon";
import { UseFormReturn } from "react-hook-form";
import { ScanFormType } from "@/features/test/pages/initiate/lib/scan.validation";
import { kiosk, Taram } from "@/types";
import { useScanFormStore } from "@/features/test/pages/initiate/zustand";

const KioskTaram = ({ form }: { form: UseFormReturn<ScanFormType> }) => {
  const { selectedKiosk, setSelectedKiosk, setSelectedTaram } = useScanFormStore();

  const tarams = useQuery({
    queryKey: ["tarams", selectedKiosk],
    queryFn: async () => {
      if (!selectedKiosk) return;
      return await fetchTaramAssociatedWithKiosk(selectedKiosk.kiosk_id);
    },
  });
  const taram_data = tarams.data?.data;

  const kiosks = useQuery({
    queryKey: ["kiosks"],
    queryFn: () => fetchAllKiosks(),
  });
  const kiosk_data = kiosks.data?.data;

  if (tarams.isLoading || kiosks.isLoading) return <p>Loading...</p>;

  return (
    <div className="grid sm:grid-cols-3 max-sm:grid-cols-1 gap-6">
      {kiosk_data && (
        <FormField
          control={form.control}
          name={"taram_id"}
          render={() => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <DropDown
                  options={kiosk_data.reduce((acc: Record<string, string>, kiosk: kiosk) => {
                    acc[kiosk.kiosk_name] = kiosk.kiosk_id;
                    return acc;
                  }, {})}
                  disableNone={true}
                  label="Select Kiosk"
                  value={selectedKiosk?.kiosk_id}
                  change={val => {
                    setSelectedKiosk(kiosk_data.find((kiosk: kiosk) => kiosk.kiosk_id === val));
                    form.setValue("taram_id", "");
                  }}
                />
              </FormControl>
              {!taram_data && <FormMessage />}
            </FormItem>
          )}
        />
      )}

      {taram_data && (
        <FormField
          control={form.control}
          name={"taram_id"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <DropDown
                  options={taram_data.reduce((acc: Record<string, string>, taram: Taram) => {
                    acc[taram.taram_id] = taram.taram_id;
                    return acc;
                  }, {})}
                  disableNone={true}
                  label="Select Taram"
                  withSearch={true}
                  {...field}
                  change={val => {
                    setSelectedTaram(taram_data.find((taram: Taram) => taram.taram_id === val));
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default KioskTaram;
