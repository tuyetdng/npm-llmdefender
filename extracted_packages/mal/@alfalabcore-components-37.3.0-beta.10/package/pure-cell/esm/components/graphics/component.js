import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_1dpzp","top":"pure-cell__top_1dpzp","center":"pure-cell__center_1dpzp","bottom":"pure-cell__bottom_1dpzp"};
require('./index.css');

var Graphics = function (_a) {
    var children = _a.children, dataTestId = _a.dataTestId, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b;
    return (React.createElement("section", { className: cn(styles.component, styles[verticalAlign]), "data-test-id": getDataTestId(dataTestId, 'graphics') }, children));
};

export { Graphics };
