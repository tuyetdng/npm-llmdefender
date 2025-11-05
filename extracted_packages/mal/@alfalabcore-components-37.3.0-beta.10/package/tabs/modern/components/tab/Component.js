import React from 'react';
import cn from 'classnames';

const styles = {"component":"tabs__component_jtbhp","hidden":"tabs__hidden_jtbhp"};
require('./index.css');

const Tab = ({ children, hidden, className, disabled, dataTestId }) => children ? (React.createElement("div", { className: cn(styles.component, {
        [styles.hidden]: hidden,
    }, className), hidden: hidden, role: 'tabpanel', tabIndex: disabled ? -1 : 0, "data-test-id": dataTestId }, children)) : null;

export { Tab };
