import React, { forwardRef, useRef, useMemo } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';
import { findAllHeadCellsProps } from './utils.js';
import '../thead/Component.js';
import '../../utils.js';

const styles = {"component":"table__component_ln4zp","wrapper":"table__wrapper_ln4zp","stickyHeader":"table__stickyHeader_ln4zp","hasPagination":"table__hasPagination_ln4zp","table":"table__table_ln4zp"};
require('./index.css');

const Table = forwardRef(({ className, children, compactView = false, compactHorizontal = false, wrapper = true, pagination, dataTestId, stickyHeader = false, ...restProps }, ref) => {
    const wrapperRef = useRef(null);
    const columnsConfiguration = useMemo(() => findAllHeadCellsProps(children).map((columnProps, index) => ({
        width: columnProps.width,
        textAlign: columnProps.textAlign,
        hidden: columnProps.hidden,
        index,
    })), [children]);
    /* eslint-disable react/jsx-no-constructed-context-values */
    return (React.createElement(TableContext.Provider, { value: {
            stickyHeader,
            columnsConfiguration,
            compactView,
            compactHorizontal,
            wrapperRef,
        } },
        React.createElement("div", { ref: wrapperRef, className: cn(styles.component, className, {
                [styles.wrapper]: wrapper,
                [styles.hasPagination]: !!pagination,
                [styles.stickyHeader]: stickyHeader,
            }), "data-test-id": dataTestId },
            React.createElement("table", { ref: ref, className: styles.table, ...restProps }, children),
            pagination)));
});

export { Table };
