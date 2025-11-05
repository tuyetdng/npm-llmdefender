var React = require('react');
var cn = require('classnames');
var components_step_Component = require('./components/step/Component.js');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/ClockMIcon');
require('@alfalab/icons-glyph/ExclamationCircleMIcon');
require('./components/step-indicator/Component.js');
require('../badge');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"steps__component_1vbkf","vertical":"steps__vertical_1vbkf"};
require('./index.css');

var Steps = function (_a) {
    var _b;
    var className = _a.className, children = _a.children, _c = _a.defaultActiveStep, defaultActiveStep = _c === void 0 ? 1 : _c, activeStepProp = _a.activeStep, _d = _a.isMarkCompletedSteps, isMarkCompletedSteps = _d === void 0 ? true : _d, _e = _a.isVerticalAlign, isVerticalAlign = _e === void 0 ? false : _e, _f = _a.ordered, ordered = _f === void 0 ? true : _f, _g = _a.interactive, interactive = _g === void 0 ? true : _g, checkIsStepDisabled = _a.checkIsStepDisabled, checkIsStepError = _a.checkIsStepError, checkIsStepWarning = _a.checkIsStepWarning, checkIsStepWaiting = _a.checkIsStepWaiting, checkIsStepPositive = _a.checkIsStepPositive, checkIsStepCustom = _a.checkIsStepCustom, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var _h = React.useState(activeStepProp || defaultActiveStep), activeStep = _h[0], setActiveStep = _h[1];
    var stepsLength = React__default.default.Children.count(children);
    React.useEffect(function () {
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
    return (React__default.default.createElement("div", { className: cn__default.default(className, styles.component, (_b = {},
            _b[styles.vertical] = isVerticalAlign,
            _b)), "data-test-id": dataTestId }, React__default.default.Children.map(children, function (step, index) {
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
        return (React__default.default.createElement(components_step_Component.Step, { stepNumber: stepNumber, isSelected: isSelected, isStepCompleted: isStepCompleted, disabled: disabled, isPositive: isPositive, isError: isError, isWarning: isWarning, isWaiting: isWaiting, customStepIndicator: customStepIndicator, onClick: handleStepClick, ordered: ordered, interactive: isInteractive, isVerticalAlign: isVerticalAlign, isNotLastStep: isNotLastStep, key: stepNumber }, step));
    })));
};

exports.Steps = Steps;
