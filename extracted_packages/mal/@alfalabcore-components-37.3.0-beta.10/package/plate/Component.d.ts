/// <reference types="react" />
import React from 'react';
import { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";
import { ComponentProps as ButtonProps } from "../button";
type PlateProps = {
    /**
     * Управление наличием закрывающего крестика
     */
    hasCloser?: boolean;
    /**
     * Управление наличием стрелки скрытия контента
     */
    foldable?: boolean;
    /**
     * Управление видимостью контента (controlled)
     */
    folded?: boolean;
    /**
     * Начальное состояние контента при foldable={ true }
     */
    defaultFolded?: boolean;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот для субаддонов (слева от крестика)
     */
    subAddons?: ReactNode | Array<ReactElement<ButtonProps>>;
    /**
     * Включить/выключить скругление
     */
    rounded?: boolean;
    /**
     * Включить/Выключить обводку
     */
    border?: boolean;
    /**
     * Включить/выключить тени
     */
    shadow?: boolean;
    /**
     * Включить/выключить ограничение максимальной ширины контента в 560px
     */
    limitContentWidth?: boolean;
    /**
     * Дочерние элементы
     */
    children?: ReactNode;
    /**
     * Заголовок компонента
     */
    title?: ReactNode;
    /**
     * Вид заголовка
     */
    titleView?: 'bold' | 'light';
    /**
     * Вид компонента
     */
    view?: 'common' | 'negative' | 'positive' | 'attention' | 'custom';
    /**
     * Набор действий
     */
    buttons?: ReactNode | Array<ReactElement<ButtonProps>>;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для кнопок
     */
    buttonsClassName?: string;
    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;
    /**
     * Дополнительный класс для субаддонов
     */
    subAddonsClassName?: string;
    /**
     * Обработчик клика по плашке
     */
    onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
    /**
     * Обработчик клика по крестику
     */
    onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Обработчик сворачивания
     */
    onToggle?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, payload: {
        folded: boolean;
    }) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Количество строк (не поддерживает IE)
     */
    rowLimit?: 1 | 2 | 3;
};
declare const Plate: React.ForwardRefExoticComponent<PlateProps & React.RefAttributes<HTMLDivElement>>;
export { PlateProps, Plate };
