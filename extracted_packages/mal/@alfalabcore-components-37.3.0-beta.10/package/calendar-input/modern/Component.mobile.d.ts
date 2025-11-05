import { FC } from 'react';
import { CalendarInputProps } from "./components/calendar-input/Component";
type CalendarInputMobileProps = Omit<CalendarInputProps, 'view'>;
declare const CalendarInputMobile: FC<CalendarInputMobileProps>;
export { CalendarInputMobileProps, CalendarInputMobile };
