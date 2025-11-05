import { FC } from 'react';
import { ConfirmationProps } from "./types";
type ResponsiveConfirmationProps = Omit<ConfirmationProps, 'confirmationScreens'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type ConfirmationMedia = 'desktop' | 'mobile';
declare const ConfirmationResponsive: FC<ResponsiveConfirmationProps>;
export { ResponsiveConfirmationProps, ConfirmationMedia, ConfirmationResponsive };
