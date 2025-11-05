import React from 'react';
import { Typography } from '../../../../typography/modern';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const FooterText = ({ children, color = 'secondary', dataTestId }) => (React.createElement(Typography.Text, { view: 'primary-small', color: color, "data-test-id": getDataTestId(dataTestId, 'footer-title') }, children));

export { FooterText };
