/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type Props = {
    /**
     * Наименование категории
     */
    categoryName: string;
    /**
     * Процент категории
     */
    categoryPercent?: number;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Category: React.FC<Props>;
export { Category };
