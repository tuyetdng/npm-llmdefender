var tslib_es6 = require('../../tslib.es6-36bf03a1.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsAmount = require('../../../amount');
var coreComponentsTypography = require('../../../typography');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pure-cell__component_17xdu","weight":"pure-cell__weight_17xdu"};
require('./index.css');

var AmountTitle = function (_a) {
    var minority = _a.minority, _b = _a.minorUnits, minorUnits = _b === void 0 ? 100 : _b, className = _a.className, _c = _a.color, color = _c === void 0 ? 'primary' : _c, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["minority", "minorUnits", "className", "color", "dataTestId"]);
    return (React__default.default.createElement(coreComponentsTypography.Typography.Title, { tag: 'h4', view: 'small', dataTestId: getDataTestId.getDataTestId(dataTestId, 'amount-title'), className: styles.component, color: color },
        React__default.default.createElement(coreComponentsAmount.Amount, tslib_es6.__assign({ minority: minority || minorUnits, className: cn__default.default(styles.weight, className), dataTestId: getDataTestId.getDataTestId(dataTestId, 'core-amount-title') }, restProps, { bold: 'none' }))));
};

exports.AmountTitle = AmountTitle;
