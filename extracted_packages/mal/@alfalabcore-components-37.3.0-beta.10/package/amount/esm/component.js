import React from 'react';
import cn from 'classnames';
import { formatAmount, AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR } from '@alfalab/utils';

var styles = {"component":"amount__component_1fiju","transparentMinor":"amount__transparentMinor_1fiju","bold":"amount__bold_1fiju","normalMinor":"amount__normalMinor_1fiju","defaultStyles":"amount__defaultStyles_1fiju","defaultMinor":"amount__defaultMinor_1fiju"};
require('./index.css');

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
var Amount = function (_a) {
    var _b, _c;
    var value = _a.value, minority = _a.minority, currency = _a.currency, _d = _a.codeFormat, codeFormat = _d === void 0 ? 'symbolic' : _d, _e = _a.view, view = _e === void 0 ? 'default' : _e, bold = _a.bold, transparentMinor = _a.transparentMinor, rightAddons = _a.rightAddons, _f = _a.showPlus, showPlus = _f === void 0 ? false : _f, className = _a.className, dataTestId = _a.dataTestId;
    var _g = formatAmount({
        value: value,
        currency: currency,
        minority: minority,
        view: view,
        codeFormat: codeFormat,
    }), majorPart = _g.majorPart, minorPart = _g.minorPart, currencySymbol = _g.currencySymbol, currencySeparator = _g.currencySeparator;
    var defaultStyles = bold === undefined && transparentMinor === undefined;
    return (React.createElement("span", { className: cn(styles.component, className, (_b = {},
            _b[styles.bold] = bold === 'full' || bold === 'major',
            _b[styles.defaultStyles] = defaultStyles,
            _b)), "data-test-id": dataTestId },
        showPlus && value > 0 ? '+' : '',
        majorPart,
        React.createElement("span", { className: cn(styles.minorPartAndCurrency, (_c = {},
                _c[styles.transparentMinor] = transparentMinor,
                _c[styles.normalMinor] = bold === 'major',
                _c[styles.defaultMinor] = defaultStyles,
                _c)) },
            minorPart && AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR,
            minorPart,
            currency ? "".concat(currencySeparator).concat(currencySymbol !== null && currencySymbol !== void 0 ? currencySymbol : currency) : null,
            rightAddons)));
};

export { Amount };
