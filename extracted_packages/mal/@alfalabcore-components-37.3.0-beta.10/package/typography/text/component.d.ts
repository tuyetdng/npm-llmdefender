/// <reference types="react" />
import React from 'react';
import { HTMLAttributes } from "react";
import { Color } from "../colors";
import { TextElementType } from "../types";
type NativeProps = HTMLAttributes<HTMLSpanElement>;
type TextBaseProps = {
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: 'primary-large' | 'primary-medium' | 'primary-small' | 'secondary-large' | 'secondary-medium' | 'secondary-small' | 'component' | 'caps';
    /**
     * Цвет текста
     */
    color?: Color;
    /**
     * Толщина шрифта
     */
    weight?: 'regular' | 'medium' | 'bold';
    /**
     * Делает цифры моноширинными
     */
    monospaceNumbers?: boolean;
    /**
     * HTML тег
     */
    tag?: 'span' | 'div';
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
    /**
     * Добавляет отступы к тэгу 'p'
     */
    defaultMargins?: never;
};
type TextPTagProps = Omit<TextBaseProps, 'tag' | 'defaultMargins'> & {
    tag?: 'p';
    defaultMargins?: boolean;
};
type TextProps = Omit<NativeProps, 'color'> & (TextBaseProps | TextPTagProps);
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<TextElementType>>;
export { TextProps, Text };
