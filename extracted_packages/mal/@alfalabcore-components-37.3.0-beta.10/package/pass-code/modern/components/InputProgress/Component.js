import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-7e0fa95b.js';

const styles = {"component":"pass-code__component_1c0xp","dot":"pass-code__dot_1c0xp","error":"pass-code__error_1c0xp","filled":"pass-code__filled_1c0xp"};
require('./index.css');

const transitions = {"enter":"pass-code__enter_knpp8","enterActive":"pass-code__enterActive_knpp8","exit":"pass-code__exit_knpp8","exitActive":"pass-code__exitActive_knpp8","shake":"pass-code__shake_knpp8"};
require('./transitions.css');

/* eslint-disable react/no-array-index-key */
const TRANSITION_DURATION = 150;
const InputProgress = ({ value = '', maxCodeLength, codeLength, error, dataTestId, }) => (React.createElement("div", { className: cn(styles.component, { [transitions.shake]: error }), "data-test-id": getDataTestId(dataTestId, 'input-progress') }, codeLength
    ? new Array(codeLength).fill(null).map((_, i) => {
        const filled = Boolean(value[i]);
        return (React.createElement("div", { key: i, className: cn(styles.dot, {
                [styles.error]: filled && error,
                [styles.filled]: filled,
            }) }));
    })
    : new Array(maxCodeLength).fill(null).map((_, i) => (React.createElement(CSSTransition, { key: i, in: Boolean(value[i]), timeout: TRANSITION_DURATION, classNames: transitions, unmountOnExit: true },
        React.createElement("div", { className: cn(styles.dot, styles.filled, { [styles.error]: error }) }))))));

export { InputProgress };
