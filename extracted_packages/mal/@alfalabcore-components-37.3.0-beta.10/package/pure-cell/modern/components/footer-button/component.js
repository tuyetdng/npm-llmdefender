import React from 'react';
import { Button } from '../../../../button/modern';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_p7qat"};
require('./index.css');

const FooterButton = ({ children, dataTestId, ...props }) => (React.createElement(Button, { ...props, size: 'xxs', dataTestId: getDataTestId(dataTestId, 'button'), className: styles.component }, children));

export { FooterButton };
