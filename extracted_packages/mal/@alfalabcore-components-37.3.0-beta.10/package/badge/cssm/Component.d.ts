/// <reference types="react" />
import React from 'react';
type BadgeProps = {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     *  Вид компонента
     */
    view: 'icon' | 'count';
    /**
     * Размер компонента (только для view=icon)
     * //deprecated(используйте height для view=count )
     */
    size?: 's' | 'm' | 'l' | 'xl';
    /**
     *  Видимость белой обводки вокруг иконки
     */
    visibleIconOutline?: boolean;
    /**
     *  Видимость цветной обводки вокруг иконки (только для view=icon)
     */
    visibleColorOutline?: boolean;
    /**
     * Контент компонента
     */
    content?: React.ReactElement | number;
    /**
     * Высота компонента, min = 16; max = 48 (только для view=count)
     */
    height?: number;
    /**
     * Цветовое оформление иконки
     */
    iconColor?: 'positive' | 'attention' | 'link' | 'negative' | 'tertiary' | 'secondary' | 'primary';
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Badge: ({ className, size, view, visibleIconOutline, visibleColorOutline, content, height, iconColor, dataTestId, }: BadgeProps) => JSX.Element;
export { BadgeProps, Badge };
