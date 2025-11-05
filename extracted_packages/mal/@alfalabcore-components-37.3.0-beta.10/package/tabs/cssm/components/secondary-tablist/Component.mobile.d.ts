/// <reference types="react" />
import { SecondaryTabListProps } from "../../typings";
type SecondaryTabListMobileProps = Omit<SecondaryTabListProps, 'size' | 'tagSize'>;
declare const SecondaryTabListMobile: ({ className, ...restProps }: SecondaryTabListMobileProps) => JSX.Element;
export { SecondaryTabListMobileProps, SecondaryTabListMobile };
