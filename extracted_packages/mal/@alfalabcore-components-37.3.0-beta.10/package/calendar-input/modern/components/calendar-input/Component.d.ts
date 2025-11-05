/// <reference types="react" />
import React from 'react';
import { ChangeEvent, ElementType, MouseEvent } from "react";
import { CalendarMobileProps, CalendarProps } from "../../../../calendar";
import { DateInputProps } from "../../../../date-input";
import { PopoverProps } from "../../../../popover";
type CalendarInputProps = Omit<DateInputProps, 'onChange' | 'mobileMode'> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для инпута
     */
    inputClassName?: string;
    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string;
    /**
     * Доп. пропсы для календаря
     */
    calendarProps?: (CalendarProps & Record<string, unknown>) | (CalendarMobileProps & Record<string, unknown>);
    /**
     * Значение инпута (используется и для календаря)
     */
    value?: string;
    /**
     * Начальное значение инпута
     */
    defaultValue?: string;
    /**
     * Состояние открытия по умолчанию
     */
    defaultOpen?: boolean;
    /**
     * Месяц в календаре по умолчанию (timestamp)
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
     * Список событий
     */
    events?: Array<Date | number>;
    /**
     * Список выходных
     */
    offDays?: Array<Date | number>;
    /**
     * Определяет, как рендерить календарь — в поповере или снизу инпута
     */
    calendarPosition?: 'static' | 'popover';
    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: 'native' | 'popover' | 'input';
    /**
     * Компонент календаря
     */
    Calendar?: ElementType;
    /**
     * Обработчик изменения значения
     */
    onChange?: (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement> | null, payload: {
        date: Date;
        value: string;
    }) => void;
    /**
     * Обработчик ввода в инпут
     */
    onInputChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        value: string;
        date: Date;
    }) => void;
    /**
     * Обработчик изменения календаря
     */
    onCalendarChange?: CalendarProps['onChange'];
    /**
     * Позиционирование поповера с календарем
     */
    popoverPosition?: PopoverProps['position'];
    /**
     * z-index Popover
     */
    zIndexPopover?: PopoverProps['zIndex'];
    /**
     * Календарь будет принимать ширину инпута
     */
    useAnchorWidth?: boolean;
    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: 'desktop' | 'mobile';
};
declare const CalendarInput: React.ForwardRefExoticComponent<Omit<DateInputProps, "onChange" | "mobileMode"> & {
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для инпута
     */
    inputClassName?: string | undefined;
    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string | undefined;
    /**
     * Доп. пропсы для календаря
     */
    calendarProps?: (CalendarProps & Record<string, unknown>) | (CalendarProps & {
        open: boolean;
        title?: string | undefined;
        onClose?: (() => void) | undefined;
        yearsAmount?: number | undefined;
        hasHeader?: boolean | undefined;
        allowSelectionFromEmptyRange?: boolean | undefined;
    } & Record<string, unknown>) | undefined;
    /**
     * Значение инпута (используется и для календаря)
     */
    value?: string | undefined;
    /**
     * Начальное значение инпута
     */
    defaultValue?: string | undefined;
    /**
     * Состояние открытия по умолчанию
     */
    defaultOpen?: boolean | undefined;
    /**
     * Месяц в календаре по умолчанию (timestamp)
     */
    defaultMonth?: number | undefined;
    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number | undefined;
    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number | undefined;
    /**
     * Список событий
     */
    events?: (number | Date)[] | undefined;
    /**
     * Список выходных
     */
    offDays?: (number | Date)[] | undefined;
    /**
     * Определяет, как рендерить календарь — в поповере или снизу инпута
     */
    calendarPosition?: "static" | "popover" | undefined;
    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean | undefined;
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: "input" | "native" | "popover" | undefined;
    /**
     * Компонент календаря
     */
    Calendar?: React.ElementType<any> | undefined;
    /**
     * Обработчик изменения значения
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement> | null, payload: {
        date: Date;
        value: string;
    }) => void) | undefined;
    /**
     * Обработчик ввода в инпут
     */
    onInputChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        value: string;
        date: Date;
    }) => void) | undefined;
    /**
     * Обработчик изменения календаря
     */
    onCalendarChange?: CalendarProps['onChange'];
    /**
     * Позиционирование поповера с календарем
     */
    popoverPosition?: PopoverProps['position'];
    /**
     * z-index Popover
     */
    zIndexPopover?: PopoverProps['zIndex'];
    /**
     * Календарь будет принимать ширину инпута
     */
    useAnchorWidth?: boolean | undefined;
    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: "desktop" | "mobile" | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { CalendarInputProps, CalendarInput };
