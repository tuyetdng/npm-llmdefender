import { ElementType, FC } from 'react';
import { HeaderProps } from "./Component";
type HeaderMobileProps = Omit<HeaderProps, 'closer'> & {
    /**
     * Наличие крестика
     */
    hasCloser?: boolean;
    /**
     * Иконка closer.
     */
    closerIcon?: ElementType;
};
declare const HeaderMobile: FC<HeaderMobileProps>;
export { HeaderMobileProps, HeaderMobile };
