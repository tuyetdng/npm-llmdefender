/// <reference types="react" />
import React from 'react';
import { ChangeEvent, ElementType } from "react";
import { CalendarMobileProps, CalendarProps } from "../../calendar";
import { InputProps } from "../../input";
import { PopoverProps } from "../../popover";
declare function __extends(d: any, b: any): void;
declare function __rest(s: any, e: any): {};
declare function __decorate(decorators: any, target: any, key: any, desc: any, ...args: any[]): any;
declare function __param(paramIndex: any, decorator: any): (target: any, key: any) => void;
declare function __metadata(metadataKey: any, metadataValue: any): any;
declare function __awaiter(thisArg: any, _arguments: any, P: any, generator: any): any;
declare function __generator(thisArg: any, body: any): {
    next: (v: any) => any;
    throw: (v: any) => any;
    return: (v: any) => any;
};
declare function __exportStar(m: any, o: any): void;
declare function __values(o: any): any;
declare function __read(o: any, n: any): any;
declare function __spread(...args: any[]): any[];
declare function __spreadArrays(...args: any[]): any[];
declare function __spreadArray(to: any, from: any, pack: any, ...args: any[]): any;
declare function __await(v: any): __await;
declare class __await {
    constructor(v: any);
    v: any;
}
declare function __asyncGenerator(thisArg: any, _arguments: any, generator: any): {};
declare function __asyncDelegator(o: any): {};
declare function __asyncValues(o: any): any;
declare function __makeTemplateObject(cooked: any, raw: any): any;
declare function __importStar(mod: any): any;
declare function __importDefault(mod: any): any;
declare function __classPrivateFieldGet(receiver: any, state: any, kind: any, f: any): any;
declare function __classPrivateFieldSet(receiver: any, state: any, value: any, kind: any, f: any): any;
declare function __classPrivateFieldIn(state: any, receiver: any): any;
declare function __assign(...args: any[]): any;
declare function __createBinding(o: any, m: any, k: any, k2: any): void;
type DateRangeInputProps = Omit<InputProps, 'onChange'> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для инпута
     */
    inputClassName?: string;
    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string;
    /**
     * Обработчик изменения значения
     */
    picker?: boolean;
    /**
     * Обработчик изменения значения
     */
    onChange?: (payload: {
        dateFrom?: Date;
        dateTo?: Date;
        value: string;
    }, event?: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: (payload: {
        dateFrom: Date;
        dateTo: Date;
        value: string;
    }, event?: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Компонент календаря
     */
    Calendar?: ElementType;
    /**
     * Доп. пропсы для календаря
     */
    calendarProps?: (CalendarProps & Record<string, unknown>) | (CalendarMobileProps & Record<string, unknown>);
    /**
     * Месяц в календаре по умолчанию (timestamp)
     */
    defaultMonth?: number;
    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;
    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;
    /**
     * Список событий
     */
    events?: Array<Date | number>;
    /**
     * Список выходных
     */
    offDays?: Array<Date | number>;
    /**
     * Состояние открытия по умолчанию
     */
    defaultOpen?: boolean;
    /**
     * Позиционирование поповера с календарем
     */
    popoverPosition?: PopoverProps['position'];
    /**
     * z-index Popover
     */
    zIndexPopover?: PopoverProps['zIndex'];
    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;
    /**
     * Календарь будет принимать ширину инпута
     */
    useAnchorWidth?: boolean;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: 'desktop' | 'mobile';
};
declare const DateRangeInput: React.ForwardRefExoticComponent<Omit<InputProps, "onChange"> & {
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для инпута
     */
    inputClassName?: string | undefined;
    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string | undefined;
    /**
     * Обработчик изменения значения
     */
    picker?: boolean | undefined;
    /**
     * Обработчик изменения значения
     */
    onChange?: ((payload: {
        dateFrom?: Date;
        dateTo?: Date;
        value: string;
    }, event?: ChangeEvent<HTMLInputElement>) => void) | undefined;
    /**
     * Обработчик окончания ввода
     */
    onComplete?: ((payload: {
        dateFrom: Date;
        dateTo: Date;
        value: string;
    }, event?: ChangeEvent<HTMLInputElement>) => void) | undefined;
    /**
     * Компонент календаря
     */
    Calendar?: React.ElementType<any> | undefined;
    /**
     * Доп. пропсы для календаря
     */
    calendarProps?: (CalendarProps & Record<string, unknown>) | (CalendarProps & {
        open: boolean;
        title?: string | undefined;
        onClose?: (() => void) | undefined;
        yearsAmount?: number | undefined;
        hasHeader?: boolean | undefined;
        allowSelectionFromEmptyRange?: boolean | undefined;
    } & Record<string, unknown>) | undefined;
    /**
     * Месяц в календаре по умолчанию (timestamp)
     */
    defaultMonth?: number | undefined;
    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number | undefined;
    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number | undefined;
    /**
     * Список событий
     */
    events?: (number | Date)[] | undefined;
    /**
     * Список выходных
     */
    offDays?: (number | Date)[] | undefined;
    /**
     * Состояние открытия по умолчанию
     */
    defaultOpen?: boolean | undefined;
    /**
     * Позиционирование поповера с календарем
     */
    popoverPosition?: PopoverProps['position'];
    /**
     * z-index Popover
     */
    zIndexPopover?: PopoverProps['zIndex'];
    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean | undefined;
    /**
     * Календарь будет принимать ширину инпута
     */
    useAnchorWidth?: boolean | undefined;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean | undefined;
    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: "desktop" | "mobile" | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { __extends, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __assign, __createBinding, DateRangeInputProps, DateRangeInput };
