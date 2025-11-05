declare const DATE_FORMAT = "dd.MM.yyyy";
declare const DATE_MASK: (string | RegExp)[];
declare const isCompleteDateInput: (input: string) => boolean;
declare const parseDateString: (value: string, dateFormat?: string) => Date;
declare const isValid: (inputValue: string, dateFrom: string, dateTo: string) => boolean;
declare const format: (value: string) => string;
declare const parseTimestampToDate: (timestamp: number) => string;
export { DATE_FORMAT, DATE_MASK, isCompleteDateInput, parseDateString, isValid, format, parseTimestampToDate };
