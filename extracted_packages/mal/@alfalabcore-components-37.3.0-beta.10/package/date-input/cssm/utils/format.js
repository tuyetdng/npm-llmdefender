var dateFnsFormat = require('date-fns/format');
var dateFnsIsValid = require('date-fns/isValid');
var parse = require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var dateFnsFormat__default = /*#__PURE__*/_interopDefaultCompat(dateFnsFormat);
var dateFnsIsValid__default = /*#__PURE__*/_interopDefaultCompat(dateFnsIsValid);
var parse__default = /*#__PURE__*/_interopDefaultCompat(parse);

var DATE_FORMAT = 'dd.MM.yyyy';
var NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
var DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
var isCompleteDateInput = function (input) { return input.length === DATE_MASK.length; };
var formatDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return dateFnsFormat__default.default(date, dateFormat);
};
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse__default.default(value, dateFormat, new Date());
};
var isValid = function (inputValue) {
    return !inputValue || (isCompleteDateInput(inputValue) && dateFnsIsValid__default.default(parseDateString(inputValue)));
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

exports.DATE_FORMAT = DATE_FORMAT;
exports.DATE_MASK = DATE_MASK;
exports.NATIVE_DATE_FORMAT = NATIVE_DATE_FORMAT;
exports.format = format;
exports.formatDate = formatDate;
exports.isCompleteDateInput = isCompleteDateInput;
exports.isValid = isValid;
exports.parseDateString = parseDateString;
