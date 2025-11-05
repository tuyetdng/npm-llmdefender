/// <reference types="react" />
import React from 'react';
import { HTMLAttributes } from "react";
import { TCell, TCellProps } from "../tcell/index";
type TCellElement = React.ReactElement<TCellProps, typeof TCell>;
type TRowProps = HTMLAttributes<HTMLTableRowElement> & {
    /**
     * Компоненты ячеек
     */
    children: TCellElement | TCellElement[];
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Стиль выбранной строки
     */
    selected?: boolean;
    /**
     * Убирает нижнюю границу
     */
    withoutBorder?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const TRow: ({ children, className, selected, withoutBorder, dataTestId, ...restProps }: TRowProps) => JSX.Element;
export { TRowProps, TRow };
