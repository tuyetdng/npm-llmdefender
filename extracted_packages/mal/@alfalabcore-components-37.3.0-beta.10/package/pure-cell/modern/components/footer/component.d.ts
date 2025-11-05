/// <reference types="react" />
import React from 'react';
import { FooterElement } from "../types";
type Props = {
    /**
     * Компоненты
     */
    children: FooterElement;
    /**
     * Вертикальные отступы
     */
    footerPadding?: 'default' | 'none';
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Footer: React.FC<Props>;
export { Footer };
