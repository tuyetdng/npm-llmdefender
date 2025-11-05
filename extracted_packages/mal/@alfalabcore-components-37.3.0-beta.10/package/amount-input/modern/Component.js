import React, { forwardRef, useCallback, useState, useEffect, Fragment } from 'react';
import cn from 'classnames';
import { Input } from '../../input/modern';
import { withSuffix } from '../../with-suffix/modern';
import { formatAmount, getCurrencySymbol, THINSP } from '@alfalab/utils';
import { getAmountValueFromStr, getFormattedValue } from './utils/index.js';

const defaultColors = {"minorPartAndCurrency":"amount-input__minorPartAndCurrency_1elal"};
require('./default.css');

const styles = {"container":"amount-input__container_osp33","bold":"amount-input__bold_osp33","input":"amount-input__input_osp33","suffixContainer":"amount-input__suffixContainer_osp33","filled":"amount-input__filled_osp33"};
require('./index.css');

const invertedColors = {"minorPartAndCurrency":"amount-input__minorPartAndCurrency_a3goo"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
/**
 * Инпут, позволяющий закрепить значок валюты
 */
const SuffixInput = withSuffix(Input);
/**
 * Компонент для ввода денежных значений
 */
const AmountInput = forwardRef(({ value = null, integerLength = 9, minority = 100, currency = 'RUR', suffix = currency, placeholder = `0\u2009${suffix === currency ? getCurrencySymbol(currency) || '' : suffix}`, integersOnly = false, positiveOnly = true, bold = true, colors = 'default', className, focusedClassName, dataTestId, clear = false, onChange, onClear, ...restProps }, ref) => {
    const getFormattedAmount = useCallback(() => {
        if (value === '' || value === null || value === '-')
            return '';
        return formatAmount({
            value: +value,
            currency,
            minority,
            view: 'default',
            negativeSymbol: 'hyphen-minus',
        }).formatted;
    }, [currency, minority, value]);
    const [inputValue, setInputValue] = useState(getFormattedAmount());
    const currencySymbol = getCurrencySymbol(currency);
    useEffect(() => {
        const currentAmountValue = getAmountValueFromStr(inputValue, minority);
        if (currentAmountValue !== value) {
            return setInputValue(getFormattedAmount());
        }
        return () => undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFormattedAmount]);
    const handleChange = (e) => {
        const input = e.target;
        let enteredValue = input.value.replace(/\s/g, '').replace('.', ',');
        if (integersOnly) {
            [enteredValue] = enteredValue.split(',');
        }
        // Сокращение минимальной длины мажорной части числа до 0 позволяет ввести "," => "0,"
        const isCorrectEnteredValue = RegExp(`(^${positiveOnly ? '' : '-?'}[0-9]{0,${integerLength}}(,([0-9]+)?)?$|^\\s*$)`).test(enteredValue);
        if (isCorrectEnteredValue) {
            const newFormattedValue = getFormattedValue(enteredValue, currency, minority);
            if (newFormattedValue === inputValue) {
                const caret = input.selectionStart;
                window.requestAnimationFrame(() => {
                    input.selectionStart = caret;
                    input.selectionEnd = caret;
                });
            }
            else {
                /**
                 * Поддержка положения каретки
                 * Поскольку при форматировании введенного значения могут появляться символы типа пробела
                 * или запятая - каретка прыгает в конец и ее необходимо ставить в правильное место
                 */
                // Узнаем длину оригинального инпута с условием обрезания лишних символов
                const [head, tail] = input.value.split(/\.|,/);
                let notFormattedEnteredValueLength = head.length;
                if (tail) {
                    notFormattedEnteredValueLength += 1; // запятая или точка
                    notFormattedEnteredValueLength += tail.slice(0, minority.toString().length - 1).length; // символы в минорной части
                }
                const diff = newFormattedValue.length - notFormattedEnteredValueLength;
                const caret = input.selectionStart + diff;
                window.requestAnimationFrame(() => {
                    input.selectionStart = caret;
                    input.selectionEnd = caret;
                });
            }
            setInputValue(newFormattedValue);
            if (onChange) {
                onChange(e, {
                    value: getAmountValueFromStr(newFormattedValue, minority),
                    valueString: newFormattedValue,
                });
            }
        }
        else {
            // Не двигаем каретку когда вставляется невалидный символ
            const caret = input.selectionStart - 1;
            window.requestAnimationFrame(() => {
                input.selectionStart = caret;
                input.selectionEnd = caret;
            });
        }
    };
    const handleClear = useCallback((event) => {
        setInputValue('');
        if (onClear) {
            onClear(event);
        }
    }, [onClear]);
    const [majorPart, minorPart] = inputValue.split(',');
    return (React.createElement("div", { className: cn(styles.container, {
            [styles.bold]: bold,
            [styles.filled]: Boolean(inputValue),
        }) },
        React.createElement(SuffixInput, { ...restProps, suffix: React.createElement(Fragment, null,
                majorPart,
                React.createElement("span", { className: colorStyles[colors].minorPartAndCurrency },
                    minorPart !== undefined && `,${minorPart}`,
                    THINSP,
                    suffix === currency ? currencySymbol : suffix)), suffixContainerClassName: styles.suffixContainer, clear: clear, placeholder: placeholder, value: inputValue, colors: colors, className: cn(styles.component, className), focusedClassName: focusedClassName, inputClassName: styles.input, onChange: handleChange, onClear: handleClear, inputMode: 'decimal', pattern: '[0-9\\s\\.,]*', dataTestId: dataTestId, ref: ref })));
});

export { AmountInput };
