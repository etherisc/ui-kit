import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboBoxOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Optional disabled state */
  disabled?: boolean;
}

export interface ComboBoxProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "value" | "onChange"> {
  /** Label text displayed above the combobox */
  label?: string;
  /** Description/help text rendered below */
  description?: string;
  /** Marks combobox as invalid */
  error?: string;
  /** Visual size of the combobox */
  size?: "default" | "sm" | "lg";
  /** Array of options to display */
  options: ComboBoxOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Text to show when no options match search */
  emptyText?: string;
  /** Whether to show search input */
  searchable?: boolean;
  /** Optional CSS class name for the wrapper div */
  className?: string;
  /** Optional CSS class name for the trigger button */
  triggerClassName?: string;
}

const ComboBox = React.forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      label,
      description,
      error,
      size = "default",
      options,
      value,
      onChange,
      placeholder = "Select option...",
      emptyText = "No option found.",
      searchable = true,
      className,
      triggerClassName,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue, searchable]);

    const handleSelect = (selectedValue: string) => {
      const newValue = selectedValue === value ? "" : selectedValue;
      onChange?.(newValue);
      setOpen(false);
      setSearchValue("");
    };

    const sizeClasses = {
      sm: "h-8 text-xs",
      default: "h-9 text-sm",
      lg: "h-10 text-base",
    };

    const labelId = label ? `${id}-label` : undefined;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            id={labelId}
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              {...(labelId
                ? { "aria-labelledby": labelId }
                : { "aria-label": "Select option" })}
              aria-describedby={cn(descriptionId, errorId)}
              aria-invalid={!!error}
              disabled={disabled}
              className={cn(
                "w-full justify-between font-normal",
                sizeClasses[size],
                !selectedOption && "text-muted-foreground",
                error && "border-destructive focus-visible:ring-destructive",
                triggerClassName,
              )}
              {...props}
            >
              {selectedOption ? selectedOption.label : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
          >
            <Command>
              {searchable && (
                <CommandInput
                  placeholder="Search options..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
              )}
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);

ComboBox.displayName = "ComboBox";

export { ComboBox };
