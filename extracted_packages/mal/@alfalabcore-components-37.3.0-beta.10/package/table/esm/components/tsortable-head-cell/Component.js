import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React, { useMemo } from 'react';
import cn from 'classnames';
import { THeadCell } from '../thead-cell/Component.js';
import { SortIconAsc } from './sort-icon-asc.js';
import { SortIconDesc } from './sort-icon-desc.js';
import { SortIconUnset } from './sort-icon-unset.js';
import '../table-context/index.js';

var styles = {"component":"table__component_174gw","content":"table__content_174gw","icon":"table__icon_174gw","reverse":"table__reverse_174gw","sorted":"table__sorted_174gw"};
require('./index.css');

var TSortableHeadCell = function (_a) {
    var _b, _c;
    var children = _a.children, className = _a.className, defaultIsSortedDesc = _a.defaultIsSortedDesc, isSortedDesc = _a.isSortedDesc, textAlign = _a.textAlign, onSort = _a.onSort, restProps = __rest(_a, ["children", "className", "defaultIsSortedDesc", "isSortedDesc", "textAlign", "onSort"]);
    var SortIcon = useMemo(function () {
        var value = isSortedDesc;
        if (value === undefined)
            value = defaultIsSortedDesc;
        if (typeof value === 'boolean')
            return value ? SortIconDesc : SortIconAsc;
        return SortIconUnset;
    }, [defaultIsSortedDesc, isSortedDesc]);
    return (React.createElement(THeadCell, __assign({ className: cn(className, styles.component) }, restProps),
        React.createElement("div", { className: cn(styles.content, (_b = {}, _b[styles.reverse] = textAlign === 'right', _b)) },
            children,
            React.createElement(SortIcon, { onClick: onSort, className: cn(styles.icon, (_c = {},
                    _c[styles.sorted] = isSortedDesc !== undefined,
                    _c)) }))));
};

export { TSortableHeadCell };
