/// <reference types="react" />
import React from 'react';
import { FC, ReactNode, RefAttributes } from "react";
import { InputProps } from "../input";
type withSuffixProps = InputProps & {
    /**
     * Дополнительный закрепленный текст справа от основного значения.
     * Например: value='85' suffix=' мес' -> 85 мес
     */
    suffix?: ReactNode;
    /**
     * Дополнительный класс для контейнера с суффиксом
     */
    suffixContainerClassName?: string;
};
declare const withSuffix: (Input: FC<InputProps & RefAttributes<HTMLInputElement>>) => React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "defaultValue" | "onChange" | "onClick" | "onMouseDown" | "value" | "enterKeyHint"> & {
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
    onClear?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    onMouseDown?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    onMouseUp?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    dataTestId?: string | undefined;
} & {
    /**
     * Дополнительный закрепленный текст справа от основного значения.
     * Например: value='85' suffix=' мес' -> 85 мес
     */
    suffix?: ReactNode;
    /**
     * Дополнительный класс для контейнера с суффиксом
     */
    suffixContainerClassName?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { withSuffixProps, withSuffix };
