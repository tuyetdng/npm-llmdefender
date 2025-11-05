import { FC } from 'react';
import { CalendarInputProps } from "../../calendar-input";
type CalendarRangeProps = {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Значение инпута (используется и для календаря)
     */
    valueFrom?: string;
    /**
     * Значение инпута (используется и для календаря)
     */
    valueTo?: string;
    /**
     * Месяц в календаре по умолчанию
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
     * Обработчик изменения даты от
     */
    onDateFromChange?: (payload: {
        date: number | null;
        value: string;
    }) => void;
    /**
     * Обработчик изменения даты до
     */
    onDateToChange?: (payload: {
        date: number | null;
        value: string;
    }) => void;
    /**
     * Обработчик изменения
     */
    onChange?: (payload: {
        dateFrom: number | null;
        valueFrom: string;
        dateTo: number | null;
        valueTo: string;
    }) => void;
    /**
     * Коллбэк, срабатывающий при возникновении ошибок валидации дат внутри компонента.
     */
    onError?: (hasError: boolean) => void;
    /**
     * Список событий
     */
    events?: Array<Date | number>;
    /**
     * Список выходных
     */
    offDays?: Array<Date | number>;
    /**
     * Пропсы для инпута даты от
     */
    inputFromProps?: CalendarInputProps;
    /**
     * Пропсы для инпута даты до
     */
    inputToProps?: CalendarInputProps;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Определяет, как рендерить календарь — в поповере или снизу инпута
     */
    calendarPosition?: 'static' | 'popover';
    /**
     * calendarPosition = static
     * Отображать начальный месяц слева или справа (влияет только на начальный рендер)
     */
    defaultMonthPosition?: 'left' | 'right';
};
declare const CalendarRange: FC<CalendarRangeProps>;
export { CalendarRangeProps, CalendarRange };
