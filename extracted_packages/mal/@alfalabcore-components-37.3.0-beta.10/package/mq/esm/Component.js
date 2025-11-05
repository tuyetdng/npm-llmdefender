import React, { useEffect, Fragment } from 'react';
import { useMatchMedia } from './useMatchMedia.js';
import { isPointerEventsSupported, isTouchSupported } from './utils.js';
import '@alfalab/hooks';

var IS_BROWSER = typeof window !== 'undefined';
var SUPPORTS_TOUCH = IS_BROWSER && (isPointerEventsSupported() || isTouchSupported());
var Mq = function (_a) {
    var children = _a.children, _b = _a.query, query = _b === void 0 ? '' : _b, touch = _a.touch, onMatchChange = _a.onMatchChange;
    var queryMatches = useMatchMedia(query)[0];
    var touchPass = touch === undefined ? true : touch === SUPPORTS_TOUCH;
    var matches = touchPass && (!query || queryMatches);
    useEffect(function () {
        if (onMatchChange) {
            onMatchChange(matches);
        }
    }, [matches, onMatchChange]);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return React.createElement(Fragment, null, matches && IS_BROWSER ? children : null);
};

export { Mq };
