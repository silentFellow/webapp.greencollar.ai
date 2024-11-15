import { useForm } from "react-hook-form";
import {
  ScanFormType,
  scanSchame,
  scanValDefValues,
} from "@/features/test/pages/initiate/lib/scan.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import KioskTaram from "./kiosk-taram";
import CropData from "./crop-data";

const CropForm = () => {
  const form = useForm<ScanFormType>({
    resolver: zodResolver(scanSchame),
    defaultValues: scanValDefValues,
  });

  const handleSubmit = async (values: z.infer<typeof scanSchame>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-3 flex flex-col justify-start gap-6"
      >
        <KioskTaram form={form} />
        <CropData form={form} />
      </form>
    </Form>
  );
};

export default CropForm;
