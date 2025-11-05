/// <reference types="react" />
import React from "react";
import { ReactNode } from "react";
import { FormControlProps } from "./Component-e67996e9";
import { BaseSelectProps, OptionProps, OptionShape } from "./typings-ac481e66";
type SelectFieldProps = FormControlProps & Record<string, unknown>;
type SelectProps = Omit<BaseSelectProps, "fieldProps"> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: SelectFieldProps;
};
declare const Select: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "fieldProps"> & {
    fieldProps?: SelectFieldProps | undefined;
} & React.RefAttributes<HTMLDivElement>>;
// eslint-disable-next-line @typescript-eslint/naming-convention
type useSelectWithLoadingProps = {
    loading?: boolean;
    visibleOptions?: BaseSelectProps["visibleOptions"];
    Option?: React.FC<OptionProps>;
};
declare function useSelectWithLoading({ loading, visibleOptions, Option }: useSelectWithLoadingProps): {
    Option: (props: OptionProps) => JSX.Element;
    options: OptionShape[];
} | null;
type OptionsFetcherResponse = {
    options: OptionShape[];
    hasMore: boolean;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
type useLazyLoadingProps = {
    /** Количество элементов на "странице" */
    limit?: number;
    /** Начальный номер "страницы" */
    initialOffset?: number;
    /** Скелетон загружаемых элементов */
    skeleton?: React.ReactNode;
    /** Компонент пункта меню */
    Option?: React.FC<OptionProps>;
    /**
     * Функция-загрузчик опций.
     * @param offset - текущая страница
     * @param limit - количество элементов на странице
     * @param queryString - строчные данные, пробрасываемые для поиска из кастомного инпута, расположенного в заголовке OptionsList
     * @returns Promise<{
     *  options - список опций следующей "страницы". Они аппендятся к предыдущим
     *  hasMore - указывает, есть ли еще незагруженные элементы (в случае false перестает загружать "следующую страницу")
     * }>
     */
    optionsFetcher(offset: number, limit: number, queryString?: string): Promise<OptionsFetcherResponse>;
};
declare function useLazyLoading({ limit, initialOffset, optionsFetcher, skeleton, Option }: useLazyLoadingProps): {
    optionsProps: {
        Option: (props: OptionProps) => JSX.Element;
        options: OptionShape[];
        optionsListProps: {
            ref: React.RefObject<HTMLDivElement>;
            inputProps: {
                onChange: (event: React.ChangeEvent<HTMLInputElement>, payload: {
                    value: string;
                }) => void;
                value: string;
            };
        };
        onOpen: (payload: {
            open?: boolean;
        }) => void;
    };
    reset: () => void;
};
type SkeletonProps = {
    /**
     * Флаг, явно задающий состояние, при котором контент закрывается прелоадером
     */
    visible?: boolean;
    /**
     * Флаг явного включения анимации скелета
     */
    animate?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const Skeleton: React.FC<SkeletonProps>;
export { SelectFieldProps, SelectProps, Select, useSelectWithLoading, useLazyLoading, SkeletonProps, Skeleton };
export * from "./hook-edac5428";
export * from "./index-48646db0";
export * from "./typings-ac481e66";
export * from "./utils-ac481e66";
