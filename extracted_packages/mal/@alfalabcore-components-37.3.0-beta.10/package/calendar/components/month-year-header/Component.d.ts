import { FC, MouseEvent } from 'react';
type MonthYearHeaderProps = {
    /**
     * Активная дата
     */
    value?: Date;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const MonthYearHeader: FC<MonthYearHeaderProps>;
export { MonthYearHeaderProps, MonthYearHeader };
