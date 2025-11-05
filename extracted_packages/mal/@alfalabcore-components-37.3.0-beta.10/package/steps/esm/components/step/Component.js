import React, { useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';
import { StepIndicator } from '../step-indicator/Component.js';
import '../../../../badge/esm';

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

var styles = {"step":"steps__step_urpih","vertical":"steps__vertical_urpih","interactive":"steps__interactive_urpih","disabled":"steps__disabled_urpih","text":"steps__text_urpih","indicator":"steps__indicator_urpih","option":"steps__option_urpih","dash":"steps__dash_urpih","completed":"steps__completed_urpih","focused":"steps__focused_urpih","selected":"steps__selected_urpih","checkbox":"steps__checkbox_urpih","dot":"steps__dot_urpih","error":"steps__error_urpih","unordered":"steps__unordered_urpih","completedIndicator":"steps__completedIndicator_urpih"};
require('./index.css');

var Step = function (_a) {
    var _b, _c, _d, _e;
    var children = _a.children, stepNumber = _a.stepNumber, isSelected = _a.isSelected, disabled = _a.disabled, ordered = _a.ordered, isPositive = _a.isPositive, isError = _a.isError, isWarning = _a.isWarning, isWaiting = _a.isWaiting, customStepIndicator = _a.customStepIndicator, isStepCompleted = _a.isStepCompleted, onClick = _a.onClick, interactive = _a.interactive, isVerticalAlign = _a.isVerticalAlign, isNotLastStep = _a.isNotLastStep;
    var stepRef = useRef(null);
    var focused = useFocus(stepRef, 'keyboard')[0];
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
            return React.createElement(StepIndicator, __assign({}, customStepIndicator));
        }
        if (isError) {
            return React.createElement(StepIndicator, { iconColor: 'negative', content: React.createElement(ExclamationCircleMIcon, null) });
        }
        if (isWarning) {
            return React.createElement(StepIndicator, { iconColor: 'attention', content: React.createElement(ExclamationCircleMIcon, null) });
        }
        if (isWaiting) {
            return React.createElement(StepIndicator, { iconColor: 'secondary', content: React.createElement(ClockMIcon, null) });
        }
        if (isPositive) {
            return React.createElement(StepIndicator, { iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, null) });
        }
        if (isStepCompleted) {
            return (React.createElement(StepIndicator, { iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, null), className: styles.completedIndicator }));
        }
        if (!ordered) {
            return (React.createElement("div", { className: styles.checkbox },
                React.createElement("span", { className: styles.dot })));
        }
        return stepNumber;
    };
    var renderDash = function () {
        var _a;
        return (React.createElement("div", { className: cn(styles.dash, (_a = {},
                _a[styles.vertical] = isVerticalAlign,
                _a[styles.completed] = isStepCompleted,
                _a)) }));
    };
    return (React.createElement("div", { role: 'button', tabIndex: 0, ref: stepRef, className: cn(styles.step, (_b = {},
            _b[styles.completed] = isStepCompleted,
            _b[styles.error] = isError,
            _b[styles.selected] = isSelected,
            _b[styles.disabled] = disabled,
            _b[styles.focused] = focused,
            _b[styles.vertical] = isVerticalAlign,
            _b[styles.interactive] = interactive,
            _b)), onClick: handleButtonClick, onKeyDown: handleKeyDown },
        React.createElement("div", { className: cn(styles.indicator, (_c = {},
                _c[styles.vertical] = isVerticalAlign,
                _c[styles.interactive] = interactive,
                _c)) },
            React.createElement("div", { className: cn(styles.option, (_d = {},
                    _d[styles.unordered] = !ordered,
                    _d[styles.vertical] = isVerticalAlign,
                    _d[styles.error] = isError,
                    _d)) }, getStepIndicator()),
            isNotLastStep && isVerticalAlign && renderDash()),
        React.createElement("div", { className: cn(styles.text, (_e = {},
                _e[styles.interactive] = interactive,
                _e)), onClick: handleTextClick }, children),
        isNotLastStep && !isVerticalAlign && renderDash()));
};

export { Step };
