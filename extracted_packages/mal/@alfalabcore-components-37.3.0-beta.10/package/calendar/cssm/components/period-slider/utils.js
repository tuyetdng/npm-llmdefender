var addDays = require('date-fns/addDays');
var addMonths = require('date-fns/addMonths');
var addQuarters = require('date-fns/addQuarters');
var addWeeks = require('date-fns/addWeeks');
var addYears = require('date-fns/addYears');
var endOfMonth = require('date-fns/endOfMonth');
var endOfQuarter = require('date-fns/endOfQuarter');
var endOfWeek = require('date-fns/endOfWeek');
var endOfYear = require('date-fns/endOfYear');
var getQuarter = require('date-fns/getQuarter');
var getYear = require('date-fns/getYear');
var isToday = require('date-fns/isToday');
var isYesterday = require('date-fns/isYesterday');
var startOfMonth = require('date-fns/startOfMonth');
var startOfQuarter = require('date-fns/startOfQuarter');
var startOfWeek = require('date-fns/startOfWeek');
var startOfYear = require('date-fns/startOfYear');
var utils = require('../../utils.js');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
require('date-fns/format');
require('date-fns/isAfter');
require('date-fns/isBefore');
require('date-fns/isSameDay');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/startOfDay');
require('date-fns/subDays');
require('date-fns/subMonths');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var addDays__default = /*#__PURE__*/_interopDefaultCompat(addDays);
var addMonths__default = /*#__PURE__*/_interopDefaultCompat(addMonths);
var addQuarters__default = /*#__PURE__*/_interopDefaultCompat(addQuarters);
var addWeeks__default = /*#__PURE__*/_interopDefaultCompat(addWeeks);
var addYears__default = /*#__PURE__*/_interopDefaultCompat(addYears);
var endOfMonth__default = /*#__PURE__*/_interopDefaultCompat(endOfMonth);
var endOfQuarter__default = /*#__PURE__*/_interopDefaultCompat(endOfQuarter);
var endOfWeek__default = /*#__PURE__*/_interopDefaultCompat(endOfWeek);
var endOfYear__default = /*#__PURE__*/_interopDefaultCompat(endOfYear);
var getQuarter__default = /*#__PURE__*/_interopDefaultCompat(getQuarter);
var getYear__default = /*#__PURE__*/_interopDefaultCompat(getYear);
var isToday__default = /*#__PURE__*/_interopDefaultCompat(isToday);
var isYesterday__default = /*#__PURE__*/_interopDefaultCompat(isYesterday);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var startOfQuarter__default = /*#__PURE__*/_interopDefaultCompat(startOfQuarter);
var startOfWeek__default = /*#__PURE__*/_interopDefaultCompat(startOfWeek);
var startOfYear__default = /*#__PURE__*/_interopDefaultCompat(startOfYear);

var formatPeriod = function (valueFrom, valueTo, periodType) {
    if (periodType === 'day') {
        if (isToday__default.default(valueFrom))
            return 'Сегодня';
        if (isYesterday__default.default(valueFrom))
            return 'Вчера';
        return utils.formatDate(valueFrom);
    }
    if (periodType === 'month') {
        var year = getYear__default.default(valueFrom);
        return year === getYear__default.default(new Date())
            ? utils.monthName(valueFrom)
            : "".concat(utils.monthName(valueFrom), " ").concat(getYear__default.default(valueFrom));
    }
    if (periodType === 'quarter') {
        return "".concat(getQuarter__default.default(valueFrom), " \u043A\u0432\u0430\u0440\u0442\u0430\u043B ").concat(getYear__default.default(valueFrom));
    }
    if (periodType === 'year') {
        return "".concat(getYear__default.default(valueFrom), " \u0433\u043E\u0434");
    }
    return "".concat(utils.formatDate(valueFrom), " - ").concat(utils.formatDate(valueTo));
};
var getYearSelectorValue = function (valueFrom, showCurrentYear) {
    if (!valueFrom) {
        return '';
    }
    var year = getYear__default.default(valueFrom);
    if (year === getYear__default.default(new Date())) {
        return showCurrentYear ? year : '';
    }
    return year;
};
var shiftValues = function (valueFrom, valueTo, periodType, direction) {
    var newValueFrom = valueFrom;
    var newValueTo = valueTo;
    var amount = direction === 'next' ? 1 : -1;
    switch (periodType) {
        case 'day':
            newValueFrom = addDays__default.default(valueFrom, amount);
            newValueTo = addDays__default.default(valueFrom, amount);
            break;
        case 'week':
            newValueFrom = startOfWeek__default.default(addWeeks__default.default(valueFrom, amount), { weekStartsOn: 1 });
            newValueTo = endOfWeek__default.default(newValueFrom, { weekStartsOn: 1 });
            break;
        case 'month':
            newValueFrom = startOfMonth__default.default(addMonths__default.default(valueFrom, amount));
            newValueTo = endOfMonth__default.default(newValueFrom);
            break;
        case 'quarter':
            newValueFrom = startOfQuarter__default.default(addQuarters__default.default(valueFrom, amount));
            newValueTo = endOfQuarter__default.default(newValueFrom);
            break;
        case 'year':
            newValueFrom = startOfYear__default.default(addYears__default.default(valueFrom, amount));
            newValueTo = endOfYear__default.default(newValueFrom);
            break;
    }
    return {
        valueFrom: newValueFrom,
        valueTo: newValueTo,
    };
};

exports.formatPeriod = formatPeriod;
exports.getYearSelectorValue = getYearSelectorValue;
exports.shiftValues = shiftValues;
