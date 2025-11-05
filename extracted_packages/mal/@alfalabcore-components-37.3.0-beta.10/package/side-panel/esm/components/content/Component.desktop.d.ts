import { FC } from 'react';
import { ContentProps } from "./Component";
type ContentDesktopProps = ContentProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's';
};
declare const ContentDesktop: FC<ContentDesktopProps>;
export { ContentDesktopProps, ContentDesktop };
