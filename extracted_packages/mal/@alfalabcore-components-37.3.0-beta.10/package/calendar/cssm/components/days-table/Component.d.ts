/// <reference types="react" />
import React from 'react';
import { FC, RefCallback } from "react";
import { Day } from "../../typings";
type DaysTableProps = {
    /**
     * Массив-календарь недель
     */
    weeks?: Day[][];
    /**
     * Активный месяц
     */
    activeMonth?: Date;
    /**
     * Начало выделенного периода
     */
    selectedFrom?: Date | number;
    /**
     * Конец выделенного периода
     */
    selectedTo?: Date | number;
    /**
     * Индикатор, что выбран полный период
     */
    rangeComplete?: boolean;
    /**
     * Подсвеченная дата (ховер)
     */
    highlighted?: Date | number;
    /**
     * Доп. пропсы для переданного дня
     */
    getDayProps: (day: Day) => Record<string, unknown> & {
        ref: RefCallback<HTMLTableDataCellElement>;
        onClick: (e: React.MouseEvent<HTMLTableDataCellElement>) => void;
    };
    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean;
    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};
declare const DaysTable: FC<DaysTableProps>;
export { DaysTableProps, DaysTable };
