import { FC } from 'react';
import { FooterProps } from "./Component";
type FooterDesktopProps = FooterProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's';
};
declare const FooterDesktop: FC<FooterDesktopProps>;
export { FooterDesktopProps, FooterDesktop };
