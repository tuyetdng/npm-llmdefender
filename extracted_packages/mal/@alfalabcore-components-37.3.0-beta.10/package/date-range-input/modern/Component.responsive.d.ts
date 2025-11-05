import { FC } from 'react';
import { DateRangeInputProps } from "./components/date-range-input/Component";
type DateRangeInputResponsiveProps = Omit<DateRangeInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type DateRangeInputMedia = 'desktop' | 'mobile';
declare const DateRangeInputResponsive: FC<DateRangeInputResponsiveProps>;
export { DateRangeInputResponsiveProps, DateRangeInputMedia, DateRangeInputResponsive };
