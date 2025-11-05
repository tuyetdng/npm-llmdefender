var React = require('react');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var ClockMIcon = require('@alfalab/icons-glyph/ClockMIcon');
var ExclamationCircleMIcon = require('@alfalab/icons-glyph/ExclamationCircleMIcon');
var components_stepIndicator_Component = require('../step-indicator/Component.js');
var styles = require('./index.module.css');
require('../../../../badge/cssm');
require('../step-indicator/index.module.css');

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

var Step = function (_a) {
    var _b, _c, _d, _e;
    var children = _a.children, stepNumber = _a.stepNumber, isSelected = _a.isSelected, disabled = _a.disabled, ordered = _a.ordered, isPositive = _a.isPositive, isError = _a.isError, isWarning = _a.isWarning, isWaiting = _a.isWaiting, customStepIndicator = _a.customStepIndicator, isStepCompleted = _a.isStepCompleted, onClick = _a.onClick, interactive = _a.interactive, isVerticalAlign = _a.isVerticalAlign, isNotLastStep = _a.isNotLastStep;
    var stepRef = React.useRef(null);
    var focused = hooks.useFocus(stepRef, 'keyboard')[0];
    var handleButtonClick = function () {
        if (!disabled && interactive && onClick) {
            onClick(stepNumber);
        }
    };
    var handleTextClick = function (e) {
        if (!interactive) {
            e.stopPropagation();
        }
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };
    var getStepIndicator = function () {
        if (customStepIndicator) {
            return React__default.default.createElement(components_stepIndicator_Component.StepIndicator, __assign({}, customStepIndicator));
        }
        if (isError) {
            return React__default.default.createElement(components_stepIndicator_Component.StepIndicator, { iconColor: 'negative', content: React__default.default.createElement(ExclamationCircleMIcon.ExclamationCircleMIcon, null) });
        }
        if (isWarning) {
            return React__default.default.createElement(components_stepIndicator_Component.StepIndicator, { iconColor: 'attention', content: React__default.default.createElement(ExclamationCircleMIcon.ExclamationCircleMIcon, null) });
        }
        if (isWaiting) {
            return React__default.default.createElement(components_stepIndicator_Component.StepIndicator, { iconColor: 'secondary', content: React__default.default.createElement(ClockMIcon.ClockMIcon, null) });
        }
        if (isPositive) {
            return React__default.default.createElement(components_stepIndicator_Component.StepIndicator, { iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, null) });
        }
        if (isStepCompleted) {
            return (React__default.default.createElement(components_stepIndicator_Component.StepIndicator, { iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, null), className: styles__default.default.completedIndicator }));
        }
        if (!ordered) {
            return (React__default.default.createElement("div", { className: styles__default.default.checkbox },
                React__default.default.createElement("span", { className: styles__default.default.dot })));
        }
        return stepNumber;
    };
    var renderDash = function () {
        var _a;
        return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.dash, (_a = {},
                _a[styles__default.default.vertical] = isVerticalAlign,
                _a[styles__default.default.completed] = isStepCompleted,
                _a)) }));
    };
    return (React__default.default.createElement("div", { role: 'button', tabIndex: 0, ref: stepRef, className: cn__default.default(styles__default.default.step, (_b = {},
            _b[styles__default.default.completed] = isStepCompleted,
            _b[styles__default.default.error] = isError,
            _b[styles__default.default.selected] = isSelected,
            _b[styles__default.default.disabled] = disabled,
            _b[styles__default.default.focused] = focused,
            _b[styles__default.default.vertical] = isVerticalAlign,
            _b[styles__default.default.interactive] = interactive,
            _b)), onClick: handleButtonClick, onKeyDown: handleKeyDown },
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.indicator, (_c = {},
                _c[styles__default.default.vertical] = isVerticalAlign,
                _c[styles__default.default.interactive] = interactive,
                _c)) },
            React__default.default.createElement("div", { className: cn__default.default(styles__default.default.option, (_d = {},
                    _d[styles__default.default.unordered] = !ordered,
                    _d[styles__default.default.vertical] = isVerticalAlign,
                    _d[styles__default.default.error] = isError,
                    _d)) }, getStepIndicator()),
            isNotLastStep && isVerticalAlign && renderDash()),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.text, (_e = {},
                _e[styles__default.default.interactive] = interactive,
                _e)), onClick: handleTextClick }, children),
        isNotLastStep && !isVerticalAlign && renderDash()));
};

exports.Step = Step;
