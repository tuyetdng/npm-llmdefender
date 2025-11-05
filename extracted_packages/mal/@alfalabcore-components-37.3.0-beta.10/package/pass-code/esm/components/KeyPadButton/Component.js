import React from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/esm';

var styles = {"component":"pass-code__component_1y7g6","button":"pass-code__button_1y7g6","secondary":"pass-code__secondary_1y7g6","ghost":"pass-code__ghost_1y7g6"};
require('./index.css');

function KeyPadButton(_a) {
    var children = _a.children, onClick = _a.onClick, className = _a.className, _b = _a.view, view = _b === void 0 ? 'secondary' : _b, buttonClassName = _a.buttonClassName;
    return (React.createElement("div", { className: cn(styles.component, className) },
        React.createElement(Button, { className: cn(styles.button, styles[view], buttonClassName), view: view, onClick: function () { return onClick === null || onClick === void 0 ? void 0 : onClick(children); } }, children)));
}

export { KeyPadButton };
