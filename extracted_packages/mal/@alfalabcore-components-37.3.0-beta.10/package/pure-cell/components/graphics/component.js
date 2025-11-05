var React = require('react');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pure-cell__component_1dpzp","top":"pure-cell__top_1dpzp","center":"pure-cell__center_1dpzp","bottom":"pure-cell__bottom_1dpzp"};
require('./index.css');

var Graphics = function (_a) {
    var children = _a.children, dataTestId = _a.dataTestId, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b;
    return (React__default.default.createElement("section", { className: cn__default.default(styles.component, styles[verticalAlign]), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'graphics') }, children));
};

exports.Graphics = Graphics;
