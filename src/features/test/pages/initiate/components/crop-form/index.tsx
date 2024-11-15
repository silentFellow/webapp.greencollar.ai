import { useForm } from "react-hook-form";
import {
  ScanFormType,
  getScanSchema,
  scanDefValues,
} from "@/features/test/pages/initiate/lib/scan.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import KioskTaram from "./kiosk-taram";
import CropData from "./crop-data";
import { useScanFormStore } from "@/features/test/pages/initiate/zustand";
import { Button } from "@/components/ui/button";

const CropForm = () => {
  const { selectedCrop } = useScanFormStore();

  const form = useForm<ScanFormType>({
    resolver: zodResolver(getScanSchema(selectedCrop)),
    defaultValues: scanDefValues,
  });

  // const { formState: { errors } } = form;
  // console.log(errors)

  const handleSubmit = async (values: ScanFormType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className="mt-3 flex flex-col justify-start gap-6"
      >
        <KioskTaram form={form} />
        <CropData form={form} />

        {selectedCrop && (
          <div className="flex justify-center gap-6">
            <Button type="button">Undo</Button>
            <Button type="button">Add Another Sample</Button>
            <Button>Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CropForm;
