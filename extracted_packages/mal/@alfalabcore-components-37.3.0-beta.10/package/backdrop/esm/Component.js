import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

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
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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

var styles = {"backdrop":"backdrop__backdrop_1vo9n","appear":"backdrop__appear_1vo9n","enter":"backdrop__enter_1vo9n","appearActive":"backdrop__appearActive_1vo9n","enterActive":"backdrop__enterActive_1vo9n","appearDone":"backdrop__appearDone_1vo9n","enterDone":"backdrop__enterDone_1vo9n","exit":"backdrop__exit_1vo9n","exitActive":"backdrop__exitActive_1vo9n","exitDone":"backdrop__exitDone_1vo9n","invisible":"backdrop__invisible_1vo9n"};
require('./index.css');

var Backdrop = function (_a) {
    var _b;
    var className = _a.className, _c = _a.open, open = _c === void 0 ? false : _c, _d = _a.invisible, invisible = _d === void 0 ? false : _d, _e = _a.timeout, timeout = _e === void 0 ? 200 : _e, children = _a.children, onClose = _a.onClose, dataTestId = _a.dataTestId, _f = _a.transitionClassNames, transitionClassNames = _f === void 0 ? styles : _f, restProps = __rest(_a, ["className", "open", "invisible", "timeout", "children", "onClose", "dataTestId", "transitionClassNames"]);
    return (React.createElement(CSSTransition, __assign({ timeout: timeout, unmountOnExit: true, classNames: transitionClassNames, in: open, appear: true }, restProps),
        React.createElement("div", { "aria-hidden": true, onClick: onClose, "data-test-id": dataTestId, className: cn(styles.backdrop, className, (_b = {},
                _b[styles.invisible] = invisible,
                _b)) }, children)));
};

export { Backdrop };
