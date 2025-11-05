var tslib_es6 = require('../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var colors = require('../colors.module.css');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var colors__default = /*#__PURE__*/_interopDefaultCompat(colors);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Text = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.view, view = _c === void 0 ? 'primary-medium' : _c, _d = _a.tag, Component = _d === void 0 ? 'span' : _d, weight = _a.weight, _e = _a.monospaceNumbers, monospaceNumbers = _e === void 0 ? false : _e, _f = _a.defaultMargins, defaultMargins = _f === void 0 ? true : _f, color = _a.color, className = _a.className, dataTestId = _a.dataTestId, children = _a.children, restProps = tslib_es6.__rest(_a, ["view", "tag", "weight", "monospaceNumbers", "defaultMargins", "color", "className", "dataTestId", "children"]);
    return (React__default.default.createElement(Component, tslib_es6.__assign({ className: cn__default.default((_b = {},
            _b[styles__default.default.paragraph] = Component === 'p' && !defaultMargins,
            _b[styles__default.default.paragraphWithMargins] = Component === 'p' && defaultMargins,
            _b[styles__default.default.monospace] = monospaceNumbers,
            _b), className, color && colors__default.default[color], styles__default.default[view], weight && styles__default.default[weight]), "data-test-id": dataTestId, ref: ref }, restProps), children));
});

exports.Text = Text;
