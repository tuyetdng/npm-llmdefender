/// <reference types="react" />
import React from 'react';
import { CalendarDesktopProps } from "../../Component.desktop";
type CalendarMobileProps = CalendarDesktopProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;
    /**
     * Заголовок календаря
     */
    title?: string;
    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;
    /**
     * Количество лет для генерации в обе стороны от текущего года
     */
    yearsAmount?: number;
    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean;
    /**
     * Разрешить выбор из недозаполненного диапазона дат.
     */
    allowSelectionFromEmptyRange?: boolean;
};
declare const CalendarMobile: React.ForwardRefExoticComponent<CalendarDesktopProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;
    /**
     * Заголовок календаря
     */
    title?: string | undefined;
    /**
     * Обработчик закрытия модалки
     */
    onClose?: (() => void) | undefined;
    /**
     * Количество лет для генерации в обе стороны от текущего года
     */
    yearsAmount?: number | undefined;
    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean | undefined;
    /**
     * Разрешить выбор из недозаполненного диапазона дат.
     */
    allowSelectionFromEmptyRange?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { CalendarMobileProps, CalendarMobile };
