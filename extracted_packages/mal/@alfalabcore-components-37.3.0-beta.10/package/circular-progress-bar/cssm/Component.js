var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../../typography/cssm');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var SIZES = {
    xs: 24,
    s: 48,
    m: 64,
    l: 80,
    xl: 128,
    xxl: 144,
};
var STROKE = {
    xs: 4,
    s: 4,
    m: 6,
    l: 8,
    xl: 10,
    xxl: 12,
};
var VIEW_TITLE = {
    xs: 'small',
    s: 'small',
    m: 'small',
    l: 'xsmall',
    xl: 'medium',
    xxl: 'medium',
};
var VIEW_TEXT = {
    xs: 'secondary-small',
    s: 'secondary-small',
    m: 'secondary-large',
    l: 'secondary-large',
    xl: 'secondary-large',
    xxl: 'secondary-large',
};
/**
 * Компонент круглого прогресс бара.
 */
var CircularProgressBar = function (_a) {
    var _b, _c, _d;
    var value = _a.value, _e = _a.view, view = _e === void 0 ? 'positive' : _e, _f = _a.size, size = _f === void 0 ? 'm' : _f, className = _a.className, dataTestId = _a.dataTestId, _g = _a.title, title = _g === void 0 ? value ? value.toString() : '0' : _g, titleComplete = _a.titleComplete, subtitle = _a.subtitle, _h = _a.contentColor, contentColor = _h === void 0 ? 'secondary' : _h, subtitleComplete = _a.subtitleComplete, _j = _a.stroke, stroke = _j === void 0 ? true : _j, fillComplete = _a.fillComplete, Icon = _a.icon, IconComplete = _a.iconComplete, completeTextColor = _a.completeTextColor, _k = _a.completeIconColor, completeIconColor = _k === void 0 ? 'tertiary' : _k, _l = _a.direction, direction = _l === void 0 ? 'clockwise' : _l, height = _a.height, children = _a.children;
    var memorized = React.useMemo(function () {
        var strokeWidth = STROKE[size];
        var maxProgress = 100;
        var minProgress = 0;
        var widthSVG = SIZES[size];
        var heightSVG = SIZES[size];
        var center = widthSVG / 2;
        var radius = center - strokeWidth / 2;
        var circumference = Math.PI * radius * 2;
        var progress = Math.min(Math.max(value, minProgress), maxProgress);
        var strokeDasharray = circumference.toFixed(3);
        var strokeDashoffset = (((100 - progress) / 100) * circumference).toFixed(3);
        return {
            widthSVG: widthSVG,
            heightSVG: heightSVG,
            center: center,
            radius: radius,
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
        };
    }, [value, size]);
    var isComplete = value === 100;
    var isCompleteTextColor = isComplete && completeTextColor;
    var titleContent = titleComplete && isComplete ? titleComplete : title;
    var subtitleContent = subtitleComplete && isComplete ? subtitleComplete : subtitle;
    var IconComponent = IconComplete && isComplete ? IconComplete : Icon;
    var renderTitleString = function () {
        return SIZES[size] > 64 ? (React__default.default.createElement(coreComponentsTypography.Typography.TitleMobile, { className: cn__default.default(styles__default.default.typography, styles__default.default.title), color: isCompleteTextColor ? completeTextColor : contentColor, tag: 'div', font: 'system', view: VIEW_TITLE[size] }, titleContent)) : (React__default.default.createElement(coreComponentsTypography.Typography.Text, { className: styles__default.default.title, color: isCompleteTextColor ? completeTextColor : contentColor, tag: 'div', weight: 'bold', view: VIEW_TEXT[size] }, titleContent));
    };
    var renderTitle = function () { return (typeof title === 'string' ? renderTitleString() : titleContent); };
    var renderSubTitle = function () {
        return typeof subtitle === 'string' ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { tag: 'div', className: styles__default.default.subtitle, color: isCompleteTextColor ? completeTextColor : contentColor, view: 'primary-small' }, subtitleContent)) : (subtitleContent);
    };
    var renderIcon = function () {
        var _a;
        return (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.iconWrapper, styles__default.default[size], styles__default.default.tertiary, styles__default.default["icon-".concat(contentColor)], (_a = {},
                _a[styles__default.default["icon-".concat(completeIconColor)]] = completeIconColor,
                _a)) }, IconComponent && React__default.default.createElement(IconComponent, { className: styles__default.default.icon })));
    };
    var renderContent = function () {
        return Icon || (IconComplete && isComplete) ? (renderIcon()) : (React__default.default.createElement(React__default.default.Fragment, null,
            SIZES[size] > 24 && renderTitle(),
            SIZES[size] > 64 && renderSubTitle()));
    };
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[size], className), style: __assign({}, (height && { height: height, width: height })), "data-test-id": dataTestId },
        React__default.default.createElement("svg", { viewBox: "0 0 ".concat(memorized.widthSVG, " ").concat(memorized.heightSVG), className: styles__default.default.svg, xmlns: 'http://www.w3.org/2000/svg' },
            React__default.default.createElement("circle", { className: cn__default.default(styles__default.default.backgroundCircle, styles__default.default[size], (_b = {},
                    _b[styles__default.default.stroke] = !stroke,
                    _b)), cx: memorized.center, cy: memorized.center, r: memorized.radius, strokeWidth: STROKE[size] }),
            React__default.default.createElement("circle", { className: cn__default.default(styles__default.default.progressCircle, styles__default.default[view], styles__default.default[size], (_c = {},
                    _c[styles__default.default["bg-".concat(view)]] = fillComplete && isComplete,
                    _c)), cx: memorized.center, cy: memorized.center, r: memorized.radius, strokeWidth: STROKE[size], strokeDasharray: memorized.strokeDasharray, strokeDashoffset: direction === 'counter-clockwise'
                    ? -memorized.strokeDashoffset
                    : memorized.strokeDashoffset, transform: "rotate(".concat(-90, " ").concat(memorized.center, " ").concat(memorized.center, ")") })),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.labelWrapper, (_d = {},
                _d[styles__default.default.label] = Icon || IconComplete,
                _d)) }, children || renderContent())));
};

exports.CircularProgressBar = CircularProgressBar;
