import { FC } from 'react';
import { CalendarInputProps } from "./components/calendar-input/Component";
type CalendarInputDesktopProps = Omit<CalendarInputProps, 'view'>;
declare const CalendarInputDesktop: FC<CalendarInputDesktopProps>;
export { CalendarInputDesktopProps, CalendarInputDesktop };
