/// <reference types="react" />
import { OptionsListProps } from "../../typings";
type VirtualOptionsList = Omit<OptionsListProps, 'optionsListWidth'> & {
    /**
     * Число отрисованных пунктов до\после видимого окна
     */
    overscan?: number;
};
declare const VirtualOptionsList: ({ size, flatOptions, highlightedIndex, className, getOptionProps, Option, open, options, overscan, Optgroup, dataTestId, emptyPlaceholder, visibleOptions, onScroll, header, footer, nativeScrollbar: nativeScrollbarProp, }: VirtualOptionsList) => JSX.Element;
export { VirtualOptionsList };
