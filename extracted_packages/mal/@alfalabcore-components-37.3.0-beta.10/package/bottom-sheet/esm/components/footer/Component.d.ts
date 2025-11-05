import { FC, ReactNode } from 'react';
type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;
    /**
     * Фиксирует футер
     */
    sticky?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
};
declare const Footer: FC<FooterProps>;
export { FooterProps, Footer };
