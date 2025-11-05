/// <reference types="react" />
import React from 'react';
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';
type RadioProps = Omit<NativeProps, 'size' | 'type' | 'onChange' | 'checked' | 'disabled' | 'name' | 'className' | 'enterKeyHint'> & {
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Текст подписи
     */
    label?: ReactNode;
    /**
     * Размер компонента
     */
    size?: 's' | 'm';
    /**
     * Управление состоянием отмечен/не отмечен
     */
    checked?: boolean;
    /**
     * Управление состоянием включен / выключен
     */
    disabled?: boolean;
    /**
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean;
    /**
     * Html аттрибут name инпута
     */
    name?: string;
    /**
     * Класс компонента
     */
    className?: string;
    /**
     * Доп. класс радио кнопки
     */
    circleClassName?: string;
    /**
     * Доп. класс контента
     */
    contentClassName?: string;
    /**
     * Выравнивание
     */
    align?: Align;
    /**
     * Дополнительный слот
     */
    addons?: React.ReactNode;
    /**
     * Растягивать ли компонент на всю ширину
     */
    block?: boolean;
    /**
     * Обработчик на выбор элемента
     */
    onChange?: (event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name?: string;
    }) => void;
};
declare const Radio: React.ForwardRefExoticComponent<Omit<NativeProps, "size" | "type" | "onChange" | "checked" | "disabled" | "name" | "className" | "enterKeyHint"> & {
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Текст подписи
     */
    label?: ReactNode;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | undefined;
    /**
     * Управление состоянием отмечен/не отмечен
     */
    checked?: boolean | undefined;
    /**
     * Управление состоянием включен / выключен
     */
    disabled?: boolean | undefined;
    /**
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean | undefined;
    /**
     * Html аттрибут name инпута
     */
    name?: string | undefined;
    /**
     * Класс компонента
     */
    className?: string | undefined;
    /**
     * Доп. класс радио кнопки
     */
    circleClassName?: string | undefined;
    /**
     * Доп. класс контента
     */
    contentClassName?: string | undefined;
    /**
     * Выравнивание
     */
    align?: Align | undefined;
    /**
     * Дополнительный слот
     */
    addons?: React.ReactNode;
    /**
     * Растягивать ли компонент на всю ширину
     */
    block?: boolean | undefined;
    /**
     * Обработчик на выбор элемента
     */
    onChange?: ((event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name?: string;
    }) => void) | undefined;
} & React.RefAttributes<HTMLLabelElement>>;
export { RadioProps, Radio };
