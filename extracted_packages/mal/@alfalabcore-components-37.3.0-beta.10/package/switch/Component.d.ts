/// <reference types="react" />
import React from 'react';
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
type Align = 'start' | 'center';
type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'hint' | 'onChange' | 'disabled' | 'enterKeyHint'> & {
    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;
    /**
     * Текст подписи к переключателю
     */
    label?: ReactNode;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Переключатель будет отрисован справа от контента
     */
    reversed?: boolean;
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
     * Обработчик переключения компонента
     */
    onChange?: (event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name: InputHTMLAttributes<HTMLInputElement>['name'];
    }) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Switch: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "hint" | "onChange" | "disabled" | "enterKeyHint"> & {
    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean | undefined;
    /**
     * Текст подписи к переключателю
     */
    label?: ReactNode;
    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
    /**
     * Переключатель будет отрисован справа от контента
     */
    reversed?: boolean | undefined;
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
     * Обработчик переключения компонента
     */
    onChange?: ((event?: ChangeEvent<HTMLInputElement>, payload?: {
        checked: boolean;
        name: InputHTMLAttributes<HTMLInputElement>['name'];
    }) => void) | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
} & React.RefAttributes<HTMLLabelElement>>;
export { SwitchProps, Switch };
