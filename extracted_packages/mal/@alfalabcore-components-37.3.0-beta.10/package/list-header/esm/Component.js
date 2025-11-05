import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/esm';

var styles = {"component":"list-header__component_1ncwd","description":"list-header__description_1ncwd","filled":"list-header__filled_1ncwd"};
require('./index.css');

var ListHeader = function (_a) {
    var _b;
    var title = _a.title, description = _a.description, _c = _a.filled, filled = _c === void 0 ? true : _c, className = _a.className, dataTestId = _a.dataTestId;
    return (React.createElement("div", { "data-test-id": dataTestId, className: cn(styles.component, (_b = {}, _b[styles.filled] = filled, _b), className) },
        React.createElement(Typography.Text, { view: 'secondary-large' }, title),
        description && (React.createElement(Typography.Text, { view: 'secondary-large', className: cn(styles.description) }, ", ".concat(description)))));
};

export { ListHeader };
