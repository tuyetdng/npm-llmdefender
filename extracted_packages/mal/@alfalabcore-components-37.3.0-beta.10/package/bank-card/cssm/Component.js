var React = require('react');
var cn = require('classnames');
var coreComponentsMaskedInput = require('../../masked-input/cssm');
var CameraMIcon = require('@alfalab/icons-glyph/CameraMIcon');
var AlfaBankLIcon = require('@alfalab/icons-logotype/AlfaBankLIcon');
var MastercardLIcon = require('@alfalab/icons-logotype/MastercardLIcon');
var MirXxlIcon = require('@alfalab/icons-logotype/MirXxlIcon');
var VisaXxlIcon = require('@alfalab/icons-logotype/VisaXxlIcon');
var utils = require('./utils.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

// prettier-ignore
var cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
// prettier-ignore
var accountNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
var getBrandIcon = function (value) {
    if (value === void 0) { value = ''; }
    // Показываем логотип только после ввода всех цифр карты
    if (value.replace(/\s/g, '').length === 16 && utils.validateCardNumber(value)) {
        if (value.startsWith('2'))
            return React__default.default.createElement(MirXxlIcon.MirXxlIcon, null);
        if (value.startsWith('4'))
            return React__default.default.createElement(VisaXxlIcon.VisaXxlIcon, null);
        if (value.startsWith('5'))
            return React__default.default.createElement(MastercardLIcon.MastercardLIcon, null);
        if (value.startsWith('6'))
            return React__default.default.createElement(MastercardLIcon.MastercardLIcon, null);
    }
    return null;
};
var BankCard = React__default.default.forwardRef(function (_a, ref) {
    var _b = _a.bankLogo, bankLogo = _b === void 0 ? React__default.default.createElement(AlfaBankLIcon.AlfaBankLIcon, null) : _b, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? '#EF3124' : _c, _d = _a.inputLabel, inputLabel = _d === void 0 ? 'Номер карты или счёта' : _d, value = _a.value, className = _a.className, onUsePhoto = _a.onUsePhoto, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var uncontrolled = value === undefined;
    var _e = React.useState(getBrandIcon(value)), brandIcon = _e[0], setBrandIcon = _e[1];
    var getMask = React.useCallback(function (newValue) {
        return newValue.length <= cardMask.length ? cardMask : accountNumberMask;
    }, []);
    var handleInputChange = React.useCallback(function (event, payload) {
        if (uncontrolled) {
            setBrandIcon(getBrandIcon(event.target.value));
        }
        if (onChange) {
            onChange(event, payload);
        }
    }, [onChange, uncontrolled]);
    var renderRightAddons = React.useCallback(function () { return (React__default.default.createElement("button", { type: 'button', className: styles__default.default.usePhoto, onClick: onUsePhoto },
        React__default.default.createElement(CameraMIcon.CameraMIcon, null))); }, [onUsePhoto]);
    React.useEffect(function () {
        setBrandIcon(getBrandIcon(value));
    }, [value]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className) },
        React__default.default.createElement("div", { className: styles__default.default.aspectRatioContainer },
            React__default.default.createElement("div", { className: styles__default.default.content, style: { backgroundColor: backgroundColor } },
                React__default.default.createElement("div", { className: styles__default.default.bankLogo }, bankLogo),
                React__default.default.createElement(coreComponentsMaskedInput.MaskedInput, { ref: ref, value: value, mask: getMask, block: true, label: inputLabel, size: 'm', rightAddons: renderRightAddons(), inputClassName: styles__default.default.input, labelClassName: styles__default.default.label, filledClassName: styles__default.default.filled, focusedClassName: styles__default.default.focused, onChange: handleInputChange, dataTestId: dataTestId, inputMode: 'numeric', pattern: '[0-9]*' }),
                brandIcon && React__default.default.createElement("div", { className: styles__default.default.brandLogo }, brandIcon)))));
});
BankCard.defaultProps = {
    bankLogo: React__default.default.createElement(AlfaBankLIcon.AlfaBankLIcon, null),
    backgroundColor: '#EF3124',
    inputLabel: 'Номер карты или счёта',
};

exports.BankCard = BankCard;
