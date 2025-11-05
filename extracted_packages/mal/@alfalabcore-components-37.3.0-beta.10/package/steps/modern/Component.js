import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Step } from './components/step/Component.js';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/ClockMIcon';
import '@alfalab/icons-glyph/ExclamationCircleMIcon';
import './components/step-indicator/Component.js';
import '../../badge/modern';

const styles = {"component":"steps__component_1vbkf","vertical":"steps__vertical_1vbkf"};
require('./index.css');

const Steps = ({ className, children, defaultActiveStep = 1, activeStep: activeStepProp, isMarkCompletedSteps = true, isVerticalAlign = false, ordered = true, interactive = true, checkIsStepDisabled, checkIsStepError, checkIsStepWarning, checkIsStepWaiting, checkIsStepPositive, checkIsStepCustom, onChange, dataTestId, }) => {
    const [activeStep, setActiveStep] = useState(activeStepProp || defaultActiveStep);
    const stepsLength = React.Children.count(children);
    useEffect(() => {
        if (activeStepProp) {
            setActiveStep(activeStepProp);
        }
    }, [activeStepProp]);
    const handleStepClick = (stepNumber) => {
        setActiveStep(stepNumber);
        if (onChange) {
            onChange(stepNumber);
        }
    };
    if (!stepsLength)
        return null;
    return (React.createElement("div", { className: cn(className, styles.component, {
            [styles.vertical]: isVerticalAlign,
        }), "data-test-id": dataTestId }, React.Children.map(children, (step, index) => {
        const stepNumber = index + 1;
        const isSelected = stepNumber === activeStep;
        const isStepCompleted = isMarkCompletedSteps && stepNumber < activeStep;
        const disabled = checkIsStepDisabled ? checkIsStepDisabled(stepNumber) : false;
        const isPositive = checkIsStepPositive ? checkIsStepPositive(stepNumber) : false;
        const isError = checkIsStepError ? checkIsStepError(stepNumber) : false;
        const isWarning = checkIsStepWarning ? checkIsStepWarning(stepNumber) : false;
        const isWaiting = checkIsStepWaiting ? checkIsStepWaiting(stepNumber) : false;
        const customStepIndicator = checkIsStepCustom && checkIsStepCustom(stepNumber);
        const isNotLastStep = stepsLength !== stepNumber;
        const isInteractive = !disabled && interactive;
        return (React.createElement(Step, { stepNumber: stepNumber, isSelected: isSelected, isStepCompleted: isStepCompleted, disabled: disabled, isPositive: isPositive, isError: isError, isWarning: isWarning, isWaiting: isWaiting, customStepIndicator: customStepIndicator, onClick: handleStepClick, ordered: ordered, interactive: isInteractive, isVerticalAlign: isVerticalAlign, isNotLastStep: isNotLastStep, key: stepNumber }, step));
    })));
};

export { Steps };
