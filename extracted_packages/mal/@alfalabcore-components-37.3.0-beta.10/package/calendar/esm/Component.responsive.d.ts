import { FC } from 'react';
import { CalendarDesktopProps } from "./Component.desktop";
import { CalendarMobileProps } from "./components/calendar-mobile/index";
type ResponsiveCalendarProps = CalendarDesktopProps & CalendarMobileProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
type CalendarMedia = 'desktop' | 'mobile';
declare const CalendarResponsive: FC<ResponsiveCalendarProps>;
export { ResponsiveCalendarProps, CalendarMedia, CalendarResponsive };
