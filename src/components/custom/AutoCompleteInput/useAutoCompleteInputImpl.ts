import { useEffect, useRef, useState } from "react";

type TUseAutoCompleteInputImpl = {
  onChange: (e: string) => void;
  options?: { value: string; label: string }[];
};

export const useAutoCompleteInputImpl = ({
  onChange,
  options,
}: TUseAutoCompleteInputImpl) => {
  const inputRefs = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [isShowOptions, setIsShowOptions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);


  const handleOnFocus = () => {
    setIsShowOptions(true);
    setSelectedIndex(0);
  };

  const handleOnBlur = () => {
    setIsShowOptions(false);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, (options ?? []).length - 1) || 0);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (options?.[selectedIndex]?.value) {
        onChange(options?.[selectedIndex]?.value);
      }
      inputRefs.current?.blur();
    }
  };

  const handleOnClickValue = (value: string) => {
    onChange(value);
    setIsShowOptions(false);
  };

  return {
    inputRefs,
    optionRefs,
    selectedIndex,
    isShowOptions,
    handleOnFocus,
    handleOnBlur,
    handleOnKeyDown,
    handleOnClickValue
  }
};