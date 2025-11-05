/// <reference types="react" />
import React from 'react';
import { ReactNode } from "react";
import { StepIndicatorProps } from "./components/step-indicator/index";
type StepsProps = {
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дочерние элементы
     */
    children: ReactNode;
    /**
     * Активный шаг, указанный по умолчанию
     * @default 1
     */
    defaultActiveStep?: number;
    /**
     * Активный шаг
     */
    activeStep?: number;
    /**
     * Управление возможностью отключения пометки пройденного шага
     * @default true
     */
    isMarkCompletedSteps?: boolean;
    /**
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;
    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;
    /**
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;
    /**
     * Кастомный метод для управления состоянием disabled шага и
     * возможностью перехода на этот шаг
     * @param stepNumber - номер шага
     * @return Флаг состояния disabled
     */
    checkIsStepDisabled?: (stepNumber: number) => boolean;
    /**
     * Кастомный метод для управления состоянием шага error
     * @param stepNumber - номер шага
     * @return Флаг состояния error
     */
    checkIsStepError?: (stepNumber: number) => boolean;
    /**
     * Кастомный метод для управления состоянием шага warning
     * @param stepNumber - номер шага
     * @return Флаг состояния warning
     */
    checkIsStepWarning?: (stepNumber: number) => boolean;
    /**
     * Кастомный метод для управления состоянием шага waiting
     * @param stepNumber - номер шага
     * @return Флаг состояния waiting
     */
    checkIsStepWaiting?: (stepNumber: number) => boolean;
    /**
     * Кастомный метод для управления состоянием шага positive
     * @param stepNumber - номер шага
     * @return Флаг состояния positive
     */
    checkIsStepPositive?: (stepNumber: number) => boolean;
    /**
     * Кастомный метод для установки кастомного индикатора шага
     * @param stepNumber - номер шага
     * @return Объект StepIndicatorProps { className, content, iconColor }
     */
    checkIsStepCustom?: (stepNumber: number) => StepIndicatorProps;
    /**
     * Обработчик клика на шаг
     * @param stepNumber - номер активного шага
     */
    onChange?: (stepNumber: number) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Steps: React.FC<StepsProps>;
export { StepsProps, Steps };
