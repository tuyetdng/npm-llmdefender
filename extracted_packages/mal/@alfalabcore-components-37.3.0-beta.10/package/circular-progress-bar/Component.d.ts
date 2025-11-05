/// <reference types="react" />
import React from 'react';
import { ElementType, ReactNode } from "react";
type CircularProgressBarProps = {
    /**
     * Уровень прогресса, %
     */
    value: number;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Основной текст
     */
    title?: ReactNode;
    /**
     * Цвет контента
     */
    contentColor?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative';
    /**
     * Дополнительный текст
     */
    subtitle?: ReactNode;
    /**
     * Основной текст при 100%
     */
    titleComplete?: ReactNode;
    /**
     * Дополнительный текст при 100%
     */
    subtitleComplete?: ReactNode;
    /**
     * Цвет заполнения
     */
    view?: 'positive' | 'negative';
    /**
     * Размер (xxl — 144×144px, xl — 128×128px, l — 80×80px, m — 64×64px, s — 48×48px, xs — 24×24px)
     */
    size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';
    /**
     * Наличие желоба
     */
    stroke?: boolean;
    /**
     * Заливка при 100%
     */
    fillComplete?: boolean;
    /**
     * Цвет текста при 100%
     */
    completeTextColor?: 'primary' | 'primary-inverted' | 'positive' | 'negative';
    /**
     * Цвет иконки при 100%
     */
    completeIconColor?: 'primary-inverted' | 'positive' | 'negative' | 'tertiary';
    /**
     * Компонент иконки
     */
    icon?: ElementType<{
        className?: string;
    }>;
    /**
     * Компонент иконки при 100%
     */
    iconComplete?: ElementType<{
        className?: string;
    }>;
    /**
     * Направление прогресса (clockwise - по часовой стрелке, counter-clockwise - против часовой стрелки)
     */
    direction?: 'clockwise' | 'counter-clockwise';
    /**
     * Высота компонента, min = 24; max = 144
     * использовать совместно с size :
     * xxl от 144
     * xl  от 128 до 143
     * l   от 80 до 127
     * m   от 64 до 79
     * s   от 48 до 63
     * xs  от 24 до 47
     */
    height?: number;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
/**
 * Компонент круглого прогресс бара.
 */
declare const CircularProgressBar: React.FC<CircularProgressBarProps>;
export { CircularProgressBarProps, CircularProgressBar };
