/// <reference types="react" />
import React from 'react';
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react";
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onKeyDown' | 'enterKeyHint'> & {
    index: number;
    value: string;
    error: boolean;
    compact?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, payload: {
        index: number;
    }) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>, payload: {
        index: number;
    }) => void;
};
declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onKeyDown" | "enterKeyHint"> & {
    index: number;
    value: string;
    error: boolean;
    compact?: boolean | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>, payload: {
        index: number;
    }) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>, payload: {
        index: number;
    }) => void;
} & React.RefAttributes<HTMLInputElement>>;
export { InputProps, Input };
