/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
import { StepIndicatorProps } from "../step-indicator/index";
type StepProps = {
    /**
     * Название шага
     */
    children: ReactNode;
    /**
     * Номер шага
     */
    stepNumber: number;
    /**
     * Маркер того, что текущий шаг выбран
     */
    isSelected: boolean;
    /**
     * Маркер того, что текущий шаг доступен для клика
     */
    disabled: boolean;
    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;
    /**
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;
    /**
     * Маркер того, что текущий шаг находится в состоянии "Positive"
     */
    isPositive: boolean;
    /**
     * Маркер того, что текущий шаг находится в состоянии "Error"
     */
    isError: boolean;
    /**
     * Маркер того, что текущий шаг находится в состоянии "Warning"
     */
    isWarning: boolean;
    /**
     * Маркер того, что текущий шаг находится в состоянии "Waiting"
     */
    isWaiting: boolean;
    /**
     * Маркер того, что текущий шаг нужно пометить как завершенный
     */
    isStepCompleted: boolean;
    /**
     * Свойства кастомного индикатора текущего шага
     */
    customStepIndicator?: StepIndicatorProps;
    /**
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;
    /**
     * Указывает, является ли текущий шаг последним в списке
     */
    isNotLastStep?: boolean;
    /**
     * Обработчик нажатия на текущей шаг
     * @param stepNumber - номер шага
     */
    onClick: (stepNumber: number) => void;
};
declare const Step: React.FC<StepProps>;
export { StepProps, Step };
