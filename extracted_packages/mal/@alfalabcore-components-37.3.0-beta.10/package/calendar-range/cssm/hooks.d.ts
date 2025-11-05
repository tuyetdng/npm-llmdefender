declare function usePopoverViewMonthes({ dateFrom, dateTo, defaultMonth, resetKey, }: {
    defaultMonth: number;
    dateFrom: number | null;
    dateTo: number | null;
    resetKey?: number;
}): {
    monthFrom: number | undefined;
    monthTo: number | undefined;
    handleMonthFromChange: (newMonthFrom: number) => void;
    handleMonthToChange: (newMonthTo: number) => void;
};
declare function useStaticViewMonthes({ selectedFrom, selectedTo, defaultMonth, defaultMonthPosition, }: {
    selectedFrom?: number;
    selectedTo?: number;
    defaultMonth: number;
    defaultMonthPosition?: 'left' | 'right';
}): {
    monthFrom: number;
    monthTo: number;
    handleMonthFromChange: (newMonthFrom: number) => void;
    handleMonthToChange: (newMonthTo: number) => void;
};
declare function useSelectionProps(from?: number, to?: number, highlighted?: number): {
    rangeComplete: boolean;
    selectedFrom: number | undefined;
    selectedTo: number | undefined;
};
export { usePopoverViewMonthes, useStaticViewMonthes, useSelectionProps };
