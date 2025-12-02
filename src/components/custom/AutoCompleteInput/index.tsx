import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useAutoCompleteInputImpl } from "./useAutoCompleteInputImpl";

type TAutoCompleteInputProps = {
  value?: string;
  onChange: (e: string) => void;
  options?: { value: string; label: string }[];
};

const AutoCompleteInput = ({
  value,
  onChange,
  options,
}: TAutoCompleteInputProps) => {
  const {
    isShowOptions,
    handleOnFocus,
    handleOnBlur,
    handleOnKeyDown,
    handleOnClickValue,
    selectedIndex,
    optionRefs,
    inputRefs,
  } = useAutoCompleteInputImpl({
    options,
    onChange,
  });

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        ref={inputRefs}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies"
        className="py-7 pl-16 text-lg! font-mono"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
      {isShowOptions && (
        <div className="absolute top-full left-0 right-0 z-10 shadow bg-white max-h-72 overflow-y-scroll">
          <ul className="list-none m-0">
            {options?.map((option, idx) => (
              <li
                ref={(el) => {
                  if (optionRefs?.current) {
                    optionRefs.current[idx] = el;
                  }
                }}
                onMouseDown={(e) => e.preventDefault()}
                key={option.value}
                className={cn(
                  "px-6 py-4 text-lg font-mono hover:bg-accent cursor-pointer",
                  selectedIndex === idx && "bg-accent"
                )}
                onClick={() => handleOnClickValue(option.value)}
                tabIndex={idx}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
