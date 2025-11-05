/// <reference types="react-transition-group" />
/// <reference types="react" />
import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { BaseModalContext, BaseModalProps } from "../base-modal";
import { ScrollbarProps } from "../scrollbar";
declare const ANIMATION_DURATION = 600;
type DrawerProps = Omit<BaseModalProps, 'container'> & {
    /**
     * Край экрана, с которого может появиться Drawer.
     * @default "right"
     */
    placement?: 'left' | 'right';
    /**
     * Нужно ли использовать нативный скроллбар
     * @default true
     */
    nativeScrollbar?: boolean;
    /**
     * Пропсы кастомного скроллбара.
     */
    scrollbarProps?: Partial<Omit<ScrollbarProps, 'children'>>;
    /**
     * Пропсы для анимации контента (CSSTransition)
     */
    contentTransitionProps?: Partial<TransitionProps>;
};
declare const DrawerContext: React.Context<BaseModalContext>;
declare const Drawer: React.ForwardRefExoticComponent<Omit<BaseModalProps, "container"> & {
    /**
     * Край экрана, с которого может появиться Drawer.
     * @default "right"
     */
    placement?: "left" | "right" | undefined;
    /**
     * Нужно ли использовать нативный скроллбар
     * @default true
     */
    nativeScrollbar?: boolean | undefined;
    /**
     * Пропсы кастомного скроллбара.
     */
    scrollbarProps?: Partial<Omit<ScrollbarProps, "children">> | undefined;
    /**
     * Пропсы для анимации контента (CSSTransition)
     */
    contentTransitionProps?: Partial<TransitionProps<undefined>> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { ANIMATION_DURATION, DrawerProps, DrawerContext, Drawer };
