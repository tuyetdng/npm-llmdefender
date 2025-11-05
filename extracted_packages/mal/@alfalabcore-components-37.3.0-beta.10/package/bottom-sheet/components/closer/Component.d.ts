/// <reference types="react" />
import React from 'react';
import { ButtonHTMLAttributes, ElementType } from "react";
import { IconButtonProps } from "../../../icon-button";
type CloserProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Размер кнопки
     */
    size?: IconButtonProps['size'];
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Иконка
     */
    icon?: ElementType;
};
declare const Closer: React.FC<CloserProps>;
export { CloserProps, Closer };
