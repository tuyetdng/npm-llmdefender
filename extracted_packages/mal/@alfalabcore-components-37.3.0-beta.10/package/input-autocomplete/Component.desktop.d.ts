/// <reference types="react" />
import React from 'react';
import { ChangeEvent, FC, RefAttributes } from "react";
import { InputProps } from "../input";
import { BaseSelectProps } from "../select";
type InputAutocompleteDesktopProps = Omit<BaseSelectProps, 'Field' | 'nativeSelect'> & {
    /**
     * Компонент ввода значения
     */
    Input?: FC<InputProps & RefAttributes<HTMLInputElement>>;
    /**
     * Пропсы, которые будут прокинуты в инпут
     */
    inputProps?: InputProps & Record<string, unknown>;
    /**
     * Значение поля ввода
     */
    value?: string;
    /**
     * Поле доступно только для чтения
     */
    readOnly?: InputProps['readOnly'];
    /**
     * Отображение иконки успеха
     */
    success?: boolean;
    /**
     * Обработчик ввода
     */
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: BaseSelectProps['updatePopover'];
};
declare const InputAutocompleteDesktop: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "nativeSelect" | "Field"> & {
    /**
     * Компонент ввода значения
     */
    Input?: React.FC<Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onClick" | "value" | "onMouseDown" | "defaultValue" | "onChange" | "size" | "enterKeyHint"> & {
        value?: string | undefined;
        defaultValue?: string | undefined;
        block?: boolean | undefined;
        clear?: boolean | undefined;
        size?: "s" | "m" | "l" | "xl" | undefined;
        colors?: "default" | "inverted" | undefined;
        error?: React.ReactNode;
        success?: boolean | undefined;
        hint?: React.ReactNode;
        label?: React.ReactNode;
        labelView?: "inner" | "outer" | undefined;
        type?: "number" | "text" | "tel" | "email" | "password" | "card" | "money" | undefined;
        wrapperRef?: React.Ref<HTMLDivElement> | undefined;
        leftAddons?: React.ReactNode;
        rightAddons?: React.ReactNode;
        bottomAddons?: React.ReactNode;
        className?: string | undefined;
        fieldClassName?: string | undefined;
        inputClassName?: string | undefined;
        labelClassName?: string | undefined;
        addonsClassName?: string | undefined;
        focusedClassName?: string | undefined;
        filledClassName?: string | undefined;
        onChange?: ((event: React.ChangeEvent<HTMLInputElement>, payload: {
            value: string;
        }) => void) | undefined;
        onClear?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
        onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        onMouseDown?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        onMouseUp?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        dataTestId?: string | undefined;
    } & React.RefAttributes<HTMLInputElement>> | undefined;
    /**
     * Пропсы, которые будут прокинуты в инпут
     */
    inputProps?: (Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onClick" | "value" | "onMouseDown" | "defaultValue" | "onChange" | "size" | "enterKeyHint"> & {
        value?: string | undefined;
        defaultValue?: string | undefined;
        block?: boolean | undefined;
        clear?: boolean | undefined;
        size?: "s" | "m" | "l" | "xl" | undefined;
        colors?: "default" | "inverted" | undefined;
        error?: React.ReactNode;
        success?: boolean | undefined;
        hint?: React.ReactNode;
        label?: React.ReactNode;
        labelView?: "inner" | "outer" | undefined;
        type?: "number" | "text" | "tel" | "email" | "password" | "card" | "money" | undefined;
        wrapperRef?: React.Ref<HTMLDivElement> | undefined;
        leftAddons?: React.ReactNode;
        rightAddons?: React.ReactNode;
        bottomAddons?: React.ReactNode;
        className?: string | undefined;
        fieldClassName?: string | undefined;
        inputClassName?: string | undefined;
        labelClassName?: string | undefined;
        addonsClassName?: string | undefined;
        focusedClassName?: string | undefined;
        filledClassName?: string | undefined;
        onChange?: ((event: React.ChangeEvent<HTMLInputElement>, payload: {
            value: string;
        }) => void) | undefined;
        onClear?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
        onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        onMouseDown?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        onMouseUp?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        dataTestId?: string | undefined;
    } & Record<string, unknown>) | undefined;
    /**
     * Значение поля ввода
     */
    value?: string | undefined;
    /**
     * Поле доступно только для чтения
     */
    readOnly?: InputProps['readOnly'];
    /**
     * Отображение иконки успеха
     */
    success?: boolean | undefined;
    /**
     * Обработчик ввода
     */
    onInput?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: BaseSelectProps['updatePopover'];
} & React.RefAttributes<HTMLInputElement>>;
export { InputAutocompleteDesktopProps, InputAutocompleteDesktop };
