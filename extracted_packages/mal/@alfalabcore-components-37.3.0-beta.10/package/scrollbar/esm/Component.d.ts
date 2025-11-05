/// <reference types="react" />
import React from 'react';
import { HTMLAttributes } from "react";
type ScrollbarProps = {
    /**
     * Оборачиваемый элемент.
     */
    children?: React.ReactNode;
    /**
     * Дополнительный класс на корневой элемент.
     */
    className?: string;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Растягивать контент по горизонтали по ширине содержимого.
     */
    horizontalAutoStretch?: boolean;
    /**
     * Название css свойства, которое устанавливается на контейнер при horizontalAutoStretch.
     */
    widthPropName?: 'minWidth' | 'width' | 'maxWidth';
    /**
     * Включает автоскрытие ползунка.
     */
    autoHide?: boolean;
    /**
     * Время в мс, определяющее задержку до исчезновения полосы прокрутки (при включенной опции autoHide).
     */
    autoHideTimeout?: number;
    /**
     * Принудительное отображение полосы прокрутки.
     */
    forceVisible?: boolean | 'x' | 'y';
    /**
     * Управление поведением клика по треку.
     * Если true, то будет выполняться прокрутка к месту клика.
     */
    clickOnTrack?: boolean;
    /**
     * HTML-aтрибуты на прокручиваемый узел.
     */
    scrollableNodeProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    /**
     * HTML-aтрибуты на узел с контентом.
     */
    contentNodeProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;
declare const Scrollbar: React.ForwardRefExoticComponent<{
    /**
     * Оборачиваемый элемент.
     */
    children?: React.ReactNode;
    /**
     * Дополнительный класс на корневой элемент.
     */
    className?: string | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
    /**
     * Растягивать контент по горизонтали по ширине содержимого.
     */
    horizontalAutoStretch?: boolean | undefined;
    /**
     * Название css свойства, которое устанавливается на контейнер при horizontalAutoStretch.
     */
    widthPropName?: "minWidth" | "width" | "maxWidth" | undefined;
    /**
     * Включает автоскрытие ползунка.
     */
    autoHide?: boolean | undefined;
    /**
     * Время в мс, определяющее задержку до исчезновения полосы прокрутки (при включенной опции autoHide).
     */
    autoHideTimeout?: number | undefined;
    /**
     * Принудительное отображение полосы прокрутки.
     */
    forceVisible?: boolean | "x" | "y" | undefined;
    /**
     * Управление поведением клика по треку.
     * Если true, то будет выполняться прокрутка к месту клика.
     */
    clickOnTrack?: boolean | undefined;
    /**
     * HTML-aтрибуты на прокручиваемый узел.
     */
    scrollableNodeProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | undefined;
    /**
     * HTML-aтрибуты на узел с контентом.
     */
    contentNodeProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | undefined;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { ScrollbarProps, Scrollbar };
