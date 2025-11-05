/// <reference types="react" />
import React from 'react';
import { ModalMobileProps } from "./typings";
declare const ModalMobile: React.ForwardRefExoticComponent<ModalMobileProps & React.RefAttributes<HTMLDivElement>> & {
    Content: React.FC<import("./typings").ContentProps>;
    Header: React.FC<import("./components/header/Component").HeaderProps>;
    Footer: React.FC<import("./components/footer/Component").FooterProps>;
    Closer: React.FC<import("./components/closer/Component").CloserProps>;
};
export { ModalMobile };
