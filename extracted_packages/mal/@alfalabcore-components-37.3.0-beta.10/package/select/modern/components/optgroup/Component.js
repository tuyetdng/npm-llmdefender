import React from 'react';
import cn from 'classnames';

const styles = {"optgroup":"select__optgroup_1yxqk","label":"select__label_1yxqk","l":"select__l_1yxqk","xl":"select__xl_1yxqk"};
require('./index.css');

const Optgroup = ({ children, className, label, size = 's' }) => (React.createElement(React.Fragment, null,
    React.createElement("div", { className: cn(styles.optgroup, className, styles[size]) },
        React.createElement("span", { className: styles.label }, label)),
    children));

export { Optgroup };
