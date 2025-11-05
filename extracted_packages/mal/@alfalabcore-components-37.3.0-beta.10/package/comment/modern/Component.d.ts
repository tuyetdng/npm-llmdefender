/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
type CommentProps = {
    /**
     * Количество строк
     */
    rowLimit?: 2 | 5;
    /**
     *  Сss класс для стилизации общей обёртки
     */
    className?: string;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
declare const Comment: React.FC<CommentProps>;
export { CommentProps, Comment };
