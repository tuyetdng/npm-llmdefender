/// <reference types="react" />
import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from "react";
type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;
type TagProps = Omit<NativeProps, 'onClick'> & {
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;
    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Обработчик нажатия
     */
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>, payload?: {
        checked: boolean;
        name?: string;
    }) => void;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Вариант тега
     */
    variant?: 'default' | 'alt';
};
declare const Tag: React.ForwardRefExoticComponent<Omit<NativeProps, "onClick"> & {
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean | undefined;
    /**
     * Размер компонента
     */
    size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | undefined;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Обработчик нажатия
     */
    onClick?: ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>, payload?: {
        checked: boolean;
        name?: string;
    }) => void) | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
    /**
     * Вариант тега
     */
    variant?: "default" | "alt" | undefined;
} & React.RefAttributes<HTMLButtonElement>>;
export { TagProps, Tag };
