/// <reference types="react" />
import React from 'react';
import { SelectHTMLAttributes } from "react";
import { GroupShape, OptionShape } from "../../typings";
type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    /**
     * Список вариантов выбора
     */
    options: Array<OptionShape | GroupShape>;
    /**
     * Значение селекта
     */
    value: string | string[];
};
declare const NativeSelect: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & {
    /**
     * Список вариантов выбора
     */
    options: Array<OptionShape | GroupShape>;
    /**
     * Значение селекта
     */
    value: string | string[];
} & React.RefAttributes<HTMLSelectElement>>;
export { NativeSelectProps, NativeSelect };
