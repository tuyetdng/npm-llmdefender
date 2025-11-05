import { _ as __rest, a as __assign } from '../tslib.es6-ebff0dba.js';
import React from 'react';
import { Option as Option$1 } from '../../../select/esm';

var styles = {"container":"picker-button__container_9x8t0","icon":"picker-button__icon_9x8t0","content":"picker-button__content_9x8t0"};
require('./index.css');

var Option = function (_a) {
    var option = _a.option, children = _a.children, restProps = __rest(_a, ["option", "children"]);
    var content = children || option.content || option.key;
    var Icon = option.icon;
    return (React.createElement(Option$1, __assign({ option: option }, restProps),
        React.createElement("div", { className: styles.container },
            Icon && React.createElement(Icon, { className: styles.icon }),
            React.createElement("div", { className: styles.content }, content))));
};

export { Option };
