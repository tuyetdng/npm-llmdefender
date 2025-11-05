import React from 'react';
import cn from 'classnames';

var styles = {"component":"tabs__component_jtbhp","hidden":"tabs__hidden_jtbhp"};
require('./index.css');

var Tab = function (_a) {
    var _b;
    var children = _a.children, hidden = _a.hidden, className = _a.className, disabled = _a.disabled, dataTestId = _a.dataTestId;
    return children ? (React.createElement("div", { className: cn(styles.component, (_b = {},
            _b[styles.hidden] = hidden,
            _b), className), hidden: hidden, role: 'tabpanel', tabIndex: disabled ? -1 : 0, "data-test-id": dataTestId }, children)) : null;
};

export { Tab };
