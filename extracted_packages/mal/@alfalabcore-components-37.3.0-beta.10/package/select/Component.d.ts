/// <reference types="react" />
import React from 'react';
import { HTMLAttributes, ReactNode } from "react";
import { BaseSelectProps } from "./typings";
type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | "l" | "xl";
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted";
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
    labelView?: "inner" | "outer";
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
type SelectFieldProps = FormControlProps & Record<string, unknown>;
type SelectProps = Omit<BaseSelectProps, 'fieldProps'> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: SelectFieldProps;
};
declare const Select: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "fieldProps"> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: SelectFieldProps | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { SelectFieldProps, SelectProps, Select };
