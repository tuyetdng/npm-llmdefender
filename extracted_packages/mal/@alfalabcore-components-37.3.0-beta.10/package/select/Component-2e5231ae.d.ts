/// <reference types="react" />
import React from "react";
import { ReactNode, FC, ButtonHTMLAttributes, ElementType, AnchorHTMLAttributes } from "react";
import { BottomSheetProps } from "../bottom-sheet";
import { BaseSelectProps, OptionShape, OptionsListProps } from "./typings";
import { BaseModalProps, BaseModalContext } from "../base-modal";
import { ButtonProps } from "../button";
type AdditionalMobileProps = {
    /**
     * Футер
     * @deprecated Используйте bottomSheetProps.actionButton
     */
    footer?: ReactNode;
    /**
     * Будет ли свайпаться шторка
     * @deprecated Используйте bottomSheetProps.swipeable
     */
    swipeable?: boolean;
    /**
     * Дополнительные пропсы шторки
     */
    bottomSheetProps?: Partial<BottomSheetProps>;
};
type SelectMobileProps = Omit<BaseSelectProps, "Checkmark" | "onScroll"> & AdditionalMobileProps;
declare const SelectMobile: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "onScroll" | "Checkmark"> & AdditionalMobileProps & React.RefAttributes<unknown>>;
type SelectMobileProps$0 = Omit<BaseSelectProps, "Checkmark" | "onScroll"> & {
    /**
     * Футер
     * @deprecated Используйте bottomSheetProps.actionButton
     */
    footer?: ReactNode;
    /**
     * Будет ли свайпаться шторка
     * @deprecated Используйте bottomSheetProps.swipeable
     */
    swipeable?: boolean;
    /**
     * Отображать в BottomSheet
     */
    isBottomSheet?: boolean;
    /**
     * Дополнительные пропсы шторки
     */
    bottomSheetProps?: Partial<BottomSheetProps>;
};
declare const BaseSelectMobile: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "onScroll" | "Checkmark"> & {
    footer?: ReactNode;
    swipeable?: boolean | undefined;
    isBottomSheet?: boolean | undefined;
    bottomSheetProps?: Partial<BottomSheetProps> | undefined;
} & React.RefAttributes<unknown>>;
declare const OptionsListWithApply: React.ForwardRefExoticComponent<OptionsListProps & {
    showClear?: boolean | undefined;
    onClose?: (() => void) | undefined;
    selectedDraft?: OptionShape[] | undefined;
    OptionsList?: React.FC<OptionsListProps & React.RefAttributes<unknown>> | undefined;
} & React.RefAttributes<unknown>>;
type ModalDesktopProps = BaseModalProps & {
    /**
     * Ширина модального окна
     * @default "m"
     */
    size?: "s" | "m" | "l" | "xl" | "fullscreen";
    /**
     * Растягивает модальное окно на весь экран
     * @deprecated Используйте размер fullscreen
     */
    fullscreen?: boolean;
    /**
     * Фиксирует позицию модального окна после открытия,
     * предотвращая скачки, если контент внутри будет меняться
     */
    fixedPosition?: boolean;
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};
type ModalMobileProps = Omit<ModalDesktopProps, "size" | "fixedPosition" | "fullscreen">;
type View = "desktop" | "mobile";
type TResponsiveModalContext = {
    view: View;
    size: NonNullable<ModalDesktopProps["size"]>;
};
type ContentProps = {
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Растягивает контент на всю высоту
     */
    flex?: boolean;
};
type HeaderProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Наличие компонента крестика
     */
    hasCloser?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;
    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;
    /**
     * Заголовок шапки
     */
    title?: string;
    /**
     * Выравнивание заголовка
     */
    align?: "left" | "center";
    /**
     * Обрезать ли заголовок
     */
    trim?: boolean;
    /**
     * Фиксирует шапку
     */
    sticky?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Фиксирует футер
     */
    sticky?: boolean;
    /**
     * Выравнивание элементов футера
     */
    layout?: "start" | "center" | "space-between" | "column";
    /**
     * Отступы между элементами футера
     */
    gap?: 16 | 24 | 32;
};
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
    view?: "primary" | "secondary" | "transparent" | "tertiary" | "negative";
    /**
     * Размер компонента
     */
    size?: "xxs" | "xs" | "s";
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
    colors?: "default" | "inverted";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & Pick<ButtonProps, "href" | "loading"> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "download">;
type CloserProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Позиция крестика
     */
    align?: "left" | "right";
    /**
     * Размер кнопки
     */
    size?: IconButtonProps["size"];
    /**
     * Фиксирует крестик
     */
    sticky?: boolean;
    /**
     * Иконка
     */
    icon?: ElementType;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const ModalMobile: React.ForwardRefExoticComponent<ModalMobileProps & React.RefAttributes<HTMLDivElement>> & {
    Content: React.FC<ContentProps>;
    Header: React.FC<HeaderProps>;
    Footer: React.FC<FooterProps>;
    Closer: React.FC<CloserProps>;
};
declare const Content: FC<ContentProps>;
declare const Modal: React.ForwardRefExoticComponent<import("../base-modal").BaseModalProps & {
    size?: "s" | "m" | "l" | "xl" | "fullscreen" | undefined;
    fullscreen?: boolean | undefined;
    fixedPosition?: boolean | undefined;
    hasCloser?: boolean | undefined;
} & {
    view: View;
} & React.RefAttributes<HTMLDivElement>>;
declare const ResponsiveContext: React.Context<TResponsiveModalContext>;
declare const ModalContext: import("react").Context<BaseModalContext>;
type SelectModalMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'>;
declare const SelectModalMobile: React.ForwardRefExoticComponent<SelectModalMobileProps & React.RefAttributes<unknown>>;
export { AdditionalMobileProps, SelectMobileProps, SelectMobile, BaseSelectMobile, OptionsListWithApply, ModalMobile, Content, Modal, ResponsiveContext, ModalContext, SelectModalMobileProps, SelectModalMobile };
