/// <reference types="react" />
import { TabsProps } from "../../typings";
type TabsResponsiveProps = Omit<TabsProps, 'TabList'>;
declare const TabsResponsive: ({ view, scrollable, ...restProps }: TabsResponsiveProps) => JSX.Element;
export { TabsResponsiveProps, TabsResponsive };
