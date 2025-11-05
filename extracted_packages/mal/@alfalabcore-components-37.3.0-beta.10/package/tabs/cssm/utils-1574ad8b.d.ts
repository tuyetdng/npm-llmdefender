type SavedStyle = {
    value: string;
    key: string;
    el: HTMLElement;
};
type RestoreStyle = {
    container: HTMLElement;
    modals: number;
    styles: SavedStyle[];
};
declare class ModalStore {
    private readonly restoreStyles;
    constructor();
    getRestoreStyles: () => RestoreStyle[];
}
declare const getModalStore: () => ModalStore;
declare class GlobalStore {
    private readonly modalStore;
    constructor();
    getModalStore: () => ModalStore;
}
declare function isScrolledToTop(target: HTMLElement): boolean;
declare function isScrolledToBottom(target: HTMLElement): boolean;
declare function hasScrollbar(target: HTMLElement): boolean;
declare const getScrollbarSize: () => number;
declare const restoreContainerStyles: (container: HTMLElement) => void;
declare const handleContainer: (container?: HTMLElement) => void;
export type { SavedStyle };
export { getModalStore, GlobalStore, isScrolledToTop, isScrolledToBottom, hasScrollbar, getScrollbarSize, restoreContainerStyles, handleContainer };
