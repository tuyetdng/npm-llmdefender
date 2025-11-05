/// <reference types="react" />
import React from "react";
import { ReactNode } from "react";
import { MainElement, ContentElement } from "./components/types";
import { Color } from "../../typography";
type Props = {
    /**
     * Компоненты
     */
    children: MainElement;
    /**
     * Позволяет изменить расположение блоков внутри main
     */
    isReverse?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Main: React.FC<Props>;
type Props$0 = {
    /**
     * Компоненты
     */
    children: ContentElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Content: React.FC<Props$0>;
type Props$1 = {
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Количество строк
     */
    rowLimit?: 1 | 2;
    /**
     * Размер текста
     */
    view: 'primary-small' | 'component';
    /**
     * Цвет title
     */
    titleColor: Color;
    /**
     * Value ячейки
     */
    value?: ReactNode;
    /**
     * Цвет value
     */
    valueColor?: Color;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Text: React.FC<Props$1>;
export { Main, Content, Text };
