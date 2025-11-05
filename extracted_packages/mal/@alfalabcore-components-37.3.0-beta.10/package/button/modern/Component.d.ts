/// <reference types="react" />
import React from 'react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from "react";
type ComponentProps = {
    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'filled' | 'transparent' | 'link' | 'ghost';
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;
    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Показать лоадер
     */
    loading?: boolean;
    /**
     * Не переносить текст кнопки на новую строку
     */
    nowrap?: boolean;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
type AnchorButtonProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps = Partial<AnchorButtonProps | NativeButtonProps>;
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
declare const LOADER_MIN_DISPLAY_INTERVAL = 500;
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export { ComponentProps, AnchorButtonProps, NativeButtonProps, ButtonProps, LOADER_MIN_DISPLAY_INTERVAL, Button };
