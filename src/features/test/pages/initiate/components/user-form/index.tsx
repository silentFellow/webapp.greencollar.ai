import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseUserSchema } from "@/features/test/pages/initiate/lib/utils";
import { UserTemplate, UserTemplateProperty } from "@/features/test/pages/initiate/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserForm = ({
  userTemplate,
  def,
}: {
  userTemplate: UserTemplate;
  def?: Record<string, string>;
}) => {
  const resolver = parseUserSchema(userTemplate);
  const defaultValues = userTemplate.reduce(
    (acc: Record<string, string>, item: UserTemplateProperty) => {
      acc[item.property_name as string] = def ? def[item.property_name] : "";
      return acc;
    },
    {},
  );

  const userForm = useForm({
    resolver: zodResolver(resolver),
    defaultValues: defaultValues,
    disabled: def ? true : false,
  });

  const handleSubmit = async (values: z.infer<typeof resolver>) => {
    console.log(values);
  };

  return (
    <Form {...userForm}>
      <form
        onSubmit={userForm.handleSubmit(handleSubmit)}
        onChange={() => console.log(userForm.getValues())}
        className="mt-3 flex flex-col justify-start gap-6"
      >
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-9 gap-y-6">
          {userTemplate.map((item: UserTemplateProperty) => (
            <FormField
              key={item.property_name}
              control={userForm.control}
              name={item.property_name}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    {item.property_display_name}
                  </FormLabel>
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    {["integer", "string", "secret", "email"].includes(
                      item.property_type.toLowerCase(),
                    ) ? (
                      <Input
                        placeholder={item.property_description}
                        {...field}
                        type={
                          item.property_type.toLowerCase() === "secret"
                            ? "password"
                            : item.property_type.toLowerCase() === "email"
                              ? "email"
                              : item.property_type.toLowerCase() === "integer"
                                ? "number"
                                : "string"
                        }
                      />
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          className="no-focus"
                          disabled={def ? true : false}
                        >
                          <Button variant="outline" className="gap-2">
                            {field.value ? field.value : item.property_display_name}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72">
                          {item.property_values?.map(property => (
                            <DropdownMenuCheckboxItem
                              key={property}
                              checked={field.value === property}
                              onCheckedChange={checked => {
                                const newValue = checked ? property : "";
                                field.onChange(newValue);
                              }}
                              {...field}
                            >
                              <span className="capitalize">
                                {property.split("_").join(" ").toLowerCase()}
                              </span>
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {!def && (
          <Button type="submit" className="bg-primary-500">
            Create User
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserForm;
