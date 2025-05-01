import clsx from "clsx";

export type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
}

const Button = ({
  label, type = "button", onClick, disabled = false, className = "", variant = "primary", fullWidth = false }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-bold cursor-pointer";
  const variantStyles = {
    primary: "bg-rose-500 text-white hover:bg-rose-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-700",
    tertiary: "bg-transparent text-gray-800 hover:bg-gray-200",
  };
  const fullWidthStyles = fullWidth ? "w-full" : "w-auto";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={clsx(
        baseStyles, variantStyles[variant], fullWidthStyles, disabledStyles, className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
export default Button;
