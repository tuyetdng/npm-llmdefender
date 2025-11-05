var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"table__component_1bpoe"};
require('./index.css');

var TBody = function (_a) {
    var className = _a.className, children = _a.children, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["className", "children", "dataTestId"]);
    return (React__default.default.createElement("tbody", tslib_es6.__assign({ className: cn__default.default(styles.component, className), "data-test-id": dataTestId }, restProps), children));
};

exports.TBody = TBody;
