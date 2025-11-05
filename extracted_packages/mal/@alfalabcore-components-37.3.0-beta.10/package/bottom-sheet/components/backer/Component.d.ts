/// <reference types="react" />
import React from 'react';
import { ButtonHTMLAttributes, ElementType } from "react";
import { IconButtonProps } from "../../../icon-button";
type BackerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Размер кнопки
     */
    size?: IconButtonProps['size'];
    /**
     * Иконка
     */
    icon?: ElementType;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Обработчик нажатия
     */
    onClick?: () => void;
};
declare const Backer: React.FC<BackerProps>;
export { BackerProps, Backer };
