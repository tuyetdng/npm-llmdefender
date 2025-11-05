/// <reference types="react" />
import React from 'react';
import { BaseModalProps } from "../../base-modal";
import { DrawerProps } from "../../drawer";
type SidePanelDesktopProps = BaseModalProps & Pick<DrawerProps, 'placement' | 'nativeScrollbar' | 'contentTransitionProps' | 'scrollbarProps'> & {
    /**
     * Ширина модального окна
     * @default "s"
     */
    size?: 's';
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};
declare const SidePanelDesktop: React.ForwardRefExoticComponent<BaseModalProps & Pick<DrawerProps, "contentTransitionProps" | "nativeScrollbar" | "placement" | "scrollbarProps"> & {
    /**
     * Ширина модального окна
     * @default "s"
     */
    size?: "s" | undefined;
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>> & {
    Content: React.FC<import("./components/content/Component.desktop").ContentDesktopProps>;
    Header: React.FC<import("./components/header/Component.desktop").HeaderDesktopProps>;
    Footer: React.FC<import("./components/footer/Component.desktop").FooterDesktopProps>;
};
export { SidePanelDesktopProps, SidePanelDesktop };
