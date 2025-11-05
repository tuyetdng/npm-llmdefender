import { FC, ReactNode } from 'react';
type HeaderProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Компонент крестика
     */
    closer?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;
    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;
    /**
     * Заголовок шапки
     */
    title?: string;
    /**
     * Выравнивание заголовка
     */
    align?: 'left' | 'center';
    /**
     * Обрезать ли заголовок
     */
    trim?: boolean;
    /**
     * Фиксирует шапку
     */
    sticky?: boolean;
    /**
     * Фоновое изображение
     */
    imageUrl?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Header: FC<HeaderProps>;
export { HeaderProps, Header };
