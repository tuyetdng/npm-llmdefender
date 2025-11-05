var React = require('react');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pure-cell__component_fwqxv","none":"pure-cell__none_fwqxv","default":"pure-cell__default_fwqxv","addonPadding":"pure-cell__addonPadding_fwqxv","top":"pure-cell__top_fwqxv","center":"pure-cell__center_fwqxv","bottom":"pure-cell__bottom_fwqxv"};
require('./index.css');

var Addon = function (_a) {
    var children = _a.children, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b, _c = _a.addonPadding, addonPadding = _c === void 0 ? 'default' : _c, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("section", { className: cn__default.default(styles.component, styles[addonPadding], styles[verticalAlign]), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'addon') }, children));
};

exports.Addon = Addon;
