import React, { forwardRef, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { InputAutocomplete } from '../../input-autocomplete/modern';
import WorldMagnifierMIcon from '@alfalab/icons-glyph/WorldMagnifierMIcon';
import { getCountriesHash, getCountries } from '@alfalab/utils';
import { calculateCaretPos } from './utils/calculateCaretPos.js';
import { formatPhoneWithUnclearableCountryCode } from './utils/format-phone-with-unclearable-country-code.js';
import { preparePasteData } from './utils/preparePasteData.js';
import 'react-merge-refs';
import '@alfalab/hooks';
import { FlagIcon } from './components/flag-icon/component.js';
import { CountriesSelect } from './components/select/component.js';
import { useCaretAvoidCountryCode } from './useCaretAvoidCountryCode.js';
import '../../select/modern';
import './components/select-field/component.js';
import './components/flag-icon/flagSprite.js';

const styles = {"addons":"intl-phone-input__addons_ldvui","l":"intl-phone-input__l_ldvui","xl":"intl-phone-input__xl_ldvui","flagIconWrapper":"intl-phone-input__flagIconWrapper_ldvui","emptyCountryIcon":"intl-phone-input__emptyCountryIcon_ldvui"};
require('./index.css');

const countriesHash = getCountriesHash();
const MAX_DIAL_CODE_LENGTH = 4;
const MASK_SYMBOLS = [' ', '-', '(', ')'];
const MAX_PHONE_LEN = 15;
const DEFAULT_MAX_PHONE_LEN_BY_COUNTRY = { RU: 11 };
const IntlPhoneInput = forwardRef(({ disabled = false, readOnly = false, hideCountrySelect = false, canBeEmptyCountry = false, ruNumberPriority = false, clear = false, size = 'm', colors = 'default', options = [], countries = getCountries(), clearableCountryCode = true, className, value, onChange, onCountryChange, defaultCountryIso2 = 'ru', preventFlip, inputProps, maxPhoneLen = DEFAULT_MAX_PHONE_LEN_BY_COUNTRY, ...restProps }, ref) => {
    const [countryIso2, setCountryIso2] = useState(defaultCountryIso2.toLowerCase());
    const inputRef = useRef(null);
    const [inputWrapperRef, setInputWrapperRef] = useState(null);
    const [caretPos, setCaretPos] = useState();
    const phoneLibUtils = useRef();
    const formatPhone = (inputValue, iso2 = countryIso2) => {
        let newValue = inputValue;
        if (phoneLibUtils.current) {
            const Utils = phoneLibUtils.current;
            const utils = new Utils(iso2 ? iso2.toUpperCase() : undefined);
            newValue = utils.input(inputValue);
        }
        if (iso2 === 'ru') {
            const parts = newValue.split(' ');
            newValue = parts.reduce((acc, part, index) => {
                if (index === 0) {
                    return part;
                }
                if (index > 2) {
                    return `${acc}-${part}`;
                }
                return `${acc} ${part}`;
            }, '');
        }
        return newValue;
    };
    const setCountryByIso2 = (iso2) => {
        const country = countriesHash[iso2];
        const inputValue = `+${country.dialCode}`;
        onChange(inputValue);
        setCountryIso2(country.iso2);
        return country;
    };
    const handleCountryChange = (countryCode) => {
        if (onCountryChange) {
            onCountryChange(countryCode ? countryCode.toUpperCase() : undefined);
        }
    };
    const getCountryByNumber = (inputValue) => {
        // dialcode казахстанских номеров совпадает с российскими, поэтому проверяем отдельно
        if (new RegExp('^\\+7(\\s)?7').test(inputValue)) {
            const kzCoutry = countries.find((item) => item.iso2 === 'kz');
            if (kzCoutry) {
                return kzCoutry;
            }
        }
        const targetCountry = countries.find((country) => {
            if (new RegExp(`^\\+${country.dialCode}`).test(inputValue)) {
                // Сначала проверяем, если приоритет не указан
                if (country.priority === undefined) {
                    return true;
                }
                // Если страна уже была выставлена через селект, и коды совпадают
                if (countryIso2 === country.iso2 && countryIso2 !== 'kz') {
                    return true;
                }
                // Если не совпадают - выбираем по приоритету
                if (country.priority === 0) {
                    return true;
                }
                return false;
            }
            return false;
        });
        return targetCountry;
    };
    const addCountryCode = (inputValue) => {
        if (clearableCountryCode || !countryIso2) {
            return inputValue.length === 1 && inputValue !== '+'
                ? `+${inputValue}`
                : inputValue;
        }
        const country = countriesHash[countryIso2];
        return formatPhoneWithUnclearableCountryCode(inputValue, country);
    };
    const setCountryByDialCode = (inputValue) => {
        const country = getCountryByNumber(inputValue);
        onChange(formatPhone(addCountryCode(inputValue)));
        if (country) {
            setCountryIso2(country.iso2);
            handleCountryChange(country.iso2);
        }
        else if (canBeEmptyCountry) {
            setCountryIso2(undefined);
            handleCountryChange(undefined);
        }
    };
    const setCountryByDialCodeWithLengthCheck = (inputValue) => {
        if (inputRef.current) {
            const { selectionStart } = inputRef.current;
            if ((selectionStart || 0) <= MAX_DIAL_CODE_LENGTH) {
                setCountryByDialCode(inputValue);
            }
        }
    };
    const handleInputChange = (event) => {
        setCountryByDialCodeWithLengthCheck(event.target.value);
        onChange(formatPhone(addCountryCode(event.target.value)));
    };
    const handleSelectChange = ({ selected }) => {
        if (selected) {
            const country = setCountryByIso2(selected.value);
            const inputValue = `+${country.dialCode}`;
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
            }
            handleCountryChange(country.iso2);
        }
    };
    const handleChange = (payload) => {
        const { selected } = payload;
        if (!selected)
            return;
        setCountryByDialCodeWithLengthCheck(selected.key);
        onChange(formatPhone(selected.key));
    };
    const country = countryIso2 && countriesHash[countryIso2];
    const countryCodeLength = country ? `+${country.dialCode}`.length : 0;
    const isEmptyValue = clearableCountryCode
        ? value === '' || value === '+'
        : value.length <= countryCodeLength;
    const handleInputNewChar = (event, caretPosition) => {
        const input = event.target;
        const currentValue = input.value;
        const maxPhoneLength = (countryIso2 && maxPhoneLen?.[countryIso2.toUpperCase()]) || MAX_PHONE_LEN;
        // Если номер полностью заполнен, то перезатираем цифры, если каретка не в самом конце.
        const shouldReplace = maxPhoneLength === currentValue.replace(/\D/g, '').length;
        let endPhonePart = currentValue.slice(caretPosition);
        if (shouldReplace) {
            let cursor = 0;
            while (MASK_SYMBOLS.includes(endPhonePart.charAt(cursor))) {
                cursor += 1;
            }
            endPhonePart = endPhonePart.slice(cursor + 1);
        }
        let newValue = currentValue.slice(0, caretPosition) + event.key + endPhonePart;
        const newValueDecimal = newValue.replace(/\D/g, '');
        // Запрещаем ввод, если номер уже заполнен.
        if (newValueDecimal.length > maxPhoneLength) {
            newValue = newValue.slice(0, -1);
        }
        if (ruNumberPriority && !value && countryIso2 === 'ru') {
            if (newValue === '7' || newValue === '8') {
                newValue = '+7';
            }
            else if (newValueDecimal.length === 1) {
                newValue = `+7${newValueDecimal}`;
            }
        }
        newValue = formatPhone(addCountryCode(newValue));
        let phonePartWithoutMask = currentValue.slice(0, caretPosition).replace(/\D/g, '') + event.key;
        if (shouldReplace && phonePartWithoutMask.length > maxPhoneLength) {
            phonePartWithoutMask = phonePartWithoutMask.slice(0, -1);
        }
        if (newValue && newValue[0] !== '+') {
            newValue = `+${newValue}`;
        }
        setCaretPos(calculateCaretPos(phonePartWithoutMask, newValue));
        setCountryByDialCodeWithLengthCheck(newValue);
        onChange(newValue);
    };
    const handleDeleteChar = (event, caretPosition) => {
        const input = event.target;
        if (!clearableCountryCode && caretPosition <= countryCodeLength)
            return;
        const currentValue = input.value;
        const isMaskSymbol = (count) => {
            const isMask = MASK_SYMBOLS.includes(currentValue.charAt(caretPosition - count));
            const isPossibleToRemove = clearableCountryCode
                ? caretPosition - count > 0
                : caretPosition - count > countryCodeLength;
            return isMask && isPossibleToRemove;
        };
        let deletedCharsCount = 1;
        // Высчитываем кол-во символов, которые нужно удалить.
        while (isMaskSymbol(deletedCharsCount)) {
            deletedCharsCount += 1;
        }
        const phonePart = currentValue.slice(0, caretPosition - deletedCharsCount);
        const newValue = formatPhone(addCountryCode(phonePart + currentValue.slice(caretPosition)));
        const phonePartWithoutMask = phonePart.replace(/[^0-9+]+/g, '');
        setCaretPos(calculateCaretPos(phonePartWithoutMask, newValue));
        setCountryByDialCodeWithLengthCheck(newValue);
        onChange(newValue);
    };
    const handleKeyDown = (event) => {
        const input = event.target;
        const caretPosition = input.selectionStart || 0;
        // Нажат только Backspace, не сочетание клавиш с ним.
        if (!event.shiftKey && !event.ctrlKey && !event.metaKey && event.key === 'Backspace') {
            if (!caretPosition)
                return;
            event.preventDefault();
            handleDeleteChar(event, caretPosition);
        }
        if (event.key.length === 1 && /[0-9+]/.test(event.key)) {
            event.preventDefault();
            handleInputNewChar(event, caretPosition);
        }
    };
    const handleClear = () => {
        if (clearableCountryCode) {
            onChange('+');
            if (canBeEmptyCountry) {
                setCountryIso2(undefined);
                handleCountryChange(undefined);
            }
        }
        else {
            onChange(value.substring(0, countryCodeLength));
        }
    };
    const handlePaste = (event) => {
        event.preventDefault();
        const text = event.clipboardData?.getData('Text');
        if (!text || !inputRef.current) {
            return;
        }
        const { selectionStart, selectionEnd } = inputRef.current;
        const preparedNumber = preparePasteData(value, text, selectionStart || 0, selectionEnd || 0);
        const targetCountry = getCountryByNumber(preparedNumber);
        const maxPhoneLength = (targetCountry && maxPhoneLen?.[targetCountry.iso2.toUpperCase()]) || MAX_PHONE_LEN;
        const resultNumber = preparedNumber.substring(0, maxPhoneLength + 1);
        if (resultNumber) {
            setCountryIso2(targetCountry ? targetCountry.iso2 : undefined);
            onChange(formatPhone(addCountryCode(resultNumber)));
        }
    };
    useEffect(() => {
        if (inputRef.current && caretPos !== undefined) {
            inputRef.current.setSelectionRange(caretPos, caretPos);
            setCaretPos(undefined);
        }
    }, [caretPos]);
    useEffect(() => {
        if (phoneLibUtils.current)
            return;
        import(
        /* webpackChunkName: "libphonenumber" */ './libphonenumber-js.min-88163569.js')
            .then((utils) => {
            phoneLibUtils.current = utils.AsYouType;
            if (canBeEmptyCountry) {
                onChange(formatPhone(value));
            }
            else {
                setCountryByDialCode(value);
            }
        })
            .catch((error) => `An error occurred while loading libphonenumber-js:\n${error}`);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [value]);
    useEffect(() => {
        if (value && value.length > 1 && !value.includes(' ')) {
            const newCountry = getCountryByNumber(value);
            if (newCountry && countryIso2 !== newCountry.iso2) {
                setCountryIso2(newCountry.iso2);
                handleCountryChange(newCountry.iso2);
            }
            else if (canBeEmptyCountry &&
                !newCountry &&
                countryIso2 !== defaultCountryIso2.toLowerCase()) {
                setCountryIso2(undefined);
                handleCountryChange(undefined);
            }
            onChange(formatPhone(value, newCountry?.iso2));
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [value, canBeEmptyCountry, countryIso2, defaultCountryIso2]);
    useCaretAvoidCountryCode({ inputRef, countryCodeLength, clearableCountryCode });
    return (React.createElement(InputAutocomplete, { ...restProps, ref: ref, inputProps: {
            clear: clear && !isEmptyValue,
            onClear: handleClear,
            ...inputProps,
            ref: inputRef,
            wrapperRef: setInputWrapperRef,
            type: 'tel',
            colors,
            className: cn(className, styles[size]),
            addonsClassName: styles.addons,
            onKeyDown: handleKeyDown,
            onPaste: handlePaste,
            leftAddons: hideCountrySelect ? (React.createElement("span", { className: styles.flagIconWrapper }, countryIso2 ? (React.createElement(FlagIcon, { country: countryIso2 })) : (React.createElement(WorldMagnifierMIcon, { className: styles.emptyCountryIcon })))) : (countries.length > 1 && (React.createElement(CountriesSelect, { dataTestId: 'countries-select', disabled: disabled || readOnly, size: size, selected: countryIso2, countries: countries, onChange: handleSelectChange, fieldWidth: inputWrapperRef && inputWrapperRef.getBoundingClientRect().width, preventFlip: preventFlip }))),
        }, optionsListWidth: 'field', closeOnSelect: true, onInput: handleInputChange, onChange: handleChange, options: options, disabled: disabled, readOnly: readOnly, size: size, className: className, value: value }));
});

export { IntlPhoneInput };
