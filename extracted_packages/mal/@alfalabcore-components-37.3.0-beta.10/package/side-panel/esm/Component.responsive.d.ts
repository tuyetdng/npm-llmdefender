/// <reference types="react" />
import React from 'react';
import { BaseModalProps } from "../../base-modal";
import { DrawerProps } from "../../drawer";
type SidePanelResponsiveProps = BaseModalProps & Pick<DrawerProps, 'contentTransitionProps' | 'placement' | 'nativeScrollbar' | 'scrollbarProps'> & {
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
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
declare const SidePanelResponsive: React.ForwardRefExoticComponent<BaseModalProps & Pick<DrawerProps, "contentTransitionProps" | "nativeScrollbar" | "placement" | "scrollbarProps"> & {
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
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number | undefined;
} & React.RefAttributes<HTMLDivElement>> & {
    Header: React.FC<import("./components/header/Component.desktop").HeaderDesktopProps> | React.FC<import("./components/header/Component.mobile").HeaderMobileProps>;
    Content: React.FC<import("./components/content/Component").ContentProps> | React.FC<import("./components/content/Component.desktop").ContentDesktopProps>;
    Footer: React.FC<import("./components/footer/Component").FooterProps> | React.FC<import("./components/footer/Component.desktop").FooterDesktopProps>;
    Closer: React.FC<import("./components/closer/Component").CloserProps>;
};
export { SidePanelResponsiveProps, SidePanelResponsive };
