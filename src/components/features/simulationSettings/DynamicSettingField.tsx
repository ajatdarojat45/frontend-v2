import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SimulationSettingOption } from "@/types/simulationSettings";

interface DynamicSettingFieldProps {
  option: SimulationSettingOption;
  value: string | number;
  onChange: (value: string | number) => void;
}

export function DynamicSettingField({ option, value, onChange }: DynamicSettingFieldProps) {
  const { id, name, type, display, min, max, step, startAdornment, endAdornment, options } = option;

  const renderField = (
    labelContent: React.ReactNode,
    inputContent: React.ReactNode,
    extraContent?: React.ReactNode,
  ) => (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-1 items-center">
        {labelContent}
        {inputContent}
      </div>
      {extraContent}
    </div>
  );

  if (display === "radio" && options) {
    const labelContent = <Label className="text-white font-medium">{name}</Label>;

    const currentStringValue = value ? String(value) : "";

    const inputContent = (
      <div className="flex space-x-6">
        {Object.entries(options).map(([label, optionValue]) => {
          const stringValue = String(optionValue);
          const isSelected = currentStringValue === stringValue;

          return (
            <div key={stringValue} className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => onChange(stringValue)}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-white bg-transparent"
                    : "border-gray-400 hover:border-gray-300"
                }`}
              >
                {isSelected && <div className="w-2 h-2 bg-white rounded-full mx-auto my-auto" />}
              </button>
              <Label
                className="text-xs text-gray-300 cursor-pointer"
                onClick={() => onChange(stringValue)}
              >
                {label}
              </Label>
            </div>
          );
        })}
      </div>
    );

    return renderField(labelContent, inputContent);
  }

  if (display === "text") {
    const inputType = type === "integer" ? "number" : type === "float" ? "number" : "text";
    const stepValue = step || (type === "integer" ? 1 : type === "float" ? 0.1 : undefined);

    const labelContent = (
      <Label htmlFor={id} className="text-white font-medium">
        {name}
      </Label>
    );

    const inputContent = (
      <div className="relative">
        {startAdornment && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {startAdornment}
          </div>
        )}
        <Input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => {
            const newValue =
              type === "string"
                ? e.target.value
                : type === "integer"
                  ? parseInt(e.target.value) || 0
                  : parseFloat(e.target.value) || 0;
            onChange(newValue);
          }}
          min={min}
          max={max}
          step={stepValue}
          className={`bg-gray-800 border-gray-600 text-white ${
            startAdornment ? "pl-12" : ""
          } ${endAdornment ? "pr-12" : ""}`}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {endAdornment}
          </div>
        )}
      </div>
    );

    const extraContent =
      min !== undefined || max !== undefined ? (
        <div className="text-xs text-gray-500">
          {min !== undefined && max !== undefined
            ? `Range: ${min} - ${max}`
            : min !== undefined
              ? `Min: ${min}`
              : `Max: ${max}`}
        </div>
      ) : undefined;

    return renderField(labelContent, inputContent, extraContent);
  }

  return null;
}
