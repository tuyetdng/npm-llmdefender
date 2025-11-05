import { _ as __rest, a as __assign } from '../../tslib.es6-2c2ee2fa.js';
import React from 'react';
import cn from 'classnames';
import { Amount as Amount$1 } from '../../../../amount/esm';
import { Typography } from '../../../../typography/esm';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_1gigc"};
require('./index.css');

var Amount = function (_a) {
    var _b = _a.weight, weight = _b === void 0 ? 'normal' : _b, _c = _a.textView, textView = _c === void 0 ? 'component' : _c, _d = _a.color, color = _d === void 0 ? 'primary' : _d, minority = _a.minority, _e = _a.minorUnits, minorUnits = _e === void 0 ? 100 : _e, dataTestId = _a.dataTestId, restProps = __rest(_a, ["weight", "textView", "color", "minority", "minorUnits", "dataTestId"]);
    return (React.createElement(Typography.Text, { view: textView, dataTestId: getDataTestId(dataTestId, 'amount-text'), className: cn(styles.component), color: color },
        React.createElement(Amount$1, __assign({ minority: minority || minorUnits, bold: weight === 'bold' ? 'full' : 'none', dataTestId: getDataTestId(dataTestId, 'amount') }, restProps))));
};

export { Amount };
