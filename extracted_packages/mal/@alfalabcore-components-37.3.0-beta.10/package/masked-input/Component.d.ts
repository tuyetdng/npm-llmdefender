/// <reference types="react" />
import React from 'react';
import { InputProps } from "../input";
type Mask = Array<string | RegExp>;
type TextMaskConfig = {
    currentCaretPosition: number;
    rawValue: string;
    previousConformedValue: string;
    mask?: Mask | ((rawValue: string) => Mask);
    guide?: boolean;
    showMask?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    pipe?: (conformedValue: string, config: TextMaskConfig) => false | string | {
        value: string;
        indexesOfPipedChars: number[];
    };
};
type MaskedInputProps = InputProps & {
    /**
     * Маска для поля ввода
     * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask-array
     */
    mask?: TextMaskConfig['mask'];
    /**
     * Управляет поведением компонента при удалении символов
     */
    keepCharPositions?: TextMaskConfig['keepCharPositions'];
    /**
     * Дает возможность изменить значение поля перед рендером
     */
    onBeforeDisplay?: TextMaskConfig['pipe'];
};
declare const PLACEHOLDER_CHAR = "\u2000";
declare const MaskedInput: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "defaultValue" | "onChange" | "onClick" | "onMouseDown" | "value" | "enterKeyHint"> & {
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
    type?: "number" | "text" | "tel" | "email" | "card" | "money" | "password" | undefined;
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
    onClear?: ((event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined;
    onClick?: ((event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void) | undefined;
    onMouseDown?: ((event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void) | undefined;
    onMouseUp?: ((event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void) | undefined;
    dataTestId?: string | undefined;
} & {
    /**
     * Маска для поля ввода
     * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask-array
     */
    mask?: TextMaskConfig['mask'];
    /**
     * Управляет поведением компонента при удалении символов
     */
    keepCharPositions?: TextMaskConfig['keepCharPositions'];
    /**
     * Дает возможность изменить значение поля перед рендером
     */
    onBeforeDisplay?: TextMaskConfig['pipe'];
} & React.RefAttributes<HTMLInputElement>>;
export { MaskedInputProps, PLACEHOLDER_CHAR, MaskedInput };
