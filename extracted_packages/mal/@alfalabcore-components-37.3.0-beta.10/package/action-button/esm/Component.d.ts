/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
type Colors = 'default' | 'inverted' | 'static';
type ComponentProps = {
    /**
     * Иконка кнопки
     */
    icon: React.ReactNode;
    /**
     *  Размер кнопки
     */
    size?: 's';
    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для обертки иконки
     */
    iconWrapperClassName?: string;
    /**
     * Значение href для ссылки
     */
    href?: string;
    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;
    /**
     * Показать лоадер
     */
    loading?: boolean;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Палитра, в контексте которой используется кнопка
     */
    colors?: Colors;
};
type AnchorProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ActionButtonProps = Partial<AnchorProps | ButtonProps>;
declare const ActionButton: React.ForwardRefExoticComponent<ActionButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export { ActionButtonProps, ActionButton };
