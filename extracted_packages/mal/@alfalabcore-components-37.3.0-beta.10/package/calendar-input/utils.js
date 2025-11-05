var format = require('date-fns/format');
var isSameDay = require('date-fns/isSameDay');
var parse = require('date-fns/parse');
var coreComponentsCalendar = require('../calendar');
var coreComponentsDateInput = require('../date-input');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var format__default = /*#__PURE__*/_interopDefaultCompat(format);
var isSameDay__default = /*#__PURE__*/_interopDefaultCompat(isSameDay);
var parse__default = /*#__PURE__*/_interopDefaultCompat(parse);

var DATE_FORMAT = 'dd.MM.yyyy';
var NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
var DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
var IS_BROWSER = typeof window !== 'undefined';
var SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && isInputDateSupported();
var formatDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return format__default.default(date, dateFormat);
};
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse__default.default(value, dateFormat, new Date());
};
/**
 * Возвращает `true`, если поддерживается `input[type="date"]`
 */
function isInputDateSupported() {
    var input = document.createElement('input');
    var value = 'a';
    input.setAttribute('type', 'date');
    input.setAttribute('value', value);
    return input.value !== value;
}
var isValidInputValue = function (newInputValue, minDate, maxDate, offDays) {
    if (offDays === void 0) { offDays = []; }
    if (!newInputValue)
        return false;
    var dateValue = parseDateString(newInputValue).getTime();
    return Boolean(dateValue &&
        coreComponentsDateInput.isCompleteDateInput(newInputValue) &&
        coreComponentsCalendar.dateInLimits(dateValue, minDate, maxDate) &&
        !offDays.some(function (offDay) { return isSameDay__default.default(offDay, dateValue); }));
};

exports.DATE_FORMAT = DATE_FORMAT;
exports.DATE_MASK = DATE_MASK;
exports.IS_BROWSER = IS_BROWSER;
exports.NATIVE_DATE_FORMAT = NATIVE_DATE_FORMAT;
exports.SUPPORTS_INPUT_TYPE_DATE = SUPPORTS_INPUT_TYPE_DATE;
exports.formatDate = formatDate;
exports.isInputDateSupported = isInputDateSupported;
exports.isValidInputValue = isValidInputValue;
exports.parseDateString = parseDateString;
