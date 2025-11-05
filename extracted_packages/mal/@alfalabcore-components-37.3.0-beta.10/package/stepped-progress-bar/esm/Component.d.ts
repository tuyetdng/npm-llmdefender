import { FC } from 'react';
type SteppedProgressBarView = 'positive' | 'negative' | 'attention' | 'link' | 'tertiary' | 'secondary' | 'primary' | 'accent';
type SteppedProgressBarProps = {
    /**
     * Общее количество шагов
     */
    maxStep: number;
    /**
     * Постфикс описание под прогрессбаром
     */
    description?: string;
    /**
     * Количество пройденных шагов
     */
    step?: number;
    /**
     * Цвет заполнения
     */
    view?: SteppedProgressBarView | SteppedProgressBarView[];
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Дополнительный класс
     */
    className?: string;
};
declare const SteppedProgressBar: FC<SteppedProgressBarProps>;
export { SteppedProgressBarView, SteppedProgressBarProps, SteppedProgressBar };
