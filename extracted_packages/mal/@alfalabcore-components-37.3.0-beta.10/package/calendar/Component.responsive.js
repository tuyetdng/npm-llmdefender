var tslib_es6 = require('./tslib.es6-e98b28a2.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component_desktop = require('./Component.desktop.js');
var components_calendarMobile_Component = require('./components/calendar-mobile/Component.js');
require('classnames');
require('date-fns/endOfDay');
require('date-fns/startOfDay');
require('date-fns/startOfMonth');
require('./components/days-table/Component.js');
require('react-transition-group');
require('date-fns/isEqual');
require('date-fns/isLastDayOfMonth');
require('date-fns/isSameDay');
require('date-fns/isToday');
require('date-fns/isWithinInterval');
require('../button');
require('./utils.js');
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
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/startOfWeek');
require('date-fns/startOfYear');
require('date-fns/subDays');
require('date-fns/subMonths');
require('./components/header/Component.js');
require('./components/month-year-header/Component.js');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('./components/select-button/Component.js');
require('./components/months-table/Component.js');
require('date-fns/isSameMonth');
require('date-fns/isThisMonth');
require('./components/period-slider/Component.js');
require('../icon-button');
require('@alfalab/icons-glyph/ChevronBackMIcon');
require('./components/period-slider/utils.js');
require('date-fns/addQuarters');
require('date-fns/addWeeks');
require('date-fns/addYears');
require('date-fns/endOfMonth');
require('date-fns/endOfQuarter');
require('date-fns/getQuarter');
require('date-fns/getYear');
require('date-fns/isYesterday');
require('date-fns/startOfQuarter');
require('./components/years-table/Component.js');
require('date-fns/isSameYear');
require('date-fns/isThisYear');
require('./useCalendar.js');
require('react-merge-refs');
require('date-fns/setYear');
require('date-fns/subYears');
require('react-virtuoso');
require('@juggle/resize-observer');
require('../modal/mobile');
require('date-fns/differenceInDays');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var CalendarResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component_desktop.CalendarDesktop, tslib_es6.__assign({}, restProps))) : (React__default.default.createElement(components_calendarMobile_Component.CalendarMobile, tslib_es6.__assign({}, restProps)));
};

exports.CalendarResponsive = CalendarResponsive;
