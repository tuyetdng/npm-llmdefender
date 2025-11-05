/// <reference types="react" />
import React from 'react';
import { GraphicsElement } from "../types";
type Props = {
    /**
     * Компоненты
     */
    children: GraphicsElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';
};
declare const Graphics: React.FC<Props>;
export { Props, Graphics };
