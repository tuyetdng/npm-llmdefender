var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../typography');
var components_stepBar_Component = require('./components/step-bar/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"stepped-progress-bar__component_gy1jv","stepsContainer":"stepped-progress-bar__stepsContainer_gy1jv","description":"stepped-progress-bar__description_gy1jv"};
require('./index.css');

var SteppedProgressBar = function (_a) {
    var maxStep = _a.maxStep, description = _a.description, _b = _a.step, step = _b === void 0 ? 0 : _b, view = _a.view, dataTestId = _a.dataTestId, className = _a.className;
    var validMaxSteps = maxStep <= 0 ? 1 : maxStep;
    var isViewString = typeof view === 'string';
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, className), "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: styles.stepsContainer }, Array.from(Array(validMaxSteps), function (_, index) { return (React__default.default.createElement(components_stepBar_Component.StepBar, { key: index, isDone: index < step, view: (isViewString ? view : view === null || view === void 0 ? void 0 : view[index]) })); })),
        description && (React__default.default.createElement(coreComponentsTypography.Typography.Text, { tag: 'div', className: styles.description, view: 'primary-small' },
            "\u0428\u0430\u0433 ",
            step,
            " \u0438\u0437 ",
            maxStep,
            ": ",
            description))));
};

exports.SteppedProgressBar = SteppedProgressBar;
