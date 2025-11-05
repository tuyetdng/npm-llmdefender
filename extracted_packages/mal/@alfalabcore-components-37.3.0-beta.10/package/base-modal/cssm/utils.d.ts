declare function isScrolledToTop(target: HTMLElement): boolean;
declare function isScrolledToBottom(target: HTMLElement): boolean;
declare function hasScrollbar(target: HTMLElement): boolean;
declare const getScrollbarSize: () => number;
declare const restoreContainerStyles: (container: HTMLElement) => void;
declare const handleContainer: (container?: HTMLElement) => void;
export { isScrolledToTop, isScrolledToBottom, hasScrollbar, getScrollbarSize, restoreContainerStyles, handleContainer };
