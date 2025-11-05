type usePeriodProps = {
    /**
     * Обработчик изменения выделенного периода
     */
    onPeriodChange?: (selectedFrom?: number, selectedTo?: number) => void;
    /**
     * Начальное значение начала выделенного периода
     */
    initialSelectedFrom?: number;
    /**
     * Начальное значение конца выделенного периода
     */
    initialSelectedTo?: number;
};
declare function usePeriod({ onPeriodChange, initialSelectedFrom, initialSelectedTo, }?: usePeriodProps): {
    selectedFrom: number | undefined;
    selectedTo: number | undefined;
    setStart: (date?: number) => void;
    setEnd: (date?: number) => void;
    resetPeriod: () => void;
    updatePeriod: (date?: number) => void;
};
declare function usePeriodWithReset({ onPeriodChange, initialSelectedFrom, initialSelectedTo, }?: usePeriodProps): {
    selectedFrom: number | undefined;
    selectedTo: number | undefined;
    setStart: (date?: number) => void;
    setEnd: (date?: number) => void;
    resetPeriod: () => void;
    updatePeriod: (date?: number) => void;
};
export { usePeriod, usePeriodWithReset };
