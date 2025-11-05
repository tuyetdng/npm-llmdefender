/// <reference types="react" />
declare const Table: import("react").ForwardRefExoticComponent<import("react").TableHTMLAttributes<HTMLTableElement> & {
    compactView?: boolean | undefined;
    compactHorizontal?: boolean | undefined;
    className?: string | undefined;
    children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
    wrapper?: boolean | undefined;
    pagination?: import("react").ReactNode;
    dataTestId?: string | undefined;
    stickyHeader?: boolean | undefined;
} & import("react").RefAttributes<HTMLTableElement>> & {
    TBody: import("react").FC<import("./components/index").TBodyProps>;
    THead: import("react").FC<import("./components/index").THeadProps>;
    THeadCell: ({ children, className, dataTestId, style, width, textAlign, hidden, ...restProps }: import("./components/index").THeadCellProps) => JSX.Element | null;
    TSortableHeadCell: ({ children, className, defaultIsSortedDesc, isSortedDesc, textAlign, onSort, ...restProps }: import("./components/index").TSortableHeadCellProps) => JSX.Element;
    TCell: ({ className, style, dataTestId, children, index, ...restProps }: import("./components/index").TCellProps) => JSX.Element | null;
    TRow: ({ children, className, selected, withoutBorder, dataTestId, ...restProps }: import("./components/index").TRowProps) => JSX.Element;
    TExpandableRow: ({ className, selected, expanded, defaultExpanded, onToggle, renderContent, ...restProps }: import("./components/index").TExpandableRowProps) => JSX.Element;
    Pagination: import("react").FC<import("./components/index").PaginationProps>;
};
export { Table };
