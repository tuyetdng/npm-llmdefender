/// <reference types="react" />
import React from 'react';
import { HTMLAttributes, ReactNode } from "react";
type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Заблокированное состояние
     */
    disabled?: boolean;
    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean;
    /**
     * Заполненное состояние
     */
    filled?: boolean;
    /**
     * Выбранное (фокус) состояние
     */
    focused?: boolean;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Текст подсказки
     */
    hint?: ReactNode;
    /**
     * Лейбл компонента
     */
    label?: ReactNode;
    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Слот под полем
     */
    bottomAddons?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;
    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string;
    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Компонент поля (инпут, textarea и пр.)
     */
    children?: ReactNode;
};
declare const FormControl: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean | undefined;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | "l" | "xl" | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
    /**
     * Заблокированное состояние
     */
    disabled?: boolean | undefined;
    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean | undefined;
    /**
     * Заполненное состояние
     */
    filled?: boolean | undefined;
    /**
     * Выбранное (фокус) состояние
     */
    focused?: boolean | undefined;
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Текст подсказки
     */
    hint?: ReactNode;
    /**
     * Лейбл компонента
     */
    label?: ReactNode;
    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: "inner" | "outer" | undefined;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Слот под полем
     */
    bottomAddons?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string | undefined;
    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string | undefined;
    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Компонент поля (инпут, textarea и пр.)
     */
    children?: ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export { FormControlProps, FormControl };
