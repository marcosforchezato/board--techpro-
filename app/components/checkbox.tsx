import { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className="inline-flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none"
      >
        <span className="relative inline-flex h-4 w-4 shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-white/5 checked:bg-cyan checked:border-cyan transition focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-dark-blue"
            {...props}
          />
          <Check
            className="pointer-events-none absolute inset-0 h-4 w-4 text-black opacity-0 peer-checked:opacity-100 transition"
            strokeWidth={3}
          />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
