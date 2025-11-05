/// <reference types="react" />
import React from 'react';
import { BaseModalProps } from "../base-modal";
type SidePanelMobileProps = BaseModalProps & {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};
declare const SidePanelMobile: React.ForwardRefExoticComponent<BaseModalProps & {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>> & {
    Content: React.FC<import("./components/content/Component").ContentProps>;
    Header: React.FC<import("./components/header/Component.mobile").HeaderMobileProps>;
    Footer: React.FC<import("./components/footer/Component").FooterProps>;
};
export { SidePanelMobileProps, SidePanelMobile };
