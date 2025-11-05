import React from 'react';
import cn from 'classnames';
import { Amount as Amount$1 } from '../../../../amount/modern';
import { Typography } from '../../../../typography/modern';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_1gigc"};
require('./index.css');

const Amount = ({ weight = 'normal', textView = 'component', color = 'primary', minority, minorUnits = 100, dataTestId, ...restProps }) => (React.createElement(Typography.Text, { view: textView, dataTestId: getDataTestId(dataTestId, 'amount-text'), className: cn(styles.component), color: color },
    React.createElement(Amount$1, { minority: minority || minorUnits, bold: weight === 'bold' ? 'full' : 'none', dataTestId: getDataTestId(dataTestId, 'amount'), ...restProps })));

export { Amount };
