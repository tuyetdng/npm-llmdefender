import { FC } from 'react';
type SubRange = number | [number] | [number, number];
type RangeOptions = {
    min: SubRange;
    max: SubRange;
    [key: string]: SubRange;
};
type PipsType = -1 | 0 | 1 | 2;
type Pips = {
    mode: 'range' | 'steps' | 'positions' | 'count' | 'values';
    values: number | number[];
    filter?: (value: number, type: PipsType) => PipsType;
    format?: {
        to: (value: number) => string | number;
        from?: (value: string) => number | false;
    };
    stepped?: boolean;
};
type SliderProps = {
    /**
     * Мин. допустимое число
     */
    min?: number;
    /**
     * Макс. допустимое число
     */
    max?: number;
    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number;
    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: Pips;
    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: RangeOptions;
    /**
     * Значение инпута
     */
    value?: number;
    /**
     * Заблокированное состояние
     */
    disabled?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Размер
     */
    size?: 's' | 'm';
    /**
     * Обработчик поля ввода
     */
    onChange?: (payload: {
        value: number;
    }) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Slider: FC<SliderProps>;
export { SliderProps, Slider };
