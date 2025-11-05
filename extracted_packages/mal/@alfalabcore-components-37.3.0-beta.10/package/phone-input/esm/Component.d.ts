/// <reference types="react" />
import React from 'react';
import { MaskedInputProps } from "../../masked-input";
type PhoneInputProps = Omit<MaskedInputProps, 'onBeforeDisplay' | 'type' | 'mask'> & {
    clearableCountryCode?: boolean;
};
declare const PhoneInput: React.ForwardRefExoticComponent<Omit<MaskedInputProps, "mask" | "type" | "onBeforeDisplay"> & {
    clearableCountryCode?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { PhoneInputProps, PhoneInput };
