import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parse from 'date-fns/parse';
import { dateInLimits } from '../../calendar/modern';
import { isCompleteDateInput } from '../../date-input/modern';

const DATE_FORMAT = 'dd.MM.yyyy';
const NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
const DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
const IS_BROWSER = typeof window !== 'undefined';
const SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && isInputDateSupported();
const formatDate = (date, dateFormat = DATE_FORMAT) => format(date, dateFormat);
const parseDateString = (value, dateFormat = DATE_FORMAT) => parse(value, dateFormat, new Date());
/**
 * Возвращает `true`, если поддерживается `input[type="date"]`
 */
function isInputDateSupported() {
    const input = document.createElement('input');
    const value = 'a';
    input.setAttribute('type', 'date');
    input.setAttribute('value', value);
    return input.value !== value;
}
const isValidInputValue = (newInputValue, minDate, maxDate, offDays = []) => {
    if (!newInputValue)
        return false;
    const dateValue = parseDateString(newInputValue).getTime();
    return Boolean(dateValue &&
        isCompleteDateInput(newInputValue) &&
        dateInLimits(dateValue, minDate, maxDate) &&
        !offDays.some((offDay) => isSameDay(offDay, dateValue)));
};

export { DATE_FORMAT, DATE_MASK, IS_BROWSER, NATIVE_DATE_FORMAT, SUPPORTS_INPUT_TYPE_DATE, formatDate, isInputDateSupported, isValidInputValue, parseDateString };
