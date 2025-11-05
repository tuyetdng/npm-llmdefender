import React from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/modern';

const styles = {"component":"pass-code__component_1y7g6","button":"pass-code__button_1y7g6","secondary":"pass-code__secondary_1y7g6","ghost":"pass-code__ghost_1y7g6"};
require('./index.css');

function KeyPadButton({ children, onClick, className, view = 'secondary', buttonClassName, }) {
    return (React.createElement("div", { className: cn(styles.component, className) },
        React.createElement(Button, { className: cn(styles.button, styles[view], buttonClassName), view: view, onClick: () => onClick?.(children) }, children)));
}

export { KeyPadButton };
