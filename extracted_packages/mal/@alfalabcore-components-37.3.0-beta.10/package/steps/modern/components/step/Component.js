import React, { useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';
import { StepIndicator } from '../step-indicator/Component.js';
import '../../../../badge/modern';

const styles = {"step":"steps__step_urpih","vertical":"steps__vertical_urpih","interactive":"steps__interactive_urpih","disabled":"steps__disabled_urpih","text":"steps__text_urpih","indicator":"steps__indicator_urpih","option":"steps__option_urpih","dash":"steps__dash_urpih","completed":"steps__completed_urpih","focused":"steps__focused_urpih","selected":"steps__selected_urpih","checkbox":"steps__checkbox_urpih","dot":"steps__dot_urpih","error":"steps__error_urpih","unordered":"steps__unordered_urpih","completedIndicator":"steps__completedIndicator_urpih"};
require('./index.css');

const Step = ({ children, stepNumber, isSelected, disabled, ordered, isPositive, isError, isWarning, isWaiting, customStepIndicator, isStepCompleted, onClick, interactive, isVerticalAlign, isNotLastStep, }) => {
    const stepRef = useRef(null);
    const [focused] = useFocus(stepRef, 'keyboard');
    const handleButtonClick = () => {
        if (!disabled && interactive && onClick) {
            onClick(stepNumber);
        }
    };
    const handleTextClick = (e) => {
        if (!interactive) {
            e.stopPropagation();
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };
    const getStepIndicator = () => {
        if (customStepIndicator) {
            return React.createElement(StepIndicator, { ...customStepIndicator });
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
    const renderDash = () => (React.createElement("div", { className: cn(styles.dash, {
            [styles.vertical]: isVerticalAlign,
            [styles.completed]: isStepCompleted,
        }) }));
    return (React.createElement("div", { role: 'button', tabIndex: 0, ref: stepRef, className: cn(styles.step, {
            [styles.completed]: isStepCompleted,
            [styles.error]: isError,
            [styles.selected]: isSelected,
            [styles.disabled]: disabled,
            [styles.focused]: focused,
            [styles.vertical]: isVerticalAlign,
            [styles.interactive]: interactive,
        }), onClick: handleButtonClick, onKeyDown: handleKeyDown },
        React.createElement("div", { className: cn(styles.indicator, {
                [styles.vertical]: isVerticalAlign,
                [styles.interactive]: interactive,
            }) },
            React.createElement("div", { className: cn(styles.option, {
                    [styles.unordered]: !ordered,
                    [styles.vertical]: isVerticalAlign,
                    [styles.error]: isError,
                }) }, getStepIndicator()),
            isNotLastStep && isVerticalAlign && renderDash()),
        React.createElement("div", { className: cn(styles.text, {
                [styles.interactive]: interactive,
            }), onClick: handleTextClick }, children),
        isNotLastStep && !isVerticalAlign && renderDash()));
};

export { Step };
