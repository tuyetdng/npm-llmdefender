import React, { useEffect, Fragment } from 'react';
import { useMatchMedia } from './useMatchMedia.js';
import { isPointerEventsSupported, isTouchSupported } from './utils.js';
import '@alfalab/hooks';

const IS_BROWSER = typeof window !== 'undefined';
const SUPPORTS_TOUCH = IS_BROWSER && (isPointerEventsSupported() || isTouchSupported());
const Mq = ({ children, query = '', touch, onMatchChange }) => {
    const [queryMatches] = useMatchMedia(query);
    const touchPass = touch === undefined ? true : touch === SUPPORTS_TOUCH;
    const matches = touchPass && (!query || queryMatches);
    useEffect(() => {
        if (onMatchChange) {
            onMatchChange(matches);
        }
    }, [matches, onMatchChange]);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return React.createElement(Fragment, null, matches && IS_BROWSER ? children : null);
};

export { Mq };
