/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
type NativeProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type LinkProps = NativeProps & {
    /**
     * URL для перехода (native prop)
     */
    href?: string;
    /**
     * Тип ссылки
     */
    view?: 'primary' | 'secondary' | 'default';
    /**
     * Пунктирное подчеркивание
     */
    pseudo?: boolean;
    /**
     * Включает / отключает подчеркивание
     * @default true
     */
    underline?: boolean;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;
    /**
     * Дополнительный класс (native prop)
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Обработчик нажатия (native prop)
     */
    onClick?: NativeProps['onClick'];
    /**
     * Дочерние элементы (native prop)
     */
    children: ReactNode;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
};
declare const Link: React.ForwardRefExoticComponent<NativeProps & {
    /**
     * URL для перехода (native prop)
     */
    href?: string | undefined;
    /**
     * Тип ссылки
     */
    view?: "primary" | "secondary" | "default" | undefined;
    /**
     * Пунктирное подчеркивание
     */
    pseudo?: boolean | undefined;
    /**
     * Включает / отключает подчеркивание
     * @default true
     */
    underline?: boolean | undefined;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: React.ElementType<any> | undefined;
    /**
     * Дополнительный класс (native prop)
     */
    className?: string | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Обработчик нажатия (native prop)
     */
    onClick?: NativeProps['onClick'];
    /**
     * Дочерние элементы (native prop)
     */
    children: ReactNode;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
} & React.RefAttributes<HTMLAnchorElement>>;
export { LinkProps, Link };
