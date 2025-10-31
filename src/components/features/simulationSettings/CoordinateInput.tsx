import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface CoordinateInputProps {
  value: number;
  axis: "x" | "y" | "z";
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
}

export function CoordinateInput({ value, axis, onChange, onCommit }: CoordinateInputProps) {
  const [localValue, setLocalValue] = useState<string>(value.toString());

  useEffect(() => {
    if (parseFloat(localValue) !== value && !isNaN(value)) {
      setLocalValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleCommit = () => {
    const numValue = parseFloat(localValue);

    if (localValue === "" || isNaN(numValue)) {
      setLocalValue(value.toString());
      return;
    }

    const roundedValue = parseFloat(numValue.toFixed(2));
    setLocalValue(roundedValue.toString());

    if (roundedValue !== value) {
      onChange(roundedValue);
      onCommit?.(roundedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="relative flex-1">
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-choras-gray pointer-events-none uppercase">
        {axis}
      </span>
      <Input
        type="number"
        step="0.01"
        value={localValue}
        onChange={handleChange}
        onBlur={handleCommit}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="h-6 text-xs bg-choras-dark border-choras-gray text-white pl-6 pr-2"
      />
    </div>
  );
}
