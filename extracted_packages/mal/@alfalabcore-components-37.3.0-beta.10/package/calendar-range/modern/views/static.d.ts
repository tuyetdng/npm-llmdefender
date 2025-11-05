import { FC } from 'react';
import { CalendarRangeProps } from "../Component";
type CalendarRangeStaticProps = Omit<CalendarRangeProps, 'calendarPosition'> & {
    /**
     * Отображать начальный месяц слева или справа (влияет только на начальный рендер)
     */
    defaultMonthPosition?: 'left' | 'right';
};
declare const CalendarRangeStatic: FC<CalendarRangeStaticProps>;
export { CalendarRangeStaticProps, CalendarRangeStatic };
