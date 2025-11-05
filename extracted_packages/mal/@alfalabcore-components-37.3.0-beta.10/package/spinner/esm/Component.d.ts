import { FC } from 'react';
type SpinnerProps = {
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;
    /**
     * Размер компонента
     */
    size?: 'xs' | 's' | 'm';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Палитра, в контексте которой используется спиннер
     */
    colors?: 'default' | 'inverted';
};
declare const Spinner: FC<SpinnerProps>;
export { SpinnerProps, Spinner };
