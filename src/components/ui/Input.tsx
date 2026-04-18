// src/components/ui/Input.tsx
type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="border-2 border-gray-300 rounded-xl px-4 py-4 text-xl
                     focus:border-blue-500 focus:outline-none w-full
                     placeholder:text-gray-400"
      />
    </div>
  );
}
