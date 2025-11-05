import dateFnsFormat from 'date-fns/format';
import dateFnsIsValid from 'date-fns/isValid';
import parse from 'date-fns/parse';

var DATE_FORMAT = 'dd.MM.yyyy';
var NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
var DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
var isCompleteDateInput = function (input) { return input.length === DATE_MASK.length; };
var formatDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return dateFnsFormat(date, dateFormat);
};
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse(value, dateFormat, new Date());
};
var isValid = function (inputValue) {
    return !inputValue || (isCompleteDateInput(inputValue) && dateFnsIsValid(parseDateString(inputValue)));
};
var format = function (value) {
    return value
        .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d).*/, '$1') // 12.12.20056 => 12.12.2005
        .replace(/\.$/, '') // 12. => 12
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2');
}; // 1212.2005 => 12.12.2005

export { DATE_FORMAT, DATE_MASK, NATIVE_DATE_FORMAT, format, formatDate, isCompleteDateInput, isValid, parseDateString };
