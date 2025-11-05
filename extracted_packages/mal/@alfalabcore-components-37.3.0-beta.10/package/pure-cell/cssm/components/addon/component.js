var React = require('react');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Addon = function (_a) {
    var children = _a.children, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b, _c = _a.addonPadding, addonPadding = _c === void 0 ? 'default' : _c, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("section", { className: cn__default.default(styles__default.default.component, styles__default.default[addonPadding], styles__default.default[verticalAlign]), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'addon') }, children));
};

exports.Addon = Addon;
