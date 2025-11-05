/// <reference types="react" />
import React from 'react';
import { ChangeEvent, FC, ReactNode } from "react";
import { InputProps } from "../../input";
import { SliderProps } from "../../slider";
type SliderInputProps = Omit<InputProps, 'min' | 'max' | 'step' | 'value' | 'type' | 'onChange' | 'bottomAddons'> & {
    /**
     * Мин. допустимое число
     */
    min?: number;
    /**
     * Макс. допустимое число
     */
    max?: number;
    /**
     * Массив подписей к слайдеру
     */
    steps?: ReactNode[];
    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number;
    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: SliderProps['pips'];
    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: SliderProps['range'];
    /**
     * Значение инпута
     */
    value?: number | string;
    /**
     * Значение слайдера
     */
    sliderValue?: number;
    /**
     * Дополнительная информация в правой части поля
     */
    info?: ReactNode;
    /**
     * Компонент поля ввода
     */
    Input?: FC<Omit<InputProps, 'onChange' | 'value'>>;
    /**
     * Кастомные пропсы для поля ввода
     */
    customInputProps?: Record<string, unknown>;
    /**
     * Класс для инпута
     */
    inputClassName?: string;
    /**
     * Класс для слайдера
     */
    sliderClassName?: string;
    /**
     * Класс для шагов
     */
    stepsClassName?: string;
    /**
     * Обработчик изменения значения через слайдер или поле ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement> | null, payload: {
        value: number | '';
    }) => void;
    /**
     * Обработчик ввода
     */
    onInputChange?: (event: ChangeEvent<HTMLInputElement>, payload: {
        value: number | '';
    }) => void;
    /**
     * Обработчик изменения слайдера
     */
    onSliderChange?: (payload: {
        value: number;
    }) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const SliderInput: React.ForwardRefExoticComponent<Omit<InputProps, "type" | "onChange" | "value" | "step" | "bottomAddons" | "max" | "min"> & {
    /**
     * Мин. допустимое число
     */
    min?: number | undefined;
    /**
     * Макс. допустимое число
     */
    max?: number | undefined;
    /**
     * Массив подписей к слайдеру
     */
    steps?: React.ReactNode[] | undefined;
    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number | undefined;
    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: SliderProps['pips'];
    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: SliderProps['range'];
    /**
     * Значение инпута
     */
    value?: string | number | undefined;
    /**
     * Значение слайдера
     */
    sliderValue?: number | undefined;
    /**
     * Дополнительная информация в правой части поля
     */
    info?: ReactNode;
    /**
     * Компонент поля ввода
     */
    Input?: React.FC<Omit<InputProps, "onChange" | "value">> | undefined;
    /**
     * Кастомные пропсы для поля ввода
     */
    customInputProps?: Record<string, unknown> | undefined;
    /**
     * Класс для инпута
     */
    inputClassName?: string | undefined;
    /**
     * Класс для слайдера
     */
    sliderClassName?: string | undefined;
    /**
     * Класс для шагов
     */
    stepsClassName?: string | undefined;
    /**
     * Обработчик изменения значения через слайдер или поле ввода
     */
    onChange?: ((event: ChangeEvent<HTMLInputElement> | null, payload: {
        value: number | '';
    }) => void) | undefined;
    /**
     * Обработчик ввода
     */
    onInputChange?: ((event: ChangeEvent<HTMLInputElement>, payload: {
        value: number | '';
    }) => void) | undefined;
    /**
     * Обработчик изменения слайдера
     */
    onSliderChange?: ((payload: {
        value: number;
    }) => void) | undefined;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { SliderInputProps, SliderInput };
