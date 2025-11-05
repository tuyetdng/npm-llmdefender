/// <reference types="react" />
import { SecondaryTabListProps } from "../../typings";
type SecondaryTabListDesktopProps = Omit<SecondaryTabListProps, 'tagSize'>;
declare const SecondaryTabListDesktop: ({ size, ...restProps }: SecondaryTabListDesktopProps) => JSX.Element;
export { SecondaryTabListDesktopProps, SecondaryTabListDesktop };
