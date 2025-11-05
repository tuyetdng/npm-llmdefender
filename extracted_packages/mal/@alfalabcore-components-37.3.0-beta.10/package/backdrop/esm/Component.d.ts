/// <reference types="react-transition-group" />
/// <reference types="react" />
import React from 'react';
import { MouseEvent, ReactNode } from "react";
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { TransitionProps } from 'react-transition-group/Transition';
type BackdropProps = Partial<TransitionProps> & {
    /**
     * Прозрачный бэкдроп
     */
    invisible?: boolean;
    /**
     * Управляет видимостью компонента
     */
    open: boolean;
    /**
     * Обработчик клика по бэкдропу
     */
    onClose?: (event: MouseEvent<HTMLElement>) => void;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Классы анимации
     *
     * http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-classNames
     */
    transitionClassNames?: string | CSSTransitionClassNames;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const Backdrop: React.FC<BackdropProps>;
export { BackdropProps, Backdrop };
