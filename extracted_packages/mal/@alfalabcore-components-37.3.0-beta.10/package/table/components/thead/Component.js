var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"table__component_5ojpo","row":"table__row_5ojpo"};
require('./index.css');

var THead = function (_a) {
    var className = _a.className, rowClassName = _a.rowClassName, children = _a.children, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["className", "rowClassName", "children", "dataTestId"]);
    return (React__default.default.createElement("thead", tslib_es6.__assign({ className: cn__default.default(styles.component, className), "data-test-id": dataTestId }, restProps),
        React__default.default.createElement("tr", { className: cn__default.default(styles.row, rowClassName) }, children)));
};

exports.THead = THead;
