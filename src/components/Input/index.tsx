import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface IInput<T extends FieldValues> {
  placeholder: string;
  name: Path<T> | string;
  defaultValue?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  validationSchema?: RegisterOptions<T>;
  error?: boolean;
  type?: HTMLInputElement["type"];
  disabled?: HTMLInputElement["disabled"];
  label?: string;
}

export default function Input<T extends FieldValues>({
  placeholder,
  name,
  defaultValue,
  required,
  register,
  validationSchema,
  error,
  type,
  label,
  ...rest
}: IInput<T>) {
  return (
    <div className="text-left">
      <label className="text-black font-semibold" htmlFor={name}>
        {label}
      </label>

      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className={`w-full mt-2 text-black bg-white disabled:cursor-not-allowed disabled:opacity-55 border px-2 py-2 ${
          error && "border-red-500"
        }`}
        type={type}
        {...rest}
        {...(register && register(name as Path<T>, validationSchema))}
      />
    </div>
  );
}
