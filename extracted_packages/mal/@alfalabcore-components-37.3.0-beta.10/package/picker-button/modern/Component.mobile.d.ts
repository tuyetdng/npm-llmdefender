/// <reference types="react" />
import React from 'react';
import { AdditionalMobileProps } from "../../select";
import { PickerButtonDesktopProps } from "./Component";
type PickerButtonMobileProps = Omit<PickerButtonDesktopProps, 'OptionsList' | 'Checkmark' | 'onScroll'> & AdditionalMobileProps;
declare const PickerButtonMobile: React.ForwardRefExoticComponent<Omit<PickerButtonDesktopProps, "onScroll" | "OptionsList" | "Checkmark"> & AdditionalMobileProps & React.RefAttributes<HTMLInputElement>>;
export { PickerButtonMobileProps, PickerButtonMobile };
