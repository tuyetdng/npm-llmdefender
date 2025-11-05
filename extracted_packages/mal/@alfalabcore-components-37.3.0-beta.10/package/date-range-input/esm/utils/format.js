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
    ' ',
    '-',
    ' ',
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
];
var isCompleteDateInput = function (input) { return input.length === DATE_MASK.length; };
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse(value, dateFormat, new Date());
};
var isValid = function (inputValue, dateFrom, dateTo) {
    return !inputValue ||
        (isCompleteDateInput(inputValue) &&
            dateFnsIsValid(parseDateString(dateFrom)) &&
            dateFnsIsValid(parseDateString(dateTo)));
};
var format = function (value) {
    return value
        .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
        .replace(/\.$/, '') // 12. => 12
        .replace(/\ $/, '') // 1 2 => 12
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)(\d) - (\d.*)/, '$1 - $3') // 12.12.20051 - 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) (\d)- (\d.*)/, '$1 - $3') // 12.12.2005 1- 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -(\d) (\d.*)/, '$1 - $3') // 12.12.2005 -1 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d)(\d\d.\d\d.\d\d\d)/, '$1 - $3') // 12.12.2005 - 112.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d)(\d\d.\d.\d\d\d\d)/, '$1 - $3') // 12.12.2005 - 112.1.2001 => 12.12.2005 - 12.1.2001
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2') // 1212.2005 => 12.12.2005
        .replace(/^(\d\d)(\d.*)/, '$1.$2') // 1212 => 12.12
        .replace(/^(\d\d.\d\d)(\d.*)/, '$1.$2') // 12.122 => 12.12.2
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)(\d)/, '$1 - $2') // 12.12.20056 => 12.12.2005 - 6
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d)(\d)/, '$1 - $2.$3') // 12.12.2005 - 123 => 12.12.2005 - 12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d).(\d\d)(\d)/, '$1 - $2.$3.$4') // 12.12.2005 - 12.123 => 12.12.2005 - 12.12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)- (\d.*)/, '$1 - $2') // 12.12.2005- 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -(\d.*)/, '$1 - $2') // 12.12.2005 -12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -/, '$1') // 12.12.2005 - => 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) (\d.*)/, '$1 - $2') // 12.12.2005 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)  {2}(\d.*)/, '$1 - $2') // 12.12.2005  12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)-/, '$1');
}; // 12.12.2005- => 12.12.2005
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

export { DATE_FORMAT, DATE_MASK, format, isCompleteDateInput, isValid, parseDateString, parseTimestampToDate };
