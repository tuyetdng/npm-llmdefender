/// <reference types="react-transition-group" />
/// <reference types="react" />
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { FC, KeyboardEvent, MouseEvent, MutableRefObject, ReactNode, Ref, RefObject } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import { BackdropProps } from "./index-ebda875c";
type PortalProps = {
    /** Контент */
    children?: ReactNode;
    /**
     * Функция, возвращающая контейнер, в который будут рендериться дочерние элементы
     */
    getPortalContainer?: () => Element;
    /**
     * Немедленно отрендерить дочерние элементы (false - контент будет отрендерен на след. рендер).
     */
    immediateMount?: boolean;
};
type BaseModalProps = {
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Компонент бэкдропа
     */
    Backdrop?: FC<BackdropProps>;
    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: Partial<BackdropProps> & Record<string, unknown>;
    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: PortalProps["getPortalContainer"];
    /**
     * Отключает автоматический перевод фокуса на модалку при открытии
     * @default false
     */
    disableAutoFocus?: boolean;
    /**
     * Отключает ловушку фокуса
     * @default false
     */
    disableFocusLock?: boolean;
    /**
     * Отключает восстановление фокуса на предыдущем элементе после закрытия модалки
     * @default false
     */
    disableRestoreFocus?: boolean;
    /**
     * Отключает вызов `callback` при нажатии Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;
    /**
     * Отключает вызов `callback` при клике на бэкдроп
     * @default false
     */
    disableBackdropClick?: boolean;
    /**
     * Отключает блокировку скролла при открытии модального окна
     * @default false
     */
    disableBlockingScroll?: boolean;
    /**
     * Содержимое модалки всегда в DOM
     * @default false
     */
    keepMounted?: boolean;
    /**
     * Управление видимостью модалки
     */
    open: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс
     */
    contentClassName?: string;
    /**
     * Дополнительный класс для обертки (Modal)
     */
    wrapperClassName?: string;
    /**
     * Обработчик скролла контента
     */
    scrollHandler?: "wrapper" | "content" | MutableRefObject<HTMLDivElement | null>;
    /**
     * Пропсы для анимации (CSSTransition)
     */
    transitionProps?: Partial<TransitionProps>;
    /**
     * Обработчик события нажатия на бэкдроп
     */
    onBackdropClick?: (event: MouseEvent) => void;
    /**
     * Обработчик события нажатия на Escape
     *
     * Если `disableEscapeKeyDown` - false и модальное окно в фокусе
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * Обработчик закрытия
     */
    onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, reason?: "backdropClick" | "escapeKeyDown" | "closerClick") => void;
    /**
     * Обработчик события onEntered компонента Transition
     */
    onMount?: () => void;
    /**
     * Обработчик события onExited компонента Transition
     */
    onUnmount?: () => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * z-index компонента
     */
    zIndex?: number;
    /**
     * Реф, который должен быть установлен компонентной области
     */
    componentRef?: MutableRefObject<HTMLDivElement | null>;
};
type BaseModalContext = {
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasScroll?: boolean;
    headerHighlighted?: boolean;
    footerHighlighted?: boolean;
    headerOffset?: number;
    setHeaderOffset: (offset: number) => void;
    contentRef: Ref<HTMLElement>;
    setHasHeader: (exists: boolean) => void;
    setHasFooter: (exists: boolean) => void;
    onClose: Required<BaseModalProps>["onClose"];
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const BaseModalContext: React.Context<BaseModalContext>;
declare const BaseModal: React.ForwardRefExoticComponent<BaseModalProps & React.RefAttributes<HTMLDivElement>>;
declare function isScrolledToTop(target: HTMLElement): boolean;
declare function isScrolledToBottom(target: HTMLElement): boolean;
declare function hasScrollbar(target: HTMLElement): boolean;
declare const getScrollbarSize: () => number;
declare const restoreContainerStyles: (container: HTMLElement) => void;
declare const handleContainer: (container?: HTMLElement) => void;
/**
 * Набор констант для z-index соответствующих классов компонентов.
 * Значения выбраны по приоритету.
 */
declare const stackingOrder: {
    FOCUSED: number;
    DEFAULT: number;
    POPOVER: number;
    MODAL: number;
    TOAST: number;
};
declare const StackingContext: import("react").Context<number>;
type StackProps = {
    /**
     * Render prop, в который передается функция.
     * Функция принимает аргумент со значением z-index из текущего контекста.
     */
    children: (value: number) => ReactNode;
    /**
     * Исходное значение для z-index.
     * @default 5
     */
    value?: number;
};
declare const Stack: FC<StackProps>;
declare const PORTAL_CONTAINER_ATTRIBUTE = "alfa-portal-container";
declare const getDefaultPortalContainer: () => Element;
declare function setRef<T>(ref: RefObject<T> | ((instance: T | null) => void) | null | undefined, value: T | null): void;
type SavedStyle = {
    value: string;
    key: string;
    el: HTMLElement;
};
type RestoreStyle = {
    container: HTMLElement;
    modals: number;
    styles: SavedStyle[];
};
declare class ModalStore {
    private readonly restoreStyles;
    constructor();
    getRestoreStyles: () => RestoreStyle[];
}
declare const getModalStore: () => ModalStore;
declare class GlobalStore {
    private readonly modalStore;
    constructor();
    getModalStore: () => ModalStore;
}
export { BaseModalProps, BaseModalContext, BaseModal, isScrolledToTop, isScrolledToBottom, hasScrollbar, getScrollbarSize, restoreContainerStyles, handleContainer, stackingOrder, StackingContext, StackProps, Stack, PORTAL_CONTAINER_ATTRIBUTE, getDefaultPortalContainer, setRef, getModalStore, GlobalStore };
export type { SavedStyle };
