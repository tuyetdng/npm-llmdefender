/// <reference types="react" />
import React from 'react';
import { View } from "./typings-bdb4c6b9";
declare const Modal: React.ForwardRefExoticComponent<import("./index-bdb4c6b9").BaseModalProps & {
    size?: "s" | "m" | "l" | "xl" | "fullscreen" | undefined;
    fullscreen?: boolean | undefined;
    fixedPosition?: boolean | undefined;
    hasCloser?: boolean | undefined;
} & {
    view: View;
} & React.RefAttributes<HTMLDivElement>>;
export { Modal };
