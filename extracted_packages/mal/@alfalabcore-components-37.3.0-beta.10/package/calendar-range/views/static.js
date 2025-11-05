var index_module = require('../index.module-0cee42f1.js');
var React = require('react');
var cn = require('classnames');
var addMonths = require('date-fns/addMonths');
var endOfMonth = require('date-fns/endOfMonth');
var max = require('date-fns/max');
var startOfMonth = require('date-fns/startOfMonth');
var subMonths = require('date-fns/subMonths');
var coreComponentsCalendar = require('../../calendar');
var coreComponentsCalendarInput = require('../../calendar-input');
var coreComponentsDateInput = require('../../date-input');
var components_divider_Component = require('../components/divider/Component.js');
var hooks = require('../hooks.js');
var utils = require('../utils.js');
require('date-fns/isEqual');
require('date-fns/min');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var addMonths__default = /*#__PURE__*/_interopDefaultCompat(addMonths);
var endOfMonth__default = /*#__PURE__*/_interopDefaultCompat(endOfMonth);
var max__default = /*#__PURE__*/_interopDefaultCompat(max);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var subMonths__default = /*#__PURE__*/_interopDefaultCompat(subMonths);

var CalendarRangeStatic = function (_a) {
    var className = _a.className, _b = _a.defaultMonth, defaultMonth = _b === void 0 ? startOfMonth__default.default(new Date()).getTime() : _b, _c = _a.defaultMonthPosition, defaultMonthPosition = _c === void 0 ? 'left' : _c, minDate = _a.minDate, maxDate = _a.maxDate, _d = _a.valueFrom, valueFrom = _d === void 0 ? '' : _d, _e = _a.valueTo, valueTo = _e === void 0 ? '' : _e, _f = _a.onDateFromChange, onDateFromChange = _f === void 0 ? function () { return null; } : _f, _g = _a.onDateToChange, onDateToChange = _g === void 0 ? function () { return null; } : _g, _h = _a.onChange, onChange = _h === void 0 ? function () { return null; } : _h, onError = _a.onError, _j = _a.inputFromProps, inputFromProps = _j === void 0 ? {} : _j, _k = _a.inputToProps, inputToProps = _k === void 0 ? {} : _k, offDays = _a.offDays, events = _a.events, dataTestId = _a.dataTestId;
    var _l = React.useState(valueFrom), inputFromValue = _l[0], setInputFromValue = _l[1];
    var _m = React.useState(valueTo), inputToValue = _m[0], setInputToValue = _m[1];
    var dateFrom = coreComponentsCalendarInput.isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? coreComponentsCalendarInput.parseDateString(inputFromValue).getTime()
        : null;
    var dateTo = coreComponentsCalendarInput.isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? coreComponentsCalendarInput.parseDateString(inputToValue).getTime()
        : null;
    if (coreComponentsDateInput.isCompleteDateInput(inputToValue) && !dateTo) {
        dateFrom = null;
    }
    var bothInvalid = coreComponentsDateInput.isCompleteDateInput(inputFromValue) &&
        coreComponentsDateInput.isCompleteDateInput(inputToValue) &&
        coreComponentsCalendarInput.parseDateString(inputFromValue).getTime() > coreComponentsCalendarInput.parseDateString(inputToValue).getTime();
    var _o = React.useState(undefined), highlightedDate = _o[0], setHighlightedDate = _o[1];
    var period = coreComponentsCalendar.usePeriodWithReset({
        initialSelectedFrom: dateFrom ? coreComponentsCalendarInput.parseDateString(inputFromValue).getTime() : undefined,
        initialSelectedTo: dateTo ? coreComponentsCalendarInput.parseDateString(inputToValue).getTime() : undefined,
    });
    var validateInputFromValue = React.useCallback(function (value) { return coreComponentsCalendarInput.isValidInputValue(value, minDate, dateFrom || maxDate, offDays); }, [dateFrom, maxDate, minDate, offDays]);
    var validateInputToValue = React.useCallback(function (value) { return coreComponentsCalendarInput.isValidInputValue(value, dateFrom || minDate, maxDate, offDays); }, [dateFrom, minDate, maxDate, offDays]);
    var _p = React.useState(coreComponentsDateInput.isCompleteDateInput(inputFromValue) && dateFrom === null), inputFromInvalid = _p[0], setInputFromInvalid = _p[1];
    var _q = React.useState(coreComponentsDateInput.isCompleteDateInput(inputToValue) && dateTo === null), inputToInvalid = _q[0], setInputToInvalid = _q[1];
    var hasValidateError = bothInvalid || inputFromInvalid || inputToInvalid;
    var _r = hooks.useStaticViewMonthes({
        selectedFrom: period.selectedFrom,
        selectedTo: period.selectedTo,
        defaultMonth: defaultMonth,
        defaultMonthPosition: defaultMonthPosition,
    }), monthFrom = _r.monthFrom, monthTo = _r.monthTo, handleMonthFromChange = _r.handleMonthFromChange, handleMonthToChange = _r.handleMonthToChange;
    var handleValidInputFrom = React.useCallback(function () {
        setInputFromInvalid(inputFromValue !== '' && !validateInputFromValue(inputFromValue));
    }, [inputFromValue, validateInputFromValue]);
    var handleValidInputTo = React.useCallback(function () {
        setInputToInvalid(inputToValue !== '' && !validateInputToValue(inputToValue));
    }, [inputToValue, validateInputToValue]);
    var handleInputFromChange = React.useCallback(function (_, payload) {
        setInputFromValue(payload.value);
    }, []);
    var handleInputToChange = React.useCallback(function (_, payload) {
        setInputToValue(payload.value);
    }, []);
    var handleMouseOver = React.useCallback(function (event) {
        var target = event.target;
        var mouseOverDayButton = utils.isDayButton(target) || utils.isDayButton(target.parentElement);
        var date;
        if (mouseOverDayButton) {
            var button = target.tagName === 'BUTTON' ? target : target.parentElement;
            if (button.dataset.date) {
                date = +button.dataset.date;
            }
        }
        setHighlightedDate(date);
    }, []);
    var handleClearFrom = React.useCallback(function () {
        setInputFromValue('');
    }, []);
    var handleClearTo = React.useCallback(function () {
        setInputToValue('');
    }, []);
    React.useEffect(function () {
        setInputFromValue(period.selectedFrom ? coreComponentsCalendarInput.formatDate(period.selectedFrom) : '');
    }, [period.selectedFrom]);
    React.useEffect(function () {
        setInputToValue(period.selectedTo ? coreComponentsCalendarInput.formatDate(period.selectedTo) : '');
    }, [period.selectedTo]);
    React.useEffect(function () {
        setInputFromValue(valueFrom);
    }, [valueFrom]);
    React.useEffect(function () {
        setInputToValue(valueTo);
    }, [valueTo]);
    React.useEffect(function () {
        if (!inputFromValue || coreComponentsDateInput.isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        period.setStart(dateFrom || undefined);
        if (dateTo) {
            period.setEnd(dateTo);
        }
        if (inputFromValue !== valueFrom) {
            onDateFromChange({
                value: inputFromValue,
                date: dateFrom,
            });
            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom: dateFrom,
                dateTo: dateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);
    React.useEffect(function () {
        if (!inputToValue || coreComponentsDateInput.isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        period.setEnd(dateTo || undefined);
        if (dateFrom) {
            period.setStart(dateFrom);
        }
        if (inputToValue !== valueTo) {
            onDateToChange({
                value: inputToValue,
                date: dateTo,
            });
            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom: dateFrom,
                dateTo: dateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);
    React.useEffect(function () {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);
    var rangeProps = hooks.useSelectionProps(period.selectedFrom, period.selectedTo, highlightedDate);
    var calendarFromProps = inputFromProps.calendarProps, dateInputFromProps = index_module.__rest(inputFromProps, ["calendarProps"]);
    var calendarToProps = inputToProps.calendarProps, dateInputToProps = index_module.__rest(inputToProps, ["calendarProps"]);
    var CalendarFromComponent = dateInputFromProps.Calendar || coreComponentsCalendar.Calendar;
    var CalendarToComponent = dateInputToProps.Calendar || coreComponentsCalendar.Calendar;
    return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    React__default.default.createElement("div", { className: cn__default.default(index_module.styles.component, index_module.styles.static, className), onMouseOver: handleMouseOver, "data-test-id": dataTestId },
        React__default.default.createElement("div", null,
            React__default.default.createElement(coreComponentsDateInput.DateInput, index_module.__assign({}, dateInputFromProps, { mobileMode: dateInputFromProps.mobileMode === 'popover'
                    ? 'input'
                    : dateInputFromProps.mobileMode, value: inputFromValue, onChange: handleInputFromChange, onClear: handleClearFrom, onBlur: handleValidInputFrom, error: bothInvalid || inputFromInvalid || dateInputFromProps.error, clear: true, block: true })),
            React__default.default.createElement(CalendarFromComponent, index_module.__assign({}, calendarFromProps, { className: cn__default.default(index_module.styles.calendar, calendarFromProps === null || calendarFromProps === void 0 ? void 0 : calendarFromProps.className), month: monthFrom, selectorView: 'month-only', offDays: offDays, events: events, onChange: period.updatePeriod, onMonthChange: handleMonthFromChange, minDate: minDate, maxDate: maxDate && max__default.default([maxDate, endOfMonth__default.default(subMonths__default.default(maxDate, 1))]).getTime() }, rangeProps))),
        React__default.default.createElement(components_divider_Component.Divider, { inputFromProps: inputFromProps, inputToProps: inputToProps }),
        React__default.default.createElement("div", null,
            React__default.default.createElement(coreComponentsDateInput.DateInput, index_module.__assign({}, dateInputToProps, { mobileMode: dateInputToProps.mobileMode === 'popover'
                    ? 'input'
                    : dateInputToProps.mobileMode, value: inputToValue, onChange: handleInputToChange, onClear: handleClearTo, onBlur: handleValidInputTo, error: bothInvalid || inputToInvalid, clear: true, block: true })),
            React__default.default.createElement(CalendarToComponent, index_module.__assign({}, calendarToProps, { className: cn__default.default(index_module.styles.calendar, calendarToProps === null || calendarToProps === void 0 ? void 0 : calendarToProps.className), month: monthTo, selectorView: 'month-only', offDays: offDays, events: events, onChange: period.updatePeriod, onMonthChange: handleMonthToChange, minDate: minDate && startOfMonth__default.default(addMonths__default.default(minDate, 1)).getTime(), maxDate: maxDate }, rangeProps)))));
};

exports.CalendarRangeStatic = CalendarRangeStatic;
