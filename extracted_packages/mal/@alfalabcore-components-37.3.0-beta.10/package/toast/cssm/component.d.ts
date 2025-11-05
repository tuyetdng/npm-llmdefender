/// <reference types="react" />
import React from 'react';
import { PopoverProps } from "../../popover";
import { ToastPlateProps } from "../../toast-plate";
import { ToastPlate as ToastPlateComponent } from "../../toast-plate";
type ToastProps = ToastPlateProps & Pick<PopoverProps, 'position' | 'offset' | 'open' | 'getPortalContainer' | 'preventFlip' | 'transition' | 'useAnchorWidth'> & {
    /**
     * Элемент, относительного которого появляется тост.
     * Если не передавать, тост будет позиционирован снизу экрана (position: fixed).
     */
    anchorElement?: HTMLElement | null;
    /**
     * Через сколько исчезнет компонент (ms).
     */
    autoCloseDelay?: number;
    /**
     * Отступ снизу (при fixed-позиционировании).
     */
    bottomOffset?: number;
    /**
     * z-index компонента
     */
    zIndex?: number;
    /**
     * Обработчик закрытия компонента.
     */
    onClose: () => void;
    /**
     * Плашка тоста.
     * По-дефолту рендерит компонент ToastPlate
     */
    ToastPlate?: typeof ToastPlateComponent;
};
declare const Toast: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    className?: string | undefined;
    titleClassName?: string | undefined; /**
     * Элемент, относительного которого появляется тост.
     * Если не передавать, тост будет позиционирован снизу экрана (position: fixed).
     */
    contentClassName?: string | undefined;
    actionSectionClassName?: string | undefined;
    children?: React.ReactNode;
    title?: React.ReactNode;
    badge?: "positive" | "attention" | "negative" | undefined; /**
     * z-index компонента
     */
    leftAddons?: React.ReactNode;
    actionButton?: React.ReactNode;
    dataTestId?: string | undefined;
    hasCloser?: boolean | undefined;
    block?: boolean | undefined;
    onClose?: ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void) | undefined;
    getBadgeIcons?: ((icons: import("../../toast-plate").BadgeIcons) => import("../../toast-plate").BadgeIcons) | undefined;
    colors?: "default" | "inverted" | undefined;
} & Pick<PopoverProps, "getPortalContainer" | "transition" | "useAnchorWidth" | "offset" | "position" | "preventFlip" | "open"> & {
    /**
     * Элемент, относительного которого появляется тост.
     * Если не передавать, тост будет позиционирован снизу экрана (position: fixed).
     */
    anchorElement?: HTMLElement | null | undefined;
    /**
     * Через сколько исчезнет компонент (ms).
     */
    autoCloseDelay?: number | undefined;
    /**
     * Отступ снизу (при fixed-позиционировании).
     */
    bottomOffset?: number | undefined;
    /**
     * z-index компонента
     */
    zIndex?: number | undefined;
    /**
     * Обработчик закрытия компонента.
     */
    onClose: () => void;
    /**
     * Плашка тоста.
     * По-дефолту рендерит компонент ToastPlate
     */
    ToastPlate?: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        className?: string | undefined;
        titleClassName?: string | undefined; /**
         * Элемент, относительного которого появляется тост.
         * Если не передавать, тост будет позиционирован снизу экрана (position: fixed).
         */
        contentClassName?: string | undefined;
        actionSectionClassName?: string | undefined;
        children?: React.ReactNode;
        title?: React.ReactNode;
        badge?: "positive" | "attention" | "negative" | undefined; /**
         * z-index компонента
         */
        leftAddons?: React.ReactNode;
        actionButton?: React.ReactNode;
        dataTestId?: string | undefined;
        hasCloser?: boolean | undefined;
        block?: boolean | undefined;
        onClose?: ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void) | undefined;
        getBadgeIcons?: ((icons: import("../../toast-plate").BadgeIcons) => import("../../toast-plate").BadgeIcons) | undefined;
        colors?: "default" | "inverted" | undefined;
    } & React.RefAttributes<HTMLDivElement>> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { ToastProps, Toast };
