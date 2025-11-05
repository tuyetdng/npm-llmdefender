/// <reference types="react" />
import React from 'react';
import { CountryCode } from 'libphonenumber-js';
import { InputAutocompleteProps } from "../../input-autocomplete";
import { SelectProps } from "../../select";
import { Country } from '@alfalab/utils';
type MaxPhoneLenByCountry = Record<string, number>;
type IntlPhoneInputProps = Partial<Omit<InputAutocompleteProps, 'onChange'>> & Pick<SelectProps, 'preventFlip'> & {
    /**
     * Значение
     */
    value: string;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Обработчик события изменения значения
     */
    onChange: (value: string) => void;
    /**
     * Дефолтный код страны
     */
    defaultCountryIso2?: string;
    /**
     * Обработчик события изменения страны
     */
    onCountryChange?: (countryCode?: CountryCode) => void;
    /**
     * Список стран
     */
    countries?: Country[];
    /**
     * Возможность стереть код страны
     */
    clearableCountryCode?: boolean;
    /**
     * Ограничение длин вводимых номеров по странам.
     */
    maxPhoneLen?: MaxPhoneLenByCountry;
    hideCountrySelect?: boolean;
    canBeEmptyCountry?: boolean;
    ruNumberPriority?: boolean;
    clear?: boolean;
};
declare const IntlPhoneInput: React.ForwardRefExoticComponent<Partial<Omit<InputAutocompleteProps, "onChange">> & Pick<SelectProps, "preventFlip"> & {
    /**
     * Значение
     */
    value: string;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
    /**
     * Обработчик события изменения значения
     */
    onChange: (value: string) => void;
    /**
     * Дефолтный код страны
     */
    defaultCountryIso2?: string | undefined;
    /**
     * Обработчик события изменения страны
     */
    onCountryChange?: ((countryCode?: CountryCode) => void) | undefined;
    /**
     * Список стран
     */
    countries?: Country[] | undefined;
    /**
     * Возможность стереть код страны
     */
    clearableCountryCode?: boolean | undefined;
    /**
     * Ограничение длин вводимых номеров по странам.
     */
    maxPhoneLen?: MaxPhoneLenByCountry | undefined;
    hideCountrySelect?: boolean | undefined;
    canBeEmptyCountry?: boolean | undefined;
    ruNumberPriority?: boolean | undefined;
    clear?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { IntlPhoneInputProps, IntlPhoneInput };
