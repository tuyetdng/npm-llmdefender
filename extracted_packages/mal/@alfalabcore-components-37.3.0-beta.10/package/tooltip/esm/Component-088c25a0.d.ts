import { FC, MutableRefObject, ReactElement, ReactNode } from 'react';
import { PopoverProps, Position } from "../../popover";
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
type Trigger = 'click' | 'hover';
type TooltipDesktopProps = {
    /**
     * Контент тултипа
     */
    content: ReactNode;
    /**
     * Позиционирование тултипа
     */
    position?: Position;
    /**
     * Задержка перед открытием тултипа
     */
    onOpenDelay?: number;
    /**
     * Задержка перед закрытием тултипа
     */
    onCloseDelay?: number;
    /**
     * Обработчик открытия тултипа
     */
    onOpen?: () => void;
    /**
     * Обработчик закрытия тултипа
     */
    onClose?: () => void;
    /**
     * Событие, по которому происходит открытие тултипа
     */
    trigger?: Trigger;
    /**
     * Если `true`, то тултип будет открыт
     */
    open?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дочерние элементы тултипа.
     * При срабатывании событий на них, тултип будет открываться
     */
    children: ReactElement;
    /**
     * Смещение тултипа
     */
    offset?: [number, number];
    /**
     * Функция, возвращающая контейнер, в который будет рендериться тултип
     */
    getPortalContainer?: () => HTMLElement;
    /**
     * Дополнительный класс для стрелочки
     */
    arrowClassName?: string;
    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;
    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string;
    /**
     * Дополнительный класс для обертки над дочерними элементами
     */
    targetClassName?: string;
    /**
     * Вид тултипа
     */
    view?: 'tooltip' | 'hint';
    /**
     * Хранит функцию, с помощью которой можно обновить положение компонента
     */
    updatePopover?: PopoverProps['update'];
    /**
     * z-index компонента
     */
    zIndex?: number;
    /**
     * Реф для обертки над дочерними элементами
     */
    targetRef?: MutableRefObject<HTMLElement | null>;
    /**
     * Если тултип не помещается в переданной позиции (position), он попробует открыться в другой позиции,
     * по очереди для каждой позиции из этого списка.
     * Если не передавать, то тултип открывается в противоположном направлении от переданного position.
     */
    fallbackPlacements?: PopoverProps['fallbackPlacements'];
    /**
     * Запрещает тултипу менять свою позицию, если он не влезает в видимую область.
     */
    preventOverflow?: PopoverProps['preventOverflow'];
    /**
     *  Позволяет тултипу подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
     */
    availableHeight?: PopoverProps['availableHeight'];
    /**
     *  Элемент, относительно которого будет позиционировать тултип.
     */
    anchor?: PopoverProps['anchorElement'];
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
    /**
     * Использовать ширину родительского элемента
     */
    useAnchorWidth?: boolean;
};
declare const TooltipDesktop: FC<TooltipDesktopProps>;
export { __extends, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __assign, __createBinding, TooltipDesktopProps, TooltipDesktop };
