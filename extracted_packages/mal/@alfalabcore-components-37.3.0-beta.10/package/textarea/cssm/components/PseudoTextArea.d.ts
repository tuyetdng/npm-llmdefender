/// <reference types="react" />
import React from 'react';
import { TextareaIncomeProps } from "../typings";
declare const PseudoTextArea: React.ForwardRefExoticComponent<{
    /**
     * Дополнительный класс компонента
     */
    pseudoTextareaClassName?: string | undefined;
    /**
     * Значение PseudoTextArea, разделяется на 2 части по maxLength
     */
    value: string;
    /**
     * Максимальное количество символов, символы свыше maxLength будут выделены
     */
    maxLength: number;
} & Pick<TextareaIncomeProps, "size"> & React.RefAttributes<HTMLDivElement>>;
export { PseudoTextArea };
