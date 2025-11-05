/// <reference types="react" />
import React from 'react';
import { MouseEvent, ReactNode } from "react";
type FilterTagProps = {
    /**
     * Состояние выбора
     */
    checked?: boolean;
    /**
     * Состояние открытия
     */
    open?: boolean;
    /**
     * Состояние блокировки
     */
    disabled?: boolean;
    /**
     * Обработчик клика
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Обработчик очистки
     */
    onClear?: () => void;
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's';
    /**
     * Вариант тега
     */
    variant?: 'default' | 'alt';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Показывать крестик для очистки выбора
     */
    showClear?: boolean;
};
declare const FilterTag: React.ForwardRefExoticComponent<FilterTagProps & React.RefAttributes<HTMLDivElement>>;
export { FilterTagProps, FilterTag };
