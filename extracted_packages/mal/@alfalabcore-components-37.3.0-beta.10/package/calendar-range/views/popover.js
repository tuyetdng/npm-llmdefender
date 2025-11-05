var index_module = require('../index.module-0cee42f1.js');
var React = require('react');
var cn = require('classnames');
var startOfMonth = require('date-fns/startOfMonth');
var coreComponentsCalendarInput = require('../../calendar-input');
var coreComponentsDateInput = require('../../date-input');
var components_divider_Component = require('../components/divider/Component.js');
var hooks = require('../hooks.js');
require('date-fns/addMonths');
require('date-fns/isEqual');
require('date-fns/max');
require('date-fns/min');
require('date-fns/subMonths');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);

var CalendarRangePopover = function (_a) {
    var className = _a.className, _b = _a.defaultMonth, defaultMonth = _b === void 0 ? startOfMonth__default.default(new Date()).getTime() : _b, minDate = _a.minDate, maxDate = _a.maxDate, _c = _a.valueFrom, valueFrom = _c === void 0 ? '' : _c, _d = _a.valueTo, valueTo = _d === void 0 ? '' : _d, _e = _a.onDateFromChange, onDateFromChange = _e === void 0 ? function () { return null; } : _e, _f = _a.onDateToChange, onDateToChange = _f === void 0 ? function () { return null; } : _f, _g = _a.onChange, onChange = _g === void 0 ? function () { return null; } : _g, onError = _a.onError, _h = _a.inputFromProps, inputFromProps = _h === void 0 ? {} : _h, _j = _a.inputToProps, inputToProps = _j === void 0 ? {} : _j, offDays = _a.offDays, events = _a.events, dataTestId = _a.dataTestId;
    var _k = React.useState(valueFrom), inputFromValue = _k[0], setInputFromValue = _k[1];
    var _l = React.useState(valueTo), inputToValue = _l[0], setInputToValue = _l[1];
    /**
     * Ключ для сброса календарей
     * Пользователь открыл календарь, изменил месяц, но ничего не выбрал
     * — при следующем открытии в календаре будет установлен начальный месяц
     */
    var _m = React.useState(0), resetKey = _m[0], setResetKey = _m[1];
    var dateFrom = coreComponentsCalendarInput.isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? coreComponentsCalendarInput.parseDateString(inputFromValue).getTime()
        : null;
    var dateTo = coreComponentsCalendarInput.isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? coreComponentsCalendarInput.parseDateString(inputToValue).getTime()
        : null;
    var _o = React.useState(coreComponentsDateInput.isCompleteDateInput(inputFromValue) && dateFrom === null), inputFromInvalid = _o[0], setInputFromInvalid = _o[1];
    var _p = React.useState(coreComponentsDateInput.isCompleteDateInput(inputToValue) && dateTo === null), inputToInvalid = _p[0], setInputToInvalid = _p[1];
    var bothInvalid = coreComponentsDateInput.isCompleteDateInput(inputFromValue) &&
        coreComponentsDateInput.isCompleteDateInput(inputToValue) &&
        coreComponentsCalendarInput.parseDateString(inputFromValue).getTime() > coreComponentsCalendarInput.parseDateString(inputToValue).getTime();
    var hasValidateError = inputFromInvalid || inputToInvalid || bothInvalid;
    var _q = hooks.usePopoverViewMonthes({
        dateFrom: dateFrom,
        dateTo: dateTo,
        defaultMonth: defaultMonth,
        resetKey: resetKey,
    }), monthFrom = _q.monthFrom, monthTo = _q.monthTo, handleMonthFromChange = _q.handleMonthFromChange, handleMonthToChange = _q.handleMonthToChange;
    var handleValidInputFrom = React.useCallback(function () {
        setInputFromInvalid(inputFromValue !== '' && !coreComponentsCalendarInput.isValidInputValue(inputFromValue, minDate, maxDate, offDays));
    }, [inputFromValue, maxDate, minDate, offDays]);
    var handleValidInputTo = React.useCallback(function () {
        setInputToInvalid(inputToValue !== '' &&
            !coreComponentsCalendarInput.isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays));
    }, [dateFrom, inputToValue, maxDate, minDate, offDays]);
    var handleInputFromChange = React.useCallback(function (_, payload) {
        setInputFromValue(payload.value);
    }, []);
    var handleInputToChange = React.useCallback(function (_, payload) {
        setInputToValue(payload.value);
    }, []);
    var handleInputFromBlur = React.useCallback(function () {
        handleValidInputFrom();
        setResetKey(+new Date());
    }, [handleValidInputFrom]);
    var handleInputToBlur = React.useCallback(function () {
        handleValidInputTo();
        setResetKey(+new Date());
    }, [handleValidInputTo]);
    var handleFromChange = React.useCallback(function (_, payload) {
        setInputFromValue(payload.value);
    }, []);
    var handleToChange = React.useCallback(function (_, payload) {
        setInputToValue(payload.value);
    }, []);
    React.useEffect(function () {
        setInputFromValue(valueFrom);
    }, [valueFrom]);
    React.useEffect(function () {
        setInputToValue(valueTo);
    }, [valueTo]);
    React.useEffect(function () {
        onDateFromChange({ value: inputFromValue, date: dateFrom });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
        if (!inputFromValue || coreComponentsDateInput.isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);
    React.useEffect(function () {
        onDateToChange({ value: inputToValue, date: dateTo });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
        if (!inputToValue || coreComponentsDateInput.isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);
    React.useEffect(function () {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);
    return (React__default.default.createElement("div", { className: cn__default.default(index_module.styles.component, className), "data-test-id": dataTestId },
        React__default.default.createElement(coreComponentsCalendarInput.CalendarInput, index_module.__assign({}, inputFromProps, { useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-start', error: inputFromInvalid || bothInvalid || inputFromProps.error, onChange: handleFromChange, onInputChange: handleInputFromChange, onBlur: handleInputFromBlur, value: inputFromValue, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: index_module.__assign(index_module.__assign({}, inputFromProps.calendarProps), { month: monthFrom, onMonthChange: handleMonthFromChange, selectorView: 'full' }) })),
        React__default.default.createElement(components_divider_Component.Divider, { inputFromProps: inputFromProps, inputToProps: inputToProps }),
        React__default.default.createElement(coreComponentsCalendarInput.CalendarInput, index_module.__assign({}, inputToProps, { useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-end', error: inputToInvalid || bothInvalid || inputToProps.error, onChange: handleToChange, onInputChange: handleInputToChange, onBlur: handleInputToBlur, value: inputToValue, minDate: dateFrom || minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: index_module.__assign(index_module.__assign({}, inputToProps.calendarProps), { month: monthTo, onMonthChange: handleMonthToChange, selectorView: 'full' }) }))));
};

exports.CalendarRangePopover = CalendarRangePopover;
