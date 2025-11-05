import { formatAmount } from '@alfalab/utils';

/**
 * https://github.com/core-ds/utils
 * TODO: нужно перенести утилиты в этот проект, когда он будет готов
 */
/**
 * Форматирует введенное значение
 * @param enteredValue Значение введенное в инпут
 * @param currency валюта
 * @param minority количество минорных единиц
 */
function getFormattedValue(enteredValue, currency, minority) {
    if (!enteredValue || enteredValue === '-') {
        return enteredValue;
    }
    // eslint-disable-next-line prefer-const
    let [head, tail] = enteredValue.split(',');
    // При вводе "-," указываем, что имеется в виду "-0,"
    if (head === '-') {
        head = '-0';
    }
    let { majorPart } = formatAmount({
        value: Number(head) * minority,
        currency,
        minority,
        negativeSymbol: 'hyphen-minus',
    });
    // Так как -0 === 0, formatAmount возвращает положительное значение. Исправляем это здесь
    if (/^-(,|0),?/.test(enteredValue) && majorPart === '0') {
        majorPart = `-${majorPart}`;
    }
    if (!tail && enteredValue.includes(',')) {
        return majorPart.concat(',');
    }
    if (tail) {
        return majorPart.concat(',', tail.slice(0, minority.toString().length - 1));
    }
    return majorPart;
}
function getAmountValueFromStr(str, minority) {
    if (str === '' || str === '-') {
        return null;
    }
    return Math.round(Number(str.replace(',', '.').replace(/[^0-9.-]/g, '')) * minority);
}

export { getAmountValueFromStr, getFormattedValue };
