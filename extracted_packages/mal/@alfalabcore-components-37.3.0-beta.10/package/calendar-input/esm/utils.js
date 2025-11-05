import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parse from 'date-fns/parse';
import { dateInLimits } from '../../calendar/esm';
import { isCompleteDateInput } from '../../date-input/esm';

var DATE_FORMAT = 'dd.MM.yyyy';
var NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
var DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
var IS_BROWSER = typeof window !== 'undefined';
var SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && isInputDateSupported();
var formatDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return format(date, dateFormat);
};
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse(value, dateFormat, new Date());
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
        isCompleteDateInput(newInputValue) &&
        dateInLimits(dateValue, minDate, maxDate) &&
        !offDays.some(function (offDay) { return isSameDay(offDay, dateValue); }));
};

export { DATE_FORMAT, DATE_MASK, IS_BROWSER, NATIVE_DATE_FORMAT, SUPPORTS_INPUT_TYPE_DATE, formatDate, isInputDateSupported, isValidInputValue, parseDateString };
