import React from 'react';

const DEFAULT_TABLE_CONTEXT = {
    columnsConfiguration: [],
    compactView: false,
    stickyHeader: false,
    compactHorizontal: false,
    wrapperRef: { current: null },
};
const TableContext = React.createContext(DEFAULT_TABLE_CONTEXT);

export { DEFAULT_TABLE_CONTEXT, TableContext };
