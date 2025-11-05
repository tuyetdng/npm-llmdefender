import React from 'react';
import cn from 'classnames';

var styles = {"optgroup":"select__optgroup_1yxqk","label":"select__label_1yxqk","l":"select__l_1yxqk","xl":"select__xl_1yxqk"};
require('./index.css');

var Optgroup = function (_a) {
    var children = _a.children, className = _a.className, label = _a.label, _b = _a.size, size = _b === void 0 ? 's' : _b;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: cn(styles.optgroup, className, styles[size]) },
            React.createElement("span", { className: styles.label }, label)),
        children));
};

export { Optgroup };
