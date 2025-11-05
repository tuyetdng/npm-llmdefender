/// <reference types="react" />
import React from 'react';
import { View } from "./typings";
declare const Modal: React.ForwardRefExoticComponent<import("../base-modal").BaseModalProps & {
    size?: "s" | "m" | "l" | "xl" | "fullscreen" | undefined;
    fullscreen?: boolean | undefined;
    fixedPosition?: boolean | undefined;
    hasCloser?: boolean | undefined;
} & {
    view: View;
} & React.RefAttributes<HTMLDivElement>>;
export { Modal };
