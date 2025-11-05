/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
import { BaseShapeProps } from "../base-shape/index";
type CircleProps = Omit<BaseShapeProps, 'pathsMap' | 'size'> & {
    /**
     * Размер компонента
     * @default 64
     */
    size?: 20 | 24 | 32 | 40 | 48 | 64 | 80 | 128;
    /**
     * Дочерний компонент
     */
    children?: ReactNode;
};
declare const Circle: React.ForwardRefExoticComponent<Omit<BaseShapeProps, "size" | "pathsMap"> & {
    /**
     * Размер компонента
     * @default 64
     */
    size?: 64 | 32 | 128 | 20 | 24 | 40 | 48 | 80 | undefined;
    /**
     * Дочерний компонент
     */
    children?: ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export { CircleProps, Circle };
