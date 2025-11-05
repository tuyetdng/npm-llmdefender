/// <reference types="react" />
import React from 'react';
type CollapseProps = {
    /**
     * Состояние компонента
     *
     */
    expanded?: boolean;
    /**
     * Текст ссылки в `expanded` состоянии
     *
     */
    collapsedLabel?: string;
    /**
     * Текст ссылки в `collapsed` состоянии
     *
     */
    expandedLabel?: string;
    /**
     * Дочерние элементы `Collapse`
     */
    children?: React.ReactNode;
    /**
     * Дополнительный класс обертки
     */
    className?: string;
    /**
     * Дополнительный класс для скрываемого контента
     */
    expandedContentClassName?: string;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Начальное состояние uncontrolled компонента
     * @default false
     */
    defaultExpanded?: boolean;
    /**
     * Обработчик смены состояний `expanded/collapsed`
     */
    onExpandedChange?: (expanded: boolean) => void;
    /**
     * Обработчик события завершения анимации
     */
    onTransitionEnd?: (expanded: boolean) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Collapse: React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLDivElement>>;
export { CollapseProps, Collapse };
