import React from "react";
import { ButtonHTMLAttributes, ElementType, FC, ForwardRefExoticComponent, RefAttributes, HTMLAttributes, ReactNode } from "react";
import { IconButtonProps } from "./index-ebda875c";
import { BottomSheetTitleAlign } from "./index-7ca84eff";
type CloserProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Размер кнопки
     */
    size?: IconButtonProps["size"];
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Иконка
     */
    icon?: ElementType;
};
declare const Closer: React.FC<CloserProps>;
declare const colors: readonly [
    "tertiary",
    "disabled",
    "accent",
    "primary",
    "attention",
    "positive",
    "secondary",
    "tertiary-inverted",
    "primary-inverted",
    "secondary-inverted",
    "link",
    "negative"
];
type Color = (typeof colors)[number];
type TextElementType = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement;
type NativeProps = HTMLAttributes<HTMLSpanElement>;
type TextBaseProps = {
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: "primary-large" | "primary-medium" | "primary-small" | "secondary-large" | "secondary-medium" | "secondary-small" | "component" | "caps";
    /**
     * Цвет текста
     */
    color?: Color;
    /**
     * Толщина шрифта
     */
    weight?: "regular" | "medium" | "bold";
    /**
     * Делает цифры моноширинными
     */
    monospaceNumbers?: boolean;
    /**
     * HTML тег
     */
    tag?: "span" | "div";
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
type TextPTagProps = Omit<TextBaseProps, "tag" | "defaultMargins"> & {
    tag?: "p";
    defaultMargins?: boolean;
};
type TextProps = Omit<NativeProps, "color"> & (TextBaseProps | TextPTagProps);
type NativeProps$0 = HTMLAttributes<HTMLHeadingElement>;
type TitleProps = Omit<NativeProps$0, "color"> & {
    /**
     * HTML тег
     */
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: "xlarge" | "large" | "medium" | "small" | "xsmall";
    /**
     * Цвет текста
     */
    color?: Color;
    /**
     * Толщина шрифта
     */
    weight?: "regular" | "medium" | "bold";
    /**
     * Шрифт текста
     */
    font?: "styrene" | "system";
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
type TitleMobileProps = Omit<TitleProps, "defaultMargins">;
declare const Typography: {
    Title: FC<TitleProps>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextElementType>>;
    TitleResponsive: FC<TitleProps>;
    TitleMobile: FC<TitleMobileProps>;
};
declare const typographyPresets: {
    mobile: {
        list: {
            text: {
                primary: {
                    tag: string;
                    view: string;
                };
                secondary: {
                    tag: string;
                    color: string;
                    view: string;
                };
            };
        };
    };
};
type BackerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Размер кнопки
     */
    size?: IconButtonProps["size"];
    /**
     * Иконка
     */
    icon?: ElementType;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Обработчик нажатия
     */
    onClick?: () => void;
};
declare const Backer: React.FC<BackerProps>;
declare const TitleResponsive: FC<TitleProps>;
type HeaderProps = {
    /**
     * Заголовок
     */
    title?: ReactNode;
    /**
     * Дополнительный класс
     */
    headerClassName?: string;
    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;
    /**
     * Дополнительный класс для компонента крестика
     */
    closerClassName?: string;
    /**
     * Дополнительный класс для компонента стрелки назад
     */
    backerClassName?: string;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;
    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;
    /**
     * Наличие компонента стрелки назад
     */
    hasBacker?: boolean;
    /**
     * Выравнивание заголовка
     */
    titleAlign?: BottomSheetTitleAlign;
    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;
    /**
     * Фиксирует шапку
     */
    sticky?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;
};
declare const Header: FC<HeaderProps>;
export { CloserProps, Closer, Typography, typographyPresets, BackerProps, Backer, TitleResponsive, HeaderProps, Header };
export type { TitleProps, TextProps, Color };
