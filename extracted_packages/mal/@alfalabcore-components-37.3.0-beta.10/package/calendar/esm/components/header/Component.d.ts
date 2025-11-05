import { FC, ReactNode } from 'react';
import { SelectorView } from "../../typings";
type HeaderProps = {
    /**
     * Вид шапки — месяц и год или только месяц
     */
    view?: SelectorView;
    /**
     * Отображать тень? (нужна при прокрутке)
     */
    withShadow?: boolean;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const Header: FC<HeaderProps>;
export { HeaderProps, Header };
