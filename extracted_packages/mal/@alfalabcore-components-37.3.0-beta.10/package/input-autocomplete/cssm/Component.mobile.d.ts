/// <reference types="react" />
import React from 'react';
import { ChangeEvent, ElementType } from "react";
import { BottomSheetProps } from "./index-7ca84eff";
import { ButtonProps } from "../../button";
import { BaseSelectChangePayload, BaseSelectProps } from "../../select";
type InputAutocompleteMobileProps = Omit<BaseSelectProps, 'OptionsList' | 'Checkmark' | 'onScroll' | 'nativeSelect' | 'autocomplete' | 'valueRenderer'> & {
    /**
     * Обработчик выбора
     */
    onChange: (payload: string | BaseSelectChangePayload) => void;
    /**
     * Обработчик ввода фильтра.
     */
    onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Значение поля ввода
     */
    value?: string;
    /**
     * Значение фильтра.
     */
    filter?: string;
    /**
     * Обработчик нажатия на кнопку "Отмена".
     */
    onCancel?: () => void;
    /**
     * Обработчик нажатия на крестик в инпуте фильтра.
     */
    onClearFilter?: () => void;
    /**
     * Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps>;
    /**
     * Дополнительные пропсы на слот под заголовком компонента BottomSheet
     */
    bottomSheetHeaderAddonsProps?: Record<string, unknown>;
    /**
     * Дополнительные пропсы на кнопку "продолжить"
     */
    continueButtonProps?: ButtonProps;
    /**
     * Дополнительные пропсы на кнопку "отмена"
     */
    cancelButtonProps?: ButtonProps;
    /**
     * Кастомный инпут
     */
    Input?: ElementType;
};
declare const InputAutocompleteMobile: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "onScroll" | "valueRenderer" | "autocomplete" | "nativeSelect" | "OptionsList" | "Checkmark"> & {
    /**
     * Обработчик выбора
     */
    onChange: (payload: string | BaseSelectChangePayload) => void;
    /**
     * Обработчик ввода фильтра.
     */
    onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Значение поля ввода
     */
    value?: string | undefined;
    /**
     * Значение фильтра.
     */
    filter?: string | undefined;
    /**
     * Обработчик нажатия на кнопку "Отмена".
     */
    onCancel?: (() => void) | undefined;
    /**
     * Обработчик нажатия на крестик в инпуте фильтра.
     */
    onClearFilter?: (() => void) | undefined;
    /**
     * Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps> | undefined;
    /**
     * Дополнительные пропсы на слот под заголовком компонента BottomSheet
     */
    bottomSheetHeaderAddonsProps?: Record<string, unknown> | undefined;
    /**
     * Дополнительные пропсы на кнопку "продолжить"
     */
    continueButtonProps?: ButtonProps | undefined;
    /**
     * Дополнительные пропсы на кнопку "отмена"
     */
    cancelButtonProps?: ButtonProps | undefined;
    /**
     * Кастомный инпут
     */
    Input?: React.ElementType<any> | undefined;
} & React.RefAttributes<unknown>>;
export { InputAutocompleteMobileProps, InputAutocompleteMobile };
