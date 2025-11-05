import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Step } from './components/step/Component.js';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/ClockMIcon';
import '@alfalab/icons-glyph/ExclamationCircleMIcon';
import './components/step-indicator/Component.js';
import '../../badge/esm';

var styles = {"component":"steps__component_1vbkf","vertical":"steps__vertical_1vbkf"};
require('./index.css');

var Steps = function (_a) {
    var _b;
    var className = _a.className, children = _a.children, _c = _a.defaultActiveStep, defaultActiveStep = _c === void 0 ? 1 : _c, activeStepProp = _a.activeStep, _d = _a.isMarkCompletedSteps, isMarkCompletedSteps = _d === void 0 ? true : _d, _e = _a.isVerticalAlign, isVerticalAlign = _e === void 0 ? false : _e, _f = _a.ordered, ordered = _f === void 0 ? true : _f, _g = _a.interactive, interactive = _g === void 0 ? true : _g, checkIsStepDisabled = _a.checkIsStepDisabled, checkIsStepError = _a.checkIsStepError, checkIsStepWarning = _a.checkIsStepWarning, checkIsStepWaiting = _a.checkIsStepWaiting, checkIsStepPositive = _a.checkIsStepPositive, checkIsStepCustom = _a.checkIsStepCustom, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var _h = useState(activeStepProp || defaultActiveStep), activeStep = _h[0], setActiveStep = _h[1];
    var stepsLength = React.Children.count(children);
    useEffect(function () {
        if (activeStepProp) {
            setActiveStep(activeStepProp);
        }
    }, [activeStepProp]);
    var handleStepClick = function (stepNumber) {
        setActiveStep(stepNumber);
        if (onChange) {
            onChange(stepNumber);
        }
    };
    if (!stepsLength)
        return null;
    return (React.createElement("div", { className: cn(className, styles.component, (_b = {},
            _b[styles.vertical] = isVerticalAlign,
            _b)), "data-test-id": dataTestId }, React.Children.map(children, function (step, index) {
        var stepNumber = index + 1;
        var isSelected = stepNumber === activeStep;
        var isStepCompleted = isMarkCompletedSteps && stepNumber < activeStep;
        var disabled = checkIsStepDisabled ? checkIsStepDisabled(stepNumber) : false;
        var isPositive = checkIsStepPositive ? checkIsStepPositive(stepNumber) : false;
        var isError = checkIsStepError ? checkIsStepError(stepNumber) : false;
        var isWarning = checkIsStepWarning ? checkIsStepWarning(stepNumber) : false;
        var isWaiting = checkIsStepWaiting ? checkIsStepWaiting(stepNumber) : false;
        var customStepIndicator = checkIsStepCustom && checkIsStepCustom(stepNumber);
        var isNotLastStep = stepsLength !== stepNumber;
        var isInteractive = !disabled && interactive;
        return (React.createElement(Step, { stepNumber: stepNumber, isSelected: isSelected, isStepCompleted: isStepCompleted, disabled: disabled, isPositive: isPositive, isError: isError, isWarning: isWarning, isWaiting: isWaiting, customStepIndicator: customStepIndicator, onClick: handleStepClick, ordered: ordered, interactive: isInteractive, isVerticalAlign: isVerticalAlign, isNotLastStep: isNotLastStep, key: stepNumber }, step));
    })));
};

export { Steps };
