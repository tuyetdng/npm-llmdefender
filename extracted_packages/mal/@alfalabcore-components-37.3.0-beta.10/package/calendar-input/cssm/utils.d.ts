declare const DATE_FORMAT = "dd.MM.yyyy";
declare const NATIVE_DATE_FORMAT = "yyyy-MM-dd";
declare const DATE_MASK: (string | RegExp)[];
declare const IS_BROWSER: boolean;
declare const SUPPORTS_INPUT_TYPE_DATE: boolean;
declare const formatDate: (date: Date | number, dateFormat?: string) => string;
declare const parseDateString: (value: string, dateFormat?: string) => Date;
/**
 * Возвращает `true`, если поддерживается `input[type="date"]`
 */
declare function isInputDateSupported(): boolean;
declare const isValidInputValue: (newInputValue: string | undefined, minDate: number | undefined, maxDate: number | undefined, offDays?: Array<number | Date>) => boolean;
export { DATE_FORMAT, NATIVE_DATE_FORMAT, DATE_MASK, IS_BROWSER, SUPPORTS_INPUT_TYPE_DATE, formatDate, parseDateString, isInputDateSupported, isValidInputValue };
