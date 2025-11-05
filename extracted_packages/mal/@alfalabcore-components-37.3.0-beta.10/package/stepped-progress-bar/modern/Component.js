import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/modern';
import { StepBar } from './components/step-bar/Component.js';

const styles = {"component":"stepped-progress-bar__component_gy1jv","stepsContainer":"stepped-progress-bar__stepsContainer_gy1jv","description":"stepped-progress-bar__description_gy1jv"};
require('./index.css');

const SteppedProgressBar = ({ maxStep, description, step = 0, view, dataTestId, className, }) => {
    const validMaxSteps = maxStep <= 0 ? 1 : maxStep;
    const isViewString = typeof view === 'string';
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement("div", { className: styles.stepsContainer }, Array.from(Array(validMaxSteps), (_, index) => (React.createElement(StepBar, { key: index, isDone: index < step, view: (isViewString ? view : view?.[index]) })))),
        description && (React.createElement(Typography.Text, { tag: 'div', className: styles.description, view: 'primary-small' },
            "\u0428\u0430\u0433 ",
            step,
            " \u0438\u0437 ",
            maxStep,
            ": ",
            description))));
};

export { SteppedProgressBar };
