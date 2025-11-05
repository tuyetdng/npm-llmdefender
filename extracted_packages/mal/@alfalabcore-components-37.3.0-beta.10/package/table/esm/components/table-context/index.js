import React from 'react';

var DEFAULT_TABLE_CONTEXT = {
    columnsConfiguration: [],
    compactView: false,
    stickyHeader: false,
    compactHorizontal: false,
    wrapperRef: { current: null },
};
var TableContext = React.createContext(DEFAULT_TABLE_CONTEXT);

export { DEFAULT_TABLE_CONTEXT, TableContext };
