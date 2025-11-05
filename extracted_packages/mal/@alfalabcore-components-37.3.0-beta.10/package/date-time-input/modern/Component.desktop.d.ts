import { FC } from 'react';
import { DateTimeInputProps } from "./components/date-time-input/Component";
type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view'>;
declare const DateTimeInputDesktop: FC<DateTimeInputDesktopProps>;
export { DateTimeInputDesktopProps, DateTimeInputDesktop };
