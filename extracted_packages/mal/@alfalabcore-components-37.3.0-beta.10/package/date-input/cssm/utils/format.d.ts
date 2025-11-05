declare const DATE_FORMAT = "dd.MM.yyyy";
declare const NATIVE_DATE_FORMAT = "yyyy-MM-dd";
declare const DATE_MASK: (string | RegExp)[];
declare const isCompleteDateInput: (input: string) => boolean;
declare const formatDate: (date: Date | number, dateFormat?: string) => string;
declare const parseDateString: (value: string, dateFormat?: string) => Date;
declare const isValid: (inputValue?: string) => boolean;
declare const format: (value: string) => string;
export { DATE_FORMAT, NATIVE_DATE_FORMAT, DATE_MASK, isCompleteDateInput, formatDate, parseDateString, isValid, format };
