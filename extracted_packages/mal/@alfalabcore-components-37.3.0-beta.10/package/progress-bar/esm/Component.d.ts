/// <reference types="react" />
import React from 'react';
type ProgressBarProps = {
    /**
     * Значение заполненной части 0-100
     */
    value: number;
    /**
     * Css-класс для стилизации
     */
    className?: string;
    /**
     * Цвет заполнения
     */
    view?: 'positive' | 'negative' | 'attention' | 'link' | 'tertiary' | 'secondary' | 'primary' | 'accent';
    /**
     * Размер компонента
     */
    size?: 's' | 'm';
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
};
declare const ProgressBar: React.ForwardRefExoticComponent<ProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export { ProgressBarProps, ProgressBar };
