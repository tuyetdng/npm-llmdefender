/// <reference types="react" />
import React from "react";
import { AdditionalMobileProps } from "./index-3e68f8db";
import { PickerButtonDesktopProps } from "./Component-3677ec46";
import { ButtonProps } from "./index-ebda875c";
type PickerButtonMobileProps = Omit<PickerButtonDesktopProps, "OptionsList" | "Checkmark" | "onScroll"> & AdditionalMobileProps;
declare const PickerButtonMobile: React.ForwardRefExoticComponent<Omit<PickerButtonDesktopProps, "onScroll" | "OptionsList" | "Checkmark"> & AdditionalMobileProps & React.RefAttributes<HTMLInputElement>>;
type PickerButtonMatchMedia = 'desktop' | 'mobile';
type PickerButtonResponsiveProps = PickerButtonDesktopProps & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
declare const PickerButtonResponsive: React.ForwardRefExoticComponent<Omit<import("./index-3e68f8db").BaseSelectProps, "placeholder" | "onFocus" | "size" | "selected" | "multiple" | "hint" | "options" | "autocomplete" | "allowUnselect" | "closeOnSelect" | "fieldProps" | "Arrow" | "Field"> & Pick<ButtonProps, "rightAddons" | "leftAddons" | "view" | "loading"> & {
    options: ((import("./index-3e68f8db").OptionShape | import("./index-3e68f8db").GroupShape) & {
        icon?: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
    })[];
    size?: import("./Component-3677ec46").PickerButtonSize | undefined;
    variant?: import("./Component-3677ec46").PickerButtonVariant | undefined;
    showArrow?: boolean | undefined;
} & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { PickerButtonMobileProps, PickerButtonMobile, PickerButtonMatchMedia, PickerButtonResponsiveProps, PickerButtonResponsive };
