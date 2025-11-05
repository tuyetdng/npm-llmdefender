/// <reference types="react" />
import React from 'react';
import { HTMLAttributes } from "react";
import { Color } from "../colors";
type NativeProps = HTMLAttributes<HTMLHeadingElement>;
type TitleProps = Omit<NativeProps, 'color'> & {
    /**
     * HTML тег
     */
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
    /**
     * Цвет текста
     */
    color?: Color;
    /**
     * Толщина шрифта
     */
    weight?: 'regular' | 'medium' | 'bold';
    /**
     * Шрифт текста
     */
    font?: 'styrene' | 'system';
    /**
     * Добавляет отступы
     */
    defaultMargins?: boolean;
    /**
     * Css-класс для стилизации (native prop)
     */
    className?: string;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Контент (native prop)
     */
    children?: React.ReactNode;
};
type Styles = {
    styles: {
        [key: string]: string;
    };
};
type TitleElementType = HTMLHeadingElement | HTMLDivElement;
declare const Title: React.ForwardRefExoticComponent<Omit<NativeProps, "color"> & {
    /**
     * HTML тег
     */
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: "medium" | "xlarge" | "large" | "small" | "xsmall" | undefined;
    /**
     * Цвет текста
     */
    color?: "tertiary" | "disabled" | "accent" | "primary" | "attention" | "positive" | "secondary" | "tertiary-inverted" | "primary-inverted" | "secondary-inverted" | "link" | "negative" | undefined;
    /**
     * Толщина шрифта
     */
    weight?: "regular" | "medium" | "bold" | undefined;
    /**
     * Шрифт текста
     */
    font?: "styrene" | "system" | undefined;
    /**
     * Добавляет отступы
     */
    defaultMargins?: boolean | undefined;
    /**
     * Css-класс для стилизации (native prop)
     */
    className?: string | undefined;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string | undefined;
    /**
     * Контент (native prop)
     */
    children?: React.ReactNode;
} & Styles & React.RefAttributes<TitleElementType>>;
export { TitleProps, Title };
