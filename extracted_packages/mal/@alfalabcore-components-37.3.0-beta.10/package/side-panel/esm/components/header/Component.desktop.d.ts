import { ElementType, FC } from 'react';
import { HeaderProps } from "./Component";
type HeaderDesktopProps = Omit<HeaderProps, 'closer'> & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's';
    /**
     * Наличие крестика
     */
    hasCloser?: boolean;
    /**
     * Иконка closer.
     */
    closerIcon?: ElementType;
};
declare const HeaderDesktop: FC<HeaderDesktopProps>;
export { HeaderDesktopProps, HeaderDesktop };
