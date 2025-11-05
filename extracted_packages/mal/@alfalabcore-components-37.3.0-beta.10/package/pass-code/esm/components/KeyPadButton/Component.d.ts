/// <reference types="react" />
import { ReactNode } from 'react';
import { ButtonProps } from "../../../../button";
type KeyPadButtonProps<T> = {
    /**
     * Вид кнопки.
     */
    view: ButtonProps['view'];
    /**
     * Значение.
     */
    children: T;
    /**
     * Дополнительный класс.
     */
    className?: string;
    /**
     * Дополнительный класс кнопки.
     */
    buttonClassName?: string;
    /**
     * Коллбэк нажатия на кнопку.
     */
    onClick?: (payload: T) => void;
};
declare function KeyPadButton<T extends ReactNode>({ children, onClick, className, view, buttonClassName, }: KeyPadButtonProps<T>): JSX.Element;
export { KeyPadButtonProps, KeyPadButton };
