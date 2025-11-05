/// <reference types="react" />
import { FC, ReactNode } from "react";
/**
 * Набор констант для z-index соответствующих классов компонентов.
 * Значения выбраны по приоритету.
 */
declare const stackingOrder: {
    FOCUSED: number;
    DEFAULT: number;
    POPOVER: number;
    MODAL: number;
    TOAST: number;
};
declare const StackingContext: import("react").Context<number>;
type StackProps = {
    /**
     * Render prop, в который передается функция.
     * Функция принимает аргумент со значением z-index из текущего контекста.
     */
    children: (value: number) => ReactNode;
    /**
     * Исходное значение для z-index.
     * @default 5
     */
    value?: number;
};
declare const Stack: FC<StackProps>;
export { stackingOrder, StackingContext, StackProps, Stack };
