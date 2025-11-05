/// <reference types="react" />
import React from 'react';
import { ButtonProps } from "../../button";
import { AdditionalMobileProps } from "../../select";
import { PickerButtonDesktopProps } from "./Component";
type PickerButtonMatchMedia = 'desktop' | 'mobile';
type PickerButtonResponsiveProps = PickerButtonDesktopProps & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
declare const PickerButtonResponsive: React.ForwardRefExoticComponent<Omit<import("../../select").BaseSelectProps, "size" | "hint" | "placeholder" | "onFocus" | "selected" | "multiple" | "options" | "autocomplete" | "allowUnselect" | "closeOnSelect" | "fieldProps" | "Arrow" | "Field"> & Pick<ButtonProps, "leftAddons" | "rightAddons" | "view" | "loading"> & {
    options: ((import("../../select").OptionShape | import("../../select").GroupShape) & {
        icon?: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
    })[];
    size?: import("./Component").PickerButtonSize | undefined;
    variant?: import("./Component").PickerButtonVariant | undefined;
    showArrow?: boolean | undefined;
} & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { PickerButtonMatchMedia, PickerButtonResponsiveProps, PickerButtonResponsive };
