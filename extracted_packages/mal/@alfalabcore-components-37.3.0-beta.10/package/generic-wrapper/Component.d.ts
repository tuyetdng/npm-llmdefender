/// <reference types="react" />
import { ReactNode } from 'react';
import { GapProps } from "../gap";
type ReducedGapType = Omit<GapProps['size'], '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'>;
type PaddingPropType = {
    top?: ReducedGapType;
    right?: ReducedGapType;
    bottom?: ReducedGapType;
    left?: ReducedGapType;
};
type GenericWrapperProps = {
    /**
     * Дочерние элементы.
     */
    children: ReactNode;
    /**
     * Свойство управляет направлением основной оси внутри флекс-контейнера
     */
    column?: boolean;
    /**
     * Внутренние отступы
     */
    padding?: PaddingPropType;
    /**
     * Свойство для выравнивания элементов внутри контейнера по поперечной оси.
     */
    alignItems?: 'stretch' | 'end' | 'start' | 'center' | 'baseline';
    /**
     * Свойство выравнивает флекс-элементы внутри флекс-контейнера по основной оси.
     */
    justifyContent?: 'between' | 'around' | 'evenly' | 'center' | 'start' | 'end';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Позволяет заполнить всё доступное пространство родительского элемента.
     */
    grow?: boolean;
};
declare const GenericWrapper: ({ children, padding, alignItems, justifyContent, className, dataTestId, column, grow, }: GenericWrapperProps) => JSX.Element;
export { ReducedGapType, PaddingPropType, GenericWrapperProps, GenericWrapper };
