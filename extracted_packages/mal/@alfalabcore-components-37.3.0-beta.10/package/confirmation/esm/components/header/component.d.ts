import { FC, ReactNode } from 'react';
type HeaderProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};
declare const Header: FC<HeaderProps>;
export { HeaderProps, Header };
