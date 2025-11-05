/// <reference types="react" />
import React from 'react';
import { BaseModalProps } from "../../base-modal";
declare const ModalResponsive: React.ForwardRefExoticComponent<BaseModalProps & {
    size?: "s" | "m" | "l" | "xl" | "fullscreen" | undefined;
    fullscreen?: boolean | undefined;
    fixedPosition?: boolean | undefined;
    hasCloser?: boolean | undefined;
} & {
    breakpoint?: number | undefined;
} & React.RefAttributes<HTMLDivElement>> & {
    Header: React.FC<import("./components/header/Component").HeaderProps>;
    Content: React.FC<import("./typings").ContentProps>;
    Footer: React.FC<import("./components/footer/Component").FooterProps>;
    Closer: React.FC<import("./components/closer/Component").CloserProps>;
};
export { ModalResponsive };
