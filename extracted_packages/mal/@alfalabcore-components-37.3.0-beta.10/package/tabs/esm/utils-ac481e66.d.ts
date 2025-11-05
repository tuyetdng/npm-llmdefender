import { ReactNode, RefObject } from 'react';
import { BaseSelectProps, GroupShape, OptionShape } from "./typings-ac481e66";
declare const isGroup: (item: OptionShape | GroupShape) => item is GroupShape;
declare const isOptionShape: (item: OptionShape | string | null) => item is OptionShape;
declare const joinOptions: ({ selected, selectedMultiple, }: {
    selected?: OptionShape | undefined;
    selectedMultiple?: OptionShape[] | undefined;
}) => ReactNode[] | null;
declare function processOptions(options: BaseSelectProps['options'], selected?: BaseSelectProps['selected']): {
    flatOptions: OptionShape[];
    selectedOptions: OptionShape[];
};
declare const getFilteredOptions: (options: Array<OptionShape | GroupShape>, filterValue: string, filterFunction: (options: Array<OptionShape | GroupShape>, filterValue: string) => Array<OptionShape | GroupShape>) => Array<OptionShape | GroupShape>;
type useVisibleOptionsArgs = {
    /**
     * Количество видимых пунктов
     */
    visibleOptions: number;
    /**
     * Реф на контейнер с пунтами меню
     */
    listRef: RefObject<HTMLElement>;
    /**
     * Реф на контейнер, которому нужно установить высоту
     */
    styleTargetRef?: RefObject<HTMLElement>;
    /**
     * Флаг открытия меню
     */
    open?: boolean;
    /**
     * Позволяет вызвать пересчет высоты
     */
    invalidate?: unknown;
};
declare function useVisibleOptions({ visibleOptions, listRef, styleTargetRef, open, invalidate, }: useVisibleOptionsArgs): void;
declare function usePrevious<T>(value: T): T | undefined;
declare const lastIndexOf: <T>(array: T[], predicate: (item: T) => boolean) => number;
export { isGroup, isOptionShape, joinOptions, processOptions, getFilteredOptions, useVisibleOptions, usePrevious, lastIndexOf };
