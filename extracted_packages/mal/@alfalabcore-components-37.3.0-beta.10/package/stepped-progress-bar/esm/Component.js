import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/esm';
import { StepBar } from './components/step-bar/Component.js';

var styles = {"component":"stepped-progress-bar__component_gy1jv","stepsContainer":"stepped-progress-bar__stepsContainer_gy1jv","description":"stepped-progress-bar__description_gy1jv"};
require('./index.css');

var SteppedProgressBar = function (_a) {
    var maxStep = _a.maxStep, description = _a.description, _b = _a.step, step = _b === void 0 ? 0 : _b, view = _a.view, dataTestId = _a.dataTestId, className = _a.className;
    var validMaxSteps = maxStep <= 0 ? 1 : maxStep;
    var isViewString = typeof view === 'string';
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement("div", { className: styles.stepsContainer }, Array.from(Array(validMaxSteps), function (_, index) { return (React.createElement(StepBar, { key: index, isDone: index < step, view: (isViewString ? view : view === null || view === void 0 ? void 0 : view[index]) })); })),
        description && (React.createElement(Typography.Text, { tag: 'div', className: styles.description, view: 'primary-small' },
            "\u0428\u0430\u0433 ",
            step,
            " \u0438\u0437 ",
            maxStep,
            ": ",
            description))));
};

export { SteppedProgressBar };
