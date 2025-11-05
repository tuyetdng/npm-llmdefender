import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React, { useContext } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';

var styles = {"component":"table__component_eqdqh","sortable":"table__sortable_eqdqh","sorted":"table__sorted_eqdqh","stickyHeader":"table__stickyHeader_eqdqh","compactHorizontal":"table__compactHorizontal_eqdqh"};
require('./index.css');

var THeadCell = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, dataTestId = _a.dataTestId, style = _a.style, width = _a.width, textAlign = _a.textAlign, hidden = _a.hidden, restProps = __rest(_a, ["children", "className", "dataTestId", "style", "width", "textAlign", "hidden"]);
    var _c = useContext(TableContext), compactHorizontal = _c.compactHorizontal, stickyHeader = _c.stickyHeader;
    if (hidden)
        return null;
    return (React.createElement("th", __assign({ className: cn(styles.component, className, compactHorizontal && styles.compactHorizontal, (_b = {},
            _b[styles.stickyHeader] = stickyHeader,
            _b)), style: __assign(__assign({}, style), { width: width, textAlign: textAlign }), "data-test-id": dataTestId }, restProps), children));
};

export { THeadCell };
