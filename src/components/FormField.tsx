import clsx from "clsx";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";


export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

const FormField = <T extends FieldValues>(
  { type, placeholder, name, register, error, valueAsNumber }: FormFieldProps<T>
): ReturnType<React.FC<FormFieldProps<T>>> => (
  <>
    <input
      className={clsx(
        "shadow border-gray-300 text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none",
        { "border-pink-600 focus:ring-3 focus:ring-pink-600/30": error },
        { "focus:border-blue-500 focus:ring-3 focus:ring-blue-500/30": !error }
      )}
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <p className="absolute -bottom-5 font-light text-pink-600 text-xs italic">{error.message}</p>}
  </>
);
export default FormField;