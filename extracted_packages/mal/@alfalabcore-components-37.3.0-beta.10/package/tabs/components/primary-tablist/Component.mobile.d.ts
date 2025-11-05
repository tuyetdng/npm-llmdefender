/// <reference types="react" />
import { TabListProps } from "../../typings";
type PrimaryTabListMobileProps = Omit<TabListProps, 'size'>;
declare const PrimaryTabListMobile: ({ className, ...restProps }: PrimaryTabListMobileProps) => JSX.Element;
export { PrimaryTabListMobileProps, PrimaryTabListMobile };
