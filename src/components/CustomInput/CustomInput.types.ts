import { IInputProps } from "native-base";

export interface ICustomInput extends IInputProps {
    title?: string;
    placeholder: string;
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
    error?: string;
    touched?: boolean;
}