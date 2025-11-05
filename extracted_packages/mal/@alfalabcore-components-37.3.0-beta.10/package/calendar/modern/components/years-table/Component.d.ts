import { FC } from 'react';
type YearsTableProps = {
    /**
     * Массив лет
     */
    years?: Date[];
    /**
     * Выбранный год
     */
    selectedYear?: Date;
    /**
     * Доп. пропсы для переданного года
     */
    getYearProps: (year: Date) => Record<string, unknown>;
    /**
     * Обработчик скролла
     */
    onScroll: (scrollTop: number) => void;
    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};
declare const YearsTable: FC<YearsTableProps>;
export { YearsTableProps, YearsTable };
