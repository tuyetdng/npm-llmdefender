/// <reference types="react" />
import React from 'react';
type CDNIconProps = {
    /**
     * Имя иконки
     */
    name: string;
    /**
     * Цвет иконки
     */
    color?: string;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Базовый адрес cdn хранилища c иконками
     * @default https://alfabank.servicecdn.ru/icons
     */
    baseUrl?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const CDNIcon: React.FC<CDNIconProps>;
export { CDNIcon };
