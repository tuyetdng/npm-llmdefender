/// <reference types="react" />
import React from 'react';
import { ButtonHTMLAttributes, ChangeEvent, InputHTMLAttributes, MouseEvent } from "react";
import { ButtonProps } from "../button";
type AttachProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'multiple' | 'enterKeyHint'> & {
    /**
     * Содержимое кнопки для выбора файла
     */
    buttonContent?: React.ReactNode;
    /**
     * Свойства для кнопки
     */
    buttonProps?: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для блока с файлами
     */
    fileClassName?: string;
    /**
     * Дополнительный класс для блока с подсказкой, когда файл не загружен
     */
    noFileClassName?: string;
    /**
     * Число символов, после которого имя файла будет обрезаться
     */
    maxFilenameLength?: number;
    /**
     * Текст для случая, когда файл не загружен
     */
    noFileText?: string;
    /**
     * Процент выполнения загрузки файла
     */
    progressBarPercent?: number;
    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l';
    /**
     * Возможность прикрепления нескольких файлов
     */
    multiple?: boolean;
    /**
     * Содержимое поля ввода. Принимает массив объектов типа File или null.
     */
    value?: File[] | null;
    /**
     * Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null.
     */
    defaultValue?: File[] | null;
    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        files: File[];
    }) => void;
    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Attach: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "defaultValue" | "onChange" | "value" | "multiple" | "enterKeyHint"> & {
    /**
     * Содержимое кнопки для выбора файла
     */
    buttonContent?: React.ReactNode;
    /**
     * Свойства для кнопки
     */
    buttonProps?: (ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) | undefined;
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для блока с файлами
     */
    fileClassName?: string | undefined;
    /**
     * Дополнительный класс для блока с подсказкой, когда файл не загружен
     */
    noFileClassName?: string | undefined;
    /**
     * Число символов, после которого имя файла будет обрезаться
     */
    maxFilenameLength?: number | undefined;
    /**
     * Текст для случая, когда файл не загружен
     */
    noFileText?: string | undefined;
    /**
     * Процент выполнения загрузки файла
     */
    progressBarPercent?: number | undefined;
    /**
     * Размер компонента
     */
    size?: "xs" | "s" | "m" | "xxs" | "l" | undefined;
    /**
     * Возможность прикрепления нескольких файлов
     */
    multiple?: boolean | undefined;
    /**
     * Содержимое поля ввода. Принимает массив объектов типа File или null.
     */
    value?: File[] | null | undefined;
    /**
     * Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null.
     */
    defaultValue?: File[] | null | undefined;
    /**
     * Обработчик поля ввода
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        files: File[];
    }) => void) | undefined;
    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { AttachProps, Attach };
