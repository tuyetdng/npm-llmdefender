import { FC, ReactNode } from 'react';
type ContentProps = {
    /**
     * Контент
     */
    children?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Content: FC<ContentProps>;
export { ContentProps, Content };
