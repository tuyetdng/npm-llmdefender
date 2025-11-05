import { FC } from 'react';
import { DateTimeInputProps } from "./Component-b91f18e8";
type DateTimeInputResponsiveProps = Omit<DateTimeInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type DateTimeInputMedia = 'desktop' | 'mobile';
declare const DateTimeInputResponsive: FC<DateTimeInputResponsiveProps>;
export { DateTimeInputResponsiveProps, DateTimeInputMedia, DateTimeInputResponsive };
