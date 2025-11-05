/// <reference types="react" />
import React from 'react';
import { Color } from "../../../typography";
import { AmountProps as AmountType } from "../typesProps";
type Props = {
    /**
     * Начертание шрифта денежного значения
     */
    weight?: 'bold' | 'normal';
    /**
     * Размер денежного значения
     */
    textView?: 'component' | 'primary-small';
    /**
     * Цвет денежного значения
     */
    color?: Color;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
} & AmountType;
declare const Amount: React.FC<Props>;
export { Amount };
