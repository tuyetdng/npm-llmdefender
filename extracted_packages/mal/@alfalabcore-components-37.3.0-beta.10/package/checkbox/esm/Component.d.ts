/// <reference types="react" />
import React from 'react';
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';
type CheckboxProps = Omit<NativeProps, 'size' | 'onChange' | 'enterKeyHint'> & {
    /**
     * Управление состоянием вкл/выкл чекбокса (native prop)
     */
    checked?: boolean;
    /**
     * Обработчик переключения чекбокса
     */
    onChange?: (event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name?: string;
    }) => void;
    /**
     * Текст подписи к чекбоксу
     */
    label?: ReactNode;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Размер компонента
     */
    size?: 's' | 'm';
    /**
     * Доп. класс чекбокса
     */
    boxClassName?: string;
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
     * Управление состоянием включен / выключен
     */
    disabled?: boolean;
    /**
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
};
declare const Checkbox: React.ForwardRefExoticComponent<Omit<NativeProps, "size" | "onChange" | "enterKeyHint"> & {
    /**
     * Управление состоянием вкл/выкл чекбокса (native prop)
     */
    checked?: boolean | undefined;
    /**
     * Обработчик переключения чекбокса
     */
    onChange?: ((event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name?: string;
    }) => void) | undefined;
    /**
     * Текст подписи к чекбоксу
     */
    label?: ReactNode;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | undefined;
    /**
     * Доп. класс чекбокса
     */
    boxClassName?: string | undefined;
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
     * Управление состоянием включен / выключен
     */
    disabled?: boolean | undefined;
    /**
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean | undefined;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
} & React.RefAttributes<HTMLLabelElement>>;
export { CheckboxProps, Checkbox };
