/// <reference types="react" />
import React from 'react';
import { HTMLAttributes, MouseEvent, ReactNode } from "react";
type BadgeIcons = {
    negative: JSX.Element;
    positive: JSX.Element;
    attention: JSX.Element;
};
type ToastPlateProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный класс для заголовка
     */
    titleClassName?: string;
    /**
     * Дополнительный класс для контентной области
     */
    contentClassName?: string;
    /**
     * Дополнительный класс для области с кнопкой действия
     */
    actionSectionClassName?: string;
    /**
     * Дочерние элементы
     */
    children?: ReactNode;
    /**
     * Заголовок компонента
     */
    title?: ReactNode;
    /**
     * Вид бэйджа
     */
    badge?: 'negative' | 'positive' | 'attention';
    /**
     * Слот слева, заменяет стандартную иконку
     */
    leftAddons?: ReactNode;
    /**
     * Кнопка действия
     */
    actionButton?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Управляет отображением кнопки закрытия уведомления
     */
    hasCloser?: boolean;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Обработчик клика по крестику
     */
    onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Функция, с помощью которой можно переопределить иконки в Badge
     */
    getBadgeIcons?: (icons: BadgeIcons) => BadgeIcons;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
};
declare const ToastPlate: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Дополнительный класс
     */
    className?: string | undefined;
    /**
     * Дополнительный класс для заголовка
     */
    titleClassName?: string | undefined;
    /**
     * Дополнительный класс для контентной области
     */
    contentClassName?: string | undefined;
    /**
     * Дополнительный класс для области с кнопкой действия
     */
    actionSectionClassName?: string | undefined;
    /**
     * Дочерние элементы
     */
    children?: ReactNode;
    /**
     * Заголовок компонента
     */
    title?: ReactNode;
    /**
     * Вид бэйджа
     */
    badge?: "positive" | "attention" | "negative" | undefined;
    /**
     * Слот слева, заменяет стандартную иконку
     */
    leftAddons?: ReactNode;
    /**
     * Кнопка действия
     */
    actionButton?: ReactNode;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string | undefined;
    /**
     * Управляет отображением кнопки закрытия уведомления
     */
    hasCloser?: boolean | undefined;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean | undefined;
    /**
     * Обработчик клика по крестику
     */
    onClose?: ((event?: MouseEvent<HTMLButtonElement>) => void) | undefined;
    /**
     * Функция, с помощью которой можно переопределить иконки в Badge
     */
    getBadgeIcons?: ((icons: BadgeIcons) => BadgeIcons) | undefined;
    /**
     * Набор цветов для компонента
     */
    colors?: "default" | "inverted" | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { BadgeIcons, ToastPlateProps, ToastPlate };
