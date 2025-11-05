/// <reference types="react" />
import React from 'react';
import { InputProps } from "../input";
import { CurrencyCodes } from '@alfalab/data';
type AmountInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & {
    /**
     * Денежное значение в минорных единицах
     * Значение null - значит не установлено
     */
    value?: string | number | null;
    /**
     * Валюта
     */
    currency?: CurrencyCodes;
    /**
     * Дополнительный закрепленный текст справа от основного значения. (по умолчанию — символ валюты)
     */
    suffix?: string;
    /**
     * Максимальное число знаков до запятой
     */
    integerLength?: number;
    /**
     * Минорные единицы
     */
    minority?: number;
    /**
     * Позволяет вводить только целые значения
     */
    integersOnly?: boolean;
    /**
     * @default - true. Нельзя вводить отрицательные значения.
     * Возможность вводить только положительные значения
     */
    positiveOnly?: boolean;
    /**
     * Жир
     */
    bold?: boolean;
    /**
     * Обработчик события изменения значения
     */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, payload: {
        /**
         * Денежное значение в минорных единицах
         * Значение null - значит не установлено
         */
        value: number | null;
        /**
         * Значение инпута
         */
        valueString: string;
    }) => void;
};
/**
 * Компонент для ввода денежных значений
 */
declare const AmountInput: React.ForwardRefExoticComponent<Omit<InputProps, "type" | "onChange" | "value"> & {
    /**
     * Денежное значение в минорных единицах
     * Значение null - значит не установлено
     */
    value?: string | number | null | undefined;
    /**
     * Валюта
     */
    currency?: "ALL" | "AFN" | "ARS" | "AWG" | "AUD" | "AZN" | "BSD" | "BBD" | "BYN" | "BZD" | "BMD" | "BOB" | "BOV" | "BAM" | "BWP" | "BGN" | "BRL" | "BND" | "KHR" | "CAD" | "KYD" | "CLP" | "CNY" | "COP" | "COU" | "CRC" | "HRK" | "CUP" | "CUC" | "CZK" | "DKK" | "DOP" | "XCD" | "EGP" | "SVC" | "EEK" | "EUR" | "FKP" | "FJD" | "FRF" | "GHC" | "GIP" | "GTQ" | "GGP" | "GYD" | "HNL" | "HKD" | "HUF" | "ISK" | "INR" | "IDR" | "IRR" | "IMP" | "ILS" | "JMD" | "JPY" | "JEP" | "KZT" | "KGS" | "LAK" | "LVL" | "LBP" | "LRD" | "LTL" | "MKD" | "MYR" | "MUR" | "MXN" | "MXV" | "MNT" | "MZN" | "NAD" | "NPR" | "ANG" | "NZD" | "NIO" | "NGN" | "KPW" | "NOK" | "OMR" | "PKR" | "PAB" | "PYG" | "PEN" | "PHP" | "PLN" | "QAR" | "RON" | "RUR" | "RUB" | "SHP" | "SAR" | "RSD" | "SCR" | "SGD" | "SBD" | "SOS" | "ZAR" | "KRW" | "LKR" | "SEK" | "CHF" | "SRD" | "SYP" | "TWD" | "THB" | "TTD" | "TRY" | "TRL" | "TVD" | "UAH" | "GBP" | "USD" | "UYU" | "UYI" | "UZS" | "VEF" | "VND" | "YER" | "ZWD" | "A98" | "A99" | "A76" | "A33" | "AMD" | "BDT" | "BIF" | "GEL" | "GHS" | "SDG" | undefined;
    /**
     * Дополнительный закрепленный текст справа от основного значения. (по умолчанию — символ валюты)
     */
    suffix?: string | undefined;
    /**
     * Максимальное число знаков до запятой
     */
    integerLength?: number | undefined;
    /**
     * Минорные единицы
     */
    minority?: number | undefined;
    /**
     * Позволяет вводить только целые значения
     */
    integersOnly?: boolean | undefined;
    /**
     * @default - true. Нельзя вводить отрицательные значения.
     * Возможность вводить только положительные значения
     */
    positiveOnly?: boolean | undefined;
    /**
     * Жир
     */
    bold?: boolean | undefined;
    /**
     * Обработчик события изменения значения
     */
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>, payload: {
        /**
         * Денежное значение в минорных единицах
         * Значение null - значит не установлено
         */
        value: number | null;
        /**
         * Значение инпута
         */
        valueString: string;
    }) => void) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { AmountInputProps, AmountInput };
