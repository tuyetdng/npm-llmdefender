/// <reference types="react" />
import { TabsProps } from "../../typings";
type TabsMobileProps = Omit<TabsProps, 'TabList' | 'size' | 'collapsible' | 'collapsedTabsIds'>;
declare const TabsMobile: ({ view, scrollable, ...restProps }: TabsMobileProps) => JSX.Element;
export { TabsMobileProps, TabsMobile };
