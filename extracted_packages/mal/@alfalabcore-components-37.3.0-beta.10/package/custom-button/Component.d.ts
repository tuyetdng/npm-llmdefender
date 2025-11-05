/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { ComponentProps as ButtonComponentProps } from "../button";
type ComponentProps = Omit<ButtonComponentProps, 'view' | 'colors'> & {
    /**
     * Цвет кнопки
     */
    backgroundColor?: string;
    /**
     * Цвет контента
     */
    contentColor?: 'black' | 'white';
    /**
     * Затемнение или осветление кнопки при hover и active
     */
    stateType?: 'darkening' | 'lightening';
};
type AnchorButtonProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;
type CustomButtonProps = Partial<AnchorButtonProps | NativeButtonProps>;
declare const CustomButton: React.ForwardRefExoticComponent<CustomButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export { ComponentProps, CustomButtonProps, CustomButton };
