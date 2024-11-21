import { useForm } from "react-hook-form";
import {
  ScanFormType,
  getScanSchema,
  scanDefValues,
} from "@/features/test/components/test-form/lib/scan.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import KioskTaram from "./kiosk-taram";
import CropData from "./crop-data";
import { useScanFormStore } from "@/features/test/components/test-form/zustand";
import { Button } from "@/components/ui/button";
import { getCurrentDateTime } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createScan } from "@/features/test/components/test-form/query";
import { OrderCreationResponse } from "@/types";

const CropForm = () => {
  const { selectedCrop, selectedTaram, verifiedUser, orderResponse, setOrderResponse } =
    useScanFormStore();

  const form = useForm<ScanFormType>({
    resolver: zodResolver(getScanSchema(selectedCrop)),
    defaultValues: scanDefValues,
    disabled: orderResponse !== undefined,
  });

  const createScanMutation = useMutation({
    mutationKey: ["create-scan"],
    mutationFn: async (values: ScanFormType) => {
      const response = await createScan(values);
      return response;
    },
    onSuccess: (data: OrderCreationResponse) => {
      setOrderResponse(data);
    },
  });

  // const {
  //   formState: { errors },
  // } = form;
  // console.log(errors);

  const handleSubmit = async () => {
    if (!selectedTaram) return await form.trigger("taram_id");
    if (!verifiedUser) {
      toast.error("Failed to find user...");
      return;
    }

    const taram_hex = selectedTaram?.taram_hex;

    const { day, month, year, minutes, hours, seconds } = getCurrentDateTime();
    const dateTime = `${day}${month}${year}${hours}${minutes}${seconds}`;

    const selected_predictable_properties = form.getValues("selected_predictable_properties");
    const sample_details = form.getValues("sample.sample_details");

    form.setValue("order_id", `${taram_hex}0007${dateTime}`);
    form.setValue("sample.sub_sample_id", `${taram_hex}0001${dateTime}`);
    form.setValue("sample.sample_id", `${taram_hex}0002${dateTime}`);
    form.setValue("scan_request_id", `${taram_hex}0003${dateTime}`);
    form.setValue("operator_id", verifiedUser?.user_id); // TODO: change operator_id
    form.setValue("on_behalf_of_id", verifiedUser?.user_id);

    form.setValue(
      "selected_predictable_properties",
      // @ts-expect-error id's temproarily generated while useFieldArray hook
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      selected_predictable_properties.map(({ id, ...rest }) => rest),
    );

    form.setValue(
      "sample.sample_details",
      // @ts-expect-error id's temproarily generated while useFieldArray hook
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sample_details.map(({ id, ...rest }) => rest),
    );

    const isValid = await form.trigger();
    if (!isValid) return;

    toast.promise(() => createScanMutation.mutateAsync(form.getValues()), {
      loading: "Creating scan",
      error: "Error creating scan",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-3 flex flex-col justify-start gap-6"
      >
        <KioskTaram form={form} />
        <CropData form={form} />

        {selectedCrop && (
          <div className="flex justify-center gap-6">
            {/* TODO: add multiple forms *?}
            {/* <Button type="button">Undo</Button> */}
            {/* <Button type="button">Add Another Sample</Button> */}

            <Button disabled={orderResponse !== undefined} className="w-full">
              Submit
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CropForm;
