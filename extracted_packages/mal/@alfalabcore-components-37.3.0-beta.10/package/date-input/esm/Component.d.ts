/// <reference types="react" />
import React from 'react';
import { ChangeEvent } from "react";
import { InputProps } from "../../input";
type DateInputProps = Omit<InputProps, 'onChange'> & {
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: 'input' | 'native';
    /**
     * Обработчик изменения значения
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        date: Date;
        value: string;
    }) => void;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: (event: ChangeEvent<HTMLInputElement>, payload: {
        date: Date;
        value: string;
    }) => void;
};
declare const DateInput: React.ForwardRefExoticComponent<Omit<InputProps, "onChange"> & {
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: "input" | "native" | undefined;
    /**
     * Обработчик изменения значения
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        date: Date;
        value: string;
    }) => void) | undefined;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        date: Date;
        value: string;
    }) => void) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { DateInputProps, DateInput };
