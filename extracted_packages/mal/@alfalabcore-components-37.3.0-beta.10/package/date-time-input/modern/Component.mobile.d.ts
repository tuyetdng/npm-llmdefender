import { FC } from 'react';
import { DateTimeInputProps } from "./components/date-time-input/Component";
type DateTimeInputMobileProps = Omit<DateTimeInputProps, 'view'>;
declare const DateTimeInputMobile: FC<DateTimeInputMobileProps>;
export { DateTimeInputMobileProps, DateTimeInputMobile };
