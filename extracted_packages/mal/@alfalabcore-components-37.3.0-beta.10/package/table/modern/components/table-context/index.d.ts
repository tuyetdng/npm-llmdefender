/// <reference types="react" />
import React from 'react';
import { RefObject } from "react";
import { TextAlignProperty } from "../../typings";
type ColumnConfiguration = {
    width?: string | number;
    textAlign?: TextAlignProperty;
    hidden?: boolean;
    index: number;
};
type TableContextType = {
    columnsConfiguration: ColumnConfiguration[];
    stickyHeader: boolean;
    compactView: boolean;
    compactHorizontal: boolean;
    wrapperRef: RefObject<HTMLDivElement>;
};
declare const DEFAULT_TABLE_CONTEXT: TableContextType;
declare const TableContext: React.Context<TableContextType>;
export { ColumnConfiguration, TableContextType, DEFAULT_TABLE_CONTEXT, TableContext };
