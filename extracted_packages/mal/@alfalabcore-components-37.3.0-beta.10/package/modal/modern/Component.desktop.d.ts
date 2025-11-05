/// <reference types="react" />
import React from 'react';
import { BaseModalProps } from "../../base-modal";
declare const ModalDesktop: React.ForwardRefExoticComponent<BaseModalProps & {
    size?: "s" | "m" | "l" | "xl" | "fullscreen" | undefined;
    fullscreen?: boolean | undefined;
    fixedPosition?: boolean | undefined;
    hasCloser?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>> & {
    Content: React.FC<import("./typings").ContentProps>;
    Header: React.FC<import("./components/header/Component").HeaderProps>;
    Footer: React.FC<import("./components/footer/Component").FooterProps>;
    Closer: React.FC<import("./components/closer/Component").CloserProps>;
};
export { ModalDesktop };
