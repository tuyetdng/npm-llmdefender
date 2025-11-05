var React = require('react');
var cn = require('classnames');
var endOfWeek = require('date-fns/endOfWeek');
var startOfWeek = require('date-fns/startOfWeek');
var coreComponentsButton = require('../../../../button/cssm');
var coreComponentsIconButton = require('../../../../icon-button/cssm');
var ChevronBackMIcon = require('@alfalab/icons-glyph/ChevronBackMIcon');
var utils = require('../../utils.js');
var components_periodSlider_utils = require('./utils.js');
var styles = require('./index.module.css');
require('date-fns/addDays');
require('date-fns/addMonths');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
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
require('date-fns/startOfYear');
require('date-fns/subDays');
require('date-fns/subMonths');
require('date-fns/addQuarters');
require('date-fns/addWeeks');
require('date-fns/addYears');
require('date-fns/endOfMonth');
require('date-fns/endOfQuarter');
require('date-fns/getQuarter');
require('date-fns/getYear');
require('date-fns/isToday');
require('date-fns/isYesterday');
require('date-fns/startOfQuarter');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var endOfWeek__default = /*#__PURE__*/_interopDefaultCompat(endOfWeek);
var startOfWeek__default = /*#__PURE__*/_interopDefaultCompat(startOfWeek);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PeriodSlider = function (_a) {
    var value = _a.value, _b = _a.periodType, periodType = _b === void 0 ? 'month' : _b, className = _a.className, _c = _a.periodFormatter, periodFormatter = _c === void 0 ? components_periodSlider_utils.formatPeriod : _c, _d = _a.prevArrowDisabled, prevArrowDisabled = _d === void 0 ? false : _d, _e = _a.nextArrowDisabled, nextArrowDisabled = _e === void 0 ? false : _e, _f = _a.hideDisabledArrows, hideDisabledArrows = _f === void 0 ? false : _f, _g = _a.isMonthAndYearSelectable, isMonthAndYearSelectable = _g === void 0 ? false : _g, _h = _a.showCurrentYearSelector, showCurrentYearSelector = _h === void 0 ? false : _h, _j = _a.onPrevArrowClick, onPrevArrowClick = _j === void 0 ? function () { return null; } : _j, _k = _a.onNextArrowClick, onNextArrowClick = _k === void 0 ? function () { return null; } : _k, onMonthClick = _a.onMonthClick, onYearClick = _a.onYearClick, dataTestId = _a.dataTestId;
    var _l = React.useMemo(function () {
        var _a;
        var from;
        var to;
        if (!value)
            return [undefined, undefined];
        if (Array.isArray(value)) {
            from = value[0], to = value[1];
        }
        else {
            _a = [value, value], from = _a[0], to = _a[1];
            if (periodType === 'week') {
                from = startOfWeek__default.default(from, { weekStartsOn: 1 });
                to = endOfWeek__default.default(from, { weekStartsOn: 1 });
            }
        }
        return [from, to];
    }, [periodType, value]), valueFrom = _l[0], valueTo = _l[1];
    var yearSelectorValue = React.useMemo(function () { return components_periodSlider_utils.getYearSelectorValue(valueFrom, showCurrentYearSelector); }, [showCurrentYearSelector, valueFrom]);
    var showArrow = function (direction) {
        if (hideDisabledArrows) {
            var disabled = direction === 'prev' ? prevArrowDisabled : nextArrowDisabled;
            return !disabled && valueFrom;
        }
        return true;
    };
    var handleNextArrowClick = function (event) {
        if (!valueFrom || !valueTo)
            return;
        var newValues = components_periodSlider_utils.shiftValues(valueFrom, valueTo, periodType, 'next');
        onNextArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType: periodType,
        });
    };
    var handlePrevArrowClick = function (event) {
        if (!valueFrom || !valueTo)
            return;
        var newValues = components_periodSlider_utils.shiftValues(valueFrom, valueTo, periodType, 'prev');
        onPrevArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType: periodType,
        });
    };
    var renderHeader = function () {
        if (!(valueFrom && valueTo)) {
            return React__default.default.createElement("span", { className: cn__default.default(styles__default.default.period, styles__default.default.empty) }, "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434");
        }
        return periodType === 'month' && isMonthAndYearSelectable ? (React__default.default.createElement("div", null,
            React__default.default.createElement(coreComponentsButton.Button, { className: styles__default.default.period, view: 'ghost', size: 'l', onClick: onMonthClick }, utils.monthName(valueFrom)),
            yearSelectorValue && (React__default.default.createElement(coreComponentsButton.Button, { className: cn__default.default(styles__default.default.yearSelectorButton, styles__default.default.period), view: 'ghost', size: 'l', onClick: onYearClick }, yearSelectorValue)))) : (React__default.default.createElement("span", { className: styles__default.default.period }, periodFormatter(valueFrom, valueTo, periodType)));
    };
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className), "aria-live": 'polite', "data-test-id": dataTestId },
        showArrow('prev') && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xs', className: styles__default.default.arrow, icon: ChevronBackMIcon.ChevronBackMIcon, onClick: handlePrevArrowClick, disabled: prevArrowDisabled || !valueFrom, "aria-label": '\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043F\u0435\u0440\u0438\u043E\u0434' })),
        renderHeader(),
        showArrow('next') && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xs', className: styles__default.default.arrow, icon: ChevronBackMIcon.ChevronBackMIcon, onClick: handleNextArrowClick, disabled: nextArrowDisabled || !valueFrom, "aria-label": '\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0435\u0440\u0438\u043E\u0434' }))));
};

exports.PeriodSlider = PeriodSlider;
