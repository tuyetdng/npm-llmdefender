/// <reference types="react" />
import React from 'react';
import { TPatternLockInstance } from 'react-canvas-pattern-lock';
declare const PatternLock: React.ForwardRefExoticComponent<{
    className?: string | undefined;
    error?: React.ReactNode;
    dataTestId?: string | undefined;
    observeTokens?: boolean | undefined;
    observerParams?: {
        getTarget?: (() => Node) | undefined;
        options?: MutationObserverInit | undefined;
    } | undefined;
} & Omit<import("react-canvas-pattern-lock").ReactPatternLockProps, "theme" | "width" | "height" | "rows" | "cols"> & React.RefAttributes<TPatternLockInstance>>;
export { PatternLock };
