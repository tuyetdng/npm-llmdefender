import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { Calendar } from '../../calendar/esm';
import { Skeleton } from '../../skeleton/esm';

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

var styles = {"component":"calendar-with-skeleton__component_c6fbh","calendarVisible":"calendar-with-skeleton__calendarVisible_c6fbh","skeleton":"calendar-with-skeleton__skeleton_c6fbh","header":"calendar-with-skeleton__header_c6fbh","weekDays":"calendar-with-skeleton__weekDays_c6fbh","row":"calendar-with-skeleton__row_c6fbh","enter":"calendar-with-skeleton__enter_c6fbh","enterActive":"calendar-with-skeleton__enterActive_c6fbh","exit":"calendar-with-skeleton__exit_c6fbh","exitActive":"calendar-with-skeleton__exitActive_c6fbh"};
require('./index.css');

var CalendarWithSkeleton = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.calendarVisible, calendarVisible = _c === void 0 ? true : _c, _d = _a.animate, animate = _d === void 0 ? true : _d, className = _a.className, restProps = __rest(_a, ["calendarVisible", "animate", "className"]);
    var skeletonProps = { visible: true, animate: animate };
    return (React.createElement("div", { className: cn(styles.component, className, (_b = {},
            _b[styles.calendarVisible] = calendarVisible,
            _b)) },
        calendarVisible && React.createElement(Calendar, __assign({ ref: ref }, restProps)),
        React.createElement(CSSTransition, { in: !calendarVisible, timeout: 200, unmountOnExit: true, classNames: styles },
            React.createElement("div", { className: styles.skeleton, ref: calendarVisible ? undefined : ref },
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.header })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.weekDays })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.row })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.row })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.row })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.row })),
                React.createElement(Skeleton, __assign({}, skeletonProps, { className: styles.row }))))));
});

export { CalendarWithSkeleton };
