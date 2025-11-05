import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_3hz1g","none":"pure-cell__none_3hz1g","default":"pure-cell__default_3hz1g"};
require('./index.css');

var Footer = function (_a) {
    var children = _a.children, _b = _a.footerPadding, footerPadding = _b === void 0 ? 'default' : _b, dataTestId = _a.dataTestId;
    return (React.createElement("footer", { className: cn(styles.component, styles[footerPadding]), "data-test-id": getDataTestId(dataTestId, 'footer') }, children));
};

export { Footer };
