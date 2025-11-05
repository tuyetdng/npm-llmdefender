import dateFnsIsValid from 'date-fns/isValid';
import parse from 'date-fns/parse';

/* eslint-disable no-useless-escape */
var DATE_FORMAT = 'dd.MM.yyyy';
var DATE_MASK = [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ',',
    ' ',
    /\d/,
    /\d/,
    ':',
    /\d/,
    /\d/,
];
var DATE_WITH_TIME_LENGTH = DATE_MASK.length;
var isCompleteDateInput = function (input) { return input.length === DATE_WITH_TIME_LENGTH; };
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse(value, dateFormat, new Date());
};
var isValidTimeFormat = function (value) {
    var timeArr = value.split(':');
    var hours = timeArr[0];
    var mins = timeArr[1];
    if (hours.length !== 2 || Number(hours) > 23) {
        return false;
    }
    if (mins.length !== 2 || Number(mins) > 59) {
        return false;
    }
    return true;
};
var isValid = function (inputValue) {
    var inputValueArr = inputValue.split(', ');
    var date = inputValueArr[0];
    var time = inputValueArr[1];
    return (!inputValue ||
        (isCompleteDateInput(inputValue) &&
            dateFnsIsValid(parseDateString(date)) &&
            isValidTimeFormat(time)));
};
var format = function (value) {
    return value
        .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
        .replace(/\.$/, '') // 12. => 12
        .replace(/\ $/, '') // 1 2 => 12
        .replace(/\:$/, '') // 1:2 => 12
        .replace(/^(\d\d)(\d.*)/, '$1.$2') // 1212 => 12.12
        .replace(/^(\d\d.\d\d)(\d.*)/, '$1.$2') // 12.122 => 12.12.2
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2') // 1212.2005 => 12.12.2005
        .replace(/^(\d\d.\d\d\.\d\d\d\d),/, '$1') // 12.12.2005 => 12.12.2005
        .replace(/^(\d\d.\d\d\.\d\d\d\d)(\d)/, '$1, $2') // 12.12.20050 => 12.12.2005, 0
        .replace(/^(\d\d.\d\d\.\d\d\d\d),(\d.*)/, '$1, $2') // 12.12.2005,00:00 => 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d) (\d.*)/, '$1, $2') // 12.12.2005 00:00 => 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d)(\d.*)/, '$1, $2') // 12.12.200500:00=> 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d), (\d\d):/, '$1, $2') // 12.12.2005, 00: => 12.12.2005, 00
        .replace(/^(\d\d.\d\d\.\d\d\d\d), (\d\d)(\d)/, '$1, $2:$3');
}; // 12.12.2005, 000 => 12.12.2005, 00:0
var parseTimestampToDate = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0".concat(month);
    }
    if (day < 10) {
        day = "0".concat(day);
    }
    return "".concat(day, ".").concat(month, ".").concat(year);
};
var getDateWithoutTime = function (value) {
    var valueArr = value.split(', ');
    var day;
    var month;
    var year;
    if (valueArr[0]) {
        var date_1 = valueArr[0].split('.');
        day = date_1[0], month = date_1[1], year = date_1[2];
    }
    var date = new Date();
    date.setFullYear(Number(year), Number(month) - 1, Number(day));
    date.setHours(0, 0, 0, 0);
    return date;
};
var getFullDateTime = function (value) {
    var valueArr = value.split(', ');
    var day;
    var month;
    var year;
    var hours;
    var mins;
    if (valueArr[0]) {
        var date = valueArr[0].split('.');
        day = date[0], month = date[1], year = date[2];
    }
    if (valueArr[1]) {
        var time = valueArr[1].split(':');
        hours = Number(time[0]);
        mins = Number(time[1]);
    }
    var fullDate = new Date();
    fullDate.setFullYear(Number(year), Number(month) - 1, Number(day));
    fullDate.setHours(Number(hours) || 0);
    fullDate.setMinutes(Number(mins) || 0);
    fullDate.setSeconds(0);
    fullDate.setMilliseconds(0);
    return fullDate;
};
var addTimeToDate = function (value) {
    if (value.length === 10 && dateFnsIsValid(parseDateString(value))) {
        return "".concat(value, ", 00:00");
    }
    return value;
};

export { DATE_FORMAT, DATE_MASK, DATE_WITH_TIME_LENGTH, addTimeToDate, format, getDateWithoutTime, getFullDateTime, isCompleteDateInput, isValid, isValidTimeFormat, parseDateString, parseTimestampToDate };
