import { FC } from 'react';
import { CalendarInputProps } from "./components/calendar-input/Component";
type CalendarInputResponsiveProps = Omit<CalendarInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type CalendarInputMedia = 'desktop' | 'mobile';
declare const CalendarInputResponsive: FC<CalendarInputResponsiveProps>;
export { CalendarInputResponsiveProps, CalendarInputMedia, CalendarInputResponsive };
