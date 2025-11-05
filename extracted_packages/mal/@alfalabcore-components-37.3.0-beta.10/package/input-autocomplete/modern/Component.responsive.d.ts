import { FC } from 'react';
import { InputAutocompleteDesktopProps } from "./Component.desktop";
import { InputAutocompleteMobileProps } from "./Component.mobile";
type InputAutocompleteResponsiveProps = InputAutocompleteDesktopProps & InputAutocompleteMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type InputAutocompleteMedia = 'desktop' | 'mobile';
declare const InputAutocompleteResponsive: FC<InputAutocompleteResponsiveProps>;
export { InputAutocompleteResponsiveProps, InputAutocompleteMedia, InputAutocompleteResponsive };
