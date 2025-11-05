import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React from 'react';
import cn from 'classnames';

var styles = {"component":"table__component_zaon3","withoutBorder":"table__withoutBorder_zaon3","clickable":"table__clickable_zaon3","selected":"table__selected_zaon3"};
require('./index.css');

var TRow = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, selected = _a.selected, withoutBorder = _a.withoutBorder, dataTestId = _a.dataTestId, restProps = __rest(_a, ["children", "className", "selected", "withoutBorder", "dataTestId"]);
    return (React.createElement("tr", __assign({ className: cn(styles.component, className, (_b = {},
            _b[styles.clickable] = typeof restProps.onClick !== 'undefined',
            _b[styles.selected] = selected,
            _b[styles.withoutBorder] = withoutBorder,
            _b)), "data-test-id": dataTestId }, restProps), React.Children.map(children, function (child, index) { return React.cloneElement(child, { index: index }); })));
};

export { TRow };
