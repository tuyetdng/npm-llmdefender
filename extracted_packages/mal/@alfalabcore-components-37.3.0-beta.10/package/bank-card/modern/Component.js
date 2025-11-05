import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { MaskedInput } from '../../masked-input/modern';
import { CameraMIcon } from '@alfalab/icons-glyph/CameraMIcon';
import { AlfaBankLIcon } from '@alfalab/icons-logotype/AlfaBankLIcon';
import { MastercardLIcon } from '@alfalab/icons-logotype/MastercardLIcon';
import { MirXxlIcon } from '@alfalab/icons-logotype/MirXxlIcon';
import { VisaXxlIcon } from '@alfalab/icons-logotype/VisaXxlIcon';
import { validateCardNumber } from './utils.js';

const styles = {"component":"bank-card__component_yf95n","aspectRatioContainer":"bank-card__aspectRatioContainer_yf95n","content":"bank-card__content_yf95n","label":"bank-card__label_yf95n","focused":"bank-card__focused_yf95n","filled":"bank-card__filled_yf95n","input":"bank-card__input_yf95n","bankLogo":"bank-card__bankLogo_yf95n","brandLogo":"bank-card__brandLogo_yf95n","usePhoto":"bank-card__usePhoto_yf95n"};
require('./index.css');

// prettier-ignore
const cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
// prettier-ignore
const accountNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const getBrandIcon = (value = '') => {
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
const BankCard = React.forwardRef(({ bankLogo = React.createElement(AlfaBankLIcon, null), backgroundColor = '#EF3124', inputLabel = 'Номер карты или счёта', value, className, onUsePhoto, onChange, dataTestId, }, ref) => {
    const uncontrolled = value === undefined;
    const [brandIcon, setBrandIcon] = useState(getBrandIcon(value));
    const getMask = useCallback((newValue) => newValue.length <= cardMask.length ? cardMask : accountNumberMask, []);
    const handleInputChange = useCallback((event, payload) => {
        if (uncontrolled) {
            setBrandIcon(getBrandIcon(event.target.value));
        }
        if (onChange) {
            onChange(event, payload);
        }
    }, [onChange, uncontrolled]);
    const renderRightAddons = useCallback(() => (React.createElement("button", { type: 'button', className: styles.usePhoto, onClick: onUsePhoto },
        React.createElement(CameraMIcon, null))), [onUsePhoto]);
    useEffect(() => {
        setBrandIcon(getBrandIcon(value));
    }, [value]);
    return (React.createElement("div", { className: cn(styles.component, className) },
        React.createElement("div", { className: styles.aspectRatioContainer },
            React.createElement("div", { className: styles.content, style: { backgroundColor } },
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
