/// <reference types="react" />
import React from 'react';
import { ChangeEvent, InputHTMLAttributes, MouseEvent, ReactNode } from "react";
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onMouseDown' | 'enterKeyHint'> & {
    /**
     * Значение поля ввода
     */
    value?: string;
    /**
     * Начальное значение поля
     */
    defaultValue?: string;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Крестик для очистки поля
     */
    clear?: boolean;
    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Отображение иконки успеха
     */
    success?: boolean;
    /**
     * Текст подсказки
     */
    hint?: ReactNode;
    /**
     * Лейбл компонента
     */
    label?: React.ReactNode;
    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';
    /**
     * Атрибут type
     */
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text';
    /**
     * Ref для обертки input
     */
    wrapperRef?: React.Ref<HTMLDivElement>;
    /**
     * Слот слева
     */
    leftAddons?: React.ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: React.ReactNode;
    /**
     * Слот под инпутом
     */
    bottomAddons?: React.ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;
    /**
     * Дополнительный класс инпута
     */
    inputClassName?: string;
    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string;
    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string;
    /**
     * Класс, который будет установлен при фокусе
     */
    focusedClassName?: string;
    /**
     * Класс, который будет установлен, если в поле есть значение
     */
    filledClassName?: string;
    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        value: string;
    }) => void;
    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Обработчик клика по полю
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Обработчик MouseDown по полю
     */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Обработчик MouseUp по полю
     */
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "defaultValue" | "onChange" | "onClick" | "onMouseDown" | "value" | "enterKeyHint"> & {
    /**
     * Значение поля ввода
     */
    value?: string | undefined;
    /**
     * Начальное значение поля
     */
    defaultValue?: string | undefined;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean | undefined;
    /**
     * Крестик для очистки поля
     */
    clear?: boolean | undefined;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | "l" | "xl" | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Отображение иконки успеха
     */
    success?: boolean | undefined;
    /**
     * Текст подсказки
     */
    hint?: ReactNode;
    /**
     * Лейбл компонента
     */
    label?: React.ReactNode;
    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: "inner" | "outer" | undefined;
    /**
     * Атрибут type
     */
    type?: "number" | "text" | "tel" | "email" | "card" | "money" | "password" | undefined;
    /**
     * Ref для обертки input
     */
    wrapperRef?: React.Ref<HTMLDivElement> | undefined;
    /**
     * Слот слева
     */
    leftAddons?: React.ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: React.ReactNode;
    /**
     * Слот под инпутом
     */
    bottomAddons?: React.ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string | undefined;
    /**
     * Дополнительный класс инпута
     */
    inputClassName?: string | undefined;
    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string | undefined;
    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string | undefined;
    /**
     * Класс, который будет установлен при фокусе
     */
    focusedClassName?: string | undefined;
    /**
     * Класс, который будет установлен, если в поле есть значение
     */
    filledClassName?: string | undefined;
    /**
     * Обработчик поля ввода
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        value: string;
    }) => void) | undefined;
    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
    /**
     * Обработчик клика по полю
     */
    onClick?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
    /**
     * Обработчик MouseDown по полю
     */
    onMouseDown?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
    /**
     * Обработчик MouseUp по полю
     */
    onMouseUp?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { InputProps, Input };
