import { FC } from 'react';
import { DateRangeInputProps } from "./components/date-range-input/Component";
type DateRangeInputMobileProps = Omit<DateRangeInputProps, 'view'>;
declare const DateRangeInputMobile: FC<DateRangeInputMobileProps>;
export { DateRangeInputMobileProps, DateRangeInputMobile };
