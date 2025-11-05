/// <reference types="react" />
import React from 'react';
import { ReactNode, TableHTMLAttributes } from "react";
type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    /**
     * Компактный вид
     */
    compactView?: boolean;
    /**
     * Уменьшение горизонтальных паддингов
     */
    compactHorizontal?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дочерние компоненты
     */
    children: React.ReactElement | React.ReactElement[];
    /**
     * Оборачивает таблицу в стилизованный контейнер
     */
    wrapper?: boolean;
    /**
     * Слот для пагинации
     */
    pagination?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Если true то заголовок будет фиксироваться при скроле
     */
    stickyHeader?: boolean;
};
declare const Table: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & {
    /**
     * Компактный вид
     */
    compactView?: boolean | undefined;
    /**
     * Уменьшение горизонтальных паддингов
     */
    compactHorizontal?: boolean | undefined;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дочерние компоненты
     */
    children: React.ReactElement | React.ReactElement[];
    /**
     * Оборачивает таблицу в стилизованный контейнер
     */
    wrapper?: boolean | undefined;
    /**
     * Слот для пагинации
     */
    pagination?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Если true то заголовок будет фиксироваться при скроле
     */
    stickyHeader?: boolean | undefined;
} & React.RefAttributes<HTMLTableElement>>;
export { TableProps, Table };
