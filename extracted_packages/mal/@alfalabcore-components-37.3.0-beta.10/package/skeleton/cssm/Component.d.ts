/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type SkeletonProps = {
    /**
     * Флаг, явно задающий состояние, при котором контент закрывается прелоадером
     */
    visible?: boolean;
    /**
     * Флаг явного включения анимации скелета
     */
    animate?: boolean;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const Skeleton: React.FC<SkeletonProps>;
export { SkeletonProps, Skeleton };
