/// <reference types="react" />
import React from 'react';
import { MouseEvent } from "react";
import { SelectorView, View } from "./typings";
type CalendarDesktopProps = {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Вид по умолчанию (выбор дней, месяцев, лет)
     */
    defaultView?: View;
    /**
     * Вид шапки — месяц и год или только месяц
     */
    selectorView?: SelectorView;
    /**
     * Выбранная дата (timestamp)
     */
    value?: number;
    /**
     * Открытый месяц (timestamp)
     */
    month?: number;
    /**
     * Месяц, открытый по умолчанию (timestamp)
     */
    defaultMonth?: number;
    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;
    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;
    /**
     * Начало выделенного периода (timestamp)
     */
    selectedFrom?: number;
    /**
     * Конец выделенного периода (timestamp)
     */
    selectedTo?: number;
    /**
     * Индикатор, что выбран полный период
     */
    rangeComplete?: boolean;
    /**
     * Список событий
     */
    events?: Array<Date | number>;
    /**
     * Список отключенных для выбора дней.
     */
    offDays?: Array<Date | number>;
    /**
     * Список выходных
     */
    holidays?: Array<Date | number>;
    /**
     * Обработчик изменения месяца (или года)
     */
    onMonthChange?: (month: number) => void;
    /**
     * Обработчик выбора даты
     */
    onChange?: (date?: number) => void;
    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Нужно ли рендерить шапку календаря
     */
    hasHeader?: boolean;
    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};
declare const CalendarDesktop: React.ForwardRefExoticComponent<CalendarDesktopProps & React.RefAttributes<HTMLDivElement>>;
export { CalendarDesktopProps, CalendarDesktop };
