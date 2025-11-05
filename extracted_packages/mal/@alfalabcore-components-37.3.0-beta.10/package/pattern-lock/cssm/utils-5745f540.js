var consts = require('./consts.js');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
exports.__assign = function () {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function getDefaultObserveTarget() {
    return document.head;
}
function getColorByToken(token) {
    return getComputedStyle(document.documentElement).getPropertyValue(token);
}
var getSizes = (function () {
    var COMMON_SIZES = {
        lineWidth: 6,
        nodeRing: 0,
        nodeCore: 12,
    };
    var cachedSize;
    return function () {
        if (cachedSize) {
            return cachedSize;
        }
        if (window.matchMedia('(min-width: 390px)').matches) {
            cachedSize = {
                elementSizes: exports.__assign(exports.__assign({}, COMMON_SIZES), { nodeRadius: 43 }),
                width: 322,
                height: 322,
            };
        }
        else if (window.matchMedia('(min-width: 360px)').matches) {
            cachedSize = {
                elementSizes: exports.__assign(exports.__assign({}, COMMON_SIZES), { nodeRadius: 38 }),
                width: 292,
                height: 292,
            };
        }
        else {
            cachedSize = {
                elementSizes: exports.__assign(exports.__assign({}, COMMON_SIZES), { nodeRadius: 32 }),
                width: 240,
                height: 240,
            };
        }
        return cachedSize;
    };
})();
function getTheme(dimens) {
    var _a;
    var baseColors = {
        primary: getColorByToken(consts.OBSERVABLE_TOKENS.PRIMARY),
        bg: getColorByToken(consts.OBSERVABLE_TOKENS.BG),
        ringBg: getColorByToken(consts.OBSERVABLE_TOKENS.RING_BG_INITIAL),
    };
    return _a = {},
        _a[consts.THEME_STATE.INITIAL] = {
            colors: exports.__assign(exports.__assign({}, baseColors), { accent: getColorByToken(consts.OBSERVABLE_TOKENS.ACCENT_INITIAL), selectedRingBg: getColorByToken(consts.OBSERVABLE_TOKENS.SELECTED_RING_BG_INITIAL) }),
            dimens: dimens,
        },
        _a[consts.THEME_STATE.SUCCESS] = {
            colors: exports.__assign(exports.__assign({}, baseColors), { accent: getColorByToken(consts.OBSERVABLE_TOKENS.ACCENT_SUCCESS), selectedRingBg: getColorByToken(consts.OBSERVABLE_TOKENS.SELECTED_RING_BG_SUCCESS) }),
            dimens: dimens,
        },
        _a[consts.THEME_STATE.FAILURE] = {
            colors: exports.__assign(exports.__assign({}, baseColors), { accent: getColorByToken(consts.OBSERVABLE_TOKENS.ACCENT_FAILURE), selectedRingBg: getColorByToken(consts.OBSERVABLE_TOKENS.SELECTED_RING_BG_FAILURE) }),
            dimens: dimens,
        },
        _a;
}

exports.__rest = __rest;
exports.getColorByToken = getColorByToken;
exports.getDefaultObserveTarget = getDefaultObserveTarget;
exports.getSizes = getSizes;
exports.getTheme = getTheme;
