import React from 'react';
import cn from 'classnames';
import { useId } from '@alfalab/hooks';

var defaultColors = {"component":"spinner__component_15ktg"};
require('./default.css');

var styles = {"spinner":"spinner__spinner_3xla8","spin_animation":"spinner__spin_animation_3xla8","visible":"spinner__visible_3xla8","xs":"spinner__xs_3xla8","s":"spinner__s_3xla8","m":"spinner__m_3xla8"};
require('./index.css');

var invertedColors = {"component":"spinner__component_6zxa5"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
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
    var uniqId = useId();
    var _e = CONFIG[sizeProp], size = _e.size, padding = _e.padding, lineWidth = _e.lineWidth;
    var xStart = padding + lineWidth / 2;
    var xEnd = size - xStart;
    var y = size / 2;
    var r = y - xStart;
    var topGradientId = "".concat(uniqId, "_top");
    var bottomGradientId = "".concat(uniqId, "_bottom");
    return (React.createElement("svg", { viewBox: "0 0 ".concat(size, " ").concat(size), fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: cn(styles.spinner, colorStyles[colors].component, styles[sizeProp], className, (_b = {},
            _b[styles.visible] = visible,
            _b)), "data-test-id": dataTestId, id: id },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: topGradientId, x1: '0.05' },
                React.createElement("stop", { offset: '0.1', stopOpacity: '0', stopColor: 'currentColor' }),
                React.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' })),
            React.createElement("linearGradient", { id: bottomGradientId, x1: '0.05' },
                React.createElement("stop", { offset: '0', stopOpacity: '1', stopColor: 'currentColor' }),
                React.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' }))),
        React.createElement("g", { strokeWidth: lineWidth },
            React.createElement("path", { stroke: "url(#".concat(topGradientId, ")"), d: "M".concat(xStart, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xEnd, ",").concat(y) }),
            React.createElement("path", { stroke: "url(#".concat(bottomGradientId, ")"), d: "M".concat(xEnd, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xStart, ",").concat(y) }),
            React.createElement("path", { stroke: 'currentColor', strokeLinecap: 'round', d: "M".concat(xStart, ",").concat(y, " A").concat(r, ",").concat(r, " 0 0 1 ").concat(xStart, " ").concat(y) }))));
};

export { Spinner };
