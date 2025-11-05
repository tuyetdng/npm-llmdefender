import { FC } from 'react';
import { CalendarRangeProps } from "../Component";
type CalendarRangePopoverProps = Omit<CalendarRangeProps, 'calendarPosition'>;
declare const CalendarRangePopover: FC<CalendarRangePopoverProps>;
export { CalendarRangePopoverProps, CalendarRangePopover };
