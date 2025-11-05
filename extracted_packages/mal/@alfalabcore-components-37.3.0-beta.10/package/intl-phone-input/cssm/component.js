var components_selectField_component = require('./component-01884de0.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsInputAutocomplete = require('../../input-autocomplete/cssm');
var WorldMagnifierMIcon = require('@alfalab/icons-glyph/WorldMagnifierMIcon');
var utils = require('@alfalab/utils');
var utils_calculateCaretPos = require('./utils/calculateCaretPos.js');
var utils_formatPhoneWithUnclearableCountryCode = require('./utils/format-phone-with-unclearable-country-code.js');
var utils_preparePasteData = require('./utils/preparePasteData.js');
require('react-merge-refs');
require('@alfalab/hooks');
var components_flagIcon_component = require('./components/flag-icon/component.js');
require('./components/select-field/index.module.css');
var components_select_component = require('./components/select/component.js');
var useCaretAvoidCountryCode = require('./useCaretAvoidCountryCode.js');
var styles = require('./index.module.css');
require('./components/flag-icon/flagSprite.js');
require('./components/flag-icon/index.module.css');
require('../../select/cssm');
require('./components/select/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var WorldMagnifierMIcon__default = /*#__PURE__*/_interopDefaultCompat(WorldMagnifierMIcon);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var countriesHash = utils.getCountriesHash();
var MAX_DIAL_CODE_LENGTH = 4;
var MASK_SYMBOLS = [' ', '-', '(', ')'];
var MAX_PHONE_LEN = 15;
var DEFAULT_MAX_PHONE_LEN_BY_COUNTRY = { RU: 11 };
var IntlPhoneInput = React.forwardRef(function (_a, ref) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c, _d = _a.hideCountrySelect, hideCountrySelect = _d === void 0 ? false : _d, _e = _a.canBeEmptyCountry, canBeEmptyCountry = _e === void 0 ? false : _e, _f = _a.ruNumberPriority, ruNumberPriority = _f === void 0 ? false : _f, _g = _a.clear, clear = _g === void 0 ? false : _g, _h = _a.size, size = _h === void 0 ? 'm' : _h, _j = _a.colors, colors = _j === void 0 ? 'default' : _j, _k = _a.options, options = _k === void 0 ? [] : _k, _l = _a.countries, countries = _l === void 0 ? utils.getCountries() : _l, _m = _a.clearableCountryCode, clearableCountryCode = _m === void 0 ? true : _m, className = _a.className, value = _a.value, onChange = _a.onChange, onCountryChange = _a.onCountryChange, _o = _a.defaultCountryIso2, defaultCountryIso2 = _o === void 0 ? 'ru' : _o, preventFlip = _a.preventFlip, inputProps = _a.inputProps, _p = _a.maxPhoneLen, maxPhoneLen = _p === void 0 ? DEFAULT_MAX_PHONE_LEN_BY_COUNTRY : _p, restProps = components_selectField_component.__rest(_a, ["disabled", "readOnly", "hideCountrySelect", "canBeEmptyCountry", "ruNumberPriority", "clear", "size", "colors", "options", "countries", "clearableCountryCode", "className", "value", "onChange", "onCountryChange", "defaultCountryIso2", "preventFlip", "inputProps", "maxPhoneLen"]);
    var _q = React.useState(defaultCountryIso2.toLowerCase()), countryIso2 = _q[0], setCountryIso2 = _q[1];
    var inputRef = React.useRef(null);
    var _r = React.useState(null), inputWrapperRef = _r[0], setInputWrapperRef = _r[1];
    var _s = React.useState(), caretPos = _s[0], setCaretPos = _s[1];
    var phoneLibUtils = React.useRef();
    var formatPhone = function (inputValue, iso2) {
        if (iso2 === void 0) { iso2 = countryIso2; }
        var newValue = inputValue;
        if (phoneLibUtils.current) {
            var Utils = phoneLibUtils.current;
            var utils = new Utils(iso2 ? iso2.toUpperCase() : undefined);
            newValue = utils.input(inputValue);
        }
        if (iso2 === 'ru') {
            var parts = newValue.split(' ');
            newValue = parts.reduce(function (acc, part, index) {
                if (index === 0) {
                    return part;
                }
                if (index > 2) {
                    return "".concat(acc, "-").concat(part);
                }
                return "".concat(acc, " ").concat(part);
            }, '');
        }
        return newValue;
    };
    var setCountryByIso2 = function (iso2) {
        var country = countriesHash[iso2];
        var inputValue = "+".concat(country.dialCode);
        onChange(inputValue);
        setCountryIso2(country.iso2);
        return country;
    };
    var handleCountryChange = function (countryCode) {
        if (onCountryChange) {
            onCountryChange(countryCode ? countryCode.toUpperCase() : undefined);
        }
    };
    var getCountryByNumber = function (inputValue) {
        // dialcode казахстанских номеров совпадает с российскими, поэтому проверяем отдельно
        if (new RegExp('^\\+7(\\s)?7').test(inputValue)) {
            var kzCoutry = countries.find(function (item) { return item.iso2 === 'kz'; });
            if (kzCoutry) {
                return kzCoutry;
            }
        }
        var targetCountry = countries.find(function (country) {
            if (new RegExp("^\\+".concat(country.dialCode)).test(inputValue)) {
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
    var addCountryCode = function (inputValue) {
        if (clearableCountryCode || !countryIso2) {
            return inputValue.length === 1 && inputValue !== '+'
                ? "+".concat(inputValue)
                : inputValue;
        }
        var country = countriesHash[countryIso2];
        return utils_formatPhoneWithUnclearableCountryCode.formatPhoneWithUnclearableCountryCode(inputValue, country);
    };
    var setCountryByDialCode = function (inputValue) {
        var country = getCountryByNumber(inputValue);
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
    var setCountryByDialCodeWithLengthCheck = function (inputValue) {
        if (inputRef.current) {
            var selectionStart = inputRef.current.selectionStart;
            if ((selectionStart || 0) <= MAX_DIAL_CODE_LENGTH) {
                setCountryByDialCode(inputValue);
            }
        }
    };
    var handleInputChange = function (event) {
        setCountryByDialCodeWithLengthCheck(event.target.value);
        onChange(formatPhone(addCountryCode(event.target.value)));
    };
    var handleSelectChange = function (_a) {
        var selected = _a.selected;
        if (selected) {
            var country_1 = setCountryByIso2(selected.value);
            var inputValue = "+".concat(country_1.dialCode);
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
            }
            handleCountryChange(country_1.iso2);
        }
    };
    var handleChange = function (payload) {
        var selected = payload.selected;
        if (!selected)
            return;
        setCountryByDialCodeWithLengthCheck(selected.key);
        onChange(formatPhone(selected.key));
    };
    var country = countryIso2 && countriesHash[countryIso2];
    var countryCodeLength = country ? "+".concat(country.dialCode).length : 0;
    var isEmptyValue = clearableCountryCode
        ? value === '' || value === '+'
        : value.length <= countryCodeLength;
    var handleInputNewChar = function (event, caretPosition) {
        var input = event.target;
        var currentValue = input.value;
        var maxPhoneLength = (countryIso2 && (maxPhoneLen === null || maxPhoneLen === void 0 ? void 0 : maxPhoneLen[countryIso2.toUpperCase()])) || MAX_PHONE_LEN;
        // Если номер полностью заполнен, то перезатираем цифры, если каретка не в самом конце.
        var shouldReplace = maxPhoneLength === currentValue.replace(/\D/g, '').length;
        var endPhonePart = currentValue.slice(caretPosition);
        if (shouldReplace) {
            var cursor = 0;
            while (MASK_SYMBOLS.includes(endPhonePart.charAt(cursor))) {
                cursor += 1;
            }
            endPhonePart = endPhonePart.slice(cursor + 1);
        }
        var newValue = currentValue.slice(0, caretPosition) + event.key + endPhonePart;
        var newValueDecimal = newValue.replace(/\D/g, '');
        // Запрещаем ввод, если номер уже заполнен.
        if (newValueDecimal.length > maxPhoneLength) {
            newValue = newValue.slice(0, -1);
        }
        if (ruNumberPriority && !value && countryIso2 === 'ru') {
            if (newValue === '7' || newValue === '8') {
                newValue = '+7';
            }
            else if (newValueDecimal.length === 1) {
                newValue = "+7".concat(newValueDecimal);
            }
        }
        newValue = formatPhone(addCountryCode(newValue));
        var phonePartWithoutMask = currentValue.slice(0, caretPosition).replace(/\D/g, '') + event.key;
        if (shouldReplace && phonePartWithoutMask.length > maxPhoneLength) {
            phonePartWithoutMask = phonePartWithoutMask.slice(0, -1);
        }
        if (newValue && newValue[0] !== '+') {
            newValue = "+".concat(newValue);
        }
        setCaretPos(utils_calculateCaretPos.calculateCaretPos(phonePartWithoutMask, newValue));
        setCountryByDialCodeWithLengthCheck(newValue);
        onChange(newValue);
    };
    var handleDeleteChar = function (event, caretPosition) {
        var input = event.target;
        if (!clearableCountryCode && caretPosition <= countryCodeLength)
            return;
        var currentValue = input.value;
        var isMaskSymbol = function (count) {
            var isMask = MASK_SYMBOLS.includes(currentValue.charAt(caretPosition - count));
            var isPossibleToRemove = clearableCountryCode
                ? caretPosition - count > 0
                : caretPosition - count > countryCodeLength;
            return isMask && isPossibleToRemove;
        };
        var deletedCharsCount = 1;
        // Высчитываем кол-во символов, которые нужно удалить.
        while (isMaskSymbol(deletedCharsCount)) {
            deletedCharsCount += 1;
        }
        var phonePart = currentValue.slice(0, caretPosition - deletedCharsCount);
        var newValue = formatPhone(addCountryCode(phonePart + currentValue.slice(caretPosition)));
        var phonePartWithoutMask = phonePart.replace(/[^0-9+]+/g, '');
        setCaretPos(utils_calculateCaretPos.calculateCaretPos(phonePartWithoutMask, newValue));
        setCountryByDialCodeWithLengthCheck(newValue);
        onChange(newValue);
    };
    var handleKeyDown = function (event) {
        var input = event.target;
        var caretPosition = input.selectionStart || 0;
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
    var handleClear = function () {
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
    var handlePaste = function (event) {
        var _a;
        event.preventDefault();
        var text = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('Text');
        if (!text || !inputRef.current) {
            return;
        }
        var _b = inputRef.current, selectionStart = _b.selectionStart, selectionEnd = _b.selectionEnd;
        var preparedNumber = utils_preparePasteData.preparePasteData(value, text, selectionStart || 0, selectionEnd || 0);
        var targetCountry = getCountryByNumber(preparedNumber);
        var maxPhoneLength = (targetCountry && (maxPhoneLen === null || maxPhoneLen === void 0 ? void 0 : maxPhoneLen[targetCountry.iso2.toUpperCase()])) || MAX_PHONE_LEN;
        var resultNumber = preparedNumber.substring(0, maxPhoneLength + 1);
        if (resultNumber) {
            setCountryIso2(targetCountry ? targetCountry.iso2 : undefined);
            onChange(formatPhone(addCountryCode(resultNumber)));
        }
    };
    React.useEffect(function () {
        if (inputRef.current && caretPos !== undefined) {
            inputRef.current.setSelectionRange(caretPos, caretPos);
            setCaretPos(undefined);
        }
    }, [caretPos]);
    React.useEffect(function () {
        if (phoneLibUtils.current)
            return;
        Promise.resolve().then(function () { return require(
        /* webpackChunkName: "libphonenumber" */ './libphonenumber-js.min-e2e76e74.js'); })
            .then(function (utils) {
            phoneLibUtils.current = utils.AsYouType;
            if (canBeEmptyCountry) {
                onChange(formatPhone(value));
            }
            else {
                setCountryByDialCode(value);
            }
        })
            .catch(function (error) { return "An error occurred while loading libphonenumber-js:\n".concat(error); });
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [value]);
    React.useEffect(function () {
        if (value && value.length > 1 && !value.includes(' ')) {
            var newCountry = getCountryByNumber(value);
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
            onChange(formatPhone(value, newCountry === null || newCountry === void 0 ? void 0 : newCountry.iso2));
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [value, canBeEmptyCountry, countryIso2, defaultCountryIso2]);
    useCaretAvoidCountryCode.useCaretAvoidCountryCode({ inputRef: inputRef, countryCodeLength: countryCodeLength, clearableCountryCode: clearableCountryCode });
    return (React__default.default.createElement(coreComponentsInputAutocomplete.InputAutocomplete, components_selectField_component.__assign({}, restProps, { ref: ref, inputProps: components_selectField_component.__assign(components_selectField_component.__assign({ clear: clear && !isEmptyValue, onClear: handleClear }, inputProps), { ref: inputRef, wrapperRef: setInputWrapperRef, type: 'tel', colors: colors, className: cn__default.default(className, styles__default.default[size]), addonsClassName: styles__default.default.addons, onKeyDown: handleKeyDown, onPaste: handlePaste, leftAddons: hideCountrySelect ? (React__default.default.createElement("span", { className: styles__default.default.flagIconWrapper }, countryIso2 ? (React__default.default.createElement(components_flagIcon_component.FlagIcon, { country: countryIso2 })) : (React__default.default.createElement(WorldMagnifierMIcon__default.default, { className: styles__default.default.emptyCountryIcon })))) : (countries.length > 1 && (React__default.default.createElement(components_select_component.CountriesSelect, { dataTestId: 'countries-select', disabled: disabled || readOnly, size: size, selected: countryIso2, countries: countries, onChange: handleSelectChange, fieldWidth: inputWrapperRef && inputWrapperRef.getBoundingClientRect().width, preventFlip: preventFlip }))) }), optionsListWidth: 'field', closeOnSelect: true, onInput: handleInputChange, onChange: handleChange, options: options, disabled: disabled, readOnly: readOnly, size: size, className: className, value: value })));
});

exports.IntlPhoneInput = IntlPhoneInput;
