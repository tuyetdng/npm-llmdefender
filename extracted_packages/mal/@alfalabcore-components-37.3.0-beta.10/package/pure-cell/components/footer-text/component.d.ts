/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
import { Color } from "../../../typography";
type Props = {
    /**
     * Цвет текста
     */
    color?: Color;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const FooterText: React.FC<Props>;
export { Props, FooterText };
