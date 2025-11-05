import { _ as __rest, a as __assign } from '../../tslib.es6-2c2ee2fa.js';
import React from 'react';
import cn from 'classnames';
import { Amount } from '../../../../amount/esm';
import { Typography } from '../../../../typography/esm';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_17xdu","weight":"pure-cell__weight_17xdu"};
require('./index.css');

var AmountTitle = function (_a) {
    var minority = _a.minority, _b = _a.minorUnits, minorUnits = _b === void 0 ? 100 : _b, className = _a.className, _c = _a.color, color = _c === void 0 ? 'primary' : _c, dataTestId = _a.dataTestId, restProps = __rest(_a, ["minority", "minorUnits", "className", "color", "dataTestId"]);
    return (React.createElement(Typography.Title, { tag: 'h4', view: 'small', dataTestId: getDataTestId(dataTestId, 'amount-title'), className: styles.component, color: color },
        React.createElement(Amount, __assign({ minority: minority || minorUnits, className: cn(styles.weight, className), dataTestId: getDataTestId(dataTestId, 'core-amount-title') }, restProps, { bold: 'none' }))));
};

export { AmountTitle };
