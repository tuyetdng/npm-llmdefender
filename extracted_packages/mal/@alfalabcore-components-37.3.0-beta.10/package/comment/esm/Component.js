import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/esm';

var styles = {"component":"comment__component_1z0ix","rowLimit2":"comment__rowLimit2_1z0ix","rowLimit5":"comment__rowLimit5_1z0ix"};
require('./index.css');

var Comment = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId, children = _a.children, rowLimit = _a.rowLimit;
    var textClassName = rowLimit && styles["rowLimit".concat(rowLimit)];
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement(Typography.Text, { tag: 'div', view: 'component', className: textClassName, color: 'primary' }, children)));
};

export { Comment };
