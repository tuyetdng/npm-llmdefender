/// <reference types="react" />
import { TabsProps } from "../../typings";
type TabsDesktopProps = Omit<TabsProps, 'TabList' | 'fullWidthScroll'>;
declare const TabsDesktop: ({ view, scrollable, size, ...restProps }: TabsDesktopProps) => JSX.Element;
export { TabsDesktopProps, TabsDesktop };
