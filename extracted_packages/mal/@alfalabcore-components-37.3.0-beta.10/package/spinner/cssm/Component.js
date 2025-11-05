var React = require('react');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var defaultColors = require('./default.module.css');
var styles = require('./index.module.css');
var invertedColors = require('./inverted.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var defaultColors__default = /*#__PURE__*/_interopDefaultCompat(defaultColors);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var invertedColors__default = /*#__PURE__*/_interopDefaultCompat(invertedColors);

var colorStyles = {
    default: defaultColors__default.default,
    inverted: invertedColors__default.default,
};
var CONFIG = {
    xs: {
        padding: 1,
        lineWidth: 2,
        size: 18,
    },
    s: {
        padding: 2,
        lineWidth: 2,
        size: 24,
    },
    m: {
        padding: 4,
        lineWidth: 4,
        size: 48,
    },
};
var Spinner = function (_a) {
    var _b;
    var _c = _a.size, sizeProp = _c === void 0 ? 's' : _c, _d = _a.colors, colors = _d === void 0 ? 'default' : _d, visible = _a.visible, id = _a.id, className = _a.className, dataTestId = _a.dataTestId;
    var uniqId = hooks.useId();
    var _e = CONFIG[sizeProp], size = _e.size, padding = _e.padding, lineWidth = _e.lineWidth;
    var xStart = padding + lineWidth / 2;
    var xEnd = size - xStart;
    var y = size / 2;
    var r = y - xStart;
    var topGradientId = "".concat(uniqId, "_top");
    var bottomGradientId = "".concat(uniqId, "_bottom");
    return (React__default.default.createElement("svg", { viewBox: "0 0 ".concat(size, " ").concat(size), fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: cn__default.default(styles__default.default.spinner, colorStyles[colors].component, styles__default.default[sizeProp], className, (_b = {},
            _b[styles__default.default.visible] = visible,
            _b)), "data-test-id": dataTestId, id: id },
        React__default.default.createElement("defs", null,
            React__default.default.createElement("linearGradient", { id: topGradientId, x1: '0.05' },
                React__default.default.createElement("stop", { offset: '0.1', stopOpacity: '0', stopColor: 'currentColor' }),
                React__default.default.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' })),
            React__default.default.createElement("linearGradient", { id: bottomGradientId, x1: '0.05' },
                React__default.default.createElement("stop", { offset: '0', stopOpacity: '1', stopColor: 'currentColor' }),
                React__default.default.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' }))),
        React__default.default.createElement("g", { strokeWidth: lineWidth },
            React__default.default.createElement("path", { stroke: "url(#".concat(topGradientId, ")"), d: "M".concat(xStart, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xEnd, ",").concat(y) }),
            React__default.default.createElement("path", { stroke: "url(#".concat(bottomGradientId, ")"), d: "M".concat(xEnd, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xStart, ",").concat(y) }),
            React__default.default.createElement("path", { stroke: 'currentColor', strokeLinecap: 'round', d: "M".concat(xStart, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xStart, " ").concat(y) }))));
};

exports.Spinner = Spinner;
