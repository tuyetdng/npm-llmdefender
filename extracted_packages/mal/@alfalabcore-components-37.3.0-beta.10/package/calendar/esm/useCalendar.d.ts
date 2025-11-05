/// <reference types="react" />
import { KeyboardEvent, MouseEvent, Ref } from 'react';
import { Day, Month, View } from "./typings";
type UseCalendarProps = {
    /**
     * Активный вид (выбор дней, месяцев, лет)
     */
    view?: View;
    /**
     * Выбранный месяц (controlled)
     */
    month?: Date;
    /**
     * Начальный месяц
     */
    defaultMonth: Date;
    /**
     * Минимальная дата, доступная для выбора
     */
    minDate?: Date;
    /**
     * Максимальная дата, доступная для выбора
     */
    maxDate?: Date;
    /**
     * Выбранная дата
     */
    selected?: Date;
    /**
     * Список событий
     */
    events?: Array<Date | number>;
    /**
     * Список отключенных для выбора дней
     */
    offDays?: Array<Date | number>;
    /**
     * Список выходных дней
     */
    holidays?: Array<Date | number>;
    /**
     * Обработчик изменения месяца (или года)
     */
    onMonthChange?: (month: number) => void;
    /**
     * Обработчик выбора даты
     */
    onChange?: (date: number) => void;
};
declare function useCalendar({ defaultMonth, month, minDate, view, maxDate, selected, events, offDays, holidays, onMonthChange, onChange, }: UseCalendarProps): {
    activeMonth: Date;
    weeks: Day[][];
    months: Month[];
    years: Date[];
    canSetPrevMonth: boolean;
    canSetNextMonth: boolean;
    highlighted: number | Date | undefined;
    setPrevMonth: () => void;
    setNextMonth: () => void;
    setMonthByDate: (newMonth: Date) => void;
    getDayProps: (day: Day) => {
        'data-date': number;
        'aria-selected': boolean | undefined;
        ref: (node: HTMLTableDataCellElement) => void;
        tabIndex: number;
        onMouseEnter: (event: MouseEvent<HTMLTableDataCellElement>) => void;
        onMouseLeave: () => void;
        onClick: (event: MouseEvent<HTMLTableDataCellElement>) => void;
    };
    getMonthProps: (month: Month) => {
        'data-date': number;
        'aria-selected': boolean;
        ref: (node: HTMLButtonElement) => void;
        tabIndex: number;
        disabled: boolean | undefined;
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    };
    getYearProps: (year: Date) => {
        'data-date': number;
        'aria-selected': boolean;
        ref: (node: HTMLButtonElement) => void;
        tabIndex: number;
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    };
    getRootProps: ({ ref }: {
        ref?: Ref<HTMLDivElement> | undefined;
    }) => {
        onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
        ref: (instance: HTMLDivElement | null) => void;
        tabIndex: number;
    };
};
export { UseCalendarProps, useCalendar };
