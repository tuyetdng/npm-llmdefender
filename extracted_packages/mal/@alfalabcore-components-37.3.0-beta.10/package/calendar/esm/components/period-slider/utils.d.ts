import { PeriodType } from "./index";
declare const formatPeriod: (valueFrom: Date, valueTo: Date, periodType: PeriodType) => string;
declare const getYearSelectorValue: (valueFrom: Date | undefined, showCurrentYear: boolean) => number | "";
declare const shiftValues: (valueFrom: Date, valueTo: Date, periodType: PeriodType, direction: 'prev' | 'next') => {
    valueFrom: Date;
    valueTo: Date;
};
export { formatPeriod, getYearSelectorValue, shiftValues };
