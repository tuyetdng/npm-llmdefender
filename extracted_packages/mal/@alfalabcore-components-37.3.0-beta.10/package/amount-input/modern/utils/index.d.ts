/**
 * https://github.com/core-ds/utils
 * TODO: нужно перенести утилиты в этот проект, когда он будет готов
 */
import { CurrencyCodes } from '@alfalab/data';
/**
 * Форматирует введенное значение
 * @param enteredValue Значение введенное в инпут
 * @param currency валюта
 * @param minority количество минорных единиц
 */
declare function getFormattedValue(enteredValue: string, currency: CurrencyCodes, minority: number): string;
declare function getAmountValueFromStr(str: string, minority: number): number | null;
export { getFormattedValue, getAmountValueFromStr };
