import React from 'react';
import { Option as Option$1 } from '../../../select/modern';

const styles = {"container":"picker-button__container_9x8t0","icon":"picker-button__icon_9x8t0","content":"picker-button__content_9x8t0"};
require('./index.css');

const Option = ({ option, children, ...restProps }) => {
    const content = children || option.content || option.key;
    const Icon = option.icon;
    return (React.createElement(Option$1, { option: option, ...restProps },
        React.createElement("div", { className: styles.container },
            Icon && React.createElement(Icon, { className: styles.icon }),
            React.createElement("div", { className: styles.content }, content))));
};

export { Option };
