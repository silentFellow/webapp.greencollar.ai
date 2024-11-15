import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  withSearch?: boolean;
  label?: string;
  disableNone?: boolean;
  options: { [label: string]: string };
  value?: string;
  inputPlaceHolder?: string;
  noResult?: string;
  multi?: boolean;
  change?: (value: string) => void;
}

const DropDown = ({
  withSearch = false,
  label = "Select an option",
  options = {},
  disableNone = false,
  inputPlaceHolder = "search items...",
  noResult = "No items found...",
  value,
  change,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [selected, setSelected] = useState<string>(value || "");

  const handleChange = (value: string): void => {
    let newValue: string;
    if (value === selected) {
      if (disableNone) {
        setIsOpen(false);
        return;
      }
      newValue = "";
    } else {
      newValue = value;
    }

    setSelected(newValue);
    if (change) change(newValue);
    setIsOpen(false);
  };

  const filteredOptions = Object.keys(options).filter(key =>
    key.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} {...props}>
      <PopoverTrigger asChild onClick={() => setFilter("")}>
        <Button variant="outline" role="combobox" className="justify-between">
          <p className="overflow-hidden">
            {selected
              ? Object.entries(options)
                  .find(([key, val]) => val.toLowerCase() === selected.toLowerCase())
                  ?.at(0) || label
              : label}
          </p>
          {isOpen ? (
            <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="full p-0 popover-w-full">
        <Command className="flex flex-col shadow-xl">
          {withSearch && (
            <Input
              autoFocus
              value={filter}
              type="text"
              placeholder={inputPlaceHolder}
              className="no-focus"
              onChange={e => setFilter(e.target.value)}
            />
          )}
          <CommandEmpty className="text-xs font-bold text-center p-3">{noResult}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredOptions.map((key: string) => {
                const label = key;
                const value = options[key];

                return (
                  <CommandItem key={label} value={label} onSelect={() => handleChange(value)}>
                    <CheckIcon
                      className={cn(
                        "h-4 w-4 mr-2",
                        selected?.includes(value) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="text-sm">{label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;
