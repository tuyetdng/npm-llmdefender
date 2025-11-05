/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type CodeInputProps = {
    /**
     * Количество полей
     */
    fields?: number;
    /**
     * Значение для предзаполнения
     */
    initialValues?: string;
    /**
     * Заблокированное состояние
     */
    disabled?: boolean;
    /**
     * Состояние с ошибкой
     */
    error?: ReactNode;
    /**
     * Дополнительный класс (native prop)
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Флаг - нужно ли очищать код при возникновении ошибки
     * @default true
     */
    clearCodeOnError?: boolean;
    /**
     * Коллбэк вызываемый после окончания проигрывания анимации при возникновении ошибки.
     */
    onErrorAnimationEnd?: () => void;
    /**
     * Коллбек ввода значения
     */
    onChange?: (code: string) => void;
    /**
     * Коллбек полного заполнения
     */
    onComplete?: (code: string) => void;
};
type CustomInputRef = {
    focus: (index?: number) => void;
    blur: () => void;
    reset: () => void;
    unselect: () => void;
};
declare const CodeInput: React.ForwardRefExoticComponent<CodeInputProps & React.RefAttributes<CustomInputRef>>;
export { CodeInputProps, CustomInputRef, CodeInput };
