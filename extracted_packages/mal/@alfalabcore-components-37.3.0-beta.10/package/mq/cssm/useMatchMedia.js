var React = require('react');
var hooks = require('@alfalab/hooks');
var utils = require('./utils.js');

/**
 * Хук для медиа запросов.
 * @param query media выражение или кастомный запрос из `mq.json`, например `--mobile`.
 * @param defaultValue Значение по-умолчанию.
 */
var useMatchMedia = function (query, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = React.useState(defaultValue), matches = _a[0], setMatches = _a[1];
    hooks.useLayoutEffect_SAFE_FOR_SSR(function () {
        var mql = utils.getMatchMedia(query);
        var handleMatchChange = function () { return setMatches(mql.matches); };
        handleMatchChange();
        if (mql.addListener) {
            mql.addListener(handleMatchChange);
        }
        else {
            mql.addEventListener('change', handleMatchChange);
        }
        return function () {
            if (mql.removeListener) {
                mql.removeListener(handleMatchChange);
            }
            else {
                mql.removeEventListener('change', handleMatchChange);
            }
            utils.releaseMatchMedia(query);
        };
    }, [query]);
    return [matches];
};

exports.useMatchMedia = useMatchMedia;
