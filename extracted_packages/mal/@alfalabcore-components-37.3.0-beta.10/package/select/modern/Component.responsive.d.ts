/// <reference types="react" />
import React from 'react';
import { AdditionalMobileProps } from "./components/index";
import { BaseSelectProps } from "./typings";
type SelectResponsiveProps = BaseSelectProps & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
declare const SelectResponsive: React.ForwardRefExoticComponent<BaseSelectProps & AdditionalMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { SelectResponsiveProps, SelectResponsive };
