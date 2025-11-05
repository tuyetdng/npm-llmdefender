/// <reference types="react" />
import { TabListProps } from "../typings";
declare const useTablistTitles: ({ titles, selectedId, collapsible, collapsedTabsIds, breakpoint, onChange, }: Pick<TabListProps, 'titles' | 'selectedId' | 'collapsible' | 'collapsedTabsIds' | 'onChange'> & Required<Pick<TabListProps, 'breakpoint'>>) => {
    containerRef: import("react").RefObject<HTMLDivElement>;
    addonRef: import("react").RefObject<HTMLInputElement>;
    tablistTitles: {
        collapsed: boolean;
        selected: boolean;
        title: string;
        id: import("../typings").SelectedId;
        disabled?: boolean | undefined;
        rightAddons?: import("react").ReactNode;
        hidden?: boolean | undefined;
        toggleClassName?: string | undefined;
    }[];
    selectedTab: HTMLButtonElement | null;
    focusedTab: HTMLButtonElement | null;
    getTabListItemProps: (index: number, outerRef?: import("react").MutableRefObject<HTMLElement> | undefined) => {
        role: string;
        tabIndex: number;
        'aria-selected': boolean;
        disabled: boolean | undefined;
        ref: (node: HTMLButtonElement) => void;
        onKeyDown: (event: import("react").KeyboardEvent<HTMLButtonElement>) => void;
        onClick: (event?: import("react").MouseEvent<Element, MouseEvent> | undefined) => void;
    };
};
export { useTablistTitles };
