import dateFnsFormat from 'date-fns/format';
import dateFnsIsValid from 'date-fns/isValid';
import parse from 'date-fns/parse';

const DATE_FORMAT = 'dd.MM.yyyy';
const NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
const DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
const isCompleteDateInput = (input) => input.length === DATE_MASK.length;
const formatDate = (date, dateFormat = DATE_FORMAT) => dateFnsFormat(date, dateFormat);
const parseDateString = (value, dateFormat = DATE_FORMAT) => parse(value, dateFormat, new Date());
const isValid = (inputValue) => !inputValue || (isCompleteDateInput(inputValue) && dateFnsIsValid(parseDateString(inputValue)));
const format = (value) => value
    .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
    .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
    .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
    .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
    .replace(/^(\d\d\.\d\d\.\d\d\d\d).*/, '$1') // 12.12.20056 => 12.12.2005
    .replace(/\.$/, '') // 12. => 12
    .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
    .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2'); // 1212.2005 => 12.12.2005

export { DATE_FORMAT, DATE_MASK, NATIVE_DATE_FORMAT, format, formatDate, isCompleteDateInput, isValid, parseDateString };
