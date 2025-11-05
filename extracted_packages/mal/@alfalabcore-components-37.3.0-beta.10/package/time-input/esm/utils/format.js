/* eslint-disable no-useless-escape */
var DATE_MASK = [/\d/, /\d/, ':', /\d/, /\d/];
var isCompleteTimeInput = function (input) { return input.length === DATE_MASK.length; };
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
var isValidInputValue = function (inputValue) {
    return !inputValue || (isCompleteTimeInput(inputValue) && isValidTimeFormat(inputValue));
};
var format = function (value) {
    return value
        .replace(/^(\d\d)(\d)$/, '$1:$2') // 123 => 12:3
        .replace(/^(\d\d)(\d\d)/, '$1:$2') // 12345 => 12:45 (если вместо двоеточия введена цифра, она обратно заменяется на двоеточие)
        .replace(/^(\d):(\d\d)(\d)/, '$1:$2') // 1:234 => 1:23
        .replace(/\:$/, '');
}; // 12: => 12 || : => void

export { DATE_MASK, format, isCompleteTimeInput, isValidInputValue, isValidTimeFormat };
