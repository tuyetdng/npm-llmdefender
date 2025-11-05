/// <reference types="react" />
import React from 'react';
import { InputHTMLAttributes } from "react";
type PureInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'enterKeyHint'> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Атрибут type
     */
    type?: 'number' | 'card' | 'email' | 'hidden' | 'money' | 'password' | 'tel' | 'text';
    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const PureInput: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "enterKeyHint"> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean | undefined;
    /**
     * Атрибут type
     */
    type?: "number" | "hidden" | "card" | "email" | "money" | "password" | "tel" | "text" | undefined;
    /**
     * Размер компонента
     */
    size?: "s" | "m" | "l" | "xl" | undefined;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { PureInputProps, PureInput };
