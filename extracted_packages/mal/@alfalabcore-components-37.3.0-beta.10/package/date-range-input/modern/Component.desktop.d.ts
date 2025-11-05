import { FC } from 'react';
import { DateRangeInputProps } from "./components/date-range-input/Component";
type DateRangeInputDesktopProps = Omit<DateRangeInputProps, 'view'>;
declare const DateRangeInputDesktop: FC<DateRangeInputDesktopProps>;
export { DateRangeInputDesktopProps, DateRangeInputDesktop };
