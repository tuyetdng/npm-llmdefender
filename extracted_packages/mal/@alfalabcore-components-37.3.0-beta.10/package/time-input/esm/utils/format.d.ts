declare const DATE_MASK: (string | RegExp)[];
declare const isCompleteTimeInput: (input: string) => boolean;
declare const isValidTimeFormat: (value: string) => boolean;
declare const isValidInputValue: (inputValue?: string) => boolean;
declare const format: (value: string) => string;
export { DATE_MASK, isCompleteTimeInput, isValidTimeFormat, isValidInputValue, format };
