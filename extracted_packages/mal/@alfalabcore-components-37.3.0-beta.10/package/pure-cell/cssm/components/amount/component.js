var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsAmount = require('../../../../amount/cssm');
var coreComponentsTypography = require('../../../../typography/cssm');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Amount = function (_a) {
    var _b = _a.weight, weight = _b === void 0 ? 'normal' : _b, _c = _a.textView, textView = _c === void 0 ? 'component' : _c, _d = _a.color, color = _d === void 0 ? 'primary' : _d, minority = _a.minority, _e = _a.minorUnits, minorUnits = _e === void 0 ? 100 : _e, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["weight", "textView", "color", "minority", "minorUnits", "dataTestId"]);
    return (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: textView, dataTestId: getDataTestId.getDataTestId(dataTestId, 'amount-text'), className: cn__default.default(styles__default.default.component), color: color },
        React__default.default.createElement(coreComponentsAmount.Amount, tslib_es6.__assign({ minority: minority || minorUnits, bold: weight === 'bold' ? 'full' : 'none', dataTestId: getDataTestId.getDataTestId(dataTestId, 'amount') }, restProps))));
};

exports.Amount = Amount;
