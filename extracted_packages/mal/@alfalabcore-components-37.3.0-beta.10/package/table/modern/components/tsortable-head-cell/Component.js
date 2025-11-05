import React, { useMemo } from 'react';
import cn from 'classnames';
import { THeadCell } from '../thead-cell/Component.js';
import { SortIconAsc } from './sort-icon-asc.js';
import { SortIconDesc } from './sort-icon-desc.js';
import { SortIconUnset } from './sort-icon-unset.js';
import '../table-context/index.js';

const styles = {"component":"table__component_174gw","content":"table__content_174gw","icon":"table__icon_174gw","reverse":"table__reverse_174gw","sorted":"table__sorted_174gw"};
require('./index.css');

const TSortableHeadCell = ({ children, className, defaultIsSortedDesc, isSortedDesc, textAlign, onSort, ...restProps }) => {
    const SortIcon = useMemo(() => {
        let value = isSortedDesc;
        if (value === undefined)
            value = defaultIsSortedDesc;
        if (typeof value === 'boolean')
            return value ? SortIconDesc : SortIconAsc;
        return SortIconUnset;
    }, [defaultIsSortedDesc, isSortedDesc]);
    return (React.createElement(THeadCell, { className: cn(className, styles.component), ...restProps },
        React.createElement("div", { className: cn(styles.content, { [styles.reverse]: textAlign === 'right' }) },
            children,
            React.createElement(SortIcon, { onClick: onSort, className: cn(styles.icon, {
                    [styles.sorted]: isSortedDesc !== undefined,
                }) }))));
};

export { TSortableHeadCell };
