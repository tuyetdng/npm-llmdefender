/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type KeyPadProps = {
    /**
     * Показать кнопку "очистить".
     */
    showClear: boolean;
    /**
     * Слот слева.
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа.
     */
    rightAddons?: ReactNode;
    /**
     * Идентификатор для автоматизированного тестирования.
     */
    dataTestId?: string;
    /**
     * Коллбэк нажатия на кнопку.
     */
    onClick: (digit: number) => void;
    /**
     * Коллбэк очистки кода.
     */
    onClear: () => void;
};
declare const KeyPad: React.FC<KeyPadProps>;
export { KeyPadProps, KeyPad };
