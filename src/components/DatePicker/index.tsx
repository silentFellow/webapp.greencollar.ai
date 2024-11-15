import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "./TimePicker/TimePicker";
import { useState } from "react";
import { setHours, setMinutes, setSeconds } from "date-fns";

interface Props {
  withTime?: boolean;
  disableFuture?: boolean;
  onSelectClose?: boolean;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
}

export default function DatePicker({
  onChange,
  withTime = false,
  onSelectClose = withTime ? false : true,
  disableFuture = true,
  placeholder = "Pick a date",
  fromYear = 2000,
  toYear = new Date().getFullYear(),
  ...props
}: Props) {
  const [value, setValue] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (newDate: Date | undefined) => {
    if (newDate === undefined) return;

    if (value) {
      // Extract time from the current value
      const hours = value.getHours();
      const minutes = value.getMinutes();
      const seconds = value.getSeconds();

      // Apply the extracted time to the new date
      newDate = setHours(newDate, hours);
      newDate = setMinutes(newDate, minutes);
      newDate = setSeconds(newDate, seconds);
    }

    setValue(newDate);
    if (onChange) onChange(newDate);
    if (onSelectClose) setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal overflow-hidden ${!value && "text-muted-foreground"}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            withTime ? (
              format(value, "PPP HH:mm:ss") + " "
            ) : (
              format(value, "PPP")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 popover-w-full">
        <Calendar
          className="h-full w-full flex"
          classNames={{
            months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
          }}
          mode="single"
          selected={value}
          onSelect={value => handleChange(value)}
          disabled={disableFuture ? date => date > new Date() : undefined}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          {...props}
        />
        {withTime && (
          <div className="p-3 border-t border-border">
            <TimePicker setDate={date => setValue(date)} date={value} />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
