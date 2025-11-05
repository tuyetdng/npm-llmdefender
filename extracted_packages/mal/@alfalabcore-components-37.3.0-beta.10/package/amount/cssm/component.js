var React = require('react');
var cn = require('classnames');
var utils = require('@alfalab/utils');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
var Amount = function (_a) {
    var _b, _c;
    var value = _a.value, minority = _a.minority, currency = _a.currency, _d = _a.codeFormat, codeFormat = _d === void 0 ? 'symbolic' : _d, _e = _a.view, view = _e === void 0 ? 'default' : _e, bold = _a.bold, transparentMinor = _a.transparentMinor, rightAddons = _a.rightAddons, _f = _a.showPlus, showPlus = _f === void 0 ? false : _f, className = _a.className, dataTestId = _a.dataTestId;
    var _g = utils.formatAmount({
        value: value,
        currency: currency,
        minority: minority,
        view: view,
        codeFormat: codeFormat,
    }), majorPart = _g.majorPart, minorPart = _g.minorPart, currencySymbol = _g.currencySymbol, currencySeparator = _g.currencySeparator;
    var defaultStyles = bold === undefined && transparentMinor === undefined;
    return (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.component, className, (_b = {},
            _b[styles__default.default.bold] = bold === 'full' || bold === 'major',
            _b[styles__default.default.defaultStyles] = defaultStyles,
            _b)), "data-test-id": dataTestId },
        showPlus && value > 0 ? '+' : '',
        majorPart,
        React__default.default.createElement("span", { className: cn__default.default(styles__default.default.minorPartAndCurrency, (_c = {},
                _c[styles__default.default.transparentMinor] = transparentMinor,
                _c[styles__default.default.normalMinor] = bold === 'major',
                _c[styles__default.default.defaultMinor] = defaultStyles,
                _c)) },
            minorPart && utils.AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR,
            minorPart,
            currency ? "".concat(currencySeparator).concat(currencySymbol !== null && currencySymbol !== void 0 ? currencySymbol : currency) : null,
            rightAddons)));
};

exports.Amount = Amount;
