/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from "react";
import { ButtonProps } from "../../button";
type IconButtonProps = {
    /**
     * Компонент иконки
     */
    icon: ElementType<{
        className?: string;
    }>;
    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'transparent' | 'tertiary' | 'negative';
    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & Pick<ButtonProps, 'href' | 'loading'> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'download'>;
declare const IconButton: React.ForwardRefExoticComponent<{
    /**
     * Компонент иконки
     */
    icon: ElementType<{
        className?: string;
    }>;
    /**
     * Тип кнопки
     */
    view?: "primary" | "secondary" | "tertiary" | "transparent" | "negative" | undefined;
    /**
     * Размер компонента
     */
    size?: "xs" | "s" | "xxs" | undefined;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & Pick<ButtonProps, "href" | "loading"> & Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "download" | "target"> & React.RefAttributes<HTMLButtonElement>>;
export { IconButtonProps, IconButton };
