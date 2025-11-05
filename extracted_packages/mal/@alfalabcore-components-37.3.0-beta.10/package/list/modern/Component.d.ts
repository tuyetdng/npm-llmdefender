/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type ListProps = {
    /**
     * HTML тег
     * @default 'ul'
     */
    tag?: 'ul' | 'ol';
    /**
     * Маркер
     * @default '—' for ul and 'decimal' for ol
     */
    marker?: 'lower-alpha' | 'decimal' | string | ReactNode;
    /**
     * Css-класс для стилизации
     */
    className?: string;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
} & Omit<React.OlHTMLAttributes<HTMLOListElement>, 'type'>;
declare const List: React.FC<ListProps>;
export { ListProps, List };
