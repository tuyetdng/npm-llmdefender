import { FC, ReactNode } from 'react';
type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Фиксирует футер
     */
    sticky?: boolean;
    /**
     * Выравнивание элементов футера
     */
    layout?: 'start' | 'center' | 'space-between' | 'column';
    /**
     * Отступы между элементами футера
     */
    gap?: 16 | 24 | 32;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Footer: FC<FooterProps>;
export { FooterProps, Footer };
