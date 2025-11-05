import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React, { useContext } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';

var styles = {"component":"table__component_dog0d","compactHorizontal":"table__compactHorizontal_dog0d","compact":"table__compact_dog0d"};
require('./index.css');

var TCell = function (_a) {
    var className = _a.className, style = _a.style, dataTestId = _a.dataTestId, children = _a.children, index = _a.index, restProps = __rest(_a, ["className", "style", "dataTestId", "children", "index"]);
    var _b = useContext(TableContext), columnsConfiguration = _b.columnsConfiguration, compactView = _b.compactView, compactHorizontal = _b.compactHorizontal;
    var column = index === undefined ? null : columnsConfiguration[index];
    var width = column === null || column === void 0 ? void 0 : column.width;
    var textAlign = column === null || column === void 0 ? void 0 : column.textAlign;
    var hidden = (column === null || column === void 0 ? void 0 : column.hidden) || false;
    if (hidden)
        return null;
    return (React.createElement("td", __assign({ className: cn(styles.component, className, compactView && styles.compact, compactHorizontal && styles.compactHorizontal), style: __assign(__assign({}, style), { width: width, textAlign: textAlign }), "data-test-id": dataTestId }, restProps), children));
};

export { TCell };
