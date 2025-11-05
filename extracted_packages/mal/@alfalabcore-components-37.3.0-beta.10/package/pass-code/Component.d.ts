/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type BasePassCodeProps = {
    /**
     * Код.
     */
    value: string;
    /**
     * Обработчик изменения кода.
     */
    onChange: (code: string) => void;
    /**
     * Дополнительный класс.
     */
    className?: string;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Слот слева.
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа.
     */
    rightAddons?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
};
type PropsWithUnknownLen = {
    codeLength?: never;
    /**
     * Максимально возможная длина кода.
     * @default 10
     */
    maxCodeLength?: number;
};
type PropsWithLen = {
    maxCodeLength?: never;
    /**
     * Длина кода.
     */
    codeLength?: number;
};
type PassCodeProps = BasePassCodeProps & (PropsWithLen | PropsWithUnknownLen);
declare const PassCode: React.ForwardRefExoticComponent<PassCodeProps & React.RefAttributes<HTMLDivElement>>;
export { BasePassCodeProps, PassCode };
