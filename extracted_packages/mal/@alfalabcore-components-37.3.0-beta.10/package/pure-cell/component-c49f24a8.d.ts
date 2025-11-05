/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, HTMLAttributes } from "react";
import { ButtonProps } from "../button";
import { PureCellElement } from "./components/types";
type PureCellContext = {
    /** Направление */
    direction?: 'horizontal' | 'vertical';
};
declare const PureCellContext: React.Context<PureCellContext>;
type PureCellProps = {
    /**
     * Направление
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * Сss класс для стилизации общей обёртки
     */
    className?: string;
    /**
     * Выводит ссылку в виде ячейки
     */
    href?: string;
    /**
     * Вертикальные отступы
     */
    verticalPadding?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';
    /**
     * Горизонтальные отступы
     */
    horizontalPadding?: 'left' | 'right' | 'both' | 'none';
    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    tag?: ElementType;
    /**
     * Компоненты
     */
    children: PureCellElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
type AnchorPureCellProps = PureCellProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonPureCellProps = PureCellProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ElementPureCellProps = PureCellProps & HTMLAttributes<HTMLElement>;
type PureProps = Partial<AnchorPureCellProps | ButtonPureCellProps | ElementPureCellProps>;
/**
 * Универсальный конструктор для сборки любой ячейки.
 *
 * [Макет](https://www.figma.com/file/KlFOLLkKO8rtvvQE3RXuhq/Click-Library?node-id=43525%3A240018)
 */
declare const PureCell: React.ForwardRefExoticComponent<PureProps & React.RefAttributes<HTMLElement>> & {
    Main: React.FC<{
        children: import("./components/types").MainElement;
        isReverse?: boolean | undefined;
        dataTestId?: string | undefined;
    }>;
    Graphics: React.FC<import("./components/graphics/index").Props>;
    Content: React.FC<{
        children: import("./components/types").ContentElement;
        dataTestId?: string | undefined;
    }>;
    Text: React.FC<{
        children?: React.ReactNode;
        rowLimit?: 1 | 2 | undefined;
        view: "component" | "primary-small";
        titleColor: "link" | "primary" | "secondary" | "tertiary" | "disabled" | "accent" | "attention" | "positive" | "tertiary-inverted" | "primary-inverted" | "secondary-inverted" | "negative";
        value?: React.ReactNode;
        valueColor?: "link" | "primary" | "secondary" | "tertiary" | "disabled" | "accent" | "attention" | "positive" | "tertiary-inverted" | "primary-inverted" | "secondary-inverted" | "negative" | undefined;
        dataTestId?: string | undefined;
    }>;
    Amount: React.FC<{
        weight?: "bold" | "normal" | undefined;
        textView?: "component" | "primary-small" | undefined;
        color?: "link" | "primary" | "secondary" | "tertiary" | "disabled" | "accent" | "attention" | "positive" | "tertiary-inverted" | "primary-inverted" | "secondary-inverted" | "negative" | undefined;
        dataTestId?: string | undefined;
    } & import("./components/typesProps").AmountProps>;
    AmountTitle: React.FC<{
        color?: "link" | "primary" | "secondary" | "tertiary" | "disabled" | "accent" | "attention" | "positive" | "tertiary-inverted" | "primary-inverted" | "secondary-inverted" | "negative" | undefined;
    } & import("./components/typesProps").AmountProps>;
    Addon: React.FC<{
        verticalAlign?: "top" | "center" | "bottom" | undefined;
        addonPadding?: "default" | "none" | undefined;
        children: import("./components/types").AddonElement;
        dataTestId?: string | undefined;
    }>;
    Footer: React.FC<{
        children: import("./components/types").FooterElement;
        footerPadding?: "default" | "none" | undefined;
        dataTestId?: string | undefined;
    }>;
    ExtraSubtitle: React.FC<import("./components/footer-text/index").Props>;
    FooterButton: React.FC<ButtonProps>;
    Comment: React.FC<import("../comment").CommentProps>;
    Category: React.FC<{
        categoryName: string;
        categoryPercent?: number | undefined;
        rightAddons?: React.ReactNode;
        dataTestId?: string | undefined;
    }>;
};
export { PureCellContext, PureCellProps, PureCell };
