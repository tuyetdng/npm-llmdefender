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
 * Не содержит стилей кроме неразрывности строки
 *
 * @deprecated Используйте основной компонент. Стилизацию можно настроить через пропсы
 */
var PureAmount = function (_a) {
    var value = _a.value, minority = _a.minority, currency = _a.currency, rightAddons = _a.rightAddons, _b = _a.view, view = _b === void 0 ? 'default' : _b, _c = _a.showPlus, showPlus = _c === void 0 ? false : _c, className = _a.className, dataTestId = _a.dataTestId;
    var _d = utils.formatAmount({
        value: value,
        currency: currency,
        minority: minority,
        view: view,
    }), formatted = _d.formatted, currencySymbol = _d.currencySymbol;
    return (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.component, className), "data-test-id": dataTestId },
        showPlus && value > 0 ? '+' : '',
        formatted,
        currency ? "".concat(utils.THINSP).concat(currencySymbol) : null,
        rightAddons));
};

exports.PureAmount = PureAmount;
