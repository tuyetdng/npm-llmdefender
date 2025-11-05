import { FC, ReactNode } from 'react';
type ButtonListProps = {
    /**
     * Кнопки для рендера
     */
    buttons: ReactNode;
    /**
     * Дополнительный класс для контейнера
     */
    containerClassName?: string;
    /**
     * Дополнительный класс для кнопок
     */
    buttonClassName?: string;
};
declare const ButtonList: FC<ButtonListProps>;
export { ButtonListProps, ButtonList };
