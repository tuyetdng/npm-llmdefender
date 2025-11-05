var React = require('react');
var cn = require('classnames');
var ChevronDownCompactSIcon = require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
var utils = require('../../utils.js');
var components_selectButton_Component = require('../select-button/Component.js');
var styles = require('./index.module.css');
require('date-fns/addDays');
require('date-fns/addMonths');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
require('date-fns/endOfWeek');
require('date-fns/endOfYear');
require('date-fns/format');
require('date-fns/isAfter');
require('date-fns/isBefore');
require('date-fns/isSameDay');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/startOfDay');
require('date-fns/startOfMonth');
require('date-fns/startOfWeek');
require('date-fns/startOfYear');
require('date-fns/subDays');
require('date-fns/subMonths');
require('../../tslib.es6-0e9bf404.js');
require('../../../../button/cssm');
require('../select-button/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var MonthYearHeader = function (_a) {
    var value = _a.value, className = _a.className, onMonthClick = _a.onMonthClick, onYearClick = _a.onYearClick, dataTestId = _a.dataTestId;
    var month = value ? utils.monthName(value) : undefined;
    var year = value ? value.getFullYear().toString() : undefined;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className), "aria-live": 'polite', "data-test-id": dataTestId },
        React__default.default.createElement(components_selectButton_Component.SelectButton, { view: 'filled', className: cn__default.default(styles__default.default.button, styles__default.default.month), onClick: onMonthClick },
            React__default.default.createElement("span", { className: styles__default.default.buttonContent },
                month,
                React__default.default.createElement(ChevronDownCompactSIcon.ChevronDownCompactSIcon, { className: styles__default.default.upDownIcon }))),
        React__default.default.createElement(components_selectButton_Component.SelectButton, { view: 'filled', className: cn__default.default(styles__default.default.button, styles__default.default.year), onClick: onYearClick },
            React__default.default.createElement("span", { className: styles__default.default.buttonContent },
                year,
                React__default.default.createElement(ChevronDownCompactSIcon.ChevronDownCompactSIcon, { className: styles__default.default.upDownIcon })))));
};

exports.MonthYearHeader = MonthYearHeader;
