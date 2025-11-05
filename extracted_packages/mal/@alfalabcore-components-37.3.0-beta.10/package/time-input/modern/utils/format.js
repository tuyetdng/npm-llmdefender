/* eslint-disable no-useless-escape */
const DATE_MASK = [/\d/, /\d/, ':', /\d/, /\d/];
const isCompleteTimeInput = (input) => input.length === DATE_MASK.length;
const isValidTimeFormat = (value) => {
    const timeArr = value.split(':');
    const hours = timeArr[0];
    const mins = timeArr[1];
    if (hours.length !== 2 || Number(hours) > 23) {
        return false;
    }
    if (mins.length !== 2 || Number(mins) > 59) {
        return false;
    }
    return true;
};
const isValidInputValue = (inputValue) => !inputValue || (isCompleteTimeInput(inputValue) && isValidTimeFormat(inputValue));
const format = (value) => value
    .replace(/^(\d\d)(\d)$/, '$1:$2') // 123 => 12:3
    .replace(/^(\d\d)(\d\d)/, '$1:$2') // 12345 => 12:45 (если вместо двоеточия введена цифра, она обратно заменяется на двоеточие)
    .replace(/^(\d):(\d\d)(\d)/, '$1:$2') // 1:234 => 1:23
    .replace(/\:$/, ''); // 12: => 12 || : => void

export { DATE_MASK, format, isCompleteTimeInput, isValidInputValue, isValidTimeFormat };
