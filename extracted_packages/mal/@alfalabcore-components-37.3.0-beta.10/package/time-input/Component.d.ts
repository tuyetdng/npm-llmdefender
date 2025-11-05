/// <reference types="react" />
import React from 'react';
import { ChangeEvent } from "react";
import { InputProps } from "../input";
type TimeInputProps = Omit<InputProps, 'onChange'> & {
    /**
     * Обработчик изменения значения
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        hours: number;
        mins: number;
        value: string;
    }) => void;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: (event: ChangeEvent<HTMLInputElement>, payload: {
        hours: number;
        mins: number;
        value: string;
    }) => void;
};
declare const TimeInput: React.ForwardRefExoticComponent<Omit<InputProps, "onChange"> & {
    /**
     * Обработчик изменения значения
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        hours: number;
        mins: number;
        value: string;
    }) => void) | undefined;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        hours: number;
        mins: number;
        value: string;
    }) => void) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { TimeInputProps, TimeInput };
