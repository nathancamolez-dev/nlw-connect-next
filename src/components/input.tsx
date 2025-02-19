import type { ComponentProps } from "react";

interface InputRootProps extends ComponentProps<"div"> {
	error?: boolean;
}

export function InputRoot({ error = false, ...props }: InputRootProps) {
	return (
		<div
			className="group bg-gray-800 h-12 border border-gray-600 rounded-xl px-4 flex items-center gap-2 focus-within:border-gray-100 data-[error=true]:border-danger"
			data-error={error}
			{...props}
		></div>
	);
}

interface InputIconProps extends ComponentProps<"span"> {}

export function InputIcon(props: InputIconProps) {
	return (
		<span
			className="text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown)&(:has(group-data-[error=true])))))]:text-gray-100 group-data-[error=true]:text-danger"
			{...props}
		/>
	);
}

interface InputFieldProps extends ComponentProps<"input"> {}

export function InputField(props: InputFieldProps) {
	return (
		<input
			className="flex-1 outline-0 placeholder-gray-400 text-gray-100"
			{...props}
		/>
	);
}
