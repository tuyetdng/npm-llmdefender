import { _ as __rest, a as __assign } from '../../tslib.es6-2c2ee2fa.js';
import React from 'react';
import { Button } from '../../../../button/esm';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_p7qat"};
require('./index.css');

var FooterButton = function (_a) {
    var children = _a.children, dataTestId = _a.dataTestId, props = __rest(_a, ["children", "dataTestId"]);
    return (React.createElement(Button, __assign({}, props, { size: 'xxs', dataTestId: getDataTestId(dataTestId, 'button'), className: styles.component }), children));
};

export { FooterButton };
