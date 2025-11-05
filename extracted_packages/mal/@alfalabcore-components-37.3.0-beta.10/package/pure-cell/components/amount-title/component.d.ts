/// <reference types="react" />
import React from 'react';
import { Color } from "../../../typography";
import { AmountProps as AmountType } from "../typesProps";
type Props = {
    /**
     * Цвет денежного значения
     */
    color?: Color;
} & AmountType;
declare const AmountTitle: React.FC<Props>;
export { AmountTitle };
