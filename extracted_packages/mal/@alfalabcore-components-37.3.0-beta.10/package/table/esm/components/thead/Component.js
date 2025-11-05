import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React from 'react';
import cn from 'classnames';

var styles = {"component":"table__component_5ojpo","row":"table__row_5ojpo"};
require('./index.css');

var THead = function (_a) {
    var className = _a.className, rowClassName = _a.rowClassName, children = _a.children, dataTestId = _a.dataTestId, restProps = __rest(_a, ["className", "rowClassName", "children", "dataTestId"]);
    return (React.createElement("thead", __assign({ className: cn(styles.component, className), "data-test-id": dataTestId }, restProps),
        React.createElement("tr", { className: cn(styles.row, rowClassName) }, children)));
};

export { THead };
