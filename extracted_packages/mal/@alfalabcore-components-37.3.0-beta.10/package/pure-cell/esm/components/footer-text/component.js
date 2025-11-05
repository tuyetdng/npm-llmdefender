import React from 'react';
import { Typography } from '../../../../typography/esm';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var FooterText = function (_a) {
    var children = _a.children, _b = _a.color, color = _b === void 0 ? 'secondary' : _b, dataTestId = _a.dataTestId;
    return (React.createElement(Typography.Text, { view: 'primary-small', color: color, "data-test-id": getDataTestId(dataTestId, 'footer-title') }, children));
};

export { FooterText };
