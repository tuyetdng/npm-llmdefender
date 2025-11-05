import React, { useContext } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';

const styles = {"component":"table__component_eqdqh","sortable":"table__sortable_eqdqh","sorted":"table__sorted_eqdqh","stickyHeader":"table__stickyHeader_eqdqh","compactHorizontal":"table__compactHorizontal_eqdqh"};
require('./index.css');

const THeadCell = ({ children, className, dataTestId, style, width, textAlign, hidden, ...restProps }) => {
    const { compactHorizontal, stickyHeader } = useContext(TableContext);
    if (hidden)
        return null;
    return (React.createElement("th", { className: cn(styles.component, className, compactHorizontal && styles.compactHorizontal, {
            [styles.stickyHeader]: stickyHeader,
        }), style: { ...style, width, textAlign }, "data-test-id": dataTestId, ...restProps }, children));
};

export { THeadCell };
