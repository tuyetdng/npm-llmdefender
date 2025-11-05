var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var GenericWrapper = function (_a) {
    var _b;
    var children = _a.children, padding = _a.padding, alignItems = _a.alignItems, justifyContent = _a.justifyContent, className = _a.className, dataTestId = _a.dataTestId, _c = _a.column, column = _c === void 0 ? false : _c, _d = _a.grow, grow = _d === void 0 ? false : _d;
    var paddingStyles = padding && (_b = {},
        _b[styles__default.default["padding-top-".concat(padding.top)]] = padding.top,
        _b[styles__default.default["padding-right-".concat(padding.right)]] = padding.right,
        _b[styles__default.default["padding-bottom-".concat(padding.bottom)]] = padding.bottom,
        _b[styles__default.default["padding-left-".concat(padding.left)]] = padding.left,
        _b);
    var alignmentStyles = alignItems && styles__default.default["align-".concat(alignItems)];
    var justifyContentStyles = justifyContent && styles__default.default["justify-".concat(justifyContent)];
    var growStyles = grow && styles__default.default.grow;
    var columnsStyles = column && styles__default.default.column;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, columnsStyles, alignmentStyles, paddingStyles, justifyContentStyles, growStyles, className), "data-test-id": dataTestId }, children));
};

exports.GenericWrapper = GenericWrapper;
