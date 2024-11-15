import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ScanFormType } from "@/features/test/pages/initiate/lib/scan.validation";
import DropDown from "@/components/Dropdwon";
import { useQuery } from "@tanstack/react-query";
import { fetchCropTemplate } from "@/features/test/pages/initiate/query";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Crop, CropPredictableProperty, CropProperty, CropPropertyValue } from "@/types";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import DatePicker from "@/components/DatePicker";
import { useScanFormStore } from "@/features/test/pages/initiate/zustand";

const CropData = ({ form }: { form: UseFormReturn<ScanFormType> }) => {
  const { selectedCrop, setSelectedCrop } = useScanFormStore();

  const cropTemplate = useQuery({
    queryKey: ["cropTemplate"],
    queryFn: () => fetchCropTemplate(),
  });
  const crop_data = cropTemplate.data?.data;

  const predictableProperties = useFieldArray({
    control: form.control,
    name: "sample.selected_predictable_properties",
  });

  const properties = useFieldArray({
    control: form.control,
    name: "sample.sample_details",
  });

  const handleCropChange = (val: string): void => {
    const selectedCrop = crop_data?.find((crop: Crop) => crop.crop_id === val);
    setSelectedCrop(selectedCrop);
    if (!selectedCrop) return;

    const selectedPredictableProperties = selectedCrop.crop_predictable_property;
    const selectedProperties = selectedCrop.crop_property;

    predictableProperties.replace(
      selectedPredictableProperties.map((prop: CropPredictableProperty) => ({
        predictable_property_id: prop.predictable_property_id,
        is_selected: 0,
        cost: 200,
      })),
    );

    properties.replace(
      selectedProperties.map((prop: CropProperty) => ({
        crop_property_id: prop.crop_property_id,
        crop_property_value: "",
      })),
    );
  };

  if (cropTemplate.isLoading) return null;

  if (crop_data) {
    return (
      <div className="full flex flex-col gap-5">
        <div className="full center">
          <FormField
            control={form.control}
            name={"sample.crop_id"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-52">
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <DropDown
                    options={crop_data.reduce((acc: Record<string, string>, crop: Crop) => {
                      acc[crop.crop_name] = crop.crop_id;
                      return acc;
                    }, {})}
                    disableNone={true}
                    label="Select Crop"
                    {...field}
                    change={val => {
                      field.onChange(val);
                      handleCropChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {selectedCrop && (
          <section className="full flex flex-col gap-9">
            <div className="full flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="font-bold">Predictable Properties</h2>

                <div className="flex space-x-3">
                  <Checkbox
                    id="select all"
                    checked={predictableProperties.fields.every(prop => prop.is_selected === 1)}
                    onCheckedChange={checked => {
                      predictableProperties.fields.forEach((prop, index) => {
                        predictableProperties.update(index, {
                          ...prop,
                          is_selected: checked ? 1 : 0,
                        });
                      });
                    }}
                  />
                  <label
                    htmlFor="select all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    SELECT ALL
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {predictableProperties.fields.map((prop, index) => (
                  <div key={prop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`predictable-property-${prop.id}`}
                      checked={prop.is_selected === 1}
                      onCheckedChange={checked => {
                        predictableProperties.update(index, {
                          ...prop,
                          is_selected: checked ? 1 : 0,
                        });
                      }}
                    />
                    <Label
                      htmlFor={`predictable-property-${prop.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {selectedCrop.crop_predictable_property[index].predictable_property_name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="full flex flex-col gap-3">
              <h2 className="font-bold">Sample Details</h2>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 gap-x-9">
                {selectedCrop.crop_property.map((crop, index) => (
                  <div className="flex flex-col gap-2">
                    <Label className="capitalize">
                      {crop.crop_property_name.split("_").join(" ")}
                      <span className="ml-2 font-extrabold">
                        {crop.mandatory.toLowerCase() === "true" ? "*" : ""}
                      </span>
                    </Label>

                    {crop.crop_property_type.toLowerCase() === "string" ? (
                      <>
                        <Input
                          value={properties.fields[index].crop_property_value}
                          className="no-focus"
                          type="text"
                          placeholder={crop.crop_property_name.split("_").join(" ")}
                          onChange={e => {
                            properties.update(index, {
                              ...properties.fields[index],
                              crop_property_value: e.target.value,
                            });
                          }}
                        />
                        {form.formState.errors.sample?.sample_details?.[index]
                          ?.crop_property_value && (
                          <FormMessage>
                            {
                              form.formState.errors.sample.sample_details[index]
                                .crop_property_value.message
                            }
                          </FormMessage>
                        )}
                      </>
                    ) : crop.crop_property_type.toLowerCase() === "list" ? (
                      <>
                        <DropDown
                          options={crop.crop_property_value_list.reduce(
                            (acc: Record<string, string>, value: CropPropertyValue) => {
                              acc[value.crop_property_value] = value.crop_property_value;
                              return acc;
                            },
                            {},
                          )}
                          value={properties.fields[index].crop_property_value}
                          change={val => {
                            properties.update(index, {
                              ...properties.fields[index],
                              crop_property_value: val,
                            });
                          }}
                        />
                        {form.formState.errors.sample?.sample_details?.[index]
                          ?.crop_property_value && (
                          <FormMessage>
                            {
                              form.formState.errors.sample.sample_details[index]
                                .crop_property_value.message
                            }
                          </FormMessage>
                        )}
                      </>
                    ) : crop.crop_property_type.toLowerCase() === "editable list" ? (
                      <>
                        <DropDown
                          withSearch={true}
                          options={crop.crop_property_value_list.reduce(
                            (acc: Record<string, string>, value: CropPropertyValue) => {
                              acc[value.crop_property_value] = value.crop_property_value;
                              return acc;
                            },
                            {},
                          )}
                          value={properties.fields[index].crop_property_value}
                          change={val => {
                            properties.update(index, {
                              ...properties.fields[index],
                              crop_property_value: val,
                            });
                          }}
                        />
                        {form.formState.errors.sample?.sample_details?.[index]
                          ?.crop_property_value && (
                          <FormMessage>
                            {
                              form.formState.errors.sample.sample_details[index]
                                .crop_property_value.message
                            }
                          </FormMessage>
                        )}
                      </>
                    ) : crop.crop_property_type.toLowerCase() === "boolean" ? (
                      <>
                        <Switch
                          id={crop.crop_property_id}
                          checked={properties.fields[index].crop_property_value === "true"}
                          onCheckedChange={checked => {
                            properties.update(index, {
                              ...properties.fields[index],
                              crop_property_value: checked ? "true" : "false",
                            });
                          }}
                        />
                        {form.formState.errors.sample?.sample_details?.[index]
                          ?.crop_property_value && (
                          <FormMessage>
                            {
                              form.formState.errors.sample.sample_details[index]
                                .crop_property_value.message
                            }
                          </FormMessage>
                        )}
                      </>
                    ) : (
                      crop.crop_property_type.toLowerCase() === "date" && (
                        <>
                          <DatePicker
                            onChange={(val: Date | null) => {
                              properties.update(index, {
                                ...properties.fields[index],
                                crop_property_value: val?.toString() || "",
                              });
                            }}
                          />

                          {form.formState.errors.sample?.sample_details?.[index]
                            ?.crop_property_value && (
                            <FormMessage>
                              {
                                form.formState.errors.sample.sample_details[index]
                                  .crop_property_value.message
                              }
                            </FormMessage>
                          )}
                        </>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  return null;
};

export default CropData;
