import React from 'react';
import cn from 'classnames';
import { Amount } from '../../../../amount/modern';
import { Typography } from '../../../../typography/modern';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_17xdu","weight":"pure-cell__weight_17xdu"};
require('./index.css');

const AmountTitle = ({ minority, minorUnits = 100, className, color = 'primary', dataTestId, ...restProps }) => (React.createElement(Typography.Title, { tag: 'h4', view: 'small', dataTestId: getDataTestId(dataTestId, 'amount-title'), className: styles.component, color: color },
    React.createElement(Amount, { minority: minority || minorUnits, className: cn(styles.weight, className), dataTestId: getDataTestId(dataTestId, 'core-amount-title'), ...restProps, bold: 'none' })));

export { AmountTitle };
