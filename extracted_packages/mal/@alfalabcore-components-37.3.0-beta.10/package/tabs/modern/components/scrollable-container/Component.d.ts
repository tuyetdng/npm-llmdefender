/// <reference types="react" />
import { ReactNode } from 'react';
import { TabsProps } from "../../typings";
type ScrollableContainerProps = {
    /**
     * Дополнительный класс контейнера
     */
    containerClassName?: string;
    /**
     * Дочерние компоненты
     */
    children: ReactNode;
    /**
     * Активный элемент (всегда будет в видимой области)
     */
    activeChild: HTMLElement | null;
};
declare const ScrollableContainer: ({ containerClassName, children, activeChild, fullWidthScroll, }: ScrollableContainerProps & Pick<TabsProps, 'fullWidthScroll'>) => JSX.Element;
export { ScrollableContainerProps, ScrollableContainer };
