/// <reference types="react" />
import React from 'react';
import { AddonElement } from "../types";
type Props = {
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';
    /**
     * Горизонтальные отступы
     */
    addonPadding?: 'default' | 'none';
    /**
     * Компоненты
     */
    children: AddonElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Addon: React.FC<Props>;
export { Addon };
