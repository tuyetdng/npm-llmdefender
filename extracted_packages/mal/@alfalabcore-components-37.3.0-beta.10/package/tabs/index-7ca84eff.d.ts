/// <reference types="react-transition-group" />
/// <reference types="react" />
import React from "react";
import { HTMLAttributes, ReactNode, FC } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import { BaseModalProps } from "./index-bdb4c6b9";
import { SwipeableHandlers } from "react-swipeable/types";
import { BackdropProps } from "./index-ebda875c";
type BottomSheetTitleAlign = "center" | "left";
type BottomSheetProps = {
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Управление видимостью
     */
    open: boolean;
    /**
     * Заголовок
     */
    title?: ReactNode;
    /**
     * Кнопка действия (обычно, это кнопка закрытия)
     */
    actionButton?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс
     */
    contentClassName?: string;
    /**
     * Дополнительные пропсы на контейнер.
     */
    containerProps?: HTMLAttributes<HTMLDivElement>;
    /**
     * Дополнительный класс
     */
    containerClassName?: string;
    /**
     * Дополнительный класс шапки
     */
    headerClassName?: string;
    /**
     * Дополнительный класс футера
     */
    footerClassName?: string;
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
     * Дополнительный класс для компонента модального окна
     */
    modalClassName?: string;
    /**
     * Дополнительный класс для обертки модального окна
     */
    modalWrapperClassName?: string;
    /**
     * TransitionProps, прокидываются в компонент CSSTransitionProps.
     */
    transitionProps?: Partial<TransitionProps>;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * z-index компонента
     */
    zIndex?: number;
    /**
     * Будет ли свайпаться шторка
     * @default true
     */
    swipeable?: boolean;
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
     * Фиксирует шапку
     */
    stickyHeader?: boolean;
    /**
     * Фиксирует футер
     */
    stickyFooter?: boolean;
    /**
     * Высота шторки
     */
    initialHeight?: "default" | "full";
    /**
     * Будет ли виден оверлэй
     */
    hideOverlay?: boolean;
    /**
     * Будет ли видна шапка
     */
    hideHeader?: boolean;
    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;
    /**
     * Запретить закрытие шторки кликом на оверлэй
     */
    disableOverlayClick?: boolean;
    /**
     * Отключает блокировку скролла при открытии модального окна
     */
    disableBlockingScroll?: boolean;
    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Не анимировать шторку при изменении размера вьюпорта
     */
    ignoreScreenChange?: boolean;
    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: BaseModalProps["backdropProps"];
    /**
     * Обработчик закрытия
     */
    onClose: () => void;
    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;
};
/* Верхний отступ шторки, если она открыта на максимальную высоту */
declare const HEADER_OFFSET = 24;
declare const CLOSE_OFFSET = 0.2;
declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<HTMLDivElement>>;
type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;
    /**
     * Фиксирует футер
     */
    sticky?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
};
declare const Footer: FC<FooterProps>;
type SwipeableBackdropProps = BackdropProps & {
    /**
     * Прозрачность бэкдропа
     */
    opacity?: number;
    /**
     * Обработчики свайпа
     */
    handlers?: SwipeableHandlers;
    /**
     * Время анимации opacity
     */
    opacityTimeout?: number;
};
declare const SwipeableBackdrop: FC<SwipeableBackdropProps>;
export { BottomSheetTitleAlign, BottomSheetProps, HEADER_OFFSET, CLOSE_OFFSET, BottomSheet, FooterProps, Footer, SwipeableBackdropProps, SwipeableBackdrop };
