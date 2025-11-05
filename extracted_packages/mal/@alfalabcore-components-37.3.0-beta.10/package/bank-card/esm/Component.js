import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { MaskedInput } from '../../masked-input/esm';
import { CameraMIcon } from '@alfalab/icons-glyph/CameraMIcon';
import { AlfaBankLIcon } from '@alfalab/icons-logotype/AlfaBankLIcon';
import { MastercardLIcon } from '@alfalab/icons-logotype/MastercardLIcon';
import { MirXxlIcon } from '@alfalab/icons-logotype/MirXxlIcon';
import { VisaXxlIcon } from '@alfalab/icons-logotype/VisaXxlIcon';
import { validateCardNumber } from './utils.js';

var styles = {"component":"bank-card__component_yf95n","aspectRatioContainer":"bank-card__aspectRatioContainer_yf95n","content":"bank-card__content_yf95n","label":"bank-card__label_yf95n","focused":"bank-card__focused_yf95n","filled":"bank-card__filled_yf95n","input":"bank-card__input_yf95n","bankLogo":"bank-card__bankLogo_yf95n","brandLogo":"bank-card__brandLogo_yf95n","usePhoto":"bank-card__usePhoto_yf95n"};
require('./index.css');

// prettier-ignore
var cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
// prettier-ignore
var accountNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
var getBrandIcon = function (value) {
    if (value === void 0) { value = ''; }
    // Показываем логотип только после ввода всех цифр карты
    if (value.replace(/\s/g, '').length === 16 && validateCardNumber(value)) {
        if (value.startsWith('2'))
            return React.createElement(MirXxlIcon, null);
        if (value.startsWith('4'))
            return React.createElement(VisaXxlIcon, null);
        if (value.startsWith('5'))
            return React.createElement(MastercardLIcon, null);
        if (value.startsWith('6'))
            return React.createElement(MastercardLIcon, null);
    }
    return null;
};
var BankCard = React.forwardRef(function (_a, ref) {
    var _b = _a.bankLogo, bankLogo = _b === void 0 ? React.createElement(AlfaBankLIcon, null) : _b, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? '#EF3124' : _c, _d = _a.inputLabel, inputLabel = _d === void 0 ? 'Номер карты или счёта' : _d, value = _a.value, className = _a.className, onUsePhoto = _a.onUsePhoto, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var uncontrolled = value === undefined;
    var _e = useState(getBrandIcon(value)), brandIcon = _e[0], setBrandIcon = _e[1];
    var getMask = useCallback(function (newValue) {
        return newValue.length <= cardMask.length ? cardMask : accountNumberMask;
    }, []);
    var handleInputChange = useCallback(function (event, payload) {
        if (uncontrolled) {
            setBrandIcon(getBrandIcon(event.target.value));
        }
        if (onChange) {
            onChange(event, payload);
        }
    }, [onChange, uncontrolled]);
    var renderRightAddons = useCallback(function () { return (React.createElement("button", { type: 'button', className: styles.usePhoto, onClick: onUsePhoto },
        React.createElement(CameraMIcon, null))); }, [onUsePhoto]);
    useEffect(function () {
        setBrandIcon(getBrandIcon(value));
    }, [value]);
    return (React.createElement("div", { className: cn(styles.component, className) },
        React.createElement("div", { className: styles.aspectRatioContainer },
            React.createElement("div", { className: styles.content, style: { backgroundColor: backgroundColor } },
                React.createElement("div", { className: styles.bankLogo }, bankLogo),
                React.createElement(MaskedInput, { ref: ref, value: value, mask: getMask, block: true, label: inputLabel, size: 'm', rightAddons: renderRightAddons(), inputClassName: styles.input, labelClassName: styles.label, filledClassName: styles.filled, focusedClassName: styles.focused, onChange: handleInputChange, dataTestId: dataTestId, inputMode: 'numeric', pattern: '[0-9]*' }),
                brandIcon && React.createElement("div", { className: styles.brandLogo }, brandIcon)))));
});
BankCard.defaultProps = {
    bankLogo: React.createElement(AlfaBankLIcon, null),
    backgroundColor: '#EF3124',
    inputLabel: 'Номер карты или счёта',
};

export { BankCard };
