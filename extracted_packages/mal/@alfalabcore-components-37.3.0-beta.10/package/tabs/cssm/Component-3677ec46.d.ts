/// <reference types="react" />
import React from 'react';
import { FC, SVGProps } from "react";
import { ButtonProps } from "./index-ebda875c";
import { BaseSelectProps } from "./index-3e68f8db";
type PickerButtonSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
type PickerButtonVariant = 'default' | 'compact';
type PickerButtonDesktopProps = Omit<BaseSelectProps, 'Field' | 'placeholder' | 'Arrow' | 'autocomplete' | 'size' | 'onFocus' | 'selected' | 'closeOnSelect' | 'multiple' | 'fieldProps' | 'hint' | 'allowUnselect' | 'options'> & Pick<ButtonProps, 'view' | 'loading' | 'leftAddons' | 'rightAddons'> & {
    options: Array<BaseSelectProps['options'][0] & {
        /**
         * Иконка, отображающаяся слева от текстового представления пункта
         */
        icon?: FC<SVGProps<SVGSVGElement>>;
    }>;
    /**
     * Размер кнопки
     */
    size?: PickerButtonSize;
    /**
     * Тип кнопки
     */
    variant?: PickerButtonVariant;
    /**
     * Показывать стрелку
     * @default true
     */
    showArrow?: boolean;
};
declare const PickerButtonDesktop: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "placeholder" | "onFocus" | "size" | "selected" | "multiple" | "hint" | "options" | "autocomplete" | "allowUnselect" | "closeOnSelect" | "fieldProps" | "Arrow" | "Field"> & Pick<ButtonProps, "rightAddons" | "leftAddons" | "view" | "loading"> & {
    options: Array<BaseSelectProps['options'][0] & {
        /**
         * Иконка, отображающаяся слева от текстового представления пункта
         */
        icon?: FC<SVGProps<SVGSVGElement>>;
    }>;
    /**
     * Размер кнопки
     */
    size?: PickerButtonSize | undefined;
    /**
     * Тип кнопки
     */
    variant?: PickerButtonVariant | undefined;
    /**
     * Показывать стрелку
     * @default true
     */
    showArrow?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { PickerButtonSize, PickerButtonVariant, PickerButtonDesktopProps, PickerButtonDesktop };
