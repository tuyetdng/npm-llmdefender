import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

const styles = {"backdrop":"backdrop__backdrop_1vo9n","appear":"backdrop__appear_1vo9n","enter":"backdrop__enter_1vo9n","appearActive":"backdrop__appearActive_1vo9n","enterActive":"backdrop__enterActive_1vo9n","appearDone":"backdrop__appearDone_1vo9n","enterDone":"backdrop__enterDone_1vo9n","exit":"backdrop__exit_1vo9n","exitActive":"backdrop__exitActive_1vo9n","exitDone":"backdrop__exitDone_1vo9n","invisible":"backdrop__invisible_1vo9n"};
require('./index.css');

const Backdrop = ({ className, open = false, invisible = false, timeout = 200, children, onClose, dataTestId, transitionClassNames = styles, ...restProps }) => (React.createElement(CSSTransition, { timeout: timeout, unmountOnExit: true, classNames: transitionClassNames, in: open, appear: true, ...restProps },
    React.createElement("div", { "aria-hidden": true, onClick: onClose, "data-test-id": dataTestId, className: cn(styles.backdrop, className, {
            [styles.invisible]: invisible,
        }) }, children)));

export { Backdrop };
