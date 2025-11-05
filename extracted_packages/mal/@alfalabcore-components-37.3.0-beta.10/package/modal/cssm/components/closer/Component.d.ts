import { ButtonHTMLAttributes, ElementType, FC } from 'react';
import { IconButtonProps } from "../../../../icon-button";
type CloserProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Позиция крестика
     */
    align?: 'left' | 'right';
    /**
     * Размер кнопки
     */
    size?: IconButtonProps['size'];
    /**
     * Фиксирует крестик
     */
    sticky?: boolean;
    /**
     * Иконка
     */
    icon?: ElementType;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
declare const Closer: FC<CloserProps>;
export { CloserProps, Closer };
